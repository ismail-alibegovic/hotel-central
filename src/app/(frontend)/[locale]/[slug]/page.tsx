import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlternateLocales } from "@/components/AlternateLocales";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { LivePreviewListener } from "@/cms/LivePreviewListener";
import { getCustomPage } from "@/cms/customPages";
import { getRooms } from "@/cms/rooms";
import { isValidSlug } from "@/cms/slugs";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { customAlternates, pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale; slug: string }> };

/**
 * Pages created in the CMS (`/en/offers`, `/bs/ponude`). Built-in routes (about, rooms, spa …) are separate static
 * segments and always win; anything that is not a published CMS page answers 404, exactly as before the CMS existed.
 *
 * Rendered per request, deliberately: a 404 for an address that is not (yet) a page would otherwise be cached, and a link
 * shared before publication would keep failing after it. Custom pages are few and the read is one indexed query with a
 * 5-second cap, so freshness is worth more than static output here. Draft previews are always per request anyway.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = isValidSlug(slug) ? await getCustomPage(slug, locale) : null;
  if (!page) return {};
  // Staff previewing a draft must never be indexable, whatever the page's own setting.
  return pageMetadata(locale, `/${slug}`, page.title, page.description ?? "", page.ogImage, page.noindex || page.draft, customAlternates(locale, page.paths));
}

export default async function CustomPageRoute({ params }: P) {
  const { locale, slug } = await params;
  const page = isValidSlug(slug) ? await getCustomPage(slug, locale) : null;
  if (!page) notFound();
  const dict = getDictionary(locale);
  // Rooms are only fetched by pages that show them (the room list, or a hero counting them).
  const needsRooms = page.blocks.some((b) => b.type === "roomList" || (b.type === "hero" && b.meta?.some((m) => m.includes("{roomCount}"))));
  const rooms = needsRooms ? (await getRooms(locale)).rooms : [];
  return (
    <>
      {page.draft && <LivePreviewListener />}
      <AlternateLocales paths={{ en: page.paths.en ?? null, bs: page.paths.bs ?? null }} />
      <BlockRenderer blocks={page.blocks} locale={locale} dict={dict} rooms={rooms} />
    </>
  );
}
