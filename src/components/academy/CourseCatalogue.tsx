'use client';

import { SearchX } from 'lucide-react';
import { useMemo, useState } from 'react';

import { CourseCard } from '@/components/academy/CourseCard';
import type { CourseCategory, CourseLevel, CourseSummary } from '@/lib/content/courses';
import { cn } from '@/lib/cn';

/**
 * Filterable course catalogue.
 *
 * Filters are plain buttons in a toolbar, not a select, because there are few
 * enough options to show them all. `aria-pressed` carries the state, so the
 * active filter is not communicated by colour alone. With both filters set to
 * "All" this renders exactly the same grid a visitor with no JavaScript would
 * get from the server.
 *
 * The bar is sticky under the Academy sub-nav; the grid re-enters with a
 * short stagger whenever the filter changes.
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
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="text-faint mr-2 font-mono text-[0.75rem] tracking-[0.08em] uppercase">
        {legend}
      </legend>

      <button
        type="button"
        aria-pressed={active === null}
        onClick={() => onChange(null)}
        className={cn(
          'tap rounded-full border px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors',
          active === null
            ? 'border-accent bg-accent text-on-accent'
            : 'border-hairline bg-surface text-muted hover:border-accent/50 hover:text-accent',
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
            'tap rounded-full border px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors',
            active === option
              ? 'border-accent bg-accent text-on-accent'
              : 'border-hairline bg-surface text-muted hover:border-accent/50 hover:text-accent',
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

  // Remounts the grid on every filter change so `.filter-in` replays.
  const gridKey = `${category ?? '*'}-${level ?? '*'}`;

  return (
    <div>
      <div className="border-hairline bg-paper/95 sticky top-[110px] z-20 border-b py-3 backdrop-blur md:top-[127px]">
        <div className="flex flex-col gap-2.5">
          <FilterGroup
            legend="Category"
            options={categories}
            active={category}
            onChange={setCategory}
          />
          <FilterGroup legend="Level" options={levels} active={level} onChange={setLevel} />
        </div>
      </div>

      <p className="text-meta text-faint mt-5 font-mono" role="status" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'course' : 'courses'}
        {category || level ? ' matching' : ''}
      </p>

      {filtered.length > 0 ? (
        <div
          key={gridKey}
          className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {filtered.map((course) => (
            <div key={course.slug} role="listitem" className="filter-in h-full">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      ) : (
        <div className="border-hairline bg-surface mt-5 rounded-lg border border-dashed p-10 text-center">
          <SearchX
            size={28}
            aria-hidden="true"
            className="text-faint mx-auto"
            strokeWidth={1.5}
          />
          <p className="text-muted mt-4 max-w-[46ch]">
            No courses match that combination yet. Clear a filter, or{' '}
            <a
              href="/contact?type=training"
              className="text-ink decoration-hairline-strong hover:text-accent hover:decoration-accent underline underline-offset-[5px]"
            >
              tell us what you are looking for
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
