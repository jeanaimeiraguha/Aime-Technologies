'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/cn';

const LINKS = [
  { href: '/academy', label: 'Courses' },
  { href: '/academy/internships', label: 'Internships' },
  { href: '/academy/training', label: 'Training' },
  { href: '/academy/mentorship', label: 'Mentorship' },
  { href: '/academy/apply', label: 'Apply' },
];

/** Sub-navigation for Academy section pages — a dropdown instead of inline links. */
export function AcademyNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current =
    [...LINKS]
      .reverse()
      .find((link) =>
        link.href === '/academy' ? pathname === '/academy' : pathname.startsWith(link.href),
      ) ?? LINKS[0]!;

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    // `top` reads the header height rather than restating it: the two values
    // had drifted to 56px here against a 74px header, which parked this bar
    // 18px up behind it on mobile. The inner frame now matches `Container`,
    // so the control lines up with the page content underneath it instead of
    // sitting on its own margin.
    <nav
      aria-label="Academy"
      className="border-hairline bg-surface sticky top-[var(--header-h)] z-30 border-b"
    >
      <div
        ref={containerRef}
        className="max-w-content relative mx-auto w-full px-5 py-2 sm:px-8 lg:px-12"
      >
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-controls="academy-menu"
          className={cn(
            // -ml-3 cancels the button's own padding so the label sits on the
            // container's left edge, in line with the page content below.
            'tap text-meta hover:text-accent -ml-3 flex w-full items-center justify-between gap-2 rounded-xs px-3 py-2 font-mono tracking-[0.06em] uppercase transition-colors md:w-auto',
            open ? 'bg-accent-wash text-ink' : 'text-muted',
          )}
        >
          {current.label}
          <span aria-hidden="true" className={cn('transition-transform', open && 'rotate-180')}>
            ▾
          </span>
        </button>

        {open && (
          <ul
            id="academy-menu"
            role="menu"
            className="border-hairline bg-surface absolute right-5 left-5 z-40 mt-1 overflow-hidden rounded-xs border shadow-lg sm:right-8 sm:left-8 md:right-auto md:w-64 lg:left-12"
          >
            {LINKS.map((link) => {
              const active =
                link.href === '/academy'
                  ? pathname === '/academy'
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <li key={link.href} role="none">
                  <Link
                    role="menuitem"
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'tap text-meta hover:text-accent hover:bg-accent-wash block px-3 py-2.5 font-mono tracking-[0.06em] uppercase transition-colors',
                      active
                        ? 'bg-accent-wash text-ink decoration-accent underline underline-offset-[5px]'
                        : 'text-muted',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
}
