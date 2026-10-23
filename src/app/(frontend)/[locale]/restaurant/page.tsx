import type { Metadata } from "next";
import { FinalBooking } from "@/components/home/FinalBooking";
import { EditorialSplit, Gallery, PageHero } from "@/components/page/PageParts";
import { PillLink } from "@/components/ui";
import { getDictionary } from "@/content/dictionary";
import { getPages } from "@/content/pages";
import { href, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const m = getPages(locale).restaurant.meta;
  return pageMetadata(locale, "/restaurant", m.title, m.description, "/images/dorucak5.jpg");
}

export default async function Restaurant({ params }: P) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const r = getPages(locale).restaurant;
  return (
    <>
      <PageHero
        image={{ src: "/images/dorucak5.jpg", alt: "The breakfast buffet at Restaurant Central" }}
        eyebrow={r.hero.eyebrow}
        title={r.hero.title}
        intro={r.hero.intro}
        meta={["Hotel Central", "(Restaurant)", dict.home.restaurant.metaRight]}
      />
      <EditorialSplit
        label={r.breakfast.label}
        title={r.breakfast.title}
        body={r.breakfast.body}
        line="restaurant"
        images={[
          { src: "/images/hc-comfort-2.jpg", alt: "Breakfast tray with tea and croissants" },
          { src: "/images/dorucak6.jpg", alt: "Bosnian coffee in a copper džezva" },
        ]}
      />
      <Gallery
        tone="deep"
        images={[
          { src: "/images/dorucak4.jpg", alt: "Breakfast buffet" },
          { src: "/images/dorucak1.jpg", alt: "Fresh fruit platter at breakfast" },
          { src: "/images/breakfast2.jpg", alt: "Fried eggs served at breakfast" },
          { src: "/images/dorucak2.jpg", alt: "Cheese selection at the buffet" },
          { src: "/images/breakfast3.jpg", alt: "Eggs with asparagus" },
        ]}
      />
      <EditorialSplit
        tone="olive"
        reverse
        label={r.catering.label}
        title={r.catering.title}
        body={r.catering.body}
        line="spa"
        images={[
          { src: "/images/breakfast1.jpg", alt: "Omelette served at breakfast" },
          { src: "/images/dorucak3.jpg", alt: "Cheese and cold cuts at the buffet" },
        ]}
      >
        <PillLink href={href(locale, "/contact")} tone="light">
          {r.catering.cta}
        </PillLink>
      </EditorialSplit>
      <FinalBooking dict={dict} />
    </>
  );
}
