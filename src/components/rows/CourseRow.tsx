import Link from 'next/link';

import {
  ROW_ARROW,
  ROW_INDEX,
  ROW_LINK,
  ROW_LIST,
  ROW_META,
  ROW_SUMMARY,
  ROW_TITLE,
} from '@/components/rows/rowStyles';
import type { CourseSummary } from '@/lib/content/courses';
import { cn } from '@/lib/cn';

/** `Beginner · 8 weeks · Live online` — joined with a middle dot, nulls dropped. */
function courseMeta(course: CourseSummary): string {
  return [course.level, course.duration, course.format[0]].filter(Boolean).join(' · ');
}

export function CourseRow({ course }: { course: CourseSummary }) {
  return (
    <li>
      <Link
        href={`/academy/${course.slug}`}
        className={cn(ROW_LINK, 'grid-cols-[5rem_1fr] gap-x-4 gap-y-1.5 md:grid-cols-12')}
      >
        <span className={cn(ROW_INDEX, 'md:col-span-2')}>{course.code}</span>

        <div className="md:col-span-6">
          <h3 className={ROW_TITLE}>{course.title}</h3>
          <p className={cn(ROW_SUMMARY, 'text-meta mt-1 max-w-[52ch]')}>{course.summary}</p>
        </div>

        <span
          className={cn(ROW_META, 'col-start-2 md:col-span-3 md:col-start-9 md:text-right')}
        >
          {courseMeta(course)}
        </span>

        <span className={cn(ROW_ARROW, 'md:col-span-1')} aria-hidden="true">
          →
        </span>
      </Link>
    </li>
  );
}

export function CourseList({
  courses,
  className,
}: {
  courses: readonly CourseSummary[];
  className?: string;
}) {
  return (
    <ul className={cn(ROW_LIST, className)}>
      {courses.map((course) => (
        <CourseRow key={course.slug} course={course} />
      ))}
    </ul>
  );
}
