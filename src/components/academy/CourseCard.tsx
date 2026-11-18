import Link from 'next/link';
import { ArrowRight, Clock, Video } from 'lucide-react';

import type { CourseCategory, CourseLevel, CourseSummary } from '@/lib/content/courses';
import { cn } from '@/lib/cn';

/** Solid category chips — one hue per category, white on a dark fill. */
const CATEGORY_FILL: Record<CourseCategory, string> = {
  'Software Engineering': '#4338ca',
  Web: '#0369a1',
  Mobile: '#0f766e',
  'Embedded & IoT': '#92400e',
  'AI/ML': '#6b21a8',
  DevOps: '#9f1239',
  Tools: '#475569',
};

const LEVEL_FILLED: Record<CourseLevel, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

export function CategoryTag({ category }: { category: CourseCategory }) {
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-wide text-white"
      style={{ background: CATEGORY_FILL[category] }}
    >
      {category}
    </span>
  );
}

/** Three ascending bars, filled up to the course level, with the level named. */
export function LevelBadge({ level }: { level: CourseLevel }) {
  const filled = LEVEL_FILLED[level];

  return (
    <span className="text-meta text-faint inline-flex items-center gap-2">
      <span className="flex items-end gap-0.5" aria-hidden="true">
        {[1, 2, 3].map((bar) => (
          <span
            key={bar}
            className={cn(
              'w-1.5 rounded-sm',
              bar <= filled ? 'bg-accent' : 'bg-hairline-strong',
            )}
            style={{ height: `${4 + bar * 3}px` }}
          />
        ))}
      </span>
      {level}
    </span>
  );
}

/**
 * The shared course card: code + category, title, clamped summary, level bars,
 * then duration/format meta and a sliding arrow. The whole card is one link,
 * so focus lands on the card itself.
 */
export function CourseCard({
  course,
  durationFallback = 'Duration confirmed at enrolment',
  cta,
  className,
}: {
  course: CourseSummary;
  /** Shown when the course has no confirmed duration yet. */
  durationFallback?: string;
  /** Optional label beside the arrow, e.g. "Read more" on the home teaser. */
  cta?: string;
  className?: string;
}) {
  return (
    <article className={cn('card group relative flex h-full flex-col p-6', className)}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="border-hairline bg-sunken text-ink rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] font-semibold tracking-[0.1em] uppercase">
          {course.code}
        </span>
        <CategoryTag category={course.category} />
      </div>

      <h3 className="mt-4 text-[1.125rem] leading-snug">
        <Link
          href={`/academy/${course.slug}`}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {course.title}
        </Link>
      </h3>

      <p className="text-muted mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed">
        {course.summary}
      </p>

      <div className="mt-auto pt-5">
        <LevelBadge level={course.level} />

        <div className="border-hairline mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4">
          <span className="text-faint text-meta flex items-center gap-1.5">
            <Clock size={14} aria-hidden="true" className="shrink-0" />
            {course.duration ?? durationFallback}
          </span>
          <span className="text-faint text-meta flex items-center gap-1.5">
            <Video size={14} aria-hidden="true" className="shrink-0" />
            {course.format[0]}
          </span>

          {cta ? (
            <span className="text-accent text-meta ml-auto inline-flex items-center gap-1.5 font-semibold">
              {cta}
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          ) : (
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="text-accent ml-auto transition-transform duration-300 group-hover:translate-x-1"
            />
          )}
        </div>
      </div>
    </article>
  );
}
