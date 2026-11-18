import type { ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextLink } from '@/components/ui/TextLink';
import { cn } from '@/lib/cn';

export function Section({
  id,
  label,
  title,
  intro,
  action,
  children,
  heading = 'display',
  tone = 'paper',
  divider = true,
  density = 'normal',
  className,
}: {
  id?: string;
  label?: string;
  title?: ReactNode;
  intro?: ReactNode;
  action?: { label: string; href: string };
  children?: ReactNode;
  heading?: 'display' | 'plain' | 'bare';
  tone?: 'paper' | 'sunken';
  divider?: boolean;
  density?: 'normal' | 'tight';
  className?: string;
}) {
  const hasHeader = Boolean(label ?? title ?? intro ?? action);
  const py = density === 'tight' ? 'py-14' : 'py-20 md:py-28';

  return (
    <section
      id={id}
      className={cn(py, divider && tone !== 'sunken' && 'border-t border-hairline', className)}
      style={tone === 'sunken' ? { background: 'var(--surface-sunken)' } : undefined}
    >
      <Container>
        {/* display — qtglobal.rw: centered h4 label + centered h2 */}
        {hasHeader && heading === 'display' && (
          <div className={cn('text-center', Boolean(children) && 'mb-16')}>
            {label && <SectionLabel>{label}</SectionLabel>}
            {title && <h2>{title}</h2>}
            {intro && (
              <div className="mt-8" style={{ color: 'var(--ink-muted)', maxWidth: '600px', margin: '30px auto 0' }}>
                {intro}
              </div>
            )}
            {action && (
              <p className="mt-6">
                <TextLink href={action.href}>{action.label}</TextLink>
              </p>
            )}
          </div>
        )}

        {/* plain — label left, title + action */}
        {hasHeader && heading === 'plain' && (
          <div className={cn('flex flex-wrap items-start justify-between gap-x-10 gap-y-4', Boolean(children) && 'mb-10')}>
            <div className="flex-1 min-w-0">
              {label && <SectionLabel>{label}</SectionLabel>}
              {title && <h2 className="mt-2">{title}</h2>}
              {intro && <div className="mt-4" style={{ color: 'var(--ink-muted)' }}>{intro}</div>}
            </div>
            {action && (
              <div className="shrink-0 pt-1">
                <TextLink href={action.href}>{action.label}</TextLink>
              </div>
            )}
          </div>
        )}

        {/* bare — label + action only */}
        {hasHeader && heading === 'bare' && (
          <div className={cn('flex flex-wrap items-center justify-between gap-x-8 gap-y-3', Boolean(children) && 'mb-8')}>
            {label && <SectionLabel>{label}</SectionLabel>}
            {title && <h2 className="sr-only">{title}</h2>}
            {action && <TextLink href={action.href}>{action.label}</TextLink>}
          </div>
        )}

        {children}
      </Container>
    </section>
  );
}
