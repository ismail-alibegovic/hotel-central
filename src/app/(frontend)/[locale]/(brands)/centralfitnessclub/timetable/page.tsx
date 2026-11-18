import type { Metadata } from "next";
import { ClubTimetable } from "@/components/club/ClubPages";
import { getClub } from "@/cms/brands";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const { c, images } = await getClub(locale);
  return pageMetadata(locale, "/centralfitnessclub/timetable", c.meta.timetableTitle, c.meta.timetableDescription, images.timetableHero.src);
}

export default async function TimetablePage({ params }: P) {
  const { locale } = await params;
  const { c, timetable, images, contact } = await getClub(locale);
  return <ClubTimetable locale={locale} c={c} timetable={timetable} img={images.timetableHero} contact={contact} />;
}
