import Image from "next/image";
import Link from "next/link";
import { FadeIn, RevealLines } from "@/components/Reveal";
import type { BrandContact } from "@/components/brands/contact";
import { classTypes, type ClubCopy } from "@/content/club";
import { href, type Locale } from "@/lib/i18n";
import { HeroCutouts, Leaf, Pebble, WaveDefs } from "./shapes";

export type ClubImg = { src: string; alt: string; position?: string };
export type ClubImages = {
  hero: ClubImg;
  intro: ClubImg;
  cards: ClubImg[];
  benefits: ClubImg;
  pool: ClubImg;
  sauna: ClubImg;
  classes: ClubImg;
  join: ClubImg;
  membershipHero: ClubImg;
  timetableHero: ClubImg;
  gallery: ClubImg[];
};

function Photo({ img, sizes, className = "", priority }: { img: ClubImg; sizes: string; className?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: img.position }} />
    </div>
  );
}

/** Central Fitness Club home: hero, the club, spaces, benefits, pool & saunas, classes, gallery, membership. */
export function ClubHome({ locale, c, images, contact }: { locale: Locale; c: ClubCopy; images: ClubImages; contact: BrandContact }) {
  const base = href(locale, "/centralfitnessclub");
  return (
    <>
      <WaveDefs />

      {/* ───────────── Hero ───────────── */}
      <section className="relative isolate h-[min(780px,100svh)] min-h-[560px] overflow-hidden bg-[var(--cfc-green-deep)]">
        <Image src={images.hero.src} alt={images.hero.alt} fill priority sizes="100vw" className="-z-10 object-cover" style={{ objectPosition: images.hero.position, filter: "saturate(0.88) sepia(0.08)" }} />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_62%,rgb(20_40_30/0.62)_0%,rgb(20_40_30/0.38)_45%,rgb(20_40_30/0.12)_80%)]" />
        <HeroCutouts />
        <div className="absolute inset-x-0 bottom-[16%] z-[2] px-5 text-center text-white md:bottom-[22%]">
          <FadeIn immediate delay={0.3}>
            <p className="cfc-eyebrow text-white/85">{c.hero.eyebrow}</p>
          </FadeIn>
          <h1 className="cfc-display mt-4 text-[46px] [text-shadow:0_2px_30px_rgb(0_0_0/0.35)] sm:text-[64px] md:text-[clamp(64px,7.6vw,118px)]">
            <RevealLines lines={[c.hero.title]} immediate delay={0.4} className="block" lineClassName="!whitespace-normal" />
          </h1>
          <FadeIn immediate delay={0.9}>
            <p className="cfc-display mt-3 text-[22px] italic text-[var(--cfc-sun)] md:text-[28px]">{c.hero.tagline}</p>
            <p className="mx-auto mt-4 max-w-[46ch] text-[15px] text-white/85">{c.hero.body}</p>
          </FadeIn>
        </div>
        <a
          href={contact.phone.href}
          aria-label={`${c.hero.call}: ${contact.phone.display}`}
          className="absolute bottom-8 right-6 z-[3] grid h-14 w-14 place-items-center rounded-full bg-[var(--cfc-sun)] text-[20px] text-[var(--cfc-green)] shadow-[0_10px_30px_-10px_rgb(0_0_0/0.4)] transition-transform duration-500 hover:scale-105 md:bottom-12 md:right-10"
        >
          ✆
        </a>
      </section>

      {/* ───────────── Our club ───────────── */}
      <section id="club" className="cfc-wrap scroll-mt-24 pb-16 pt-16 text-center md:pb-20 md:pt-24">
        <FadeIn>
          <p className="cfc-eyebrow text-[var(--cfc-mute)]">{c.intro.eyebrow}</p>
          <h2 className="cfc-display mx-auto mt-4 max-w-[18ch] text-[38px] uppercase text-[var(--cfc-green)] md:text-[58px]">{c.intro.title}</h2>
          <p className="mx-auto mt-6 max-w-[62ch] text-[16px] text-[var(--cfc-mute)]">{c.intro.body}</p>
        </FadeIn>
        <dl className="mx-auto mt-14 grid max-w-[1100px] grid-cols-2 gap-y-10 md:grid-cols-4">
          {c.stats.map((s, i) => (
            <FadeIn key={s.label} delay={0.08 * i} className={`px-4 ${i % 2 ? "" : "max-md:border-r"} md:border-r md:last:border-r-0 border-[var(--cfc-line)]`}>
              <dt className="cfc-display text-[52px] leading-none text-[var(--cfc-green)] md:text-[68px]">{s.big}</dt>
              <dd className="mt-3 text-[14px] text-[var(--cfc-mute)]">{s.label}</dd>
            </FadeIn>
          ))}
        </dl>
      </section>

      {/* ───────────── Spaces (green, leaves, wave cards) ───────────── */}
      <section className="relative isolate overflow-hidden bg-[var(--cfc-green)] py-16 text-white md:py-24">
        <Leaf className="absolute -left-20 -bottom-16 -z-10 w-[360px] -rotate-12 fill-[var(--cfc-leaf)] text-white opacity-80" />
        <Leaf className="absolute -right-14 -top-20 -z-10 w-[300px] rotate-[160deg] fill-[var(--cfc-leaf)] text-white opacity-70" />
        <div className="cfc-wrap">
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <h2 className="cfc-display text-[40px] md:text-[64px]">
              <RevealLines lines={c.spaces.title} className="block" lineClassName="!whitespace-normal" />
            </h2>
            <FadeIn className="flex flex-col items-start gap-5">
              <p className="max-w-[46ch] text-[16px] text-white/85">{c.spaces.body}</p>
              <div className="flex items-center gap-4">
                <Pebble href={`${base}/membership`} label={c.spaces.cta} tone="cream" />
                <Link href={`${base}/membership`} className="cfc-link text-[15px]">
                  {c.spaces.cta}
                </Link>
              </div>
            </FadeIn>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {c.spaces.cards.map((card, i) => (
              <FadeIn key={card.title} delay={0.08 * i} className="flex flex-col overflow-hidden rounded-[16px] bg-[var(--cfc-sand)] text-[var(--cfc-ink)]">
                {images.cards[i] && <Photo img={images.cards[i]} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 92vw" className="cfc-wave aspect-[1/1.05]" />}
                <div className="grid gap-2 px-5 pb-6 pt-1">
                  <h3 className="cfc-display text-[26px] !font-normal">{card.title}</h3>
                  <p className="text-[14px] text-[var(--cfc-mute)]">{card.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Benefits ───────────── */}
      <section className="cfc-wrap grid gap-12 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-[6vw] md:py-24">
        <div className="relative mx-auto w-full max-w-[520px]">
          <Photo img={images.benefits} sizes="(min-width: 768px) 42vw, 92vw" className="aspect-[4/5] rounded-[220px_220px_24px_24px]" />
          <span aria-hidden className="absolute -right-4 top-10 h-24 w-24 rounded-[52%_48%_44%_56%/58%_46%_54%_42%] bg-[var(--cfc-sun)] md:-right-8" />
        </div>
        <FadeIn>
          <p className="cfc-eyebrow text-[var(--cfc-mute)]">{c.benefits.eyebrow}</p>
          <h2 className="cfc-display mt-4 text-[38px] text-[var(--cfc-green)] md:text-[52px]">{c.benefits.title}</h2>
          <ul className="mt-8 grid gap-0">
            {c.benefits.items.map((b, i) => (
              <li key={b} className="flex items-baseline gap-5 border-b border-[var(--cfc-line)] py-4 text-[16px]">
                <span className="cfc-display w-8 shrink-0 text-[15px] text-[var(--cfc-moss)] [font-variant-numeric:tabular-nums]">{String(i + 1).padStart(2, "0")}</span>
                {b}
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      {/* ───────────── Pool & saunas ───────────── */}
      <section id="pool" className="scroll-mt-20 bg-[var(--cfc-sand)] py-16 md:py-24">
        <div className="cfc-wrap grid gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-[5vw]">
          <div className="relative">
            <Photo img={images.pool} sizes="(min-width: 768px) 40vw, 92vw" className="aspect-[4/5] rounded-[24px_200px_24px_24px]" />
            <Photo img={images.sauna} sizes="(min-width: 768px) 16vw, 40vw" className="absolute -bottom-6 right-[-4%] aspect-square w-[40%] rounded-full border-[8px] border-[var(--cfc-sand)]" />
          </div>
          <div>
            <FadeIn>
              <p className="cfc-eyebrow text-[var(--cfc-mute)]">{c.pool.eyebrow}</p>
              <h2 className="cfc-display mt-4 text-[38px] text-[var(--cfc-green)] md:text-[52px]">{c.pool.title}</h2>
              <p className="mt-5 max-w-[52ch] text-[16px] text-[var(--cfc-mute)]">
                {c.pool.body}{" "}
                <Link href={href(locale, "/dayspa")} className="cfc-link text-[var(--cfc-green)]">
                  {c.pool.spa} →
                </Link>
              </p>
            </FadeIn>
            <div className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {c.pool.zones.map((z, i) => (
                <FadeIn key={z.name} delay={0.05 * i} className="border-t border-[var(--cfc-line)] py-4">
                  <p className="text-[17px] text-[var(--cfc-green)]">{z.name}</p>
                  <p className="mt-1 text-[14px] text-[var(--cfc-mute)]">{z.body}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Classes (sun) ───────────── */}
      <section id="classes" className="grid scroll-mt-20 md:grid-cols-2">
        <div className="relative isolate overflow-hidden bg-[var(--cfc-sun)] px-[var(--cfc-gutter)] py-16 md:py-20">
          <span aria-hidden className="absolute -right-16 -top-12 -z-10 h-72 w-72 rounded-[52%_48%_44%_56%/58%_46%_54%_42%] bg-[var(--cfc-sun-soft)]" />
          <FadeIn>
            <p className="cfc-eyebrow text-[var(--cfc-green)]/70">{c.classes.eyebrow}</p>
            <h2 className="cfc-display mt-4 max-w-[16ch] text-[38px] text-[var(--cfc-ink)] md:text-[50px]">{c.classes.title}</h2>
            <p className="mt-4 max-w-[44ch] text-[16px] text-[var(--cfc-ink)]/75">{c.classes.body}</p>
          </FadeIn>
          <ul className="mt-8 flex flex-wrap gap-2">
            {classTypes.map((t) => (
              <li key={t} className="rounded-full bg-white/60 px-4 py-2 text-[14px] text-[var(--cfc-ink)]">
                {t}
              </li>
            ))}
          </ul>
          <Link href={`${base}/timetable`} className="cfc-btn mt-9">
            {c.classes.cta} <span className="cfc-arrow" aria-hidden>→</span>
          </Link>
        </div>
        <Photo img={images.classes} sizes="(min-width: 768px) 50vw, 100vw" className="min-h-[420px]" />
      </section>

      {/* ───────────── Gallery ───────────── */}
      {images.gallery.length > 0 && (
        <section aria-label="Central Fitness Club" className="py-16 md:py-24">
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--cfc-gutter)] [scrollbar-width:none]">
            {images.gallery.map((g, i) => (
              <div key={g.src} className={`relative shrink-0 snap-start overflow-hidden ${i % 2 ? "mt-10 aspect-[3/4] w-[58vw] rounded-[20px] sm:w-[280px]" : "aspect-[4/5] w-[66vw] rounded-[140px_140px_20px_20px] sm:w-[320px]"}`}>
                <Image src={g.src} alt={g.alt} fill sizes="320px" className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ───────────── Join ───────────── */}
      <section className="cfc-wrap pb-20 md:pb-28">
        <div className="relative isolate grid overflow-hidden rounded-[28px] bg-[var(--cfc-green)] text-white md:grid-cols-[1.1fr_0.9fr]">
          <Leaf className="absolute -left-16 -top-24 -z-10 w-[300px] rotate-[24deg] fill-[var(--cfc-leaf)] text-white opacity-60" />
          <FadeIn className="p-8 md:p-14">
            <p className="cfc-eyebrow text-[var(--cfc-sun)]">{c.join.eyebrow}</p>
            <h2 className="cfc-display mt-4 text-[38px] md:text-[56px]">{c.join.title}</h2>
            <p className="mt-4 max-w-[44ch] text-[16px] text-white/85">{c.join.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`${base}/membership`} className="cfc-btn cfc-btn--cream">
                {c.join.cta} <span className="cfc-arrow" aria-hidden>→</span>
              </Link>
              <a href={contact.phone.href} className="cfc-btn cfc-btn--line">
                {c.join.call} · {contact.phone.display}
              </a>
            </div>
          </FadeIn>
          <Photo img={images.join} sizes="(min-width: 768px) 40vw, 100vw" className="min-h-[300px]" />
        </div>
      </section>
    </>
  );
}
