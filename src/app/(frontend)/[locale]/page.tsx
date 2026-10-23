import type { Metadata } from "next";
import { EventsSection } from "@/components/home/EventsSection";
import { FinalBooking } from "@/components/home/FinalBooking";
import { Hero } from "@/components/home/Hero";
import { HotelExperience } from "@/components/home/HotelExperience";
import { LocationSection } from "@/components/home/LocationSection";
import { RestaurantShowcase } from "@/components/home/RestaurantShowcase";
import { RoomCarousel } from "@/components/home/RoomCarousel";
import { SpaShowcase } from "@/components/home/SpaShowcase";
import { getDictionary } from "@/content/dictionary";
import { rooms } from "@/content/rooms";
import type { Locale } from "@/lib/i18n";
import { alternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return { title: { absolute: dict.meta.title }, description: dict.meta.description, alternates: alternates(locale) };
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return (
    <>
      <Hero locale={locale} dict={dict} />
      <HotelExperience locale={locale} dict={dict} />
      <RoomCarousel locale={locale} dict={dict} rooms={rooms} />
      <SpaShowcase locale={locale} dict={dict} />
      <RestaurantShowcase locale={locale} dict={dict} />
      <LocationSection locale={locale} dict={dict} />
      <EventsSection locale={locale} dict={dict} />
      <FinalBooking dict={dict} />
    </>
  );
}
