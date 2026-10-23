/** Restore drill, step 1 (child process): write representative data into the SOURCE database. */
import { getPayload } from "payload";
import configModule from "@payload-config";
import { readFileSync } from "node:fs";

const config = (configModule as unknown as { default?: typeof configModule }).default ?? configModule;
const payload = await getPayload({ config });
const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64");

await payload.create({ collection: "users", overrideAccess: true, data: { email: process.env.DRILL_ADMIN_EMAIL!, password: process.env.DRILL_ADMIN_PASSWORD! } as never });
const page = await payload.create({ collection: "pages", overrideAccess: true, locale: "en", data: { slug: "about", heroEyebrow: "EN live", _status: "published" } });
await payload.update({ collection: "pages", id: page.id, overrideAccess: true, locale: "bs", data: { heroEyebrow: "BS uživo", _status: "published" } });
await payload.update({ collection: "pages", id: page.id, overrideAccess: true, locale: "en", draft: true, data: { heroEyebrow: "EN pending draft" } });
await payload.create({ collection: "media", overrideAccess: true, locale: "en", data: { alt: "drill image" }, file: { data: png, mimetype: "image/png", name: "drill.png", size: png.length } });
void readFileSync;
console.log("drill-write: ok");
process.exit(0);
