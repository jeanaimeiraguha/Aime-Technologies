'use client';

import { Moon, Sun } from 'lucide-react';

import { THEME_STORAGE_KEY } from '@/lib/themeScript';

/**
 * Manual theme switch. The site follows the system preference until this is
 * used; after that the choice is stored and wins.
 *
 * There is no React state here on purpose. Which icon to show is decided in
 * CSS by the same selectors that resolve the theme (see globals.css), so the
 * correct icon is in the first painted frame — no flash, no layout shift, and
 * nothing for the server and client to disagree about. The click handler reads
 * the current theme off the document rather than from state, which means it
 * cannot drift out of sync with what is actually on screen.
 *
 * The label is static and names both ends of the switch, so it stays accurate
 * whichever theme is active.
 */
export function ThemeToggle() {
  function toggle() {
    const attribute = document.documentElement.getAttribute('data-theme');
    const current =
      attribute === 'light' || attribute === 'dark'
        ? attribute
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';

    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private window or blocked site data: the choice just does not persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      title="Switch theme"
      className="text-muted hover:text-accent hover:border-hairline-strong tap-icon inline-flex items-center justify-center rounded-xs border border-transparent p-2"
    >
      <Moon className="theme-icon-moon size-4" strokeWidth={1.75} aria-hidden="true" />
      <Sun className="theme-icon-sun size-4" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
