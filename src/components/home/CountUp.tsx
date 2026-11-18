'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * `useLayoutEffect` warns during SSR, and this component is rendered on the
 * server like any other. The branch is resolved at module load, so the server
 * gets `useEffect` and the browser gets the layout effect that prevents a
 * one-frame flash of the finished figure.
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Counts from zero to `value` the first time it scrolls into view.
 *
 * The final number is what the server renders, so the figure is in the HTML
 * for search engines and for a browser with JavaScript off. The reset to zero
 * happens in a layout effect — before paint — so there is no flash of the
 * finished figure followed by a jump back to the start.
 */
export function CountUp({
  value,
  suffix = '',
  prefix = '',
  duration = 1500,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    setDisplay(0);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    let frame = 0;

    const run = () => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        // Ease-out expo: most of the movement happens in the first third,
        // which reads as the number settling rather than crawling.
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setDisplay(Math.round(value * eased));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    if (typeof IntersectionObserver === 'undefined') {
      run();
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {display.toLocaleString('en-GB')}
        {suffix}
      </span>
    </span>
  );
}
