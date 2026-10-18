import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type Variant = 'primary' | 'outline';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-xs border px-4 py-2.5 ' +
  'font-mono text-meta tracking-[0.04em] uppercase whitespace-nowrap ' +
  'disabled:cursor-not-allowed disabled:opacity-50';

const VARIANTS: Record<Variant, string> = {
  // Solid text-colour background, inverted label. No pills, no gradients.
  primary:
    'border-ink bg-ink text-paper hover:border-accent hover:bg-accent hover:text-paper ' +
    'disabled:hover:border-ink disabled:hover:bg-ink',
  outline:
    'border-hairline-strong bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper ' +
    'disabled:hover:border-hairline-strong disabled:hover:bg-transparent disabled:hover:text-ink',
};

function classesFor(variant: Variant, className?: string) {
  return cn(BASE, VARIANTS[variant], className);
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={classesFor(variant, className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = 'primary',
  className,
  children,
  external,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  external?: boolean;
}) {
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classesFor(variant, className)}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classesFor(variant, className)}>
      {children}
    </Link>
  );
}
