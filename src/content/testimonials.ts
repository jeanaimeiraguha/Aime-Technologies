/**
 * Testimonials — empty on purpose.
 *
 * The component that renders these returns null while the list is empty, so the
 * section simply does not exist on the site. It is wired up and ready: add a
 * real quote here and it appears, on the Academy page and anywhere else the
 * component is placed.
 *
 * Rules for adding one:
 *   - The person said it, in writing, and agreed to it being published.
 *   - Their name and role are real and shown. An anonymous testimonial is
 *     indistinguishable from one we wrote ourselves, so it is worth nothing.
 *   - Quoted as given. Trim for length if you must, never rewrite for polish.
 *
 * Do not add aggregate ratings, student counts or completion statistics. We do
 * not have them yet, and a number nobody measured is worse than no number.
 */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Which course or project the quote refers to. */
  context: string;
}

export const testimonials: Testimonial[] = [];
