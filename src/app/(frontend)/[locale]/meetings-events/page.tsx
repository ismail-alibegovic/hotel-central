import type { Metadata } from "next";
import { FinalBooking } from "@/components/home/FinalBooking";
import { EditorialSplit, FactList, Gallery, PageHero } from "@/components/page/PageParts";
import { PillLink } from "@/components/ui";
import { getDictionary } from "@/content/dictionary";
import { hotel } from "@/content/hotel";
import { getPages } from "@/content/pages";
import { href, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const m = getPages(locale).events.meta;
  return pageMetadata(locale, "/meetings-events", m.title, m.description, "/images/3073.jpg");
}

export default async function Events({ params }: P) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const e = getPages(locale).events;
  return (
    <>
      <PageHero
        image={{ src: "/images/3073.jpg", alt: "The conference room on the third floor" }}
        eyebrow={e.hero.eyebrow}
        title={e.hero.title}
        intro={e.hero.intro}
        meta={["60–70", "(Meetings & events)", dict.home.events.metaRight]}
      />
      <EditorialSplit
        tone="deep"
        label={e.room.label}
        title={e.room.title}
        body={e.room.body}
        line="rooms"
        images={[
          { src: "/images/img_9202.jpg", alt: "Theatre-style seating in the conference room" },
          { src: "/images/img_9289.jpg", alt: "Conference room door sign" },
        ]}
      >
        <div className="max-w-[440px]">
          <FactList items={e.facts} tone="light" />
        </div>
      </EditorialSplit>
      <Gallery
        images={[
          { src: "/images/img_9226.jpg", alt: "Conference chairs in soft focus" },
          { src: "/images/img_9235.jpg", alt: "Projector detail" },
          { src: "/images/img_9216.jpg", alt: "Seating with delegate microphones" },
          { src: "/images/img_9180.jpg", alt: "Reception counter in the conference area" },
          { src: "/images/img_9271.jpg", alt: "Rows of conference chairs" },
        ]}
      />
      <EditorialSplit
        tone="olive"
        reverse
        label={e.business.label}
        title={e.business.title}
        body={e.business.body}
        line="spa"
        images={[
          { src: "/images/img_9223.jpg", alt: "Microphone on the conference desk" },
          { src: "/images/img_9236.jpg", alt: "Projection screen" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <PillLink href={href(locale, "/contact")} tone="light">
            {e.business.cta}
          </PillLink>
          <a href={`mailto:${hotel.email}`} className="label link-line normal-case tracking-[0.06em]">
            {hotel.email}
          </a>
        </div>
      </EditorialSplit>
      <FinalBooking dict={dict} />
    </>
  );
}
