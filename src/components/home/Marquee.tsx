import type { CSSProperties } from 'react';

import { cn } from '@/lib/cn';

/**
 * Infinite horizontal strip — the "Our Partners" band from the reference site,
 * pointed at the stack instead of at vendor logos we do not have rights to.
 *
 * The track holds the list twice and translates by exactly -50%, so the loop
 * has no seam. The duplicate copy is hidden from assistive technology and the
 * whole strip is paired with a real list for anyone who cannot see it, because
 * a moving wall of text is unusable as a way to read the items.
 */
export function Marquee({
  items,
  duration = 45,
  className,
  label = 'Technologies we work with',
}: {
  items: readonly string[];
  duration?: number;
  className?: string;
  label?: string;
}) {
  if (items.length === 0) return null;

  const group = (copy: number) => (
    <ul
      className="marquee__group"
      aria-hidden={copy === 1 ? true : undefined}
      key={copy}
    >
      {items.map((item) => (
        <li key={`${copy}-${item}`} className="flex items-center">
          <span className="px-7 text-[1.0625rem] font-semibold whitespace-nowrap text-ink/85">
            {item}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--label-color)] opacity-70" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn('marquee', className)}>
      <p className="sr-only">{label}</p>
      <div
        className="marquee__track py-1"
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        {group(0)}
        {group(1)}
      </div>
    </div>
  );
}
