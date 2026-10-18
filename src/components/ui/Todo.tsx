import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * A visible marker for content that has not been confirmed yet.
 *
 * The site ships with real gaps — contact details, prices, schedules, results —
 * and the brief forbids inventing any of them. So instead of a plausible
 * placeholder that could survive to launch unnoticed, the gap is labelled in
 * place. The word "TODO" carries the meaning, not the colour, so this still
 * reads correctly without colour perception.
 *
 * Every one of these is listed in the checklist at the end of README.md.
 */
export function Todo({ children, className }: { children: ReactNode; className?: string }) {
  return (
    // `inline`, not `inline-flex`: when the marker wraps onto a second line an
    // inline box draws the dashed rule under each line fragment, where a flex
    // box would draw one rule under the whole block.
    <span
      className={cn(
        'text-meta text-accent font-mono',
        'border-accent/50 border-b border-dashed',
        className,
      )}
    >
      <span aria-hidden="true">TODO</span>
      <span className="sr-only">To do:</span> <span className="text-muted">{children}</span>
    </span>
  );
}

/**
 * Block-level version, for a whole missing section (a results table, a
 * screenshot set, an architecture diagram).
 */
export function TodoBlock({
  title,
  children,
  className,
}: {
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'border-accent/40 bg-accent-wash rounded-sm border border-dashed px-5 py-4',
        className,
      )}
    >
      <p className="text-meta text-accent font-mono tracking-[0.06em] uppercase">
        TODO — {title}
      </p>
      {children && <div className="text-meta text-muted mt-2 max-w-[62ch]">{children}</div>}
    </div>
  );
}
