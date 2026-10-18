import type { ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { cn } from '@/lib/cn';

/**
 * The top of every page below the home page. Left-aligned, asymmetric: label
 * and meta in the narrow column, title and lead offset into the wide one.
 */
export function PageHeader({
  label,
  title,
  lead,
  meta,
  aside,
  className,
}: {
  label: string;
  title: string;
  lead?: ReactNode;
  /** Mono key/value pairs under the label, e.g. year, category, duration. */
  meta?: { label: string; value: ReactNode }[];
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn('pt-12 pb-16 md:pt-20 md:pb-24', className)}>
      <Container>
        <div className="grid gap-x-8 gap-y-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <SectionLabel>{label}</SectionLabel>

            {meta && meta.length > 0 && (
              <dl className="border-hairline mt-6 space-y-2.5 border-t pt-5">
                {meta.map((item) => (
                  <div key={item.label} className="text-meta font-mono">
                    <dt className="text-faint">{item.label}</dt>
                    <dd className="text-ink mt-0.5">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="md:col-span-8 md:col-start-4">
            <h1 className="text-hero max-w-[28ch] text-balance">{title}</h1>
            {lead && <div className="text-lead text-muted mt-6 max-w-[62ch]">{lead}</div>}
            {aside && <div className="mt-8">{aside}</div>}
          </div>
        </div>
      </Container>
    </header>
  );
}
