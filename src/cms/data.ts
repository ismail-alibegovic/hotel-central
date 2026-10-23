import "server-only";
import { draftMode, headers } from "next/headers";
import type { Page, Room } from "@/payload-types";
import type { Locale } from "@/lib/i18n";
import { isStaffUser } from "./access";
import { cmsEnabled } from "./enabled";
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

async function readCmsDoc<C extends "pages" | "rooms">(collection: C, slug: string, locale: Locale): Promise<CmsResult<C>> {
  const payload = await getPayloadClient();
  let draft = false;
  let user = null;
  if ((await draftMode()).isEnabled) {
    const auth = await payload.auth({ headers: await headers() });
    if (isStaffUser(auth.user)) {
      draft = true;
      user = auth.user;
    }
  }
  const res = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    locale,
    fallbackLocale: false,
    draft,
    limit: 1,
    depth: 0,
    overrideAccess: false,
    ...(user ? { user } : {}),
  });
  return { doc: (res.docs[0] as Doc<C> | undefined) ?? null, draft };
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
