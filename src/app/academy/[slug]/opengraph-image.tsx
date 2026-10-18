import { getAllCourses, getCourse } from '@/lib/content/courses';
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og';

export const alt = 'Aime Technologies Academy course';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllCourses().map((course) => ({ slug: course.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);

  return renderOgImage({
    label: `${course?.code ?? ''} — Academy`,
    title: course?.title ?? 'Academy',
    meta: [course?.level, course?.duration].filter(Boolean).join(' · '),
  });
}
