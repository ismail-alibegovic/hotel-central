import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content/dictionary";
import { brandFontVars } from "@/lib/brandFonts";
import { href, type Locale } from "@/lib/i18n";
import { DecorativeLine } from "../DecorativeLine";
import { FadeIn, PanelReveal, RevealLines } from "../Reveal";
import { Arrow, MetaRow } from "../ui";
import type { HomeImages } from "./homeImages";

/**
 * CH-004: Central Fitness Club and Central Day Spa as two separate areas, introduced by their own logos instead of
 * photographs and shown in their own colours, the same ones their pages use: the club's green logo on its mist tone
 * with green buttons and its condensed type, the spa's wine logo on its blush tone with wine buttons and its serif.
 * The section header stays in the homepage's editorial style (ivory, display title, hairline loop).
 * Texts are edited in the CMS (Homepage → 4 · Central Fitness Club & Central Day Spa). `images` is accepted for
 * compatibility only: the section has no photographs.
 */
type Brand = {
  id: string;
  name: string;
  path: string;
  logo: { src: string; w: number; h: number; cls: string };
  tagline: string;
  body: string;
  facts: string[];
  cta: string;
};

const styles = {
  fitness: {
    panel: "bg-fit-mist text-fit-green",
    word: "FITNESS",
    wordCls: "font-athletic font-bold tracking-[-0.01em] text-fit-green/[0.06]",
    tagline: "font-geo text-[11px] font-semibold uppercase tracking-[0.2em]",
    rule: "border-fit-green/15",
    ring: "border-fit-green/15",
    button: "bg-fit-green text-white hover:bg-fit-deep",
  },
  spa: {
    panel: "bg-spa-blush text-spa-wine",
    word: "SPA",
    wordCls: "font-spa tracking-[0.02em] text-spa-wine/[0.06]",
    tagline: "font-spa text-[13px] uppercase tracking-[0.22em]",
    rule: "border-spa-wine/15",
    ring: "border-spa-wine/15",
    button: "bg-spa-wine text-white hover:bg-spa-plum",
  },
} as const;

function BrandPanel({ b, kind, locale, offset }: { b: Brand; kind: keyof typeof styles; locale: Locale; offset?: boolean }) {
  const s = styles[kind];
  return (
    <PanelReveal className={offset ? "md:mt-[7vw]" : ""} delay={offset ? 0.15 : 0}>
      <article aria-labelledby={b.id} className={`group relative overflow-hidden px-7 pb-12 pt-14 md:px-[3.2vw] md:pb-[3.6vw] md:pt-[4.4vw] ${s.panel}`}>
        {/* Oversized brand word behind the logo, drifting a little on hover */}
        <span
          aria-hidden
          className={`pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[34vw] leading-none transition-transform duration-[1.6s] ease-[var(--ease-out)] group-hover:-translate-y-[0.04em] md:text-[15vw] ${s.wordCls}`}
        >
          {s.word}
        </span>

        <div className="relative flex flex-col items-center text-center">
          <div className="relative flex aspect-square w-[60vw] max-w-[280px] items-center justify-center md:w-[19vw] md:max-w-[320px]">
            <span aria-hidden className={`absolute inset-0 rounded-full border transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.06] ${s.ring}`} />
            <span aria-hidden className={`absolute inset-[10%] rounded-full border transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[0.96] ${s.ring}`} />
            <FadeIn y={24} delay={0.5} className="relative flex w-full justify-center">
              <h3 id={b.id} className="flex w-full justify-center">
                <Image src={b.logo.src} alt={b.name} width={b.logo.w} height={b.logo.h} sizes="240px" className={`h-auto transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04] ${b.logo.cls}`} />
              </h3>
            </FadeIn>
          </div>

          <p className={`mt-8 md:mt-[2.2vw] ${s.tagline}`}>{b.tagline}</p>
          <FadeIn as="p" delay={0.6} className="body-copy mt-5 max-w-[40ch] opacity-85">
            {b.body}
          </FadeIn>
          <ul className={`mt-7 grid w-full max-w-[440px] grid-cols-2 gap-x-6 text-left text-[11px] uppercase tracking-[0.12em] ${kind === "fitness" ? "font-geo font-medium" : "font-spa tracking-[0.14em]"}`}>
            {b.facts.map((f) => (
              <li key={f} className={`border-t py-[0.8em] ${s.rule}`}>
                {f}
              </li>
            ))}
          </ul>
          <Link
            href={href(locale, b.path)}
            className={`mt-9 inline-flex min-h-[48px] items-center gap-3 rounded-full px-8 text-[11px] uppercase tracking-[0.2em] transition-colors duration-500 ${s.button}`}
          >
            {b.cta} <Arrow />
          </Link>
        </div>
      </article>
    </PanelReveal>
  );
}

export function ClubSpaShowcase({ locale, dict }: { locale: Locale; dict: Dictionary; images?: HomeImages }) {
  const d = dict.home.club;
  const fitness: Brand = { id: "club-fitness", name: "Central Fitness Club", path: "/centralfitnessclub", logo: { src: "/brand/central-fitness-club-mark.png", w: 542, h: 640, cls: "w-[52%]" }, ...d.fitness };
  const spa: Brand = { id: "club-spa", name: "Central Day Spa", path: "/dayspa", logo: { src: "/brand/central-day-spa-mark.png", w: 640, h: 579, cls: "w-[66%]" }, ...d.spa };

  return (
    <section aria-labelledby="club-title" className={`relative overflow-hidden bg-ivory pb-16 pt-[30px] text-ink md:pb-[7vw] md:pt-[3vw] ${brandFontVars}`}>
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

      <div className="relative z-[1] mt-14 grid gap-6 px-[var(--gutter)] md:mt-[5vw] md:grid-cols-12 md:gap-x-[2vw]">
        <div className="md:col-span-6">
          <BrandPanel b={fitness} kind="fitness" locale={locale} />
        </div>
        <div className="md:col-span-6">
          <BrandPanel b={spa} kind="spa" locale={locale} offset />
        </div>
      </div>
    </section>
  );
}
