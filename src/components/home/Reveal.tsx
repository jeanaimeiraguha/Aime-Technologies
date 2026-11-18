'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';

import { cn } from '@/lib/cn';

/**
 * Fade-and-rise on first entry into the viewport.
 *
 * The element ships in its hidden state, so a visitor who arrives mid-page
 * never sees content pop in after it has already been read. Two escape
 * hatches keep that from becoming a content-loss risk: `prefers-reduced-motion`
 * and `scripting: none` both force the visible state from CSS, and the
 * observer fires immediately for anything already on screen.
 *
 * `delay` staggers a row of siblings without needing a second component —
 * it is handed to CSS as `--reveal-delay`, so the timing lives in one place.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      // Async so the effect body never calls setState synchronously.
      const id = window.setTimeout(() => setShown(true), 0);
      return () => window.clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties = { '--reveal-delay': `${delay}ms` } as CSSProperties;

  return (
    <Tag ref={ref} className={cn('reveal', shown && 'is-in', className)} style={style}>
      {children}
    </Tag>
  );
}
