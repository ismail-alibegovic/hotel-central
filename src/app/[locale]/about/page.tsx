import type { Metadata } from "next";
import { FinalBooking } from "@/components/home/FinalBooking";
import { EditorialSplit, FactList, Gallery, PageHero, Statement } from "@/components/page/PageParts";
import { PillLink } from "@/components/ui";
import { getDictionary } from "@/content/dictionary";
import { getPages } from "@/content/pages";
import { href, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const m = getPages(locale).about.meta;
  return pageMetadata(locale, "/about", m.title, m.description, "/images/3064.jpg");
}

export default async function About({ params }: P) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const a = getPages(locale).about;
  return (
    <>
      <PageHero
        image={{ src: "/images/3064.jpg", alt: "Hotel Central's façade and corner tower on Ćumurija street", position: "55% 35%" }}
        eyebrow={a.hero.eyebrow}
        title={a.hero.title}
        intro={a.hero.intro}
        meta={["Hotel Central", "(01–03)", "Ćumurija 8"]}
      />
      <EditorialSplit
        label={a.story.label}
        index="Hotel Central, Sarajevo"
        title={a.story.title}
        body={a.story.body}
        line="hotel"
        images={[
          { src: "/images/3075.jpg", alt: "The hotel's façade lit at night", position: "45% 40%" },
          { src: "/images/p11.jpg", alt: "Terrace of the presidential suite above the rooftops" },
        ]}
      >
        <div className="max-w-[420px]">
          <FactList items={a.facts} />
        </div>
      </EditorialSplit>
      <EditorialSplit
        tone="deep"
        reverse
        label={a.rooms.label}
        title={a.rooms.title}
        body={a.rooms.body}
        line="rooms"
        images={[
          { src: "/images/3067.jpg", alt: "A suite with patterned wallpaper and seating area" },
          { src: "/images/dorucak6.jpg", alt: "Bosnian coffee served at breakfast" },
        ]}
      >
        <PillLink href={href(locale, "/rooms")} tone="light">
          {a.rooms.cta}
        </PillLink>
      </EditorialSplit>
      <Statement text={a.statement} label="(—)" />
      <EditorialSplit
        tone="olive"
        label={a.wellness.label}
        title={a.wellness.title}
        body={a.wellness.body}
        line="spa"
        images={[
          { src: "/images/3069.jpg", alt: "The heated 25-metre pool" },
          { src: "/images/final-6230.jpg", alt: "Relaxation lounge of the spa" },
        ]}
      >
        <PillLink href={href(locale, "/spa")} tone="light">
          {a.wellness.cta}
        </PillLink>
      </EditorialSplit>
      <Gallery
        images={[
          { src: "/images/p05.jpg", alt: "Living room of the presidential suite" },
          { src: "/images/final-6202.jpg", alt: "Treatment room of the day spa" },
          { src: "/images/3073.jpg", alt: "The conference room" },
          { src: "/images/dorucak5.jpg", alt: "Breakfast at Restaurant Central" },
          { src: "/images/junior02.jpg", alt: "Junior suite bedroom" },
        ]}
      />
      <FinalBooking dict={dict} image="/images/3075.jpg" alt="Hotel Central at night" />
    </>
  );
}
