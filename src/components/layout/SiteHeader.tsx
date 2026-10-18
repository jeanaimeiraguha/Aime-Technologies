'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';

import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Container } from '@/components/ui/Container';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';

/**
 * Scroll position is external state, read rather than mirrored into an effect.
 * The snapshot is a boolean, so React only re-renders when the threshold is
 * actually crossed — scrolling itself costs nothing.
 */
function subscribeToScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

function hasScrolled() {
  return window.scrollY > 4;
}

function hasScrolledOnServer() {
  return false;
}

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, hasScrolled, hasScrolledOnServer);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // The menu belongs to the page it was opened on, so navigating closes it
  // without an effect: the open flag simply stops applying on a new path.
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const menuOpen = menu.open && menu.path === pathname;

  const closeMenu = useCallback(() => {
    setMenu((current) => ({ ...current, open: false }));
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, closeMenu]);

  const isCurrent = useCallback(
    (href: string) => pathname === href || pathname.startsWith(`${href}/`),
    [pathname],
  );

  return (
    <header
      className={cn(
        'bg-paper sticky top-0 z-50',
        scrolled || menuOpen ? 'border-hairline border-b' : 'border-b border-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="tap hover:text-accent shrink-0 font-semibold tracking-[-0.015em]"
          aria-label={`${site.name} — home`}
        >
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? 'page' : undefined}
              className={cn(
                // 13px between md and lg, where the header is tightest, then
                // body size once there is room. 13px nav reads thin against
                // the heavier display type.
                'tap text-meta hover:text-accent lg:text-body tracking-normal',
                isCurrent(item.href) ? 'text-ink font-medium' : 'text-muted',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />

          <Link
            href="/contact?type=quote"
            className="border-hairline-strong text-meta hover:border-ink hover:bg-ink hover:text-paper tap-icon hidden rounded-xs border px-3 py-1.5 font-mono tracking-[0.04em] uppercase md:inline-flex"
          >
            Request a quote
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenu({ open: !menuOpen, path: pathname })}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="border-hairline-strong text-meta hover:border-ink tap-icon rounded-xs border px-3 py-1.5 font-mono tracking-[0.04em] uppercase md:hidden"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div id="mobile-menu" className="border-hairline bg-paper border-t md:hidden">
          <Container>
            <nav aria-label="Mobile" className="divide-hairline divide-y">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                  className={cn(
                    'block py-3.5',
                    isCurrent(item.href) ? 'text-accent' : 'text-ink',
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/contact?type=quote" onClick={closeMenu} className="block py-3.5">
                Request a quote
                <span aria-hidden="true">{' '}→</span>
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
