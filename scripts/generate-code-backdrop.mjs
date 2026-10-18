/**
 * Renders the hero backdrop: a wide, high-resolution still of this project's
 * own source, syntax-coloured, on a transparent background.
 *
 * Run with `npm run backdrop` after editing the snippets below. The output is
 * committed, so the build has no image dependency and the page ships a single
 * optimised WebP instead of running an animation.
 *
 * Why generated rather than a photograph:
 *   - It is our code. A stock photo of a screen shows someone else's work, at
 *     whatever resolution the photographer had, usually with their project's
 *     strings in it.
 *   - It renders at any size we ask for, so it stays sharp from 390px to 2560px.
 *   - Transparent background means one image serves both themes; the page tints
 *     and masks it in CSS.
 *
 * Colours are deliberately narrow — the brand accent for keywords, muted greys
 * for everything else, one desaturated green for strings. A full rainbow would
 * fight a page built on two neutrals and one orange.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

const WIDTH = 2400;
const HEIGHT = 1120;
const FONT_SIZE = 26;
const LINE_HEIGHT = 40;
const COLUMN_WIDTH = 760;
const COLUMN_GAP = 60;

const COLOUR = {
  plain: '#8a8a8e',
  keyword: '#e0561b',
  string: '#4f7d5a',
  comment: '#6a6a6e',
  number: '#b0824a',
  punct: '#70707a',
};

const KEYWORDS = new RegExp(
  '\\b(async|await|function|const|let|var|return|if|else|while|for|type|class|def|void|static|' +
    'uint8_t|float|continue|import|export|from|new|null|true|false|self|in|is|not|None)\\b',
  'g',
);

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

# measured at the door, not in a benchmark
# 3.1% manual review across one term`;

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Crude tokeniser — enough for a backdrop, not a highlighter. Order matters:
 * comments and strings win over keywords so a keyword inside a string stays
 * one colour.
 */
function tokenise(line) {
  const spans = [];
  const commentAt = line.search(/(\/\/|#)/);
  let code = line;
  let comment = '';

  if (commentAt >= 0 && !/['"]/.test(line.slice(0, commentAt))) {
    code = line.slice(0, commentAt);
    comment = line.slice(commentAt);
  }

  let rest = code;
  const stringRe = /('[^']*'|"[^"]*")/;
  while (rest.length) {
    const m = rest.match(stringRe);
    if (!m) {
      spans.push(...plainSpans(rest));
      break;
    }
    spans.push(...plainSpans(rest.slice(0, m.index)));
    spans.push({ text: m[0], fill: COLOUR.string });
    rest = rest.slice(m.index + m[0].length);
  }

  if (comment) spans.push({ text: comment, fill: COLOUR.comment });
  return spans;
}

function plainSpans(text) {
  if (!text) return [];
  const spans = [];
  let last = 0;
  KEYWORDS.lastIndex = 0;
  let m;
  while ((m = KEYWORDS.exec(text)) !== null) {
    if (m.index > last) spans.push({ text: text.slice(last, m.index), fill: COLOUR.plain });
    spans.push({ text: m[0], fill: COLOUR.keyword });
    last = m.index + m[0].length;
  }
  if (last < text.length) spans.push({ text: text.slice(last), fill: COLOUR.plain });
  return spans;
}

function renderColumn(source, x) {
  const lines = source.split('\n');
  return lines
    .map((line, i) => {
      const y = 60 + i * LINE_HEIGHT;
      if (!line.trim()) return '';
      // Leading whitespace is preserved with xml:space so indentation survives.
      const spans = tokenise(line)
        .map((s) => `<tspan fill="${s.fill}">${escapeXml(s.text)}</tspan>`)
        .join('');
      return `<text x="${x}" y="${y}" xml:space="preserve">${spans}</text>`;
    })
    .join('\n');
}

const columns = [TYPESCRIPT, FIRMWARE, PYTHON]
  .map((source, i) => renderColumn(source, 40 + i * (COLUMN_WIDTH + COLUMN_GAP)))
  .join('\n');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <style>
    text {
      font-family: 'JetBrains Mono', 'Cascadia Mono', Consolas, 'DejaVu Sans Mono', monospace;
      font-size: ${FONT_SIZE}px;
    }
  </style>
  ${columns}
</svg>`;

const root = process.cwd();
await mkdir(path.join(root, 'public'), { recursive: true });
const out = path.join(root, 'public', 'hero-code.webp');

const buffer = await sharp(Buffer.from(svg), { density: 144 })
  .resize(WIDTH, HEIGHT, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ quality: 72, alphaQuality: 80, effort: 6 })
  .toBuffer();

await writeFile(out, buffer);
console.log(
  `${WIDTH}×${HEIGHT}  →  public/hero-code.webp  (${(buffer.length / 1024).toFixed(1)} KB)`,
);
