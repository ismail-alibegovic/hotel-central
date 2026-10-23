import type { Dictionary } from "@/content/dictionary";
import { hotel, maps } from "@/content/hotel";
import { href, type Locale } from "@/lib/i18n";
import { DecorativeLine } from "../DecorativeLine";
import { Photo } from "../Photo";
import { FadeIn, RevealLines } from "../Reveal";
import { Arrow, MetaRow, PillLink } from "../ui";
import { img, type HomeImages } from "./homeImages";
import { fitStyle } from "@/lib/fit";

export function LocationSection({ locale, dict, images }: { locale: Locale; dict: Dictionary; images?: HomeImages }) {
  const d = dict.home.location;
  const photo = img(images?.location, { src: "/images/3064.jpg", alt: "Hotel Central's corner tower on Ćumurija street", position: "62% 30%" });
  return (
    <section aria-labelledby="location-title" className="relative overflow-hidden bg-deep pb-16 pt-[30px] text-white md:pb-[6vw] md:pt-[3vw]">
      <DecorativeLine variant="location" tone="light" className="z-0 hidden md:block" />
      <MetaRow left={d.metaLeft} center={d.metaCenter} right={d.metaRight} className="relative z-[2]" />

      <div className="relative z-[2] mt-10 grid grid-cols-1 gap-12 px-[var(--gutter)] md:mt-[5vw] md:grid-cols-12 md:gap-x-[2vw]">
        <div className="md:col-span-6 md:pt-[2vw]">
          <h2 id="location-title" className="font-display text-[length:var(--fs-m)] leading-[0.9] md:text-[5.6vw]" style={fitStyle(d.title, 82, 13)}>
            <RevealLines lines={d.title} lineClassName={["", "pl-[6vw] md:pl-[7vw]"]} />
          </h2>
          <div className="mt-10 grid gap-10 md:mt-[4.5vw] md:grid-cols-[1fr_1.1fr] md:pl-[7vw]">
            <FadeIn as="p" className="body-copy max-w-[38ch]">
              {d.body}
            </FadeIn>
            <FadeIn delay={0.1}>
              <dl className="label divide-y divide-white/20 border-y border-white/20">
                {d.facts.map((f) => (
                  <div key={f.k} className="flex justify-between gap-6 py-[0.85em]">
                    <dt className="opacity-55">{f.k}</dt>
                    <dd className="text-right">{f.v}</dd>
                  </div>
                ))}
              </dl>
              <address className="label mt-6 not-italic leading-[1.7]">
                {hotel.street}, {hotel.postalCode} {hotel.city}
              </address>
            </FadeIn>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 md:pl-[7vw]">
            <PillLink href={maps.directions} external tone="light">
              {dict.common.directions}
            </PillLink>
            <a href={href(locale, "/location")} className="label link-line flex items-center gap-3">
              {d.cta} <Arrow />
            </a>
          </div>
        </div>

        <div className="relative md:col-span-5 md:col-start-8">
          <FadeIn className="relative aspect-[4/5] w-full overflow-hidden bg-ivory md:aspect-[4/5.2]">
            <iframe
              title={`Map — ${hotel.name}, ${hotel.street}`}
              src={maps.embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map-tint absolute inset-0 h-full w-full border-0"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/15" />
          </FadeIn>
          <div className="absolute -bottom-8 left-3 w-[38%] md:-bottom-[3vw] md:-left-[6vw] md:w-[38%]">
            <Photo
              src={photo.src}
              alt={photo.alt}
              sizes="(min-width: 1024px) 16vw, 42vw"
              position={photo.position}
              className="aspect-[3/4]"
              grade="grade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
