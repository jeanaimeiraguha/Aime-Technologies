/**
 * Rasterises the "TI" monogram in src/app/icon.svg into the PNG sizes that
 * browsers and the web manifest need.
 *
 * Run with `npm run icons` after editing the SVG. The outputs are committed, so
 * this is not part of the build and the build has no image dependency.
 *
 * sharp ships with Next.js for image optimisation, so there is nothing extra to
 * install. Text in the SVG is rasterised with whatever monospace font the system
 * provides — at icon sizes that is indistinguishable, and the SVG itself (which
 * is what browsers actually load) names JetBrains Mono first.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

const root = process.cwd();
const source = path.join(root, 'src', 'app', 'icon.svg');

/** [output path, pixel size] */
const targets = [
  // Picked up automatically by Next's metadata conventions.
  [path.join(root, 'src', 'app', 'apple-icon.png'), 180],
  // Referenced by src/app/manifest.ts.
  [path.join(root, 'public', 'icon-192.png'), 192],
  [path.join(root, 'public', 'icon-512.png'), 512],
  // Fallback for anything that still asks for /favicon.png.
  [path.join(root, 'public', 'favicon.png'), 48],
];

const svg = await readFile(source);

await mkdir(path.join(root, 'public'), { recursive: true });

for (const [output, size] of targets) {
  const png = await sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await writeFile(output, png);
  console.log(`${size}×${size}  →  ${path.relative(root, output)}  (${png.length} bytes)`);
}

console.log('\nDone. Commit the generated PNGs.');
