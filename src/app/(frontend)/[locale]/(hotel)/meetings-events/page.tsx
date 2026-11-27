import type { Metadata } from "next";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { EventEnquiry } from "@/components/EventEnquiry";
import { getHotelContact } from "@/cms/hotelInfo";
import { followContact } from "@/cms/hotelInfoMerge";
import { LivePreviewListener } from "@/cms/LivePreviewListener";
import { getPageLayout } from "@/cms/pages";
import { getRooms } from "@/cms/rooms";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const { meta, ogImage, noindex } = await getPageLayout("meetings-events", locale);
  return pageMetadata(locale, "/meetings-events", meta.title, meta.description, ogImage, noindex);
}

export default async function Events({ params }: P) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const { blocks, draft } = await getPageLayout("meetings-events", locale);
  // Rooms are only fetched by pages that show them (the room list, or a hero counting them).
  const needsRooms = blocks.some((b) => b.type === "roomList" || (b.type === "hero" && b.meta?.some((m) => m.includes("{roomCount}"))));
  const rooms = needsRooms ? (await getRooms(locale)).rooms : [];
  const last = blocks.findIndex((b) => b.type === "finalBooking");
  const cut = last === -1 ? blocks.length : last;
  return (
    <>
      {draft && <LivePreviewListener />}
      {/* The enquiry form sits right before the closing booking band (or at the end if the page has none) */}
      <BlockRenderer blocks={blocks.slice(0, cut)} locale={locale} dict={dict} rooms={rooms} />
      {/* The form's fallback sentence ("…or call …") follows the phone and e-mail in Hotel Information */}
      <EventEnquiry locale={locale} dict={followContact(dict, await getHotelContact(locale))} />
      <BlockRenderer blocks={blocks.slice(cut)} locale={locale} dict={dict} rooms={rooms} />
    </>
  );
}
