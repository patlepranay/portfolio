/* ------------------------------------------------------------------ */
/*  In-place image optimisation for the project/logo raster assets.     */
/*                                                                      */
/*  Resizes oversized screenshots to a web-sensible width and re-encodes *
/*  in the SAME format, so filenames and import paths don't change.      *
/*  Re-encodes the biggest wins first (screenshots shown small in cards).*/
/*                                                                      */
/*  Run:  npm run optimize:images                                       */
/* ------------------------------------------------------------------ */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const assets = join(__dirname, "..", "src", "assets");

// [filename, maxWidth] — screenshots stay sharp but stop being giant; small
// logos get a tighter cap.
const FILES = [
  ["telehealth.png", 1280],
  ["dashboard.png", 1280],
  ["ticket.png", 1280],
  ["url-short.png", 1280],
  ["krushisarathi.png", 1280],
  ["editor.jpg", 1280],
  ["editor.png", 1280], // unused duplicate, optimised in case it's kept
  ["tcs_logo.png", 320],
  ["logo.png", 320],
];

let savedTotal = 0;

for (const [name, maxWidth] of FILES) {
  const src = join(assets, name);
  const before = readFileSync(src);
  try {
    const meta = await sharp(before).metadata();
    const scale = Math.min(1, maxWidth / (meta.width || maxWidth));
    const width = Math.round((meta.width || 0) * scale);
    const height = Math.round((meta.height || 0) * scale);

    const isJpg = meta.format === "jpeg";
    let out = sharp(before)
      .resize({ width, height, fit: "inside", withoutEnlargement: true });

    out = isJpg
      ? out.jpeg({ quality: 76, mozjpeg: true })
      : out.png({ compressionLevel: 9, adaptiveFiltering: true, palette: width > 640 });

    const after = await out.toBuffer();
    writeFileSync(src, after);
    const saved = before.length - after.length;
    savedTotal += saved;
    console.log(
      `${name.padEnd(20)} ${(before.length / 1024).toFixed(0).padStart(6)} KB -> ${(after.length / 1024)
        .toFixed(0)
        .padStart(5)} KB  (${((saved / before.length) * 100).toFixed(0)}%)`
    );
  } catch (err) {
    console.log(`${name.padEnd(20)} SKIPPED (${err.message})`);
  }
}

console.log(`\nTotal saved: ${(savedTotal / 1024).toFixed(0)} KB`);
