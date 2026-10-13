import type { Metadata } from "next";
import { DecorativeLine } from "@/components/DecorativeLine";
import { FinalBooking } from "@/components/home/FinalBooking";
import { EditorialSplit, PageHero } from "@/components/page/PageParts";
import { FadeIn } from "@/components/Reveal";
import { PillLink } from "@/components/ui";
import { getDictionary } from "@/content/dictionary";
import { hotel, maps } from "@/content/hotel";
import { getPages } from "@/content/pages";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const m = getPages(locale).location.meta;
  return pageMetadata(locale, "/location", m.title, m.description, "/images/3064.jpg");
}

export default async function Location({ params }: P) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const l = getPages(locale).location;
  return (
    <>
      <PageHero
        image={{ src: "/images/3064.jpg", alt: "Hotel Central on Ćumurija street", position: "55% 40%" }}
        eyebrow={l.hero.eyebrow}
        title={l.hero.title}
        intro={l.hero.intro}
        meta={[hotel.street, "(Location)", `${hotel.postalCode} ${hotel.city}`]}
      />

      {/* Map + arrival */}
      <section className="relative overflow-hidden bg-ivory px-[var(--gutter)] py-16 text-ink md:py-[6vw]">
        <DecorativeLine variant="location" className="z-0 hidden md:block" />
        <div className="relative z-[1] grid gap-12 md:grid-cols-12 md:gap-x-[2vw]">
          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden ring-1 ring-inset ring-ink/15 md:aspect-[16/11]">
              <iframe
                title={`Map — ${hotel.name}, ${hotel.street}`}
                src={maps.embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-tint absolute inset-0 h-full w-full border-0"
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
              <address className="label not-italic">
                {hotel.name} · {hotel.street}, {hotel.postalCode} {hotel.city}
              </address>
              <PillLink href={maps.directions} external>
                {dict.common.directions}
              </PillLink>
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="label mb-6">(01) {l.arrive}</p>
            <ol className="divide-y divide-ink/20 border-y border-ink/20">
              {l.transport.map((t, i) => (
                <FadeIn as="li" key={t.title} delay={i * 0.05} className="py-5">
                  <p className="label mb-2">{t.title}</p>
                  <p className="body-copy opacity-85">{t.body}</p>
                </FadeIn>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <EditorialSplit
        tone="deep"
        label={l.walk.label}
        title={l.walk.title}
        body={l.walk.body}
        line="rooms"
        images={[
          { src: "/images/3075.jpg", alt: "Hotel Central's corner on Ćumurija street at night", position: "40% 50%" },
          { src: "/images/p11.jpg", alt: "View over Sarajevo's rooftops from the terrace" },
        ]}
      >
        <div>
          <p className="label mb-4 opacity-60">{l.nearby}</p>
          <ul className="label space-y-2">
            {l.landmarks.map((x) => (
              <li key={x} className="border-t border-white/15 pt-2">
                {x}
              </li>
            ))}
          </ul>
        </div>
      </EditorialSplit>
      <FinalBooking dict={dict} />
    </>
  );
}
