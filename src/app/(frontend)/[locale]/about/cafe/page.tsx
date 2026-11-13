import type { Metadata } from "next";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { OpeningHours } from "@/components/page/OpeningHours";
import { LivePreviewListener } from "@/cms/LivePreviewListener";
import { getHotelContact } from "@/cms/hotelInfo";
import { getPageLayout } from "@/cms/pages";
import { getDictionary } from "@/content/dictionary";
import { getPages } from "@/content/pages";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

/**
 * Central Café (approved sitemap 02.1, CH-007): the former Restaurant Central page, now a sub-page of About.
 * Its sections are still edited in the CMS as the page "Central Café" (key `restaurant`); the opening hours come
 * from Hotel Information → Opening hours (place: Café, or Restaurant).
 */
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const { meta, ogImage, noindex } = await getPageLayout("restaurant", locale);
  return pageMetadata(locale, "/about/cafe", meta.title, meta.description, ogImage, noindex);
}

export default async function Cafe({ params }: P) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const [{ blocks, draft }, contact] = await Promise.all([getPageLayout("restaurant", locale), getHotelContact(locale)]);
  const h = getPages(locale).restaurant.hours;
  const heroCount = blocks[0]?.type === "hero" ? 1 : 0;
  return (
    <>
      {draft && <LivePreviewListener />}
      <BlockRenderer blocks={blocks.slice(0, heroCount)} locale={locale} dict={dict} rooms={[]} />
      <OpeningHours
        hours={contact.hours}
        facilities={["cafe", "restaurant"]}
        label={h.label}
        title={h.title}
        fallback={h.fallback}
        note={h.note}
        phone={contact.phone}
        photos={[
          { src: "/images/hotel/restaurant-arches.jpg", alt: locale === "bs" ? "Sala sa lučnim prozorima prema ulici" : "The café's dining room with tall arched windows onto the street", position: "50% 60%" },
          { src: "/images/hotel/cafe-corner.jpg", alt: locale === "bs" ? "Sto uz prozor sa pogledom na Ćumuriju" : "A corner table by the window looking onto Ćumurija street", position: "50% 70%" },
        ]}
      />
      <BlockRenderer blocks={blocks.slice(heroCount)} locale={locale} dict={dict} rooms={[]} />
    </>
  );
}
