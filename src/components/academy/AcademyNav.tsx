'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/cn';

const LINKS = [
  { href: '/academy', label: 'Courses' },
  { href: '/academy/internships', label: 'Internships' },
  { href: '/academy/training', label: 'Training' },
  { href: '/academy/mentorship', label: 'Mentorship' },
  { href: '/academy/apply', label: 'Apply' },
];

/** Sub-navigation for Academy section pages. */
export function AcademyNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Academy"
      className="border-hairline bg-surface sticky top-14 z-30 border-b md:top-[73px]"
    >
      <div className="mx-auto flex max-w-[1200px] gap-1 overflow-x-auto px-4 py-2 md:px-6">
        {LINKS.map((link) => {
          const active =
            link.href === '/academy'
              ? pathname === '/academy'
              : pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'tap text-meta hover:text-accent shrink-0 rounded-xs px-3 py-2 font-mono tracking-[0.06em] uppercase',
                active
                  ? 'bg-accent-wash text-ink decoration-accent underline underline-offset-[5px]'
                  : 'text-muted',
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
