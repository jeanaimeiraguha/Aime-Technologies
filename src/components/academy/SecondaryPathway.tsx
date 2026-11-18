'use client';

import { useState } from 'react';

import {
  educationCategories,
  secondaryCombinations,
  secondaryCourses,
  secondaryLevels,
  secondaryLevelsMeta,
} from '@/content/academy/pathways';
import { cn } from '@/lib/cn';

/**
 * Secondary school pathway: S4–S6, combination, and technology courses.
 * Non-interactive when `selected` is controlled by the application wizard.
 */
export function SecondaryPathway({
  compact = false,
  selectedLevel,
  selectedCombination,
  selectedCourses = [],
  onLevelChange,
  onCombinationChange,
  onCoursesChange,
}: {
  compact?: boolean;
  selectedLevel?: string;
  selectedCombination?: string;
  selectedCourses?: string[];
  onLevelChange?: (level: string) => void;
  onCombinationChange?: (combo: string) => void;
  onCoursesChange?: (courses: string[]) => void;
}) {
  const [localLevel, setLocalLevel] = useState('S4');
  const [localCombo, setLocalCombo] = useState('MPC');
  const [localCourses, setLocalCourses] = useState<string[]>([]);

  const level = selectedLevel ?? localLevel;
  const combo = selectedCombination ?? localCombo;
  const courses = onCoursesChange ? selectedCourses : localCourses;

  function setLevel(value: string) {
    if (onLevelChange) onLevelChange(value);
    else setLocalLevel(value);
  }
  function setCombo(value: string) {
    if (onCombinationChange) onCombinationChange(value);
    else setLocalCombo(value);
  }
  function toggleCourse(name: string) {
    const next = courses.includes(name)
      ? courses.filter((c) => c !== name)
      : [...courses, name];
    if (onCoursesChange) onCoursesChange(next);
    else setLocalCourses(next);
  }

  const meta = secondaryLevelsMeta[level as keyof typeof secondaryLevelsMeta] ?? '';

  return (
    <div className="space-y-8">
      <div>
        <p className="text-meta text-faint mb-3 font-mono tracking-[0.06em] uppercase">Level</p>
        <div className="flex flex-wrap gap-2">
          {secondaryLevels.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={level === item.value}
              onClick={() => setLevel(item.value)}
              className={cn(
                'tap text-meta rounded-xs border px-4 py-2 font-mono tracking-[0.06em] uppercase',
                level === item.value
                  ? 'border-accent bg-accent-wash text-ink'
                  : 'border-hairline-strong text-muted bg-surface hover:text-accent',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="text-muted mt-3 max-w-[60ch] text-sm leading-relaxed">{meta}</p>
      </div>

      <div>
        <p className="text-meta text-faint mb-3 font-mono tracking-[0.06em] uppercase">Combination</p>
        <div className="flex flex-wrap gap-2">
          {secondaryCombinations.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={combo === item.value}
              onClick={() => setCombo(item.value)}
              className={cn(
                'tap text-meta rounded-xs border px-4 py-2 font-mono tracking-[0.06em] uppercase',
                combo === item.value
                  ? 'border-accent bg-accent-wash text-ink'
                  : 'border-hairline-strong text-muted bg-surface hover:text-accent',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-meta text-faint mb-3 font-mono tracking-[0.06em] uppercase">
          Technology courses
        </p>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {secondaryCourses.map((name) => {
            const active = courses.includes(name);
            return (
              <li key={name}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleCourse(name)}
                  className={cn(
                    'tap flex w-full items-center gap-3 rounded-xs border px-4 py-3 text-left text-sm',
                    active
                      ? 'border-accent bg-accent-wash text-ink'
                      : 'border-hairline-strong text-muted bg-surface hover:text-ink',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'border-hairline-strong inline-block h-3.5 w-3.5 shrink-0 rounded-[2px] border',
                      active && 'bg-accent border-accent',
                    )}
                  />
                  {name}
                </button>
              </li>
            );
          })}
        </ul>
        {!compact && (
          <p className="text-meta text-faint mt-3 font-mono">
            {courses.length} course{courses.length === 1 ? '' : 's'} selected
          </p>
        )}
      </div>

      {!compact && (
        <div>
          <p className="text-meta text-faint mb-3 font-mono tracking-[0.06em] uppercase">
            Education category
          </p>
          <ul className="flex flex-wrap gap-2">
            {educationCategories.map((cat) => (
              <li
                key={cat.value}
                className="text-meta text-muted border-hairline rounded-xs border px-3 py-1.5 font-mono"
              >
                {cat.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
