import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';

import { requireAdmin } from '@/lib/academy/admin-auth';
import { getApplication, uploadsRootFor } from '@/lib/academy/store';

type Params = { params: Promise<{ id: string; name: string }> };

/**
 * GET /api/academy/applications/[id]/documents/[name]
 * Admin-only download. Names are the stored (sanitized) filenames; the path
 * never appears as a permanent public URL on the marketing site.
 */
export async function GET(request: Request, { params }: Params): Promise<Response> {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const { id, name } = await params;
  const safeName = path.basename(name);
  if (!safeName || safeName !== name || name.includes('..')) {
    return Response.json({ error: 'Invalid filename' }, { status: 400 });
  }

  const app = await getApplication(id);
  if (!app) return Response.json({ error: 'Not found' }, { status: 404 });

  const record = app.documents.find((d) => d.name === safeName);
  if (!record) return Response.json({ error: 'Not found' }, { status: 404 });

  const filePath = path.join(uploadsRootFor(id), safeName);
  try {
    const info = await stat(filePath);
    if (!info.isFile()) throw new Error('not a file');

    const stream = createReadStream(filePath);
    const webStream = Readable.toWeb(stream) as ReadableStream;
    return new Response(webStream, {
      headers: {
        'Content-Type': record.type,
        'Content-Length': String(info.size),
        'Content-Disposition': `attachment; filename="${encodeURIComponent(record.originalName)}"`,
        'Cache-Control': 'private, no-store',
      },
    });
  } catch {
    return Response.json({ error: 'File missing on server' }, { status: 404 });
  }
}
