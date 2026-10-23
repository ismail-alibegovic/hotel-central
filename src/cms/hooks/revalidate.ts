import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath } from "next/cache";

const locales = ["en", "bs"] as const;

/** Paths whose static output depends on a document. Kept explicit so a publish can never hit unrelated routes. */
export const pathsFor = (collection: "pages" | "rooms", slug: string): string[] => {
  const base = collection === "pages" ? `/${slug}` : `/rooms/${slug}`;
  const paths = locales.map((l) => `/${l}${base}`);
  if (collection === "rooms") paths.push(...locales.flatMap((l) => [`/${l}/rooms`, `/${l}`]), "/sitemap.xml");
  return paths;
};

function revalidate(collection: "pages" | "rooms", slug?: string) {
  if (!slug) return;
  try {
    for (const p of pathsFor(collection, slug)) revalidatePath(p);
  } catch {
    // Outside a Next request (seed script, tests): nothing to revalidate.
  }
}

export const revalidateAfterChange =
  (collection: "pages" | "rooms"): CollectionAfterChangeHook =>
  ({ doc, previousDoc, req }) => {
    // Only a published state change affects public output; draft saves must not touch the cache.
    if (doc?._status === "published" || previousDoc?._status === "published") revalidate(collection, doc?.slug);
    void req;
    return doc;
  };

export const revalidateAfterDelete =
  (collection: "pages" | "rooms"): CollectionAfterDeleteHook =>
  ({ doc }) => {
    revalidate(collection, doc?.slug);
    return doc;
  };
