import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Vertical timeline with a hairline rail and violet nodes. Used for process
 * steps and company history — decorative rail only, semantic markup inside.
 */
export function Timeline({
  items,
  className,
}: {
  items: {
    id?: string;
    /** Left column: year, phase name, date. */
    aside?: ReactNode;
    title: ReactNode;
    body?: ReactNode;
  }[];
  className?: string;
}) {
  return (
    <ol className={cn('border-hairline relative border-l pl-8 md:pl-12', className)}>
      {items.map((item, index) => (
        <li key={item.id ?? index} className="relative pb-10 last:pb-0">
          <span
            aria-hidden="true"
            className="border-paper bg-accent absolute top-1.5 -left-[7px] h-3.5 w-3.5 rounded-full ring-4 ring-[var(--accent-wash)] md:-left-[9px] md:h-4 md:w-4"
          />
          {item.aside && (
            <div className="text-faint text-meta mb-1.5 font-mono">{item.aside}</div>
          )}
          <h3 className="text-[1.25rem]">{item.title}</h3>
          {item.body && (
            <div className="text-muted mt-2 max-w-[62ch] text-[15px] leading-relaxed">
              {item.body}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
