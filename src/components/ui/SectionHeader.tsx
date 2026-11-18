import type { ReactNode } from 'react';

import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextLink } from '@/components/ui/TextLink';
import { cn } from '@/lib/cn';

/**
 * Section heading in three arrangements: centered display, split plain,
 * or a bare label+action row. Shared by `Section` and hand-rolled sections.
 */
export function SectionHeader({
  variant = 'display',
  label,
  title,
  intro,
  action,
  className,
  titleAs: TitleTag = 'h2',
}: {
  variant?: 'display' | 'plain' | 'bare';
  label?: string;
  title?: ReactNode;
  intro?: ReactNode;
  action?: { label: string; href: string };
  className?: string;
  titleAs?: 'h2' | 'h3';
}) {
  if (variant === 'bare') {
    return (
      <div
        className={cn(
          'mb-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-3',
          className,
        )}
      >
        {label && <SectionLabel>{label}</SectionLabel>}
        {title && <TitleTag className="sr-only">{title}</TitleTag>}
        {action && <TextLink href={action.href}>{action.label}</TextLink>}
      </div>
    );
  }

  if (variant === 'plain') {
    return (
      <div
        className={cn('flex flex-wrap items-start justify-between gap-x-10 gap-y-4', className)}
      >
        <div className="min-w-0 flex-1">
          {label && <SectionLabel>{label}</SectionLabel>}
          {title && <TitleTag className={cn(label && 'mt-2')}>{title}</TitleTag>}
          {intro && <div className="text-muted mt-4">{intro}</div>}
        </div>
        {action && (
          <div className="shrink-0 pt-1">
            <TextLink href={action.href}>{action.label}</TextLink>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('text-center', className)}>
      {label && <SectionLabel>{label}</SectionLabel>}
      {title && <TitleTag>{title}</TitleTag>}
      {intro && <div className="text-muted mx-auto mt-8 max-w-[600px]">{intro}</div>}
      {action && (
        <p className="mt-6">
          <TextLink href={action.href}>{action.label}</TextLink>
        </p>
      )}
    </div>
  );
}
