import type { ReactNode } from 'react';

import { Check } from 'lucide-react';

import { cn } from '@/lib/cn';

/**
 * Plain lists, hairline-separated. These replace the icon-card grid everywhere
 * the site enumerates something.
 */

/** Short items marked with a violet check. Used for teaching principles. */
export function CheckList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <ul className={cn('space-y-3', className)}>
      {items.map((item) => (
        <li key={item} className="text-muted flex gap-3">
          <Check
            size={16}
            aria-hidden="true"
            className="text-accent mt-1.5 shrink-0"
            strokeWidth={2.5}
          />
          <span className="max-w-[52ch]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Short items marked with an en dash. Used for deliverables, prerequisites. */
export function DashList({
  items,
  className,
  columns = 1,
}: {
  items: readonly string[];
  className?: string;
  columns?: 1 | 2;
}) {
  if (items.length === 0) return null;

  return (
    <ul
      className={cn(
        'space-y-2.5',
        columns === 2 && 'sm:columns-2 sm:space-y-0 sm:gap-x-10',
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            'text-muted relative pl-5',
            columns === 2 && 'sm:mb-2.5 sm:break-inside-avoid',
          )}
        >
          <span aria-hidden="true" className="text-faint absolute left-0">
            –
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Numbered list with mono markers. Used for "how we work". */
export function StepList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <ol className={cn('divide-hairline border-hairline divide-y border-t', className)}>
      {items.map((item, index) => (
        <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-4">
          <span className="text-meta text-faint font-mono" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-muted max-w-[62ch]">{item}</span>
        </li>
      ))}
    </ol>
  );
}

/**
 * Name plus one concrete line, hairline-separated. Used for industries and
 * values — the shape a card grid would otherwise take.
 */
export function NotedList({
  items,
  className,
  headingLevel: Heading = 'h3',
}: {
  items: readonly { name?: string; title?: string; note?: string; body?: string }[];
  className?: string;
  headingLevel?: 'h3' | 'h4';
}) {
  return (
    <ul className={cn('divide-hairline border-hairline divide-y border-y', className)}>
      {items.map((item) => {
        const name = item.name ?? item.title ?? '';
        const note = item.note ?? item.body;
        return (
          <li key={name} className="grid gap-x-8 gap-y-2 py-6 md:grid-cols-12">
            <Heading className="md:col-span-4">{name}</Heading>
            {note && <p className="text-muted max-w-[58ch] md:col-span-7">{note}</p>}
          </li>
        );
      })}
    </ul>
  );
}

/** A labelled block of running text. Used for the three "what we do" columns. */
export function TextColumn({
  label,
  title,
  children,
  footer,
  className,
}: {
  label?: string;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <span className="text-meta text-faint font-mono tracking-[0.08em] uppercase">
          {label}
        </span>
      )}
      <h3 className={cn('text-lead', label && 'mt-3')}>{title}</h3>
      <div className="text-muted mt-3 max-w-[48ch] grow">{children}</div>
      {footer && <div className="mt-5">{footer}</div>}
    </div>
  );
}
