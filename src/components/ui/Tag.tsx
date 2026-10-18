import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Mono metadata chip: stack entries, levels, formats, categories.
 * A hairline box, not a filled pill.
 */
export function Tag({
  children,
  className,
  tone = 'default',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'accent';
}) {
  return (
    <span
      className={cn(
        'text-meta inline-flex items-center rounded-xs border px-2 py-0.5 font-mono',
        tone === 'accent'
          ? 'border-accent/40 bg-accent-wash text-accent'
          : 'border-hairline text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A row of tags with consistent spacing. */
export function TagList({
  items,
  className,
  label,
}: {
  items: readonly string[];
  className?: string;
  label?: string;
}) {
  if (items.length === 0) return null;

  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)} aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
