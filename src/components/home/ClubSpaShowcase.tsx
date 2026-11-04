import Image from "next/image";
import type { Dictionary } from "@/content/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { DrawLine, FadeIn, RevealLines } from "../Reveal";
import { MetaRow, PillLink } from "../ui";
import type { HomeImages } from "./homeImages";

/**
 * CH-004: Central Fitness Club and Central Day Spa, introduced by their own logos instead of photographs.
 * On the ink ground (the homepage keeps a single green, `deep`), each brand gets a half: its white logo large inside a
 * hairline ring, its small line, text, a short list and one button to its own part of the site. A hairline between the
 * two halves draws itself in. The logos are the official files in /public/brand; texts are edited in the CMS
 * (Homepage → 4 · Central Fitness Club & Central Day Spa). `images` is accepted for compatibility only.
 */
type Area = {
  id: string;
  index: string;
  name: string;
  path: string;
  mark: { src: string; w: number; h: number; cls: string };
  tagline: string;
  body: string;
  facts: string[];
  cta: string;
};

function Brand({ a, locale }: { a: Area; locale: Locale }) {
  return (
    <article aria-labelledby={a.id} className="group flex flex-col items-center text-center">
      <p className="label-sm self-start opacity-55">{a.index}</p>
      <FadeIn y={20} className="relative mt-4 flex aspect-square w-[62vw] max-w-[300px] items-center justify-center md:mt-[1vw] md:w-[24vw] md:max-w-[380px]">
        <span aria-hidden className="absolute inset-0 rounded-full border border-white/20 transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04]" />
        <span aria-hidden className="absolute inset-[9%] rounded-full border border-white/10" />
        <h3 id={a.id} className="relative flex w-full justify-center">
          <Image src={a.mark.src} alt={a.name} width={a.mark.w} height={a.mark.h} sizes="200px" className={`h-auto ${a.mark.cls}`} />
        </h3>
      </FadeIn>
      <p className="label mt-8 opacity-70 md:mt-[2.4vw]">{a.tagline}</p>
      <FadeIn as="p" delay={0.1} className="body-copy mt-5 max-w-[40ch] opacity-85">
        {a.body}
      </FadeIn>
      <ul className="label mt-7 w-full max-w-[420px] border-t border-white/20">
        {a.facts.map((f) => (
          <li key={f} className="border-b border-white/20 py-[0.8em]">
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <PillLink href={href(locale, a.path)} tone="light">
          {a.cta}
        </PillLink>
      </div>
    </article>
  );
}

export function ClubSpaShowcase({ locale, dict }: { locale: Locale; dict: Dictionary; images?: HomeImages }) {
  const d = dict.home.club;
  const areas: Area[] = [
    { id: "club-fitness", index: "(01)", name: "Central Fitness Club", path: "/centralfitnessclub", mark: { src: "/brand/central-fitness-club-mark-white.png", w: 542, h: 640, cls: "w-[50%]" }, ...d.fitness },
    { id: "club-spa", index: "(02)", name: "Central Day Spa", path: "/dayspa", mark: { src: "/brand/central-day-spa-mark-white.png", w: 640, h: 579, cls: "w-[62%]" }, ...d.spa },
  ];

  return (
    <section aria-labelledby="club-title" className="relative overflow-hidden bg-ink pb-16 pt-[30px] text-white md:pb-[6vw] md:pt-[3vw]">
      <MetaRow left={d.metaLeft} center={d.metaCenter} right={d.metaRight} />

      <div className="mt-10 grid gap-8 px-[var(--gutter)] md:mt-[4vw] md:grid-cols-12 md:items-end md:gap-x-[2vw]">
        <h2 id="club-title" className="font-display text-[13vw] leading-[0.9] md:col-span-7 md:text-[6.4vw]">
          <RevealLines lines={d.title} lineClassName={["", "pl-[8vw] md:pl-[9vw]"]} />
        </h2>
        <FadeIn as="p" className="body-copy max-w-[40ch] opacity-85 md:col-span-4 md:col-start-9 md:pb-[0.8vw]">
          {d.intro}
        </FadeIn>
      </div>

      <div className="relative mt-14 grid gap-20 px-[var(--gutter)] md:mt-[5vw] md:grid-cols-2 md:gap-0">
        {/* The hairline between the two brands (from 1024 px; on phones a rule above the second one) */}
        <DrawLine className="absolute bottom-0 left-1/2 top-0 hidden w-px bg-white/20 md:block" />
        <div className="md:pr-[4vw]">
          <Brand a={areas[0]} locale={locale} />
        </div>
        <div className="border-t border-white/20 pt-16 md:border-0 md:pl-[4vw] md:pt-0">
          <Brand a={areas[1]} locale={locale} />
        </div>
      </div>
    </section>
  );
}
