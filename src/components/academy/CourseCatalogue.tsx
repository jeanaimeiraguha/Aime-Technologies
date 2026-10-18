'use client';

import { useMemo, useState } from 'react';

import { CourseList } from '@/components/rows/CourseRow';
import type { CourseCategory, CourseLevel, CourseSummary } from '@/lib/content/courses';
import { cn } from '@/lib/cn';

/**
 * Filterable course catalogue.
 *
 * Filters are plain buttons in a toolbar, not a select, because there are few
 * enough options to show them all. `aria-pressed` carries the state, so the
 * active filter is not communicated by colour alone. With both filters set to
 * "All" this renders exactly the same list a visitor with no JavaScript would
 * get from the server.
 */
function FilterGroup<T extends string>({
  legend,
  options,
  active,
  onChange,
}: {
  legend: string;
  options: readonly T[];
  active: T | null;
  onChange: (value: T | null) => void;
}) {
  return (
    <fieldset className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
      <legend className="text-meta text-faint float-left mr-4 font-mono tracking-[0.06em] uppercase">
        {legend}
      </legend>

      <button
        type="button"
        aria-pressed={active === null}
        onClick={() => onChange(null)}
        className={cn(
          'tap text-meta hover:text-accent font-mono underline-offset-[5px]',
          active === null ? 'text-ink decoration-accent underline' : 'text-muted',
        )}
      >
        All
      </button>

      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={active === option}
          onClick={() => onChange(active === option ? null : option)}
          className={cn(
            'tap text-meta hover:text-accent font-mono underline-offset-[5px]',
            active === option ? 'text-ink decoration-accent underline' : 'text-muted',
          )}
        >
          {option}
        </button>
      ))}
    </fieldset>
  );
}

export function CourseCatalogue({
  courses,
  categories,
  levels,
}: {
  courses: readonly CourseSummary[];
  categories: readonly CourseCategory[];
  levels: readonly CourseLevel[];
}) {
  const [category, setCategory] = useState<CourseCategory | null>(null);
  const [level, setLevel] = useState<CourseLevel | null>(null);

  const filtered = useMemo(
    () =>
      courses.filter(
        (course) =>
          (category === null || course.category === category) &&
          (level === null || course.level === level),
      ),
    [courses, category, level],
  );

  return (
    <div>
      <div className="border-hairline flex flex-col gap-4 border-b pb-5">
        <FilterGroup
          legend="Category"
          options={categories}
          active={category}
          onChange={setCategory}
        />
        <FilterGroup legend="Level" options={levels} active={level} onChange={setLevel} />
      </div>

      <p className="text-meta text-faint mt-5 font-mono" role="status" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'course' : 'courses'}
        {category || level ? ' matching' : ''}
      </p>

      {filtered.length > 0 ? (
        <CourseList courses={filtered} className="mt-5" />
      ) : (
        <p className="border-hairline text-muted mt-5 border-t pt-6">
          No courses match that combination yet. Clear a filter, or{' '}
          <a
            href="/contact?type=training"
            className="text-ink decoration-hairline-strong hover:text-accent hover:decoration-accent underline underline-offset-[5px]"
          >
            tell us what you are looking for
          </a>
          .
        </p>
      )}
    </div>
  );
}
