#!/usr/bin/env node
/**
 * Copie les fichiers déposés dans public/assets/incoming/ vers les chemins officiels.
 * Exécuté avant chaque build — déposez vos PNG/JPG dans incoming/ puis push.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const incoming = path.join(root, "public/assets/incoming");
const assets = path.join(root, "public/assets");

const MAP = {
  "bovinia-logo.png": "logo/bovinia-logo.png",
  "bovinia-logo.jpg": "logo/bovinia-logo.png",
  "bovinia-logo.jpeg": "logo/bovinia-logo.png",
  "bovinia-logo-icon.png": "logo/bovinia-logo-icon.png",
  "bovinia-logo-icon.webp": "logo/bovinia-logo-icon.webp",
  "gamme-5-pots.png": "hero/gamme-5-pots.png",
  "gamme-5-pots.webp": "hero/gamme-5-pots.webp",
  "contact.png": "contact/contact.png",
  "contact.webp": "contact/contact.webp",
  "wellness.png": "products/wellness.png",
  "bloom.png": "products/bloom.png",
  "period.png": "products/period.png",
  "pulse.png": "products/pulse.png",
  "calm.png": "products/calm.png",
  "wellness-lifestyle.png": "lifestyle/wellness.png",
  "bloom-lifestyle.png": "lifestyle/bloom.png",
  "period-lifestyle.png": "lifestyle/period.png",
  "pulse-lifestyle.png": "lifestyle/pulse.png",
  "calm-lifestyle.png": "lifestyle/calm.png",
  "wellness-office.png": "lifestyle/wellness-office.png",
  "wellness-office.webp": "lifestyle/wellness-office.webp",
};

if (!fs.existsSync(incoming)) process.exit(0);

let copied = 0;
for (const name of fs.readdirSync(incoming)) {
  if (name.startsWith(".") || name.endsWith(".md")) continue;
  const destRel = MAP[name];
  if (!destRel) {
    console.warn(`[assets] Fichier ignoré (nom inconnu): ${name}`);
    continue;
  }
  const src = path.join(incoming, name);
  if (!fs.statSync(src).isFile()) continue;
  const dest = path.join(assets, destRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`[assets] ${name} → ${destRel}`);
  copied++;
}

if (copied > 0) {
  console.log(`[assets] ${copied} visuel(s) officiel(s) synchronisé(s).`);
}
