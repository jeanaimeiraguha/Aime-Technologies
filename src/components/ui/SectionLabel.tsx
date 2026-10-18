import { cn } from '@/lib/cn';

/**
 * `01 — Services`. Mono, small, muted, uppercase-ish by letterform rather than
 * by transform, so the em dash and digits keep their shape.
 */
export function SectionLabel({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'text-meta text-muted block font-mono tracking-[0.08em] uppercase',
        className,
      )}
    >
      {children}
    </span>
  );
}
