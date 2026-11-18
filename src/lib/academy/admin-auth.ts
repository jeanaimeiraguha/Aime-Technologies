import { timingSafeEqual } from 'node:crypto';

/** Admin token auth for /admin and Academy management APIs. */

function expectedToken(): string | undefined {
  const value = process.env.ADMIN_TOKEN?.trim();
  return value || undefined;
}

/** Server-side helper for the admin page (no Request object). */
export function isAdminConfigured(): boolean {
  return Boolean(expectedToken());
}

export function isValidAdminToken(candidate: string | null | undefined): boolean {
  const expected = expectedToken();
  if (!expected || !candidate) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(candidate);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Reads token from x-admin-token header or ?token= query (admin UI). */
export function readAdminToken(request: Request): string | null {
  const header = request.headers.get('x-admin-token');
  if (header) return header.trim();

  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('token');
    if (query) return query.trim();
  } catch {
    // ignore
  }

  const cookie = request.headers.get('cookie') ?? '';
  const match = cookie.match(/(?:^|;\s*)ti_admin=([^;]+)/);
  if (match?.[1]) return decodeURIComponent(match[1]).trim();

  return null;
}

export function requireAdmin(request: Request): Response | null {
  if (!isAdminConfigured()) {
    return Response.json(
      { error: 'Admin access is not configured. Set ADMIN_TOKEN in the environment.' },
      { status: 503 },
    );
  }
  if (!isValidAdminToken(readAdminToken(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
