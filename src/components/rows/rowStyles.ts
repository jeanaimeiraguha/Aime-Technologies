/**
 * Shared row chrome for the service, course and project lists.
 *
 * Every row is a single link covering the whole area, hairline-separated from
 * its neighbours, with a background shift on hover. The negative inline margin
 * lets that background bleed slightly past the text column so the hover target
 * reads as a row rather than as a highlighted paragraph.
 */

export const ROW_LIST = 'divide-y divide-hairline border-y border-hairline';

export const ROW_LINK =
  'group -mx-3 grid px-3 py-5 md:gap-x-8 md:py-6 ' +
  'hover:bg-sunken focus-visible:bg-sunken focus-visible:outline-offset-0';

export const ROW_INDEX = 'font-mono text-meta text-faint group-hover:text-accent';

/**
 * Row titles are real headings, so they inherit 600 from the base layer — the
 * previous `font-normal` was cancelling that. They stay at body size on
 * purpose: weight and the ink/muted split separate the title from its summary,
 * which keeps the scale at five sizes and keeps dense lists of eighteen rows
 * readable.
 */
export const ROW_TITLE = 'text-ink leading-snug';

export const ROW_SUMMARY = 'text-muted';

export const ROW_META = 'font-mono text-meta text-faint';

/** The trailing arrow glyph, hidden from assistive tech and from small screens. */
export const ROW_ARROW = 'hidden text-right text-faint group-hover:text-accent md:block';
