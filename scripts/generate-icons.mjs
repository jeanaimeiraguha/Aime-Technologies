/**
 * Rasterises the company logo in `public/Totally Ink.png` into the PNG sizes
 * that browsers, the web manifest and the home screen need.
 *
 * Run with `npm run icons` after replacing the logo file. The outputs are
 * committed, so this is not part of the build and the build has no image
 * dependency.
 *
 * sharp ships with Next.js for image optimisation, so there is nothing extra
 * to install. Each icon is inset by ~7% so the mark never touches the edge of
 * a tile, and the launcher/home-screen tiles are flattened onto the ink
 * background — the logo's own transparency would otherwise show the wallpaper
 * through them.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

const root = process.cwd();
const source = path.join(root, 'public', 'Totally Ink.png');

/** Ink (#0b0b0c) — the brand's dark, baked into the masked tiles. */
const tileBackground = { r: 11, g: 11, b: 12, alpha: 1 };
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

/** [output path, pixel size, background or null for transparent] */
const targets = [
  // Favicon, picked up automatically by Next's metadata conventions.
  [path.join(root, 'src', 'app', 'icon.png'), 256, null],
  // Home-screen icon.
  [path.join(root, 'src', 'app', 'apple-icon.png'), 180, tileBackground],
  // Referenced by src/app/manifest.ts.
  [path.join(root, 'public', 'icon-192.png'), 192, tileBackground],
  [path.join(root, 'public', 'icon-512.png'), 512, tileBackground],
  // Fallback for anything that still asks for /favicon.png.
  [path.join(root, 'public', 'favicon.png'), 48, null],
];

const logo = await readFile(source);

await mkdir(path.join(root, 'public'), { recursive: true });

for (const [output, size, background] of targets) {
  const pad = Math.max(1, Math.round(size * 0.07));
  const inner = size - pad * 2;
  const backdrop = background ?? transparent;

  let pipeline = sharp(logo)
    .resize(inner, inner, { fit: 'contain', background: backdrop })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: backdrop });

  // Composite the logo's transparency onto the tile colour so the launcher
  // never sees a see-through icon.
  if (background) pipeline = pipeline.flatten({ background });

  const png = await pipeline.png({ compressionLevel: 9 }).toBuffer();

  await writeFile(output, png);
  console.log(`${size}×${size}  →  ${path.relative(root, output)}  (${png.length} bytes)`);
}

console.log('\nDone. Commit the generated PNGs.');
