import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { tvetLevels, type TvetCompetency, type TvetLevel } from '@/content/academy/tvet';
import type {
  AcademyApplication,
  ApplicationDraft,
  ApplicationListRow,
  ApplicationStatus,
} from '@/lib/academy/types';

/**
 * File-based persistence for Academy applications and the competency
 * catalogue. One JSON file per application keeps concurrent writes from
 * clobbering each other; the index is derived on read.
 *
 * Paths live under DATA_DIR (defaults to <cwd>/data/academy) so the store
 * works in `next dev`, `next start` and production containers alike.
 */

const DATA_DIR = process.env.ACADEMY_DATA_DIR
  ? path.resolve(process.env.ACADEMY_DATA_DIR)
  : path.join(process.cwd(), 'data', 'academy');

const APPS_DIR = path.join(DATA_DIR, 'applications');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const COMPETENCIES_FILE = path.join(DATA_DIR, 'competencies.json');

export function uploadsRootFor(applicationId: string): string {
  // Application ids are generated server-side (TI-…); still sanitize.
  const safe = applicationId.replace(/[^A-Za-z0-9_-]/g, '');
  return path.join(UPLOADS_DIR, safe);
}

function applicationFile(id: string): string {
  const safe = id.replace(/[^A-Za-z0-9_-]/g, '');
  return path.join(APPS_DIR, `${safe}.json`);
}

async function ensureDirs() {
  await mkdir(APPS_DIR, { recursive: true });
  await mkdir(UPLOADS_DIR, { recursive: true });
}

/** Stable public reference: TI-2026-0001 style, unique per store. */
export async function nextApplicationId(): Promise<string> {
  await ensureDirs();
  const files = await readdir(APPS_DIR).catch(() => [] as string[]);
  const year = new Date().getFullYear();
  let max = 0;
  for (const file of files) {
    const match = file.match(/^TI-\d{4}-(\d{4})\.json$/);
    if (match) max = Math.max(max, Number(match[1]));
  }
  return `TI-${year}-${String(max + 1).padStart(4, '0')}`;
}

export async function saveApplication(app: AcademyApplication): Promise<void> {
  await ensureDirs();
  const file = applicationFile(app.id);
  const tmp = `${file}.tmp`;
  await writeFile(tmp, JSON.stringify(app, null, 2), 'utf8');
  // Atomic-ish replace so a crash mid-write cannot corrupt the record.
  const { rename } = await import('node:fs/promises');
  await rename(tmp, file);
}

export async function getApplication(id: string): Promise<AcademyApplication | null> {
  try {
    const raw = await readFile(applicationFile(id), 'utf8');
    return JSON.parse(raw) as AcademyApplication;
  } catch {
    return null;
  }
}

/** Persist-first create. Retries with the same id must not duplicate. */
export async function createApplication(draft: ApplicationDraft): Promise<AcademyApplication> {
  await ensureDirs();
  const id = await nextApplicationId();
  const now = new Date().toISOString();
  const app: AcademyApplication = {
    ...draft,
    id,
    createdAt: now,
    updatedAt: now,
    status: 'new',
    documents: [],
    companyEmail: { status: 'pending', at: null, error: null },
    applicantEmail: { status: 'pending', at: null, error: null },
  };
  await saveApplication(app);
  return app;
}

export async function updateApplication(
  id: string,
  patch: Partial<AcademyApplication>,
): Promise<AcademyApplication | null> {
  const existing = await getApplication(id);
  if (!existing) return null;
  const next: AcademyApplication = {
    ...existing,
    ...patch,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };
  await saveApplication(next);
  return next;
}

