import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type Arrow = 'right' | 'down' | 'external' | 'none';

const GLYPH: Record<Arrow, string> = {
  right: '→',
  down: '↓',
  external: '↗',
  none: '',
};

/**
 * The site's primary link style: a real underline with offset, accent on hover,
 * and an arrow as a text glyph rather than an icon.
 *
 * The glyph is wrapped in its own span with a non-breaking space before it, so
 * the arrow never wraps onto a line of its own.
 */
export function TextLink({
  href,
  children,
  arrow = 'right',
  external,
  className,
  'aria-label': ariaLabel,
}: {
  href: string;
  children: ReactNode;
  arrow?: Arrow;
  external?: boolean;
  className?: string;
  'aria-label'?: string;
}) {
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  const resolvedArrow: Arrow = arrow === 'right' && isExternal ? 'external' : arrow;

  const classes = cn(
    // `tap` grows the hit area on touch devices only — see globals.css.
    'tap text-ink underline decoration-hairline-strong decoration-1 underline-offset-[5px]',
    'hover:text-accent hover:decoration-accent focus-visible:text-accent',
    className,
  );

  const content = (
    <>
      {children}
      {resolvedArrow !== 'none' && (
        <span aria-hidden="true" className="whitespace-nowrap">
          {' '}
          {GLYPH[resolvedArrow]}
        </span>
      )}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
