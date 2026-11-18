'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';

import { announcement } from '@/content/site';

const STORAGE_KEY = 'ti-announce-dismissed';
const CHANGE_EVENT = 'ti-announce-change';

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(CHANGE_EVENT, onStoreChange);
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== '1';
  } catch {
    return true;
  }
}

function getServerSnapshot() {
  return false;
}

/**
 * Slim promo strip above the header — the web3mates cohort banner shape.
 * Dismissal persists in localStorage; visibility is read via
 * useSyncExternalStore so there is no setState-in-effect and no
 * SSR/client mismatch (server always renders nothing).
 */
export function AnnouncementBar() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!announcement || !visible) return null;

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Private window — the bar simply returns next visit.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

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
          ✕
        </button>
      </div>
    </div>
  );
}
