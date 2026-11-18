import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * The rounded icon plate used by service and sector cards. Must sit inside a
 * `.group` for the hover lift in globals.css to fire.
 */
export function IconTile({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span className={cn('icon-tile', className)} aria-hidden="true">
      <Icon size={26} strokeWidth={1.75} />
    </span>
  );
}

/** Fallback tile when there is no lucide icon — a single glyph. */
export function IconGlyph({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn('icon-tile font-display text-lg font-semibold', className)}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
