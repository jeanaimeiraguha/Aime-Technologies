import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type Tone = 'accent' | 'muted' | 'highlight';

const TONE: Record<Tone, string> = {
  accent: 'border-accent/40 bg-accent-wash text-accent',
  muted: 'border-hairline bg-transparent text-muted',
  highlight: 'border-highlight/40 bg-highlight-wash text-highlight',
};

export function Badge({
  tone = 'accent',
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[13px] font-medium',
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
