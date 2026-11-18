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
    <nav
      aria-label="Academy"
      className="border-hairline bg-surface sticky top-14 z-30 border-b md:top-[73px]"
    >
      <div ref={containerRef} className="relative mx-auto max-w-[1200px] px-4 py-2 md:px-6">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-controls="academy-menu"
          className={cn(
            'tap text-meta hover:text-accent flex w-full items-center justify-between gap-2 rounded-xs px-3 py-2 font-mono tracking-[0.06em] uppercase transition-colors md:w-auto',
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
            className="border-hairline bg-surface absolute right-4 left-4 z-40 mt-1 overflow-hidden rounded-xs border shadow-lg md:right-auto md:left-6 md:w-64"
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
