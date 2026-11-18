'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from 'react';

import { AnnouncementBar } from '@/components/home/AnnouncementBar';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Container } from '@/components/ui/Container';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';

function subscribeToScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

function hasScrolled() {
  return window.scrollY > 8;
}

function hasScrolledOnServer() {
  return false;
}

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, hasScrolled, hasScrolledOnServer);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [menu, setMenu] = useState({ open: false, path: pathname });
  const menuOpen = menu.open && menu.path === pathname;

  /**
   * Reading progress for the hairline across the top — the reference site
   * runs the same device. Updated inside a frame callback so a fast scroll
   * does not force layout once per wheel event.
   */
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let queued = false;

    const update = () => {
      queued = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

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

  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        'site-header fixed top-0 z-50 w-full transition-all duration-300',
        solid && 'is-solid',
      )}
    >
      <div
        className="scroll-progress"
        style={{ '--scroll-progress': progress } as CSSProperties}
        aria-hidden="true"
      />

      <AnnouncementBar />

      <Container className="flex items-center justify-between" style={{ height: '82px' }}>
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label={`${site.name} — home`}
        >
          <span className="relative block h-10 w-10 overflow-hidden rounded-lg">
            <Image
              src="/Totally Ink.png"
              alt=""
              width={1345}
              height={1169}
              priority
              sizes="40px"
              className="h-10 w-auto transition-transform duration-500 group-hover:scale-105"
            />
          </span>
          <span className="site-header__logo-word text-[1.0625rem] leading-none font-bold">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? 'page' : undefined}
              className={cn(
                'nav-link site-header__nav-link text-[0.9375rem] font-semibold transition-colors duration-300',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* Wrapped so `hidden` is not overridden by `.btn-primary { display }` (unlayered CSS beats utilities). */}
          <span className="hidden md:block">
            <Link
              href="/contact?type=quote"
              className="btn-primary"
              style={{ fontSize: '14px', padding: '11px 22px', lineHeight: '1.4' }}
            >
              Contact Us
            </Link>
          </span>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenu({ open: !menuOpen, path: pathname })}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="site-header__menu-btn tap-icon flex h-11 w-11 items-center justify-center rounded-lg transition-colors md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div id="mobile-menu" className="site-header__mobile md:hidden">
          <Container className="py-4">
            <nav aria-label="Mobile" className="flex flex-col">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                  className={cn(
                    'site-header__nav-link border-hairline block border-b py-3.5 text-[1rem] font-semibold transition-colors',
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact?type=quote"
                onClick={closeMenu}
                className="btn-primary mt-5 justify-center"
                style={{ fontSize: '14px' }}
              >
                Contact Us →
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
