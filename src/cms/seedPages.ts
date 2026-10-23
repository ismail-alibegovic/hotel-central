import type { Payload } from "payload";
import { staticLayout } from "@/content/layouts";
import type { PageKey } from "./blocks/types";
import { toCmsLayout } from "./seedLayout";

/**
 * Create the CMS document for one existing page from its static layout (English, then Bosnian onto the
 * same block rows). Never touches a page that already exists, so repeated runs cannot overwrite edits.
 */
export async function seedPage(payload: Payload, key: PageKey): Promise<"created" | "exists"> {
  const existing = await payload.find({ collection: "pages", where: { slug: { equals: key } }, limit: 1, draft: true, depth: 0, overrideAccess: true });
  if (existing.totalDocs) return "exists";
  const en = staticLayout(key, "en");
  const bs = staticLayout(key, "bs");
  if (en.blocks.length !== bs.blocks.length || en.blocks.some((b, n) => b.type !== bs.blocks[n].type)) throw new Error(`${key}: en and bs layouts differ in structure`);
  const created = await payload.create({
    collection: "pages",
    locale: "en",
    overrideAccess: true,
    data: { slug: key, metaTitle: en.meta.title, metaDescription: en.meta.description, layout: toCmsLayout(en.blocks, "en"), _status: "published" } as never,
  });
  const bsRows = toCmsLayout(bs.blocks, "bs", created.layout as never);
  await payload.update({
    collection: "pages",
    id: created.id,
    locale: "bs",
    overrideAccess: true,
    data: { metaTitle: bs.meta.title, metaDescription: bs.meta.description, layout: bsRows, _status: "published" } as never,
  });
  return "created";
}
