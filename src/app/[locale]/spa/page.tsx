import type { Metadata } from "next";
import { FinalBooking } from "@/components/home/FinalBooking";
import { EditorialSplit, FactList, Gallery, PageHero } from "@/components/page/PageParts";
import { FadeIn } from "@/components/Reveal";
import { PillLink } from "@/components/ui";
import { getDictionary } from "@/content/dictionary";
import { hotel } from "@/content/hotel";
import { getPages } from "@/content/pages";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

/** The hotel's own treatment & price list page (prices change; we link rather than copy). */
const DAY_SPA_URL = "https://www.hotelcentral.ba/facilities/wellness-day-spa/";

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const m = getPages(locale).spa.meta;
  return pageMetadata(locale, "/spa", m.title, m.description, "/images/3069.jpg");
}

export default async function Spa({ params }: P) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const s = getPages(locale).spa;
  return (
    <>
      <PageHero
        image={{ src: "/images/3069.jpg", alt: "The heated 25-metre indoor pool with a wave mosaic", position: "50% 60%" }}
        eyebrow={s.hero.eyebrow}
        title={s.hero.title}
        intro={s.hero.intro}
        meta={["25 m", "(Club & Spa)", "Sauna · Steam · Caldarium"]}
      />
      <EditorialSplit
        tone="olive"
        label={s.pool.label}
        title={s.pool.title}
        body={s.pool.body}
        line="spa"
        images={[
          { src: "/images/pool-03.jpg", alt: "Curved pool edge with tiled benches" },
          { src: "/images/bazen.jpg", alt: "Pool hall with mosaic wall" },
        ]}
      />
      <section className="bg-ivory px-[var(--gutter)] py-16 text-ink md:py-[6vw]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-[2vw]">
          <p className="label md:col-span-3">{s.facilities}</p>
          <FadeIn className="md:col-span-6 md:col-start-5">
            <FactList items={s.facts} />
          </FadeIn>
        </div>
      </section>
      <EditorialSplit
        tone="deep"
        reverse
        label={s.gym.label}
        title={s.gym.title}
        body={s.gym.body}
        line="rooms"
        images={[
          { src: "/images/pool-04.jpg", alt: "The pool hall of the Club & Spa" },
          { src: "/images/pool-08.jpg", alt: "Guests in the hydrotherapy pool" },
        ]}
      />
      <EditorialSplit
        label={s.dayspa.label}
        title={s.dayspa.title}
        body={s.dayspa.body}
        line="restaurant"
        images={[
          { src: "/images/final-6230.jpg", alt: "Relaxation lounge with a forest mural" },
          { src: "/images/final-6202.jpg", alt: "Treatment room of the day spa" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <PillLink href={DAY_SPA_URL} external>
            {s.dayspa.cta}
          </PillLink>
          <a href={hotel.phoneHref} className="label link-line">
            {hotel.phoneDisplay}
          </a>
        </div>
      </EditorialSplit>
      <Gallery
        tone="olive"
        images={[
          { src: "/images/central-spa_relax-room.jpg", alt: "Spa relaxation room" },
          { src: "/images/final-6211.jpg", alt: "Spa bath detail" },
          { src: "/images/central-spa_bath.jpg", alt: "Spa bathing room with curtains" },
          { src: "/images/final-6167.jpg", alt: "Spa reception" },
          { src: "/images/pool-05.jpg", alt: "The pool and its mosaic wall" },
        ]}
      />
      <FinalBooking dict={dict} image="/images/3069.jpg" alt="The indoor pool" />
    </>
  );
}
