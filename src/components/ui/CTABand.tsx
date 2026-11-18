import type { ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { cn } from '@/lib/cn';

/**
 * Closing call-to-action band: always dark indigo (independent of theme),
 * centered heading, copy, and a row of actions.
 */
export function CTABand({
  label = 'Start here',
  title,
  body,
  actions,
  className,
}: {
  label?: string;
  title: ReactNode;
  body?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'band-dark relative overflow-hidden bg-[#151327] py-20 md:py-28',
        className,
      )}
    >
      <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-40 blur-[110px]"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.55), transparent 70%)',
        }}
      />

      <Container className="relative text-center">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mx-auto mt-3 max-w-[22ch] text-balance">{title}</h2>
        {body && (
          <div className="mx-auto mt-6 max-w-[56ch] text-[17px] leading-relaxed text-[#b9b5d4]">
            {body}
          </div>
        )}
        {actions && (
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">{actions}</div>
        )}
      </Container>
    </section>
  );
}
