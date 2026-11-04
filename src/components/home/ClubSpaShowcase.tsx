import Image from "next/image";
import type { Dictionary } from "@/content/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { DecorativeLine } from "../DecorativeLine";
import { Photo } from "../Photo";
import { FadeIn, RevealLines } from "../Reveal";
import { MetaRow, PillLink } from "../ui";
import { img, type HomeImages } from "./homeImages";

/**
 * CH-004: the former "Club & Spa" preview, as two separate areas — Central Fitness Club and Central Day Spa — each with
 * its own logo, photograph, short list and button to its own section of the site. Set in the homepage's own editorial
 * language (ivory, ink, hairlines, outlined buttons) so it sits calmly between the rooms and the restaurant; the two
 * brands' colours are kept for their own pages. Photos stay editable as the homepage's "Club & Spa" photos in the CMS.
 */
const alts = {
  en: { pool: "The 25-metre pool of Central Fitness Club with its wave mosaic", spa: "A candle-lit treatment room at Central Day Spa" },
  bs: { pool: "Bazen od 25 metara u Central Fitness Clubu sa mozaikom talasa", spa: "Tretman soba u Central Day Spa uz svjetlost svijeća" },
};

type Area = { id: string; name: string; path: string; mark: { src: string; w: number; h: number; cls: string }; photo: { src: string; alt: string; position?: string }; tagline: string; body: string; facts: string[]; cta: string };

function AreaCard({ a, locale, offset }: { a: Area; locale: Locale; offset?: boolean }) {
  return (
    <article aria-labelledby={a.id} className={offset ? "md:mt-[7vw]" : ""}>
      <Photo src={a.photo.src} alt={a.photo.alt} position={a.photo.position} sizes="(min-width: 1024px) 40vw, 100vw" grade="grade" className="aspect-[4/5] md:aspect-[5/6]" parallax={4} />
      <div className="mt-8 flex items-end justify-between gap-6 border-b border-ink/20 pb-6">
        <Image src={a.mark.src} alt="" width={a.mark.w} height={a.mark.h} className={`h-auto ${a.mark.cls}`} />
        <p className="label text-right opacity-70">{a.tagline}</p>
      </div>
      <h3 id={a.id} className="sr-only">
        {a.name}
      </h3>
      <FadeIn as="p" className="body-copy mt-6 max-w-[44ch] opacity-85">
        {a.body}
      </FadeIn>
      <ul className="label mt-6 grid grid-cols-2 gap-x-6">
        {a.facts.map((f) => (
          <li key={f} className="border-t border-ink/15 py-[0.7em]">
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <PillLink href={href(locale, a.path)}>{a.cta}</PillLink>
      </div>
    </article>
  );
}

export function ClubSpaShowcase({ locale, dict, images }: { locale: Locale; dict: Dictionary; images?: HomeImages }) {
  const d = dict.home.club;
  const pool = img(images?.spaMain, { src: "/images/3069.jpg", alt: alts[locale].pool, position: "50% 60%" });
  const spa = img(images?.spaSecondary, { src: "/images/final-6202.jpg", alt: alts[locale].spa, position: "50% 50%" });
  const areas: Area[] = [
    { id: "club-fitness", name: "Central Fitness Club", path: "/centralfitnessclub", mark: { src: "/brand/central-fitness-club-mark-ink.png", w: 542, h: 640, cls: "w-[64px] md:w-[72px]" }, photo: pool, ...d.fitness },
    { id: "club-spa", name: "Central Day Spa", path: "/dayspa", mark: { src: "/brand/central-day-spa-mark-ink.png", w: 640, h: 579, cls: "w-[78px] md:w-[88px]" }, photo: spa, ...d.spa },
  ];

  return (
    <section aria-labelledby="club-title" className="relative overflow-hidden bg-ivory pb-16 pt-[30px] text-ink md:pb-[7vw] md:pt-[3vw]">
      <DecorativeLine variant="spa" className="z-0 hidden md:block" />
      <MetaRow left={d.metaLeft} center={d.metaCenter} right={d.metaRight} className="relative z-[1]" />

      <div className="relative z-[1] mt-10 grid gap-8 px-[var(--gutter)] md:mt-[4vw] md:grid-cols-12 md:items-end md:gap-x-[2vw]">
        <h2 id="club-title" className="font-display text-[13vw] leading-[0.9] md:col-span-7 md:text-[6.4vw]">
          <RevealLines lines={d.title} lineClassName={["", "pl-[8vw] md:pl-[9vw]"]} />
        </h2>
        <FadeIn as="p" className="body-copy max-w-[40ch] opacity-85 md:col-span-4 md:col-start-9 md:pb-[0.8vw]">
          {d.intro}
        </FadeIn>
      </div>

      <div className="relative z-[1] mt-14 grid gap-16 px-[var(--gutter)] md:mt-[5vw] md:grid-cols-12 md:gap-x-[2vw]">
        <div className="md:col-span-5 md:col-start-1">
          <AreaCard a={areas[0]} locale={locale} />
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <AreaCard a={areas[1]} locale={locale} offset />
        </div>
      </div>
    </section>
  );
}
