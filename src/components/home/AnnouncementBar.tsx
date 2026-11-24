'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { useCallback } from 'react';

import { announcement } from '@/content/site';
import { ANNOUNCE_STORAGE_KEY } from '@/lib/themeScript';

/**
 * Slim promo strip above the header.
 *
 * It renders on the server and is in the first painted frame, so it never
 * pushes the page down once hydration runs. Dismissal sets `data-announce` on
 * `<html>`, which globals.css hides the strip on; the inline theme script
 * re-applies that attribute before paint on the next visit. Keeping the
 * decision out of React state is what removes the layout shift — the previous
 * version rendered nothing on the server and appeared after hydration.
 */
export function AnnouncementBar() {
  const dismiss = useCallback(() => {
    document.documentElement.setAttribute('data-announce', 'off');
    try {
      localStorage.setItem(ANNOUNCE_STORAGE_KEY, '1');
    } catch {
      // Private window — the bar simply returns next visit.
    }
  }, []);

  if (!announcement) return null;

  return (
    <div className="announce-bar" role="region" aria-label="Announcement">
      <div className="relative mx-auto flex max-w-[75rem] items-center justify-center gap-3 px-10 py-2.5 text-center text-[0.875rem] leading-snug sm:px-12">
        <span className="font-semibold">{announcement.text}</span>
        <Link href={announcement.href} className="announce-bar__link hidden sm:inline">
          {announcement.cta} →
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="announce-bar__dismiss tap-icon absolute right-3 sm:right-5"
          aria-label="Dismiss announcement"
        >
          <X size={14} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
