import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { notifyAfterPersist } from '@/lib/academy/email';
import {
  createApplication,
  saveApplication,
  uploadsRootFor,
} from '@/lib/academy/store';
import type { AcademyApplication, ApplicationDraft, ProgramType, SelectedCompetency } from '@/lib/academy/types';

/**
 * POST /api/academy/apply
 *
 * Persist the application first (file store), then attempt company and
 * applicant email. Multipart when documents are attached; JSON otherwise.
 * Client retries with the same `clientId` must not create duplicates.
 */

const MAX_FILES = 5;
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB each
const ALLOWED_EXT = new Set([
  '.pdf',
  '.doc',
  '.docx',
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.txt',
  '.zip',
]);

const PROGRAM_TYPES: ProgramType[] = [
  'internship',
  'tvet',
  'secondary',
  'professional',
  'mentorship',
  'course',
];

type ApplicationWithClient = AcademyApplication & { clientId?: string };

function isProgramType(value: unknown): value is ProgramType {
  return typeof value === 'string' && PROGRAM_TYPES.includes(value as ProgramType);
}

function parseJsonField<T>(raw: FormDataEntryValue | null, fallback: T): T {
  if (typeof raw !== 'string' || !raw.trim()) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function str(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : '';
}

function dataDir(): string {
  return process.env.ACADEMY_DATA_DIR
    ? path.resolve(process.env.ACADEMY_DATA_DIR)
    : path.join(process.cwd(), 'data', 'academy');
}

async function findByClientId(clientId: string): Promise<ApplicationWithClient | null> {
  const appsDir = path.join(dataDir(), 'applications');
  const files = await readdir(appsDir).catch(() => [] as string[]);
  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    try {
      const raw = await readFile(path.join(appsDir, file), 'utf8');
      const parsed = JSON.parse(raw) as ApplicationWithClient;
      if (parsed.clientId && parsed.clientId === clientId) return parsed;
    } catch {
      // skip corrupt
    }
  }
  return null;
}

function validateDraft(draft: Partial<ApplicationDraft>): string | null {
  if (!isProgramType(draft.programType)) return 'Choose a program type.';
  if (!draft.firstName || draft.firstName.length < 2) return 'First name is required.';
  if (!draft.lastName || draft.lastName.length < 2) return 'Last name is required.';
  if (!draft.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(draft.email)) {
    return 'A valid email is required.';
  }
  if (!draft.educationCategory) return 'Choose an education category.';
  if (!draft.motivation || draft.motivation.length < 20) {
    return 'Tell us a little more about your motivation (at least 20 characters).';
  }
  if (draft.programType === 'tvet' && !draft.tvetLevel) return 'Choose a TVET level.';
  return null;
}

export async function POST(request: Request): Promise<Response> {
  let form: FormData;
  try {
    const contentType = request.headers.get('content-type') ?? '';
    if (contentType.includes('multipart/form-data')) {
      form = await request.formData();
    } else {
      const body = (await request.json()) as Record<string, unknown>;
      form = new FormData();
      for (const [key, value] of Object.entries(body)) {
        if (value === null || value === undefined) continue;
        if (Array.isArray(value)) form.append(key, JSON.stringify(value));
        else form.append(key, String(value));
      }
    }
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Bot honeypot — report success without storing.
  if (str(form.get('company_website'))) {
    return Response.json({ ok: true, id: 'TI-0000-0000', deduped: true });
  }

  const clientId = str(form.get('clientId'));
  if (clientId) {
    const existing = await findByClientId(clientId);
    if (existing) {
      return Response.json({ ok: true, id: existing.id, deduped: true }, { status: 200 });
    }
  }

  const selectedCompetencies = parseJsonField<SelectedCompetency[]>(
    form.get('selectedCompetencies'),
    [],
  );
  const courseSlugs = parseJsonField<string[]>(form.get('courseSlugs'), []);

  const draft: ApplicationDraft = {
    programType: str(form.get('programType')) as ProgramType,
    educationCategory: str(form.get('educationCategory')),
    tvetLevel: (str(form.get('tvetLevel')) || null) as '3' | '4' | '5' | null,
    secondaryLevel: str(form.get('secondaryLevel')) || null,
    secondaryCombination: str(form.get('secondaryCombination')) || null,
    trainingTrackId: str(form.get('trainingTrackId')) || null,
    opportunityId: str(form.get('opportunityId')) || null,
    courseSlugs: Array.isArray(courseSlugs) ? courseSlugs.filter(Boolean) : [],
    selectedCompetencies: Array.isArray(selectedCompetencies) ? selectedCompetencies : [],
    firstName: str(form.get('firstName')),
    lastName: str(form.get('lastName')),
    email: str(form.get('email')),
    phone: str(form.get('phone')),
    organization: str(form.get('organization')),
    motivation: str(form.get('motivation')),
    availability: str(form.get('availability')),
  };

  const error = validateDraft(draft);
  if (error) return Response.json({ error }, { status: 422 });

  let app = (await createApplication(draft)) as ApplicationWithClient;
  if (clientId) {
    app = { ...app, clientId };
    await saveApplication(app);
  }

  const files = form.getAll('documents').filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) {
    return Response.json({ error: `At most ${MAX_FILES} documents.` }, { status: 422 });
  }

  if (files.length) {
    const dir = uploadsRootFor(app.id);
    await mkdir(dir, { recursive: true });
    const stored: typeof app.documents = [];

    for (const file of files) {
      const ext = path.extname(file.name).toLowerCase();
      if (!ALLOWED_EXT.has(ext)) {
        return Response.json({ error: `Unsupported file type: ${file.name}` }, { status: 422 });
      }
      if (file.size > MAX_FILE_BYTES) {
        return Response.json({ error: `${file.name} is larger than 5 MB.` }, { status: 422 });
      }

      const safeBase = path
        .basename(file.name, ext)
        .replace(/[^A-Za-z0-9._-]/g, '_')
        .slice(0, 80);
      const name = `${Date.now()}-${stored.length}-${safeBase}${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(path.join(dir, name), buffer);
      stored.push({
        name,
        originalName: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
      });
    }

    app = { ...app, documents: stored, updatedAt: new Date().toISOString() };
    await saveApplication(app);
  }

  const { app: notified, company, applicant } = await notifyAfterPersist(app);
  await saveApplication(notified);

  return Response.json(
    {
      ok: true,
      id: notified.id,
      notifications: { company: company.status, applicant: applicant.status },
    },
    { status: 201 },
  );
}
