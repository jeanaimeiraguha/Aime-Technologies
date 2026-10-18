import { getAllCaseStudies, getCaseStudy } from '@/lib/content/work';
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og';

export const alt = 'Aime Technologies case study';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllCaseStudies().map((study) => ({ slug: study.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  return renderOgImage({
    label: 'Case study',
    title: study?.title ?? 'Work',
    meta: [study?.year, study?.category].filter(Boolean).join(' · '),
  });
}
