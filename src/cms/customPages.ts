import "server-only";
import type { Locale } from "@/lib/i18n";
import { buildView, collectSitemap, type CustomPageView } from "./customPagesView";
import { getCustomPageDoc, getPublishedCustomPages } from "./data";

export type { CustomPageView } from "./customPagesView";

/** The page at `/<locale>/<slug>`, ready to render, or null (CMS off, unknown, unpublished, untranslated, unreachable). */
export async function getCustomPage(slug: string, locale: Locale): Promise<CustomPageView | null> {
  const read = await getCustomPageDoc(slug, locale);
  return read ? buildView(read, locale) : null;
}

/** Published, indexable pages for the sitemap and static params. Null = CMS unavailable. */
export async function getSitemapCustomPages() {
  const all = await getPublishedCustomPages();
  return all ? collectSitemap(all) : null;
}
