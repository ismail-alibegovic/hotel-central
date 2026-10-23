import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath } from "next/cache";
import { pageKeys } from "../blocks/types";

const locales = ["en", "bs"] as const;

/** Paths whose static output depends on a document. Kept explicit so a publish can never hit unrelated routes. */
export const pathsFor = (collection: "pages" | "rooms" | "offers", slug: string): string[] => {
  // Offers can be shown by any page's "Offers" section, so a change refreshes every editable page.
  if (collection === "offers") return pageKeys.flatMap((k) => locales.map((l) => `/${l}/${k}`));
  const base = collection === "pages" ? `/${slug}` : `/rooms/${slug}`;
  const paths = locales.map((l) => `/${l}${base}`);
  // The sitemap lists rooms (visibility) and leaves out anything marked "hide from search engines" (pages and rooms).
  if (collection === "rooms") paths.push(...locales.flatMap((l) => [`/${l}/rooms`, `/${l}`]));
  paths.push("/sitemap.xml");
  return paths;
};

function revalidate(collection: "pages" | "rooms" | "offers", slug?: string) {
  if (!slug && collection !== "offers") return; // offers have no slug: any change refreshes the pages that can show them
  try {
    for (const p of pathsFor(collection, slug ?? "")) revalidatePath(p);
  } catch {
    // Outside a Next request (seed script, tests): nothing to revalidate.
  }
}

export const revalidateAfterChange =
  (collection: "pages" | "rooms" | "offers"): CollectionAfterChangeHook =>
  ({ doc, previousDoc, req }) => {
    // Only a published state change affects public output; draft saves must not touch the cache.
    if (doc?._status === "published" || previousDoc?._status === "published") revalidate(collection, doc?.slug);
    void req;
    return doc;
  };

export const revalidateAfterDelete =
  (collection: "pages" | "rooms" | "offers"): CollectionAfterDeleteHook =>
  ({ doc }) => {
    revalidate(collection, doc?.slug);
    return doc;
  };
