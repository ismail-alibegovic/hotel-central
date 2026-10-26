import type { Metadata } from "next";
import { LivePreviewListener } from "@/cms/LivePreviewListener";
import { getHome } from "@/cms/home";
import { getHotelContact } from "@/cms/hotelInfo";
import { getRooms } from "@/cms/rooms";
import { EventsSection } from "@/components/home/EventsSection";
import { FinalBooking } from "@/components/home/FinalBooking";
import { Hero } from "@/components/home/Hero";
import { HotelExperience } from "@/components/home/HotelExperience";
import { LocationSection } from "@/components/home/LocationSection";
import { RestaurantShowcase } from "@/components/home/RestaurantShowcase";
import { RoomCarousel } from "@/components/home/RoomCarousel";
import { SpaShowcase } from "@/components/home/SpaShowcase";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { alternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const { meta, draft } = await getHome(locale, getDictionary(locale));
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: alternates(locale),
    ...(meta.ogImage ? { openGraph: { title: meta.title, description: meta.description, url: `/${locale}`, images: [{ url: meta.ogImage }] } } : {}),
    // A draft preview is for staff only and is never indexable.
    ...(draft ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const { dict, images, draft } = await getHome(locale, getDictionary(locale));
  const [{ rooms }, contact] = await Promise.all([getRooms(locale), getHotelContact(locale)]);
  return (
    <>
      <Hero locale={locale} dict={dict} images={images} />
      <HotelExperience locale={locale} dict={dict} images={images} />
      <RoomCarousel locale={locale} dict={dict} rooms={rooms} />
      <SpaShowcase locale={locale} dict={dict} images={images} />
      <RestaurantShowcase locale={locale} dict={dict} images={images} />
      <LocationSection locale={locale} dict={dict} images={images} contact={contact} />
      <EventsSection locale={locale} dict={dict} images={images} />
      <FinalBooking dict={dict} phone={contact.phone} {...(images.final ? { image: images.final.src, alt: images.final.alt } : {})} />
      {/* Last on purpose: anything before the hero would shift its position in the React tree and change its generated ids. */}
      {draft && <LivePreviewListener />}
    </>
  );
}
