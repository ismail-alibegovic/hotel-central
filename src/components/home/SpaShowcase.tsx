import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { fitStyle } from "@/lib/fit";
import { DrawLine, FadeIn, RevealLines } from "../Reveal";
import { MetaRow, PillLink } from "../ui";
import type { HomeImages } from "./homeImages";

const pad = (n: number) => String(n + 1).padStart(2, "0");

/** "Club & Spa" → ["C", "S"]: the initials of the words, never the ampersand. */
function initials(name: string) {
  const letters = name
    .split(/\s+/)
    .filter((w) => /^\p{L}/u.test(w))
    .map((w) => w[0].toUpperCase());
  return letters.length >= 2 ? letters.slice(0, 2) : [name.slice(0, 1).toUpperCase(), ""];
}

/**
 * The Club & Spa emblem, drawn in the house idiom: live type and 1px hairlines in currentColor, no image file.
 * A tracked ring of text (slowly turning, still for reduced motion) around a serif monogram.
 */
function Emblem({ name, className = "" }: { name: string; className?: string }) {
  const [a, b] = initials(name);
  // Non-breaking spaces: SVG collapses the trailing space, which glued the last dot to "Hotel".
  const ring = `Hotel Central · ${name} · Sarajevo · `.replace(/ /g, "\u00a0");
  const r = 166;
  const circumference = 2 * Math.PI * r;
  return (
    <div aria-hidden className={`relative aspect-square ${className}`}>
      {/* Ring of text: an HTML layer, so the slow turn is a compositor-only transform */}
      <div className="absolute inset-0 animate-[emblem-turn_90s_linear_infinite] motion-reduce:animate-none">
        <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
          <defs>
            <path id="spa-ring" d={`M200 ${200 - r} a ${r} ${r} 0 1 1 0 ${2 * r} a ${r} ${r} 0 1 1 0 ${-2 * r}`} />
          </defs>
          <text className="font-sans" fill="currentColor" fontSize="11.5" letterSpacing="0" style={{ textTransform: "uppercase" }}>
            <textPath href="#spa-ring" textLength={circumference - 6} lengthAdjust="spacing">
              {ring}
            </textPath>
          </text>
        </svg>
      </div>
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" fill="none">
        <circle cx="200" cy="200" r="196" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <circle cx="200" cy="200" r="142" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M200 92v26M200 282v26" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="font-display absolute inset-0 flex items-center justify-center leading-none">
        <span className="text-[length:calc(var(--emblem)*0.27)]">{a}</span>
        <span className="mx-[0.12em] translate-y-[-0.1em] text-[length:calc(var(--emblem)*0.11)] normal-case opacity-80">&amp;</span>
        <span className="text-[length:calc(var(--emblem)*0.27)]">{b}</span>
      </div>
    </div>
  );
}

/**
 * Club & Spa without photographs: an emblem, the heading and a numbered "circuit" of the facilities
 * joined by one hairline, on the ink ground (the homepage keeps a single green, `deep`).
 * `images` is accepted for compatibility with the CMS (the spa photo fields are hidden there).
 */
export function SpaShowcase({ locale, dict }: { locale: Locale; dict: Dictionary; images?: HomeImages }) {
  const d = dict.home.spa;
  const facts = d.facts;
  return (
    <section aria-labelledby="spa-title" className="relative overflow-hidden bg-ink pb-16 pt-[30px] text-white md:pb-[5.5vw] md:pt-[3vw]">
      <MetaRow left={d.metaLeft} center={d.metaCenter} right={d.metaRight} />

      <div className="mt-12 grid grid-cols-1 items-center gap-12 px-[var(--gutter)] md:mt-[4vw] md:grid-cols-12 md:gap-x-[2vw]">
        <FadeIn className="mx-auto w-[64vw] max-w-[340px] [--emblem:64vw] md:col-span-5 md:w-[27vw] md:max-w-[440px] md:[--emblem:min(27vw,440px)]" y={0}>
          <Emblem name={d.metaLeft} className="w-full" />
        </FadeIn>

        <div className="md:col-span-6 md:col-start-7">
          <h2 id="spa-title" className="font-display text-[length:var(--fs-m)] leading-[0.9] md:text-[5.6vw]" style={fitStyle(d.title, 82, 13)}>
            <RevealLines lines={d.title} lineClassName={["", "pl-[6vw] md:pl-[7vw]"]} />
          </h2>
          <div className="mt-10 flex flex-col items-start gap-8 md:mt-[3.4vw] md:pl-[7vw]">
            <FadeIn as="p" className="body-copy max-w-[44ch] opacity-85">
              {d.body}
            </FadeIn>
            <FadeIn delay={0.1}>
              <PillLink href={href(locale, "/spa")} tone="light">
                {d.cta}
              </PillLink>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* The circuit: one hairline, a station per facility */}
      <ol
        className="relative mx-[var(--gutter)] mt-14 grid grid-cols-1 md:mt-[5vw] md:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
        style={{ "--n": facts.length } as CSSProperties}
      >
        <DrawLine className="absolute left-[3.5px] top-0 bottom-0 w-px bg-white/30 md:left-0 md:right-0 md:top-[27px] md:bottom-auto md:h-px md:w-auto" />
        {facts.map((f, i) => (
          <FadeIn as="li" key={f} delay={0.25 + i * 0.08} y={8} className="relative pb-6 pl-8 last:pb-0 md:pb-0 md:pl-0 md:pr-[1.5vw]">
            <span className="label-sm absolute left-8 top-0 opacity-55 md:static md:block">{pad(i)}</span>
            <span aria-hidden className="absolute left-0 top-[5px] h-2 w-2 rounded-full border border-white/70 bg-ink md:top-[24px]" />
            <span className="label block pt-5 md:pt-[34px]">{f}</span>
          </FadeIn>
        ))}
      </ol>
    </section>
  );
}
