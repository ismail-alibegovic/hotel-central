import "server-only";
import { draftMode, headers } from "next/headers";
import type { CustomPage, Footer, Navigation, Page, Room } from "@/payload-types";
import { locales, type Locale } from "@/lib/i18n";
import { isStaffUser } from "./access";
import { cmsEnabled } from "./enabled";
import { isValidSlug } from "./slugs";
import { getPayloadClient } from "./payload";

type Doc<C extends "pages" | "rooms"> = C extends "pages" ? Page : Room;
export type CmsResult<C extends "pages" | "rooms"> = { doc: Doc<C> | null; draft: boolean };

const CMS_TIMEOUT_MS = 5000;

/** Reject (and free the timer) if `work` takes too long, so a slow database never stalls a page render. */
function withTimeout<T>(work: Promise<T>): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("CMS read timed out")), CMS_TIMEOUT_MS);
  });
  return Promise.race([work, timeout]).finally(() => clearTimeout(timer));
}

/** Decides whether this request may see drafts (Draft Mode AND a valid staff session). */
async function readMode() {
  const payload = await getPayloadClient();
  if ((await draftMode()).isEnabled) {
    const auth = await payload.auth({ headers: await headers() });
    if (isStaffUser(auth.user)) return { payload, draft: true, user: auth.user };
  }
  return { payload, draft: false, user: null };
}

async function readCmsDoc<C extends "pages" | "rooms">(collection: C, slug: string, locale: Locale): Promise<CmsResult<C>> {
  const { payload, draft, user } = await readMode();
  const res = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    locale,
    fallbackLocale: false,
    draft,
    limit: 1,
    depth: 1,
    overrideAccess: false,
    ...(user ? { user } : {}),
  });
  return { doc: (res.docs[0] as Doc<C> | undefined) ?? null, draft };
}

async function readCmsDocs<C extends "pages" | "rooms">(collection: C, locale: Locale): Promise<{ docs: Doc<C>[]; draft: boolean }> {
  const { payload, draft, user } = await readMode();
  const res = await payload.find({ collection, locale, fallbackLocale: false, draft, limit: 100, depth: 1, overrideAccess: false, ...(user ? { user } : {}) });
  return { docs: res.docs as Doc<C>[], draft };
}

/**
 * Read one CMS document for a locale. Returns `{ doc: null }` whenever the CMS is off, the document
 * is missing/unpublished, the database is unreachable or slow, or anything else fails — callers then
 * render the static content unchanged.
 *
 * Draft privacy: unpublished content is only returned when Next Draft Mode is on AND the request
 * carries a valid staff session. Everyone else is limited to published documents by collection access.
 */
export async function getCmsDoc<C extends "pages" | "rooms">(collection: C, slug: string, locale: Locale): Promise<CmsResult<C>> {
  if (!cmsEnabled()) return { doc: null, draft: false };
  try {
    return await withTimeout(readCmsDoc(collection, slug, locale));
  } catch (err) {
    console.error("[cms] falling back to static content:", err instanceof Error ? err.message : err);
    return { doc: null, draft: false };
  }
}

/** All documents of a collection for a locale (published only, unless a staff member is previewing). Empty on any failure. */
export async function getCmsDocs<C extends "pages" | "rooms">(collection: C, locale: Locale): Promise<{ docs: Doc<C>[]; draft: boolean }> {
  if (!cmsEnabled()) return { docs: [], draft: false };
  try {
    return await withTimeout(readCmsDocs(collection, locale));
  } catch (err) {
    console.error("[cms] falling back to static content:", err instanceof Error ? err.message : err);
    return { docs: [], draft: false };
  }
}

/** Slugs of published, visible rooms for the sitemap (no request context, no drafts). Null = CMS unavailable, use static. */
export async function getPublishedRoomSlugs(): Promise<string[] | null> {
  if (!cmsEnabled()) return null;
  try {
    const payload = await getPayloadClient();
    const res = await withTimeout(payload.find({ collection: "rooms", limit: 100, depth: 0, overrideAccess: false, select: { slug: true, visible: true } }));
    return res.docs.filter((d) => d.visible !== false).map((d) => d.slug);
  } catch {
    return null;
  }
}

