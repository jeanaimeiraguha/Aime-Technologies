import { THEME_SCRIPT } from '@/lib/themeScript';

/**
 * Applies a saved theme choice before first paint. It is the first element in
 * the body, so it executes before the page is painted and there is no flash of
 * the wrong theme.
 */
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
