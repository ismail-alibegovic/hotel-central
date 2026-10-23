import type { Metadata } from "next";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { LivePreviewListener } from "@/cms/LivePreviewListener";
import { getPageLayout } from "@/cms/pages";
import { getRooms } from "@/cms/rooms";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const { meta, ogImage } = await getPageLayout("spa", locale);
  return pageMetadata(locale, "/spa", meta.title, meta.description, ogImage);
}

export default async function Spa({ params }: P) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const { blocks, draft } = await getPageLayout("spa", locale);
  // Rooms are only fetched by pages that show them (the room list, or a hero counting them).
  const needsRooms = blocks.some((b) => b.type === "roomList" || (b.type === "hero" && b.meta?.some((m) => m.includes("{roomCount}"))));
  const rooms = needsRooms ? (await getRooms(locale)).rooms : [];
  return (
    <>
      {draft && <LivePreviewListener />}
      <BlockRenderer blocks={blocks} locale={locale} dict={dict} rooms={rooms} />
    </>
  );
}
