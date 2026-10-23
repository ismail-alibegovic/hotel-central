import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Payload } from "payload";
import { revalidatePath } from "next/cache";

const locales = ["en", "bs"] as const;

/** Paths whose static output depends on a document. Kept explicit so a publish can never hit unrelated routes. */
export const pathsFor = (collection: "pages" | "rooms", slug: string): string[] => {
  const base = collection === "pages" ? `/${slug}` : `/rooms/${slug}`;
  const paths = locales.map((l) => `/${l}${base}`);
  // The sitemap lists rooms (visibility) and leaves out anything marked "hide from search engines" (pages and rooms).
  if (collection === "rooms") paths.push(...locales.flatMap((l) => [`/${l}/rooms`, `/${l}`]));
  paths.push("/sitemap.xml");
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

/** Paths of a custom page: its address in every language that has one, plus the sitemap. */
export const pathsForCustomPage = (slugs: Partial<Record<(typeof locales)[number], string | null | undefined>>, extra: (string | null | undefined)[] = []): string[] => {
  const paths = locales.flatMap((l) => [slugs[l]].filter(Boolean).map((s) => `/${l}/${s}`));
  // a slug that was changed or removed: its old address must stop being served from the cache
  for (const old of extra) if (old) paths.push(...locales.map((l) => `/${l}/${old}`));
  paths.push("/sitemap.xml");
  return [...new Set(paths)];
};

async function allSlugs(payload: Payload, id: string | number, req: Parameters<Payload["findByID"]>[0]["req"]) {
  // `req` keeps the read inside the request's transaction, so it sees the change being published
  const doc = (await payload.findByID({ collection: "custom-pages", id, locale: "all", depth: 0, overrideAccess: true, draft: false, req }).catch(() => null)) as { slug?: Record<string, string | null> | string } | null;
  const slug = doc?.slug && typeof doc.slug === "object" ? doc.slug : {};
  return slug as Partial<Record<(typeof locales)[number], string | null>>;
}

function revalidateCustom(paths: string[]) {
  try {
    for (const p of paths) revalidatePath(p);
  } catch {
    // Outside a Next request (seed script, tests): nothing to revalidate.
  }
}

/**
 * Publishing, unpublishing, renaming or saving a published page refreshes its addresses (all languages, old and new) and
 * the sitemap. Draft saves of a never-published page change nothing public and revalidate nothing.
 */
export const revalidateCustomPageAfterChange: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (doc?._status === "published" || previousDoc?._status === "published") {
    const slugs = await allSlugs(req.payload, doc.id, req);
    revalidateCustom(pathsForCustomPage(slugs, [previousDoc?.slug, doc?.slug]));
  }
  return doc;
};

export const revalidateCustomPageAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  const slug = doc?.slug as Record<string, string | null> | string | undefined;
  const slugs = slug && typeof slug === "object" ? slug : {};
  revalidateCustom(pathsForCustomPage(slugs, typeof slug === "string" ? [slug] : []));
  return doc;
};
