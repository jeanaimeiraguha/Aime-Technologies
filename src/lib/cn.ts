/**
 * Join class names, dropping falsy values. Small enough not to warrant a
 * dependency, and the project has no conditional-variant styling to merge.
 */
export function cn(...values: (string | false | null | undefined)[]): string {
  return values.filter(Boolean).join(' ');
}
