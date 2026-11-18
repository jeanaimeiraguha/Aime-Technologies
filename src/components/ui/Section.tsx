import type { ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
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
      className={cn(py, divider && tone !== 'sunken' && 'border-hairline border-t', className)}
      style={tone === 'sunken' ? { background: 'var(--surface-sunken)' } : undefined}
    >
      <Container>
        {hasHeader && (
          <div
            className={cn(
              heading === 'display' && Boolean(children) && 'mb-16',
              heading === 'plain' && Boolean(children) && 'mb-10',
            )}
          >
            <SectionHeader
              variant={heading}
              label={label}
              title={title}
              intro={intro}
              action={action}
            />
          </div>
        )}

        {children}
      </Container>
    </section>
  );
}
