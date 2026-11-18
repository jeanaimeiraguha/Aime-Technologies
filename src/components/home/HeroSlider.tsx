'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { LocalTime } from '@/components/home/LocalTime';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';

const INTERVAL = 7000;

const SLIDES = [
  {
    id: 'build',
    heading: (
      <>
        We develop, build and deploy cutting-edge{' '}
        <span className="hero-accent">digital solutions</span>.
      </>
    ),
    body: 'Eighteen service lines covering the whole build — interface, API, data, firmware, deployment, and the security review that happens before launch.',
    primary: { label: 'Explore services', href: '/services' },
    secondary: { label: 'Start a project', href: '/contact?type=quote' },
  },
  {
    id: 'work',
    heading: (
      <>
        Software that survives contact with <span className="hero-accent">real users</span>.
      </>
    ),
    body: 'School ERPs, payment flows, face recognition, exam grading and IoT monitoring — built for mid-range phones and connections that come and go.',
    primary: { label: 'See our work', href: '/work' },
    secondary: { label: 'How we work', href: '/about' },
  },
  {
    id: 'academy',
    heading: (
      <>
        We teach the way we learned — by <span className="hero-accent">building something</span>{' '}
        that has to work.
      </>
    ),
    body: 'Nine courses in software engineering, embedded systems, IoT and AI/ML. Live classes, recorded lessons, mentorship, and projects you keep.',
    primary: { label: 'Browse the academy', href: '/academy' },
    secondary: { label: 'Talk to us', href: '/contact' },
  },
] as const;

/**
 * The hero headline carousel — one visible slide at a time, dots underneath,
 * auto-advance. Slides share a grid cell so the section never jumps height,
 * and inactive slides are aria-hidden + inert to keep their links out of the
 * tab order.
 */
export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, INTERVAL);

    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div className="relative">
      <p
        className="text-faint font-semibold tracking-[0.18em] uppercase"
        style={{ fontSize: '13px' }}
      >
        {site.location.short}
        <span className="mx-3" aria-hidden="true">
          ·
        </span>
        <LocalTime />
      </p>

      <div
        className="mt-7 grid"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {SLIDES.map((slide, index) => {
          const isActive = index === active;
          return (
            <div
              key={slide.id}
              className={cn(
                'col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                isActive
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-4 opacity-0',
              )}
              style={{ transitionDelay: isActive ? '80ms' : '0ms' }}
              aria-hidden={!isActive}
              inert={!isActive}
            >
              <h1 className="max-w-[19ch] text-balance">{slide.heading}</h1>

              <p className="text-muted mt-6 max-w-[54ch] text-[1.0625rem] leading-[1.75]">
                {slide.body}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href={slide.primary.href} className="btn-primary">
                  {slide.primary.label}
                  <span aria-hidden="true" style={{ marginLeft: '6px' }}>
                    →
                  </span>
                </Link>
                <Link href={slide.secondary.href} className="btn-outline">
                  {slide.secondary.label}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex items-center gap-3" role="tablist" aria-label="Hero slides">
        {SLIDES.map((slide, index) => {
          const isActive = index === active;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Show slide ${index + 1} of ${SLIDES.length}`}
              onClick={() => setActive(index)}
              className={cn(
                'relative h-2.5 overflow-hidden rounded-full transition-all duration-300',
                isActive ? 'bg-accent-wash w-12' : 'bg-hairline-strong hover:bg-accent w-2.5',
              )}
            >
              {isActive && (
                <span
                  key={`${slide.id}-${active}`}
                  aria-hidden="true"
                  className="bg-accent absolute inset-0 origin-left rounded-full"
                  style={{ animation: `hero-dot ${INTERVAL}ms linear forwards` }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
