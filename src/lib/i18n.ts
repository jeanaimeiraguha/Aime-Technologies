/**
 * i18n groundwork. English only for now — nothing here is machine translated.
 *
 * The structure the site is built on so a second language can be added without
 * touching components:
 *
 *   1. Every string already lives in src/content/*, never inline in a
 *      component. A component reads content; it does not author it.
 *   2. To add Kinyarwanda, rename `site.ts` to `site.en.ts`, add `site.rw.ts`
 *      with the same shape, and export a `getSite(locale)` selector. The same
 *      applies to services.ts, faq.ts, team.ts, industries.ts.
 *   3. MDX content is per-locale by filename: `programming-foundations.en.mdx`
 *      alongside `programming-foundations.rw.mdx`. The loaders in
 *      src/lib/content/ already key on slug, so they take a locale argument
 *      and fall back to `defaultLocale` when a translation is missing.
 *   4. Routing: move src/app/* under src/app/[locale]/* and generate the
 *      static params from `locales`. `hrefFor()` below keeps link building in
 *      one place for that move.
 *
 * Until a second locale exists, `hrefFor` is the identity function and no
 * locale prefix appears in URLs — so adding one later does not break the
 * single-language URLs that are already indexed.
 */

export const locales = ['en', 'rw', 'fr'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Locales with content written and reviewed by a human. */
export const activeLocales: Locale[] = ['en'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  rw: 'Kinyarwanda',
  fr: 'Français',
};

/** HTML lang attribute for a locale. */
export const localeTags: Record<Locale, string> = {
  en: 'en',
  rw: 'rw-RW',
  fr: 'fr',
};

/**
 * Build an href for a locale. While only the default locale is active this
 * returns `path` unchanged, keeping URLs clean and stable.
 */
export function hrefFor(path: string, locale: Locale = defaultLocale): string {
  if (locale === defaultLocale || activeLocales.length < 2) return path;
  return `/${locale}${path === '/' ? '' : path}`;
}
