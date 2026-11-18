import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * One surface: card token background, hairline border, violet edge on hover.
 * `interactive: false` keeps it flat (for cards that contain their own links).
 */
export function Card({
  as: Tag = 'div',
  interactive = true,
  className,
  children,
}: {
  as?: ElementType;
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn('card', interactive ? '' : 'hover:transform-none', className)}>
      {children}
    </Tag>
  );
}
