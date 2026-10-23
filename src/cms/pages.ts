import "server-only";
import { staticLayout } from "@/content/layouts";
import type { PageKey, PageLayout } from "./blocks/types";
import { getCmsDoc } from "./data";
import { getOffers } from "./offers";
import { getRooms } from "./rooms";
import { resolveImage, resolveLayout } from "./resolve";
import type { Locale } from "@/lib/i18n";

const text = (v: string | null | undefined) => (v && v.trim() ? v.trim() : undefined);

/**
 * The layout of one existing page for a locale: the CMS blocks when a published (or, for previewing staff,
 * draft) document has at least one usable block in this language, otherwise the static layout.
 * `skipped` lists blocks left out because they are not translated yet (logged, never rendered half-empty).
 */
export async function getPageLayout(page: PageKey, locale: Locale): Promise<PageLayout & { noindex: boolean; draft: boolean; source: "cms" | "static"; skipped: string[] }> {
  const fallback = staticLayout(page, locale);
  const { doc, draft } = await getCmsDoc("pages", page, locale);
  if (!doc) return { ...fallback, noindex: false, draft, source: "static", skipped: [] };
  const { blocks, skipped } = resolveLayout(doc.layout, locale);
  if (skipped.length) console.warn(`[cms] ${page}/${locale}: ${skipped.length} section(s) not shown (untranslated): ${skipped.join("; ")}`);
  if (!blocks.length) return { ...fallback, noindex: doc.noindex === true, draft, source: "static", skipped };
  return {
    blocks,
    meta: { title: text(doc.metaTitle) ?? fallback.meta.title, description: text(doc.metaDescription) ?? fallback.meta.description },
    ogImage: resolveImage(doc.ogImage)?.src ?? fallback.ogImage,
    noindex: doc.noindex === true,
    draft,
    source: "cms",
    skipped,
  };
}

/**
 * Everything a page needs to render: its layout plus, only when a section actually uses them, the rooms
 * (room list, or a hero counting rooms) and the offers (Offers section). Pages without those sections
 * make no extra reads.
 */
export async function getPageView(page: PageKey, locale: Locale) {
  const layout = await getPageLayout(page, locale);
  const needsRooms = layout.blocks.some((b) => b.type === "roomList" || (b.type === "hero" && b.meta?.some((m) => m.includes("{roomCount}"))));
  const needsOffers = layout.blocks.some((b) => b.type === "offers");
  const [rooms, offers] = await Promise.all([needsRooms ? getRooms(locale).then((r) => r.rooms) : [], needsOffers ? getOffers(locale) : []]);
  return { ...layout, rooms, offers };
}
