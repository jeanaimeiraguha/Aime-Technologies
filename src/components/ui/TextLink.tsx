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
    'tap text-accent decoration-accent/40 hover:decoration-accent underline underline-offset-[5px] decoration-1 transition-all duration-300',
    className,
  );

  const content = (
    <>
      {children}
      {resolvedArrow !== 'none' && (
        <span aria-hidden="true" className="whitespace-nowrap">
          {' '}
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
