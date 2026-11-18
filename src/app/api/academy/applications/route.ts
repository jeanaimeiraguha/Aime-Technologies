import { requireAdmin } from '@/lib/academy/admin-auth';
import { listApplications } from '@/lib/academy/store';
import type { ApplicationStatus } from '@/lib/academy/types';

const STATUSES: ApplicationStatus[] = ['new', 'in_review', 'accepted', 'declined', 'waitlist'];

/** GET /api/academy/applications — admin list with search + status filter. */
export async function GET(request: Request): Promise<Response> {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const url = new URL(request.url);
  const statusParam = url.searchParams.get('status') ?? 'all';
  const q = url.searchParams.get('q') ?? '';

  const status = (STATUSES as string[]).includes(statusParam)
    ? (statusParam as ApplicationStatus)
    : 'all';

  const rows = await listApplications({ status, q });
  return Response.json({ applications: rows });
}
