import { cn } from '@/lib/cn';

export function SectionLabel({ children, className }: { children: string; className?: string }) {
  return <h4 className={cn('section-label-text mb-4', className)}>{children}</h4>;
}