function toRow(app: AcademyApplication): ApplicationListRow {
  return {
    id: app.id,
    createdAt: app.createdAt,
    updatedAt: app.updatedAt,
    status: app.status,
    programType: app.programType,
    educationCategory: app.educationCategory,
    fullName: `${app.firstName} ${app.lastName}`.trim(),
    email: app.email,
    phone: app.phone,
    organization: app.organization,
    tvetLevel: app.tvetLevel,
    secondaryLevel: app.secondaryLevel,
    secondaryCombination: app.secondaryCombination,
    trainingTrackId: app.trainingTrackId,
    opportunityId: app.opportunityId,
    courseCount: app.courseSlugs.length,
    competencyCount: app.selectedCompetencies.length,
    documentCount: app.documents.length,
    companyEmail: app.companyEmail.status,
    applicantEmail: app.applicantEmail.status,
  };
}

export interface ListFilter {
  status?: ApplicationStatus | 'all';
  q?: string;
}

export async function listApplications(filter: ListFilter = {}): Promise<ApplicationListRow[]> {
  await ensureDirs();
  const files = await readdir(APPS_DIR).catch(() => [] as string[]);
  const rows: ApplicationListRow[] = [];

  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    try {
      const raw = await readFile(path.join(APPS_DIR, file), 'utf8');
      rows.push(toRow(JSON.parse(raw) as AcademyApplication));
    } catch {
      // Skip corrupt files rather than failing the whole list.
    }
  }

  rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const status = filter.status && filter.status !== 'all' ? filter.status : null;
  const q = filter.q?.trim().toLowerCase() ?? '';

  return rows.filter((row) => {
    if (status && row.status !== status) return false;
    if (!q) return true;
    return (
      row.id.toLowerCase().includes(q) ||
      row.fullName.toLowerCase().includes(q) ||
      row.email.toLowerCase().includes(q) ||
      row.phone.toLowerCase().includes(q) ||
      row.organization.toLowerCase().includes(q)
    );
  });
}

export async function deleteApplication(id: string): Promise<boolean> {
  const file = applicationFile(id);
  try {
    await rm(file);
    await rm(uploadsRootFor(id), { recursive: true, force: true });
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Competency catalogue — seeded from company records, then editable
// ---------------------------------------------------------------------------

export interface StoredCompetency extends TvetCompetency {
  id: string;
  level: '3' | '4' | '5';
  /** Admin toggle; unpublished rows stay in the store but hide from applicants. */
  published: boolean;
  updatedAt: string;
}

export interface StoredCompetencyLevel {
  id: '3' | '4' | '5';
  label: string;
  title: string;
  isLearningAreas: boolean;
  competencies: StoredCompetency[];
}

function seedFromContent(): StoredCompetencyLevel[] {
  const now = new Date().toISOString();
  return tvetLevels.map((level: TvetLevel) => ({
    id: level.id,
    label: level.label,
    title: level.title,
    isLearningAreas: Boolean(level.isLearningAreas),
    competencies: level.competencies.map((c: TvetCompetency, index: number) => ({
      ...c,
      id: `${level.id}-${index + 1}`,
      level: level.id,
      published: true,
      updatedAt: now,
    })),
  }));
}

/**
 * Load the catalogue, seeding the supplied Level 3/4/5 records on first use.
 * Idempotent: an existing file is never overwritten by a re-seed.
 */
export async function loadCatalogue(): Promise<StoredCompetencyLevel[]> {
  await ensureDirs();
  try {
    const raw = await readFile(COMPETENCIES_FILE, 'utf8');
    const parsed = JSON.parse(raw) as StoredCompetencyLevel[];
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {
    // Missing or invalid — seed below.
  }
  const seeded = seedFromContent();
  await writeFile(COMPETENCIES_FILE, JSON.stringify(seeded, null, 2), 'utf8');
  return seeded;
}

export async function saveCatalogue(catalogue: StoredCompetencyLevel[]): Promise<void> {
  await ensureDirs();
  await writeFile(COMPETENCIES_FILE, JSON.stringify(catalogue, null, 2), 'utf8');
}

/** Public view: published competencies only, shaped for the UI. */
export async function loadPublicCatalogue(): Promise<StoredCompetencyLevel[]> {
  const catalogue = await loadCatalogue();
  return catalogue.map((level) => ({
    ...level,
    competencies: level.competencies.filter((c) => c.published),
  }));
}
