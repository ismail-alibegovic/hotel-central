import "server-only";
import { rooms as staticRooms, type Room } from "@/content/rooms";
import type { Locale } from "@/lib/i18n";
import { getCmsDocs } from "./data";
import { mergeRooms } from "./overrides";

/**
 * Rooms for a locale: CMS copy/photos/order/visibility layered over the static rooms, never touching the
 * booking mapping. `draft` is true only for a signed-in staff member previewing.
 */
export async function getRooms(locale: Locale): Promise<{ rooms: Room[]; draft: boolean }> {
  const { docs, draft } = await getCmsDocs("rooms", locale);
  return { rooms: docs.length ? mergeRooms(staticRooms, docs, locale) : staticRooms, draft };
}
