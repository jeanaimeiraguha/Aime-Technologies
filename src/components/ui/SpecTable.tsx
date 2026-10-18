import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Monospace specification table — the one visual device borrowed from
 * datasheets. Used for course metadata, case-study stacks and hardware specs.
 *
 * It is a definition list rather than a <table>: these are key/value pairs, not
 * tabular data, and a screen reader announces them better this way.
 */
export function SpecTable({
  rows,
  className,
  dense = false,
}: {
  rows: readonly { label: string; value: ReactNode }[];
  className?: string;
  dense?: boolean;
}) {
  const visible = rows.filter((row) => row.value !== null && row.value !== undefined);
  if (visible.length === 0) return null;

  return (
    <dl
      className={cn(
        'divide-hairline border-hairline text-meta divide-y border-y font-mono',
        className,
      )}
    >
      {visible.map((row) => (
        <div
          key={row.label}
          className={cn(
            'grid grid-cols-[minmax(6.5rem,10rem)_1fr] gap-x-4',
            dense ? 'py-2' : 'py-3',
          )}
        >
          <dt className="text-faint">{row.label}</dt>
          <dd className="text-ink">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Schematic-style divider: a hairline with a short mono label sitting on it,
 * the way a pinout drawing labels a bus. Used sparingly, on hardware pages.
 */
export function SchematicDivider({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn('flex items-center gap-4', className)} aria-hidden="true">
      <span className="text-meta text-faint font-mono tracking-[0.1em] uppercase">{label}</span>
      <span className="bg-hairline h-px grow" />
      <span className="text-meta text-faint font-mono">·</span>
    </div>
  );
}