/**
 * Public paths (without locale, e.g. "/spa", "/rooms/junior-suite") that editors have hidden from search engines.
 * Published documents only, so an unpublished draft can never change the sitemap. Null = CMS unavailable.
 */
export async function getNoindexPaths(): Promise<Set<string> | null> {
  if (!cmsEnabled()) return null;
  try {
    const payload = await getPayloadClient();
    const [pages, rooms] = await withTimeout(
      Promise.all([
        payload.find({ collection: "pages", where: { noindex: { equals: true } }, limit: 100, depth: 0, overrideAccess: false, select: { slug: true } }),
        payload.find({ collection: "rooms", where: { noindex: { equals: true } }, limit: 100, depth: 0, overrideAccess: false, select: { slug: true } }),
      ]),
    );
    return new Set([...pages.docs.map((d) => `/${d.slug}`), ...rooms.docs.map((d) => `/rooms/${d.slug}`)]);
  } catch {
    return null;
  }
}

type GlobalDoc<G extends "navigation" | "footer"> = G extends "navigation" ? Navigation : Footer;

/**
 * Read a global (navigation / footer) for a locale. Same rules as getCmsDoc: published only for the public,
 * drafts for previewing staff, null on any failure so the caller renders the built-in text.
 */
export async function getCmsGlobal<G extends "navigation" | "footer">(slug: G, locale: Locale): Promise<GlobalDoc<G> | null> {
  if (!cmsEnabled()) return null;
  try {
    return await withTimeout(
      (async () => {
        const { payload, draft, user } = await readMode();
        const doc = await payload.findGlobal({ slug, locale, fallbackLocale: false, draft, depth: 0, overrideAccess: false, ...(user ? { user } : {}) });
        return doc as GlobalDoc<G>;
      })(),
    );
  } catch (err) {
    console.error("[cms] falling back to static content:", err instanceof Error ? err.message : err);
    return null;
  }
}

export type CustomPageRead = { doc: CustomPage; others: Partial<Record<Locale, CustomPage>>; draft: boolean };

/**
 * One page created in the CMS, by its address in `locale`, plus the same document in the other languages (for
 * alternate-language links). Same privacy rules as every other read: published only for the public, drafts only for
 * staff in Draft Mode. Null when the CMS is off, the address is malformed, nothing matches, or anything fails.
 */
export async function getCustomPageDoc(slug: string, locale: Locale): Promise<CustomPageRead | null> {
  if (!cmsEnabled() || !isValidSlug(slug)) return null;
  try {
    return await withTimeout(
      (async () => {
        const { payload, draft, user } = await readMode();
        const common = { fallbackLocale: false as const, draft, depth: 1, overrideAccess: false, ...(user ? { user } : {}) };
        const res = await payload.find({ collection: "custom-pages", where: { slug: { equals: slug } }, locale, limit: 1, ...common });
        const doc = res.docs[0] as CustomPage | undefined;
        if (!doc) return null;
        const others: Partial<Record<Locale, CustomPage>> = {};
        for (const l of locales.filter((x) => x !== locale)) {
          const other = await payload.findByID({ collection: "custom-pages", id: doc.id, locale: l, ...common }).catch(() => null);
          if (other) others[l] = other as CustomPage;
        }
        return { doc, others, draft };
      })(),
    );
  } catch (err) {
    console.error("[cms] custom page unavailable:", err instanceof Error ? err.message : err);
    return null;
  }
}

/** Every published custom page in every language (published only, no request context): sitemap and static params. Null = CMS unavailable. */
export async function getPublishedCustomPages(): Promise<Partial<Record<Locale, CustomPage[]>> | null> {
  if (!cmsEnabled()) return null;
  try {
    const payload = await getPayloadClient();
    const out: Partial<Record<Locale, CustomPage[]>> = {};
    for (const locale of locales) {
      const res = await withTimeout(payload.find({ collection: "custom-pages", locale, fallbackLocale: false, limit: 200, depth: 1, overrideAccess: false }));
      out[locale] = res.docs as CustomPage[];
    }
    return out;
  } catch {
    return null;
  }
}
