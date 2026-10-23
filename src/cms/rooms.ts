import "server-only";
import { rooms as staticRooms, type Room } from "@/content/rooms";
import type { Locale } from "@/lib/i18n";
import { getCmsDoc, getCmsDocs } from "./data";
import { mergeRooms } from "./overrides";

/**
 * Rooms for a locale: CMS copy/photos/order/visibility layered over the static rooms, never touching the
 * booking mapping. `draft` is true only for a signed-in staff member previewing.
 */
export async function getRooms(locale: Locale): Promise<{ rooms: Room[]; draft: boolean }> {
  const { docs, draft } = await getCmsDocs("rooms", locale);
  return { rooms: docs.length ? mergeRooms(staticRooms, docs, locale) : staticRooms, draft };
}

/** Search-engine overrides of one room for a locale (empty = use the built-in text). */
export async function getRoomSeo(slug: string, locale: Locale): Promise<{ title?: string; description?: string; noindex: boolean }> {
  const { doc } = await getCmsDoc("rooms", slug, locale);
  const t = (v: string | null | undefined) => (v && v.trim() ? v.trim() : undefined);
  return { title: t(doc?.metaTitle), description: t(doc?.metaDescription), noindex: doc?.noindex === true };
}
