import "server-only";
import { draftMode, headers } from "next/headers";
import type { Page, Room } from "@/payload-types";
import type { Locale } from "@/lib/i18n";
import { isStaffUser } from "./access";
import { cmsEnabled } from "./enabled";
import { getPayloadClient } from "./payload";

type Doc<C extends "pages" | "rooms"> = C extends "pages" ? Page : Room;
export type CmsResult<C extends "pages" | "rooms"> = { doc: Doc<C> | null; draft: boolean };

/**
 * Read one CMS document for a locale. Returns `{ doc: null }` whenever the CMS is off, the document
 * is missing/unpublished, or anything fails — callers then render the static content unchanged.
 *
 * Draft privacy: unpublished content is only returned when Next Draft Mode is on AND the request
 * carries a valid staff session. Everyone else is limited to published documents by collection access.
 */
export async function getCmsDoc<C extends "pages" | "rooms">(collection: C, slug: string, locale: Locale): Promise<CmsResult<C>> {
  if (!cmsEnabled()) return { doc: null, draft: false };
  try {
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
  } catch (err) {
    console.error("[cms] falling back to static content:", err instanceof Error ? err.message : err);
    return { doc: null, draft: false };
  }
}
