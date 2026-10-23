/** Restore drill, step 3 (child process): verify the RESTORED database + media directory. */
import { getPayload } from "payload";
import configModule from "@payload-config";
import { existsSync } from "node:fs";
import path from "node:path";

const config = (configModule as unknown as { default?: typeof configModule }).default ?? configModule;
const payload = await getPayload({ config });
const fail = (m: string): never => {
  console.error("drill-verify FAILED:", m);
  process.exit(1);
};

// 1. the original admin can still log in with the original password (hash + salt were restored)
const login = await payload.login({ collection: "users", data: { email: process.env.DRILL_ADMIN_EMAIL!, password: process.env.DRILL_ADMIN_PASSWORD! } }).catch(() => null);
if (!login?.token || (login.user as { role?: string }).role !== "admin") fail("admin login");

// 2. published content in both languages + the pending draft survived
const en = await payload.find({ collection: "pages", where: { slug: { equals: "about" } }, locale: "en", overrideAccess: false });
const bs = await payload.find({ collection: "pages", where: { slug: { equals: "about" } }, locale: "bs", overrideAccess: false });
if (en.docs[0]?.heroEyebrow !== "EN live") fail("public EN content");
if (bs.docs[0]?.heroEyebrow !== "BS uživo") fail("public BS content");
const draft = await payload.find({ collection: "pages", where: { slug: { equals: "about" } }, locale: "en", draft: true, overrideAccess: true });
if (draft.docs[0]?.heroEyebrow !== "EN pending draft") fail("pending draft version");

// 3. media record + file
const media = await payload.find({ collection: "media", overrideAccess: true });
const file = media.docs[0]?.filename as string | undefined;
if (!file || !existsSync(path.join(process.env.MEDIA_DIR!, file))) fail("media file");

console.log("drill-verify: ok");
process.exit(0);
