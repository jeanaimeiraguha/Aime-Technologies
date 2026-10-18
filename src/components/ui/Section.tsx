import type { ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextLink } from '@/components/ui/TextLink';
import { cn } from '@/lib/cn';

/**
 * A page section.
 *
 * The important prop here is `heading`. An earlier version gave every section
 * the same shape — mono label top-left, display title indented into the same
 * column, list below — and eight of those in a row made the page read as
 * generated rather than designed. Nothing was wrong with any single section;
 * the problem was that they were all the same one.
 *
 * So the header now has three weights, and a page is expected to mix them:
 *
 *   display  a real statement, used two or three times at most
 *   plain    title at body scale, sitting on the label line — quieter
 *   bare     label only, when the content explains itself
 *
 * `tone="sunken"` additionally breaks the page with a full-bleed band of the
 * sunken surface, which is the other thing a long paper-coloured page needs.
 */
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

  const padding = density === 'tight' ? 'py-12 md:py-16' : 'py-16 md:py-24 lg:py-28';

  return (
    <section
      id={id}
      className={cn(
        padding,
        tone === 'sunken'
          ? 'bg-sunken border-hairline border-y'
          : divider && 'border-hairline border-t',
        className,
      )}
    >
      <Container>
        {hasHeader && heading === 'bare' && (
          <div
            className={cn(
              'flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3',
              Boolean(children) && 'mb-8',
            )}
          >
            {label && <SectionLabel>{label}</SectionLabel>}
            {title && <h2 className="sr-only">{title}</h2>}
            {action && <TextLink href={action.href}>{action.label}</TextLink>}
          </div>
        )}

        {hasHeader && heading === 'plain' && (
          <div
            className={cn(
              'grid gap-x-8 gap-y-3 md:grid-cols-12 md:items-baseline',
              Boolean(children) && 'mb-10',
            )}
          >
            {label && (
              <div className="md:col-span-3">
                <SectionLabel>{label}</SectionLabel>
              </div>
            )}
            <div className="md:col-span-8 md:col-start-4">
              {title && <h2 className="text-lead max-w-[46ch]">{title}</h2>}
              {intro && <div className="text-muted mt-3 max-w-[62ch]">{intro}</div>}
              {action && (
                <p className="mt-4">
                  <TextLink href={action.href}>{action.label}</TextLink>
                </p>
              )}
            </div>
          </div>
        )}

        {hasHeader && heading === 'display' && (
          <div
            className={cn(
              'grid gap-x-8 gap-y-5 md:grid-cols-12',
              Boolean(children) && 'mb-12 md:mb-14',
            )}
          >
            {label && (
              <div className="md:col-span-3 md:pt-3">
                <SectionLabel>{label}</SectionLabel>
              </div>
            )}

            {(title ?? intro ?? action) && (
              <div className={cn('md:col-span-8', label ? 'md:col-start-4' : 'md:col-start-1')}>
                {title && <h2 className="text-title max-w-[26ch] text-balance">{title}</h2>}
                {intro && (
                  <div className={cn('text-muted max-w-[58ch]', Boolean(title) && 'mt-5')}>
                    {intro}
                  </div>
                )}
                {action && (
                  <p className={cn((title ?? intro) ? 'mt-6' : '')}>
                    <TextLink href={action.href}>{action.label}</TextLink>
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {children}
      </Container>
    </section>
  );
}
