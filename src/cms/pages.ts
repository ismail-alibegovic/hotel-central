import "server-only";
import { staticLayout } from "@/content/layouts";
import type { PageKey, PageLayout } from "./blocks/types";
import { getCmsDoc } from "./data";
import { resolveLayout } from "./resolve";
import type { Locale } from "@/lib/i18n";

const text = (v: string | null | undefined) => (v && v.trim() ? v.trim() : undefined);

/**
 * The layout of one existing page for a locale: the CMS blocks when a published (or, for previewing staff,
 * draft) document has at least one usable block in this language, otherwise the static layout.
 * `skipped` lists blocks left out because they are not translated yet (logged, never rendered half-empty).
 */
export async function getPageLayout(page: PageKey, locale: Locale): Promise<PageLayout & { draft: boolean; source: "cms" | "static"; skipped: string[] }> {
  const fallback = staticLayout(page, locale);
  const { doc, draft } = await getCmsDoc("pages", page, locale);
  if (!doc) return { ...fallback, draft, source: "static", skipped: [] };
  const { blocks, skipped } = resolveLayout(doc.layout, locale);
  if (skipped.length) console.warn(`[cms] ${page}/${locale}: ${skipped.length} section(s) not shown (untranslated): ${skipped.join("; ")}`);
  if (!blocks.length) return { ...fallback, draft, source: "static", skipped };
  return {
    blocks,
    meta: { title: text(doc.metaTitle) ?? fallback.meta.title, description: text(doc.metaDescription) ?? fallback.meta.description },
    ogImage: fallback.ogImage,
    draft,
    source: "cms",
    skipped,
  };
}
