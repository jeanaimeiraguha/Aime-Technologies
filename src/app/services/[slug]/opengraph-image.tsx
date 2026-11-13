import { getService, serviceSlugs } from '@/content/services';
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og';

export const alt = 'Totally Ink service';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);

  return renderOgImage({
    label: `${service?.index ?? ''} — Services`,
    title: service?.title ?? 'Services',
    meta: service?.technologies.slice(0, 3).join(' · '),
  });
}
