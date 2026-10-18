'use client';

import { useEffect, useState } from 'react';

import { site } from '@/content/site';

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: site.location.timeZone,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

/**
 * Local time where the work happens. Small, but it is the one live detail on
 * the page: it says someone is actually there.
 *
 * It renders blank on the server — a build-time clock would be wrong by
 * however long ago the site was deployed — and the span reserves its width so
 * filling it in costs no layout shift. The interval is aligned to the next
 * minute boundary rather than polling every second.
 */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const now = new Date();
      setTime(formatter.format(now));
      // Re-run just after the minute turns over.
      timeout = setTimeout(
        tick,
        60_000 - (now.getSeconds() * 1000 + now.getMilliseconds()) + 50,
      );
    };

    tick();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span className="inline-block min-w-[3.25ch] tabular-nums">
      {time ?? <span className="sr-only">Loading local time</span>}
    </span>
  );
}
