/**
 * Copies every file referenced by the Media collection into a local directory.
 *   - Vercel Blob: media docs carry absolute https://…blob.vercel-storage.com URLs, which are downloaded.
 *   - Local disk (dev/test): files are copied from MEDIA_DIR.
 * Usage: DATABASE_URL=… PAYLOAD_SECRET=… [BLOB_READ_WRITE_TOKEN=…] tsx scripts/cms/backup-media.mts <outDir>
 * Download of Blob URLs is NOT TESTED against a real store (none exists yet); the local path is tested by the restore drill.
 */
import fs from "node:fs";
import path from "node:path";
import { getPayload } from "payload";
import configModule from "@payload-config";

const out = process.argv[2];
if (!out) throw new Error("usage: backup-media.mts <outDir>");
fs.mkdirSync(out, { recursive: true });

const config = (configModule as unknown as { default?: typeof configModule }).default ?? configModule;
const payload = await getPayload({ config });
let page = 1;
let copied = 0;
for (;;) {
  const res = await payload.find({ collection: "media", page, limit: 100, depth: 0, overrideAccess: true });
  for (const doc of res.docs) {
    const name = path.basename(String(doc.filename));
    const url = String(doc.url ?? "");
    if (/^https:\/\//.test(url)) {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`download failed ${r.status} for ${name}`);
      fs.writeFileSync(path.join(out, name), Buffer.from(await r.arrayBuffer()));
    } else {
      fs.copyFileSync(path.join(process.env.MEDIA_DIR ?? ".media", name), path.join(out, name));
    }
    copied++;
  }
  if (!res.hasNextPage) break;
  page++;
}
console.log(`backed up ${copied} media files to ${out}`);
process.exit(0);
