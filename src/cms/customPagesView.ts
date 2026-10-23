import type { CustomPage } from "@/payload-types";
import { locales, type Locale } from "@/lib/i18n";
import type { Block } from "./blocks/types";
import { resolveImage, resolveLayout } from "./resolve";
import { isValidSlug } from "./slugs";

const text = (v: string | null | undefined) => (v && v.trim() ? v.trim() : undefined);

export type CustomPageView = {
  title: string;
  description?: string;
  ogImage?: string;
  blocks: Block[];
  noindex: boolean;
  draft: boolean;
  /** Address of this page in each language where it exists and has something to show (paths without the language prefix). */
  paths: Partial<Record<Locale, string>>;
};

/** A language "has" the page when it has an address and at least one section that is complete in that language. */
export function usableIn(doc: CustomPage | undefined, locale: Locale): { slug: string; blocks: Block[] } | null {
  const slug = text(doc?.slug);
  if (!doc || !slug || !isValidSlug(slug)) return null;
  const { blocks } = resolveLayout(doc.layout, locale);
  return blocks.length ? { slug, blocks } : null;
}

/** Turn the document read for `locale` (and its siblings in the other languages) into what the route renders; null = nothing to show. */
export function buildView(read: { doc: CustomPage; others: Partial<Record<Locale, CustomPage>>; draft: boolean }, locale: Locale): CustomPageView | null {
  const here = usableIn(read.doc, locale);
  if (!here) return null;
  const paths: CustomPageView["paths"] = { [locale]: `/${here.slug}` };
  for (const l of locales) {
    if (l === locale) continue;
    const there = usableIn(read.others[l], l);
    if (there) paths[l] = `/${there.slug}`;
  }
  return {
    title: text(read.doc.metaTitle) ?? text(read.doc.title) ?? here.slug,
    description: text(read.doc.metaDescription),
    ogImage: resolveImage(read.doc.ogImage)?.src,
    blocks: here.blocks,
    noindex: read.doc.noindex === true,
    draft: read.draft,
    paths,
  };
}

/** Published, indexable pages for the sitemap: per page, its address in each language that can actually show it. */
export function collectSitemap(all: Partial<Record<Locale, CustomPage[]>>): { id: string; paths: Partial<Record<Locale, string>> }[] {
  const byId = new Map<string, { paths: Partial<Record<Locale, string>>; noindex: boolean }>();
  for (const l of locales) {
    for (const doc of all[l] ?? []) {
      const ok = usableIn(doc, l);
      if (!ok) continue;
      const entry = byId.get(String(doc.id)) ?? { paths: {}, noindex: false };
      entry.paths[l] = `/${ok.slug}`;
      entry.noindex ||= doc.noindex === true;
      byId.set(String(doc.id), entry);
    }
  }
  return [...byId].filter(([, v]) => !v.noindex).map(([id, v]) => ({ id, paths: v.paths }));
}
