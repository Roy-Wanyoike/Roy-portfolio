// Task 13 — generates the full RW brand icon set from a single design.
// Rounded-tile variant: favicons / any-purpose icons.
// Full-bleed variant: maskable (Android adaptive) + apple-touch-icon (iOS masks it).
// ICO is crafted by hand (PNG-compressed entries) since sharp has no ICO writer.
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const APP = path.join(__dirname, "..", "src", "app");
const PUB = path.join(__dirname, "..", "public", "icons");

const ROUNDED = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#00a97a"/>
      <stop offset="1" stop-color="#00624a"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="15" fill="url(#g)"/>
  <g fill="none" stroke="#f2fbf7" stroke-width="5.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12.5 46 V17.5"/>
    <path d="M12.5 17.5 H22 A6.3 6.3 0 0 1 22 30.1 H12.5"/>
    <path d="M18.6 30.1 L28.6 46"/>
    <path d="M35.5 17.5 L40.2 46.5 L45 27.2 L49.8 46.5 L54.5 17.5"/>
  </g>
</svg>`;

// Full-bleed square (no rx) + glyph scaled to 80% safe zone for OS masking.
const FULLBLEED = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#00a97a"/>
      <stop offset="1" stop-color="#00624a"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" fill="url(#g)"/>
  <g transform="translate(6.4 6.4) scale(0.8)" fill="none" stroke="#f2fbf7" stroke-width="5.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12.5 46 V17.5"/>
    <path d="M12.5 17.5 H22 A6.3 6.3 0 0 1 22 30.1 H12.5"/>
    <path d="M18.6 30.1 L28.6 46"/>
    <path d="M35.5 17.5 L40.2 46.5 L45 27.2 L49.8 46.5 L54.5 17.5"/>
  </g>
</svg>`;

// Monochrome glyph for Safari pinned-tab mask-icon.
const MONO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <g fill="none" stroke="#000000" stroke-width="5.6" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)">
    <path d="M9.5 43 V14.5"/>
    <path d="M9.5 14.5 H19 A6.3 6.3 0 0 1 19 27.1 H9.5"/>
    <path d="M15.6 27.1 L25.6 43"/>
    <path d="M32.5 14.5 L37.2 43.5 L42 24.2 L46.8 43.5 L51.5 14.5"/>
  </g>
</svg>`;

// Minimal ICO writer with PNG-compressed entries (widely supported).
function buildIco(pngs) {
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  const entries = [];
  let offset = 6 + 16 * count;
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // colors
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // planes
    e.writeUInt16LE(32, 6); // bpp
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

(async () => {
  fs.mkdirSync(PUB, { recursive: true });

  // Vector sources
  fs.writeFileSync(path.join(APP, "icon.svg"), ROUNDED.trim() + "\n");
  fs.writeFileSync(path.join(PUB, "mask-icon.svg"), MONO.trim() + "\n");

  const render = (svg, size) =>
    sharp(Buffer.from(svg), { density: size * 18 }).resize(size, size).png().toBuffer();

  // Favicon ICO: 16/32/48 rounded tiles
  const icoSizes = [16, 32, 48];
  const icoPngs = [];
  for (const s of icoSizes) {
    icoPngs.push({ size: s, data: await render(ROUNDED, s) });
  }
  fs.writeFileSync(path.join(APP, "favicon.ico"), buildIco(icoPngs));

  // Any-purpose PNGs (rounded tiles)
  for (const s of [192, 512]) {
    fs.writeFileSync(path.join(PUB, `icon-${s}.png`), await render(ROUNDED, s));
  }

  // Maskable PNGs (full-bleed) + apple-touch-icon (iOS applies its own mask)
  for (const s of [192, 512]) {
    fs.writeFileSync(path.join(PUB, `maskable-${s}.png`), await render(FULLBLEED, s));
  }
  fs.writeFileSync(path.join(APP, "apple-icon.png"), await render(FULLBLEED, 180));

  console.log("icon set generated:");
  console.log("  app/icon.svg, app/favicon.ico (16/32/48), app/apple-icon.png (180)");
  console.log("  public/icons/{icon-192,icon-512,maskable-192,maskable-512}.png, mask-icon.svg");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
