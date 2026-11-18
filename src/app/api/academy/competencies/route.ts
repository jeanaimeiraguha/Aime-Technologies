import { requireAdmin } from '@/lib/academy/admin-auth';
import { loadCatalogue, saveCatalogue } from '@/lib/academy/store';
import type { StoredCompetency, StoredCompetencyLevel } from '@/lib/academy/store';

/**
 * GET  /api/academy/competencies — full catalogue (admin)
 * PUT  /api/academy/competencies — replace catalogue (admin)
 * PATCH /api/academy/competencies — partial update: toggle publish / edit row
 */

export async function GET(request: Request): Promise<Response> {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const catalogue = await loadCatalogue();
  return Response.json({ catalogue });
}

export async function PUT(request: Request): Promise<Response> {
  const denied = requireAdmin(request);
  if (denied) return denied;

  let body: { catalogue?: StoredCompetencyLevel[] };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!Array.isArray(body.catalogue) || body.catalogue.length === 0) {
    return Response.json({ error: 'catalogue array required' }, { status: 422 });
  }

  await saveCatalogue(body.catalogue);
  return Response.json({ ok: true });
}

interface PatchBody {
  levelId?: '3' | '4' | '5';
  competencyId?: string;
  patch?: Partial<Pick<StoredCompetency, 'name' | 'credits' | 'code' | 'published' | 'documentPath'>>;
}

export async function PATCH(request: Request): Promise<Response> {
  const denied = requireAdmin(request);
  if (denied) return denied;

  let body: PatchBody;
  try {
    body = (await request.json()) as PatchBody;
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body.levelId || !body.competencyId || !body.patch) {
    return Response.json({ error: 'levelId, competencyId and patch required' }, { status: 422 });
  }

  const catalogue = await loadCatalogue();
  const level = catalogue.find((l) => l.id === body.levelId);
  if (!level) return Response.json({ error: 'Level not found' }, { status: 404 });

  const index = level.competencies.findIndex((c) => c.id === body.competencyId);
  const previous = index >= 0 ? level.competencies[index] : undefined;
  if (!previous) return Response.json({ error: 'Competency not found' }, { status: 404 });

  const next: StoredCompetency = {
    ...previous,
    name: body.patch.name ?? previous.name,
    credits: body.patch.credits !== undefined ? body.patch.credits : previous.credits,
    code: body.patch.code !== undefined ? body.patch.code : previous.code,
    published: body.patch.published ?? previous.published,
    documentPath:
      body.patch.documentPath !== undefined ? body.patch.documentPath : previous.documentPath,
    updatedAt: new Date().toISOString(),
  };
  level.competencies[index] = next;

  await saveCatalogue(catalogue);
  return Response.json({ catalogue });
}
