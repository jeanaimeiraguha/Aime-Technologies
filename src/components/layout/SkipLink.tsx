/**
 * Keyboard users land here first. Visually hidden until focused, then it
 * appears in the top-left as a normal bordered link.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="border-ink bg-paper text-meta tap sr-only rounded-xs border px-4 py-2 font-mono uppercase focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60]"
    >
      Skip to content
    </a>
  );
}
