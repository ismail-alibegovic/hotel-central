import Image from "next/image";
import Link from "next/link";
import { FadeIn, RevealLines } from "@/components/Reveal";
import type { BrandContact } from "@/components/brands/contact";
import { classTypes, type ClubCopy } from "@/content/club";
import { href, type Locale } from "@/lib/i18n";

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

/** Central Fitness Club home: hero with stats, the club, spaces, benefits, pool & saunas, classes, gallery, membership. */
export function ClubHome({ locale, c, images, contact }: { locale: Locale; c: ClubCopy; images: ClubImages; contact: BrandContact }) {
  const base = href(locale, "/centralfitnessclub");
  const [first, ...rest] = c.hero.title.split(" ");
  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="relative isolate flex min-h-[640px] flex-col overflow-hidden bg-[var(--cfc-night)] text-white md:h-[100svh] md:max-h-[980px] md:min-h-[720px]">
        <Image src={images.hero.src} alt={images.hero.alt} fill priority sizes="100vw" className="-z-10 object-cover" style={{ objectPosition: images.hero.position, filter: "saturate(0.8) contrast(1.05)" }} />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(14_23_18/0.92)_0%,rgb(14_23_18/0.7)_38%,rgb(14_23_18/0.15)_75%),linear-gradient(0deg,rgb(14_23_18/0.95)_0%,rgb(14_23_18/0)_40%)]" />

        <div className="cfc-wrap cfc-max flex w-full flex-1 flex-col justify-end pb-10 pt-[120px] md:pb-14">
          <FadeIn immediate delay={0.2}>
            <p className="cfc-eyebrow text-[var(--cfc-volt)]">{c.hero.eyebrow}</p>
          </FadeIn>
          <h1 className="cfc-display mt-6 text-[clamp(52px,13vw,190px)] !leading-[0.84]">
            <RevealLines lines={[first, rest.join(" ")]} immediate delay={0.3} className="block" />
          </h1>
          <FadeIn immediate delay={0.8} className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <p className="cfc-title text-[24px] text-[var(--cfc-volt)] md:text-[30px]">{c.hero.tagline}</p>
              <p className="mt-2 max-w-[44ch] text-[16px] text-white/75 md:text-[17px]">{c.hero.body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`${base}/membership`} className="cfc-btn cfc-btn--volt">
                {c.nav.join} <span className="cfc-arrow" aria-hidden>→</span>
              </Link>
              <a href={contact.phone.href} className="cfc-btn cfc-btn--line on-dark" aria-label={`${c.hero.call}: ${contact.phone.display}`}>
                {contact.phone.display}
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Stats bar */}
        <dl className="relative border-t border-[var(--cfc-line-dark)] bg-[rgb(14_23_18/0.55)] backdrop-blur-md">
          <div className="cfc-wrap cfc-max grid grid-cols-2 md:grid-cols-4">
            {c.stats.map((s, i) => (
              <div key={s.label} className={`flex flex-col gap-1 py-5 md:flex-row md:items-baseline md:gap-4 md:py-7 ${i % 2 ? "pl-5 md:pl-8" : i ? "md:pl-8" : ""} ${i < 3 ? "md:border-r" : ""} ${i % 2 === 0 ? "max-md:border-r" : ""} ${i < 2 ? "max-md:border-b" : ""} border-[var(--cfc-line-dark)]`}>
                <dt className="cfc-display cfc-num whitespace-nowrap text-[40px] text-white md:text-[56px]">{s.big}</dt>
                <dd className="text-[12px] font-medium uppercase leading-[1.35] tracking-[0.12em] text-white/60">{s.label}</dd>
              </div>
            ))}
          </div>
        </dl>
      </section>

      {/* ───────────── Our club ───────────── */}
      <section id="club" className="cfc-wrap cfc-max scroll-mt-24 py-20 md:py-32">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:items-end md:gap-[6vw]">
          <FadeIn>
            <p className="cfc-eyebrow text-[var(--cfc-green)]">{c.intro.eyebrow}</p>
            <h2 className="cfc-display mt-5 text-[52px] text-[var(--cfc-night)] md:text-[clamp(64px,7vw,112px)]">{c.intro.title}</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="max-w-[52ch] text-[17px] leading-[1.7] text-[var(--cfc-mute)]">{c.intro.body}</p>
          </FadeIn>
        </div>
      </section>

      {/* ───────────── Spaces ───────────── */}
      <section id="spaces" className="scroll-mt-20 bg-[var(--cfc-night)] py-20 text-white md:py-28">
        <div className="cfc-wrap cfc-max">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end">
            <h2 className="cfc-display text-[52px] md:text-[clamp(64px,6.4vw,104px)]">
              <RevealLines lines={c.spaces.title} className="block" lineClassName="!whitespace-normal" />
            </h2>
            <FadeIn className="md:justify-self-end">
              <p className="max-w-[46ch] text-[17px] text-white/70">{c.spaces.body}</p>
              <Link href={`${base}/membership`} className="cfc-btn cfc-btn--volt mt-7">
                {c.spaces.cta} <span className="cfc-arrow" aria-hidden>→</span>
              </Link>
            </FadeIn>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.spaces.cards.map((card, i) => (
              <FadeIn key={card.title} delay={0.08 * i} className="cfc-zoom group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[6px] bg-[var(--cfc-night-2)] p-6">
                {images.cards[i] && <Image src={images.cards[i].src} alt={images.cards[i].alt} fill sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 92vw" className="-z-10 object-cover" style={{ objectPosition: images.cards[i].position }} />}
                <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(14_23_18/0)_35%,rgb(14_23_18/0.92)_100%)]" />
                <span className="cfc-num absolute left-6 top-6 text-[13px] font-semibold text-[var(--cfc-volt)]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="cfc-display text-[34px]">{card.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-white/75">{card.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Benefits ───────────── */}
      <section className="cfc-wrap cfc-max grid gap-12 py-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-[6vw] md:py-32">
        <div className="relative">
          <Photo img={images.benefits} sizes="(min-width: 768px) 44vw, 92vw" className="aspect-[4/5] rounded-[6px]" />
          <div className="absolute -bottom-6 right-6 bg-[var(--cfc-volt)] px-6 py-5 text-[var(--cfc-night)] md:-right-8 md:bottom-10">
            <p className="cfc-display cfc-num text-[56px]">{c.stats[2].big}</p>
            <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.12em]">{c.stats[2].label}</p>
          </div>
        </div>
        <FadeIn>
          <p className="cfc-eyebrow text-[var(--cfc-green)]">{c.benefits.eyebrow}</p>
          <h2 className="cfc-display mt-5 text-[48px] text-[var(--cfc-night)] md:text-[72px]">{c.benefits.title}</h2>
          <ul className="mt-10 border-t border-[var(--cfc-line)]">
            {c.benefits.items.map((b, i) => (
              <li key={b} className="flex items-baseline gap-6 border-b border-[var(--cfc-line)] py-4 text-[17px]">
                <span className="cfc-num w-7 shrink-0 text-[13px] font-semibold text-[var(--cfc-green)]">{String(i + 1).padStart(2, "0")}</span>
                {b}
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      {/* ───────────── Pool & saunas ───────────── */}
      <section id="pool" className="scroll-mt-20 bg-[var(--cfc-green-deep)] text-white">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[420px] md:min-h-[760px]">
            <Photo img={images.pool} sizes="(min-width: 768px) 50vw, 100vw" className="!absolute inset-0" />
            <Photo img={images.sauna} sizes="(min-width: 768px) 18vw, 40vw" className="!absolute bottom-6 right-6 hidden aspect-[4/5] w-[34%] rounded-[4px] ring-[6px] ring-[var(--cfc-green-deep)] md:block" />
          </div>
          <div className="cfc-wrap flex flex-col justify-center py-16 md:py-24 md:!pl-[6vw]">
            <FadeIn>
              <p className="cfc-eyebrow text-[var(--cfc-volt)]">{c.pool.eyebrow}</p>
              <h2 className="cfc-display mt-5 text-[48px] md:text-[72px]">{c.pool.title}</h2>
              <p className="mt-6 max-w-[50ch] text-[17px] text-white/70">
                {c.pool.body}{" "}
                <Link href={href(locale, "/dayspa")} className="cfc-link text-white">
                  {c.pool.spa} →
                </Link>
              </p>
            </FadeIn>
            <div className="mt-10 grid border-t border-[var(--cfc-line-dark)] sm:grid-cols-2 sm:gap-x-10">
              {c.pool.zones.map((z, i) => (
                <FadeIn key={z.name} delay={0.05 * i} className="border-b border-[var(--cfc-line-dark)] py-5">
                  <p className="cfc-title text-[19px]">{z.name}</p>
                  <p className="mt-1 text-[14px] text-white/60">{z.body}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Classes ───────────── */}
      <section id="classes" className="scroll-mt-20 bg-[var(--cfc-volt)] text-[var(--cfc-night)]">
        <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="cfc-wrap py-16 md:py-24 md:!pr-[5vw]">
            <FadeIn>
              <p className="cfc-eyebrow">{c.classes.eyebrow}</p>
              <h2 className="cfc-display mt-5 max-w-[14ch] text-[48px] md:text-[80px]">{c.classes.title}</h2>
              <p className="mt-5 max-w-[44ch] text-[17px] text-[var(--cfc-night)]/75">{c.classes.body}</p>
            </FadeIn>
            <ul className="mt-10 flex flex-wrap gap-2">
              {classTypes.map((t) => (
                <li key={t} className="rounded-full border border-[var(--cfc-night)]/25 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.06em]">
                  {t}
                </li>
              ))}
            </ul>
            <Link href={`${base}/timetable`} className="cfc-btn mt-10">
              {c.classes.cta} <span className="cfc-arrow" aria-hidden>→</span>
            </Link>
          </div>
          <Photo img={images.classes} sizes="(min-width: 768px) 45vw, 100vw" className="min-h-[420px]" />
        </div>
      </section>

      {/* ───────────── Gallery ───────────── */}
      {images.gallery.length > 0 && (
        <section aria-label="Central Fitness Club" className="py-20 md:py-28">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--cfc-gutter)] [scrollbar-width:none]">
            {images.gallery.map((g, i) => (
              <div key={g.src} className={`cfc-zoom relative shrink-0 snap-start overflow-hidden rounded-[6px] ${i % 2 ? "aspect-[4/5] w-[62vw] sm:w-[300px]" : "aspect-[3/4] w-[70vw] sm:w-[360px]"}`}>
                <Image src={g.src} alt={g.alt} fill sizes="360px" className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ───────────── Join ───────────── */}
      <section className="cfc-wrap cfc-max pb-20 md:pb-28">
        <div className="relative isolate overflow-hidden rounded-[8px] bg-[var(--cfc-night)] text-white">
          <Image src={images.join.src} alt={images.join.alt} fill sizes="100vw" className="-z-10 object-cover opacity-45" style={{ objectPosition: images.join.position }} />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(14_23_18/0.95)_0%,rgb(14_23_18/0.6)_60%,rgb(14_23_18/0.3)_100%)]" />
          <FadeIn className="max-w-[720px] p-8 py-14 md:p-16 md:py-20">
            <p className="cfc-eyebrow text-[var(--cfc-volt)]">{c.join.eyebrow}</p>
            <h2 className="cfc-display mt-5 text-[56px] md:text-[104px]">{c.join.title}</h2>
            <p className="mt-5 max-w-[44ch] text-[17px] text-white/75">{c.join.body}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={`${base}/membership`} className="cfc-btn cfc-btn--volt">
                {c.join.cta} <span className="cfc-arrow" aria-hidden>→</span>
              </Link>
              <a href={contact.phone.href} className="cfc-btn cfc-btn--line on-dark">
                {c.join.call} · {contact.phone.display}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
