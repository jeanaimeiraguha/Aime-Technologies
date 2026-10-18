import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Horizontal frame for every page. ~1200px, with a gutter that does not
 * collapse on small screens.
 */
export function Container({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'header' | 'footer' | 'nav' | 'section';
}) {
  return (
    <Tag className={cn('max-w-content mx-auto w-full px-5 sm:px-8 lg:px-12', className)}>
      {children}
    </Tag>
  );
}
