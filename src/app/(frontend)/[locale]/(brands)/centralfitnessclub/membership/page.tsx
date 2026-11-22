import type { Metadata } from "next";
import { ClubMembership } from "@/components/club/ClubPages";
import { getClub } from "@/cms/brands";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const { c, images } = await getClub(locale);
  return pageMetadata(locale, "/centralfitnessclub/membership", c.meta.membershipTitle, c.meta.membershipDescription, images.membershipHero.src);
}

export default async function Membership({ params }: P) {
  const { locale } = await params;
  const { c, plans, images, contact } = await getClub(locale);
  return <ClubMembership c={c} plans={plans} images={{ hero: images.membershipHero, tour: images.benefits }} contact={contact} />;
}
