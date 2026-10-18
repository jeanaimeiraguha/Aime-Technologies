import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * The hero backdrop: three columns of source drifting slowly behind the
 * headline.
 *
 * This is the one piece of motion on the site, so it is held to a few rules:
 *
 * 1. It is decorative and nothing else — `aria-hidden`, no pointer events, no
 *    text selection, and it sits on a negative z-index so every real element
 *    in the hero paints over it. A screen reader never meets it.
 *
 * 2. The code is ours. Enrolment and invoicing in TypeScript, an ESP32 sensor
 *    task in C, the attendance matcher in Python — the three things the
 *    headline claims, in the languages we claim them in. Lorem ipsum with
 *    curly braces would have been faster and would have said nothing.
 *
 * 3. It is masked, not merely faded: a horizontal ramp clears the left column
 *    where the headline is densest, and a vertical one dies out before the
 *    "What we do" trio. Opacity alone would have put texture directly under
 *    68px display type.
 *
 * 4. It drifts at 70–110 seconds a loop, which is slow enough to read as
 *    weather rather than as a carousel. The middle column runs in reverse and
 *    all three start at a negative delay, so they are never in step.
 *
 * 5. Columns are dropped rather than squeezed on narrow screens: a phone gets
 *    the Python column alone, a laptop two, and only an `xl` viewport has the
 *    room for three at a width that does not cut the lines off.
 *
 * The scroll is a pure CSS transform on a tripled block — see
 * `.code-backdrop` in `globals.css`, which also caps the layer's height and
 * stops the motion dead under `prefers-reduced-motion`.
 *
 * Rendering it as live text rather than as a generated image is deliberate:
 * it costs no download, stays sharp at every density without a 2x asset, and
 * recolours itself from the theme tokens instead of needing one file per
 * theme. The animation is a single compositor transform per column, so the
 * main thread does no work once the page has painted.
 */

/**
 * Lines fit the narrowest their column ever gets, which is the viewport at
 * which that column first appears: 44 characters of 12px mono for the first
 * column, 46 for the other two. A column clips its overflow, so a line over
 * that budget would be cut mid-identifier rather than wrapped.
 */
const TYPESCRIPT = `async function enrol(student: Student) {
  const seat = await seats.reserve(course);
  if (!seat) {
    return { ok: false, reason: 'full' };
  }
  await mail.send('enrolled', student.id);
  return { ok: true, seat };
}

type Invoice = {
  id: string;
  amountRwf: number;
  paidAt: Date | null;
};

function settle(invoice: Invoice) {
  if (invoice.paidAt) return invoice;
  const { amountRwf } = invoice;
  ledger.post(invoice.id, amountRwf);
  return { ...invoice, paidAt: new Date() };
}

const routes = {
  '/api/enrol': enrol,
  '/api/invoices/settle': settle,
};`;

const FIRMWARE = `static void sensor_task(void *arg) {
  uint8_t misses = 0;
  while (1) {
    float c = dht22_read_celsius(PIN_DHT);
    if (isnan(c)) {
      if (++misses > 5) esp_restart();
      continue;
    }
    misses = 0;
    mqtt_publish("tunnel-3/temp", c);
    vTaskDelay(pdMS_TO_TICKS(30000));
  }
}

void app_main(void) {
  nvs_flash_init();
  wifi_connect(WIFI_SSID, WIFI_PASS);
  mqtt_start(BROKER_URI);
  xTaskCreate(sensor_task, "sensor", 4096, 5);
}

// watchdog: 8s, fed from the sensor loop
// two AA cells, eleven months on the bench`;

const PYTHON = `def mark_attendance(frame, roster):
    boxes = detector.detect(frame)
    seen = []
    for box in boxes:
        vec = embed(crop(frame, box))
        match = roster.nearest(vec, 0.62)
        if match is None:
            continue
        log.seen(match.id, now())
        seen.append(match.id)
    return seen

class Roster:
    def nearest(self, vec, threshold):
        d, i = self.index.search(vec, k=1)
        if d[0] > threshold:
            return None
        return self.people[i[0]]

# 1,240 faces enrolled
# 0.3s a frame on the classroom Pi`;

const COLUMNS = [
  { source: TYPESCRIPT, seconds: 92, reverse: false, delay: -31, hidden: 'hidden xl:block' },
  { source: FIRMWARE, seconds: 110, reverse: true, delay: -58, hidden: 'hidden lg:block' },
  { source: PYTHON, seconds: 74, reverse: false, delay: -12, hidden: '' },
] as const;

/**
 * Four token classes is the whole highlighter. Comments and strings are
 * matched before keywords, so a keyword inside either is left alone — the
 * alternation is tried left to right at each position, which is exactly the
 * precedence a real lexer would give these.
 */
const TOKEN =
  /(\/\/[^\n]*|#[^\n]*)|('[^']*'|"[^"]*")|\b(export|async|function|const|let|return|if|else|while|for|await|type|class|def|static|void|float|uint8_t|new|continue|None|null)\b|(\b\d[\w.]*)/g;

function highlight(line: string): ReactNode[] {
  const out: ReactNode[] = [];
  let cursor = 0;

  for (const match of line.matchAll(TOKEN)) {
    const [text, comment, string, keyword] = match;
    const at = match.index ?? 0;

    if (at > cursor) out.push(line.slice(cursor, at));

    out.push(
      <span
        key={at}
        className={
          comment
            ? 'code-backdrop__comment'
            : string
              ? 'code-backdrop__string'
              : keyword
                ? 'code-backdrop__keyword'
                : 'code-backdrop__number'
        }
      >
        {text}
      </span>,
    );

    cursor = at + text.length;
  }

  if (cursor < line.length) out.push(line.slice(cursor));
  return out;
}

/**
 * One pass of a column's source. Rendered three times inside the scroller:
 * the animation travels `calc(-100% / 3)`, which is exactly one copy, so the
 * second lands where the first began and the loop has no seam. The third is
 * what keeps the bottom of the column filled at the end of a cycle.
 */
function Block({ source }: { source: string }) {
  return (
    <div>
      {source.split('\n').map((line, index) => (
        // Lines are static and never reordered, so the index is a stable key.
        <div key={index} className="code-backdrop__line">
          {line === '' ? '\u00a0' : highlight(line)}
        </div>
      ))}
    </div>
  );
}

export function CodeBackdrop() {
  return (
    <div className="code-backdrop" aria-hidden="true">
      {COLUMNS.map((column) => (
        <div key={column.seconds} className={cn('code-backdrop__column', column.hidden)}>
          <div
            className="code-backdrop__scroll"
            style={{
              animationDuration: `${column.seconds}s`,
              animationDelay: `${column.delay}s`,
              animationDirection: column.reverse ? 'reverse' : 'normal',
            }}
          >
            <Block source={column.source} />
            <Block source={column.source} />
            <Block source={column.source} />
          </div>
        </div>
      ))}
    </div>
  );
}
