import type { ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { cn } from '@/lib/cn';

/**
 * A heavier page opening than PageHeader: eyebrow, oversized title, lead, and
 * optional actions, on the page's first band. Used where a page needs visual
 * weight (services index, academy, work index).
 */
export function PageHero({
  label,
  title,
  lead,
  actions,
  meta,
  tone = 'paper',
  className,
}: {
  label: string;
  title: string;
  lead?: ReactNode;
  actions?: ReactNode;
  /** Small mono row under the lead — counts, categories. */
  meta?: ReactNode;
  tone?: 'paper' | 'dark';
  className?: string;
}) {
  return (
    <header
      className={cn(
        'relative overflow-hidden pt-16 pb-14 md:pt-24 md:pb-20',
        tone === 'dark' && 'band-dark bg-[#151327]',
        className,
      )}
    >
      {tone === 'paper' && (
        <div
          aria-hidden="true"
          className="glow-radial pointer-events-none absolute inset-0 opacity-70"
          style={{ '--glow-y': '-20%' } as React.CSSProperties}
        />
      )}

      <Container className="relative">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="text-hero mt-4 max-w-[20ch] text-balance">{title}</h1>
        {lead && <div className="text-lead text-muted mt-6 max-w-[58ch]">{lead}</div>}
        {actions && <div className="mt-8 flex flex-wrap items-center gap-4">{actions}</div>}
        {meta && <div className="border-hairline mt-10 border-t pt-6">{meta}</div>}
      </Container>
    </header>
  );
}
