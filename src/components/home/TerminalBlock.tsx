import { site } from '@/content/site';

/**
 * How we work, as the five commands it actually is.
 *
 * Two things matter in the execution:
 *
 * 1. The surface is `surface`, not `sunken`. This block sits inside a sunken
 *    full-bleed band on the home page, and a sunken panel on a sunken band is
 *    an invisible box — the border ends up doing all the work and the result
 *    reads as an empty frame. `surface` lifts it off the band in light and
 *    dark alike.
 *
 * 2. Columns are sized in `ch`, not `rem`. In a monospace face `ch` is exactly
 *    one character, so `10ch` puts the comments precisely three spaces after
 *    the longest command — the alignment a terminal would actually produce.
 *    The previous `5.5rem` column was roughly eleven characters wide for seven
 *    characters of text, which left a gap that looked like a mistake.
 *
 * Laid out as a grid rather than padded whitespace so the comment column stays
 * aligned at any font size and the line numbers can be muted independently.
 */
const STEPS = [
  { verb: 'build', comment: 'design the architecture, write the code' },
  { verb: 'test', comment: 'unit, integration, real users' },
  { verb: 'break', comment: 'edge cases, load, security' },
  { verb: 'fix', comment: 'root cause, not patches' },
  { verb: 'ship', comment: 'deploy, monitor, iterate' },
] as const;

const GRID = 'grid grid-cols-[3.5ch_10ch_1fr]';

export function TerminalBlock() {
  return (
    <pre
      // `w-fit` so the panel hugs its longest line instead of stretching to
      // fill the grid column, which left a block of dead space on the right.
      // `max-w-full` keeps it scrollable rather than overflowing on mobile.
      className="border-hairline bg-surface text-meta w-fit max-w-full overflow-x-auto rounded-sm border px-5 py-5 font-mono leading-[1.75] md:px-6"
      aria-label={`How we work. ${site.motto}`}
    >
      <code className="grid">
        {STEPS.map((step, index) => (
          <span key={step.verb} className={GRID}>
            <span className="text-faint" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-ink">
              <span className="text-faint">$ </span>
              {step.verb}
            </span>
            <span className="text-muted">
              <span className="text-faint"># </span>
              {step.comment}
            </span>
          </span>
        ))}

        <span className={`${GRID} mt-4`}>
          <span aria-hidden="true" />
          <span className="text-ink col-span-2">That&apos;s the game.</span>
        </span>
      </code>
    </pre>
  );
}
