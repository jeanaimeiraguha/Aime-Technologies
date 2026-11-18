import type { ReactNode } from 'react';

import { CountUp } from '@/components/home/CountUp';
import { cn } from '@/lib/cn';

/**
 * One figure in the stats band: display-font number, muted label, a violet→amber
 * rule that sweeps in when the parent `.reveal` enters view.
 */
export function Stat({
  value,
  suffix = '',
  label,
  className,
}: {
  value: number;
  suffix?: string;
  label: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('stat-card', className)}>
      <div className="stat-card__value">
        <CountUp value={value} suffix={suffix} />
      </div>
      <p className="stat-card__label">{label}</p>
      <span className="stat-card__rule" aria-hidden="true" />
    </div>
  );
}
