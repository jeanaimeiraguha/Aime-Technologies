import { requireAdmin } from '@/lib/academy/admin-auth';
import { notifyAfterPersist } from '@/lib/academy/email';
import {
  deleteApplication,
  getApplication,
  saveApplication,
  updateApplication,
} from '@/lib/academy/store';
import type { ApplicationStatus } from '@/lib/academy/types';

const STATUSES: ApplicationStatus[] = ['new', 'in_review', 'accepted', 'declined', 'waitlist'];

type Params = { params: Promise<{ id: string }> };

/** GET /api/academy/applications/[id] — full record for the admin detail view. */
export async function GET(request: Request, { params }: Params): Promise<Response> {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const { id } = await params;
  const app = await getApplication(id);
  if (!app) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json({ application: app });
}

/** PATCH /api/academy/applications/[id] — status update or email retry. */
export async function PATCH(request: Request, { params }: Params): Promise<Response> {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const { id } = await params;
  const app = await getApplication(id);
  if (!app) return Response.json({ error: 'Not found' }, { status: 404 });

  let body: { status?: string; retryEmails?: boolean };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  let next = app;

  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status as ApplicationStatus)) {
      return Response.json({ error: 'Invalid status' }, { status: 422 });
    }
    const updated = await updateApplication(id, { status: body.status as ApplicationStatus });
    if (!updated) return Response.json({ error: 'Update failed' }, { status: 500 });
    next = updated;
  }

  if (body.retryEmails) {
    const { app: notified } = await notifyAfterPersist(next);
    await saveApplication(notified);
    next = notified;
  }

  return Response.json({ application: next });
}

/** DELETE /api/academy/applications/[id] */
export async function DELETE(request: Request, { params }: Params): Promise<Response> {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const { id } = await params;
  const ok = await deleteApplication(id);
  if (!ok) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json({ ok: true });
}
