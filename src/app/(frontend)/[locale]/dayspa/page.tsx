import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getDaySpaPrices } from "@/cms/clubSpa";
import { Photo } from "@/components/Photo";
import { FadeIn } from "@/components/Reveal";
import { Arrow } from "@/components/ui";
import { getDaySpa, spaContact, type Treatment } from "@/content/dayspa";
import { href, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const m = getDaySpa(locale).meta;
  return pageMetadata(locale, "/dayspa", m.title, m.description, "/images/final-6202.jpg");
}

function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-4 text-[10.5px] uppercase tracking-[0.28em] ${className}`}>
      <span aria-hidden className="h-px w-8 bg-spa-lilac" />
      {children}
    </p>
  );
}

function Title({ lines, id, className = "", as: Tag = "h2" }: { lines: string[]; id?: string; className?: string; as?: "h1" | "h2" }) {
  return (
    <Tag id={id} className={`font-spa font-normal leading-[1.02] tracking-[0.005em] ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className={`block ${i === 1 ? "pl-[0.9em] italic opacity-90" : ""}`}>
          {l}
        </span>
      ))}
    </Tag>
  );
}

function PriceRow({ t, includesLabel }: { t: Treatment; includesLabel: string }) {
  return (
    <li className="py-3">
      <div className="flex items-baseline gap-3">
        <span className="text-[15px] leading-[1.4]">{t.name}</span>
        <span aria-hidden className="mb-[0.3em] min-w-6 flex-1 border-b border-dotted border-spa-wine/30" />
        {t.duration && <span className="shrink-0 text-[12.5px] tabular-nums opacity-70">{t.duration}</span>}
        <span className="shrink-0 text-right font-spa text-[17px] tabular-nums">{t.price}</span>
      </div>
      {t.includes && t.includes.length > 0 && (
        <ul aria-label={includesLabel} className="mt-2 space-y-1 pl-4 text-[13px] opacity-75">
          {t.includes.map((x) => (
            <li key={x} className="before:mr-2 before:content-['·']">
              {x}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

/** CH-013: Central Day Spa — calm, editorial, its own identity; verified prices; existing booking methods only. */
export default async function DaySpa({ params }: P) {
  const { locale } = await params;
  const s = getDaySpa(locale);
  const prices = await getDaySpaPrices(locale);
  const book = spaContact.booking[locale];
  const gallery = ["final-6202.jpg", "central-spa_relax-room-2.jpg", "central-spa_bath.jpg", "final-6198.jpg", "final-6167.jpg", "final-6211.jpg"];

  return (
    <>
      {/* Hero: words and one photograph, side by side — quiet, editorial */}
      <section aria-labelledby="spa-hero" className="grid min-h-[calc(100svh-var(--sub-bar-h)-var(--sub-nav-h))] md:grid-cols-12">
        <div className="flex flex-col justify-center px-[var(--gutter)] py-16 md:col-span-6 md:py-[6vw] md:pl-[6vw]">
          <Image src="/brand/central-day-spa-mark.png" alt="Central Day Spa" width={640} height={579} priority className="mb-10 h-auto w-[92px] md:w-[110px]" />
          <Eyebrow className="mb-7 opacity-80">{s.hero.eyebrow}</Eyebrow>
          <Title as="h1" id="spa-hero" lines={s.hero.title} className="text-[clamp(46px,11vw,64px)] md:text-[clamp(56px,5.6vw,96px)]" />
          <p className="mt-8 max-w-[40ch] text-[16px] leading-[1.7] opacity-85">{s.hero.intro}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href={book} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[50px] items-center gap-3 rounded-full bg-spa-wine px-8 text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-spa-plum">
              {s.hero.book}
              <Arrow />
              <span className="sr-only"> — {s.visit.onlineNote}</span>
            </a>
            <a href="#prices" className="link-line text-[11px] uppercase tracking-[0.2em]">
              {s.hero.prices}
            </a>
          </div>
        </div>
        <div className="relative min-h-[62svh] md:col-span-6 md:min-h-0">
          <Image src="/images/final-6202.jpg" alt={s.alt.hero} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover [filter:saturate(0.85)_contrast(1.02)]" />
        </div>
      </section>

      {/* Welcome */}
      <section aria-labelledby="spa-intro" className="bg-spa-blush px-[var(--gutter)] py-20 md:py-[9vw]">
        <div className="grid gap-14 md:grid-cols-12 md:gap-x-[2vw]">
          <div className="md:col-span-5 md:col-start-2">
            <Eyebrow className="mb-8 opacity-80">{s.intro.label}</Eyebrow>
            <Title id="spa-intro" lines={s.intro.title} className="text-[clamp(38px,9vw,52px)] md:text-[4vw]" />
            <FadeIn className="mt-10 max-w-[44ch] space-y-5 text-[16px] leading-[1.75] opacity-90">
              {s.intro.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="text-[12px] uppercase tracking-[0.2em] opacity-70">{s.intro.note}</p>
            </FadeIn>
          </div>
          <div className="grid grid-cols-5 gap-4 md:col-span-5 md:col-start-8">
            <div className="col-span-3">
              <Photo src="/images/final-6230.jpg" alt={s.alt.intro1} sizes="(min-width: 1024px) 26vw, 60vw" grade="grade-soft" className="aspect-[3/4]" />
            </div>
            <div className="col-span-2 mt-[38%]">
              <Photo src="/images/final-6203.jpg" alt={s.alt.intro2} sizes="(min-width: 1024px) 18vw, 40vw" grade="grade-soft" className="aspect-[3/4]" />
            </div>
          </div>
        </div>
      </section>

      {/* Treatment categories */}
      <section id="treatments" aria-labelledby="spa-cats" className="scroll-mt-[calc(var(--sub-bar-h)+var(--sub-nav-h))] px-[var(--gutter)] py-20 md:py-[8vw]">
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow className="mb-8 opacity-80">{s.categories.label}</Eyebrow>
          <Title id="spa-cats" lines={s.categories.title} className="mb-14 text-[clamp(38px,9vw,52px)] md:text-[4vw]" />
          <ul className="grid gap-px overflow-hidden rounded-[2px] bg-spa-wine/12 sm:grid-cols-2 lg:grid-cols-3">
            {s.categories.items.map((c, i) => (
              <li key={c.id} className="bg-spa-paper">
                <a href={`#cat-${c.id}`} className="group block h-full p-8 transition-colors hover:bg-spa-blush md:p-10">
                  <span className="font-spa text-[13px] opacity-60">{["I", "II", "III", "IV", "V", "VI"][i]}</span>
                  <span className="mt-4 block font-spa text-[28px] leading-[1.1]">{c.name}</span>
                  <span className="mt-4 block max-w-[34ch] text-[14.5px] leading-[1.65] opacity-80">{c.body}</span>
                  <span className="mt-6 inline-flex items-center gap-3 text-[10.5px] uppercase tracking-[0.2em] opacity-70 transition-opacity group-hover:opacity-100">
                    {s.nav.prices} <Arrow />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Price list (CMS "Central Day Spa", or the verified October 2026 list) */}
      <section id="prices" aria-labelledby="spa-prices" className="scroll-mt-[calc(var(--sub-bar-h)+var(--sub-nav-h))] bg-white px-[var(--gutter)] py-20 md:py-[8vw]">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow className="mb-8 opacity-80">{s.prices.label}</Eyebrow>
              <Title id="spa-prices" lines={s.prices.title} className="text-[clamp(38px,9vw,52px)] md:text-[4vw]" />
            </div>
            <p className="text-[12px] uppercase tracking-[0.2em] opacity-70">
              {prices.updated ? `${s.prices.updated} · ${prices.updated}` : s.prices.updated}
            </p>
          </div>
          <div className="gap-x-[5vw] md:columns-2">
            {prices.categories.map((c) => {
              // Built-in categories link from the category cards above; CMS categories get positional ids.
              const anchor = ["massages", "facials", "iyashi", "scrub", "nails", "packages"].includes(c.id) ? `cat-${c.id}` : undefined;
              return (
                <section key={c.id} id={anchor} aria-label={c.name} className="mb-12 break-inside-avoid scroll-mt-[calc(var(--sub-bar-h)+var(--sub-nav-h)+16px)]">
                  <h3 className="border-b border-spa-wine/25 pb-3 font-spa text-[24px]">{c.name}</h3>
                  {c.intro && <p className="mt-3 text-[13.5px] italic opacity-75">{c.intro}</p>}
                  <ul className="divide-y divide-spa-wine/10">
                    {c.items.map((t, n) => (
                      <PriceRow key={`${t.name}-${t.duration ?? n}`} t={t} includesLabel={s.prices.includes} />
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
          <div className="mt-4 space-y-1 border-t border-spa-wine/15 pt-6 text-[13px] opacity-75">
            <p>{s.prices.currency}</p>
            <p>{prices.note ?? s.prices.changeNote}</p>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section id="spa" aria-labelledby="spa-facilities" className="scroll-mt-[calc(var(--sub-bar-h)+var(--sub-nav-h))] bg-spa-wine px-[var(--gutter)] py-20 text-white md:py-[8vw]">
        <div className="grid gap-14 md:grid-cols-12 md:gap-x-[2vw]">
          <div className="md:col-span-5 md:col-start-2">
            <Eyebrow className="mb-8 text-white/80">{s.facilities.label}</Eyebrow>
            <Title id="spa-facilities" lines={s.facilities.title} className="text-[clamp(38px,9vw,52px)] md:text-[4vw]" />
            <dl className="mt-12 divide-y divide-white/15 border-y border-white/15">
              {s.facilities.items.map((f) => (
                <div key={f.k} className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between sm:gap-6">
                  <dt className="text-[10.5px] uppercase tracking-[0.22em] opacity-70">{f.k}</dt>
                  <dd className="font-spa text-[18px] sm:text-right">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <Photo src="/images/central-spa_bathroom-3.jpg" alt={s.alt.gallery[3]} sizes="(min-width: 1024px) 40vw, 100vw" grade="grade-soft" className="aspect-[4/5]" />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section aria-label={s.gallery.label} className="px-[var(--gutter)] py-20 md:py-[8vw]">
        <Eyebrow className="mb-10 opacity-80">{s.gallery.label}</Eyebrow>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {gallery.map((g, i) => (
            <li key={g} className={i % 2 === 1 ? "md:mt-[4vw]" : ""}>
              <Photo src={`/images/${g}`} alt={s.alt.gallery[i]} sizes="(min-width: 1024px) 32vw, 50vw" grade="grade-soft" className="aspect-[4/5]" />
            </li>
          ))}
        </ul>
      </section>

      {/* Visit & booking — the spa's existing booking methods only */}
      <section aria-labelledby="spa-visit" className="bg-spa-blush px-[var(--gutter)] py-20 md:py-[8vw]">
        <div className="grid gap-14 md:grid-cols-12 md:gap-x-[2vw]">
          <div className="md:col-span-5 md:col-start-2">
            <Eyebrow className="mb-8 opacity-80">{s.visit.label}</Eyebrow>
            <Title id="spa-visit" lines={s.visit.title} className="text-[clamp(38px,9vw,52px)] md:text-[4vw]" />
            <p className="mt-8 max-w-[42ch] text-[16px] leading-[1.75] opacity-90">{s.visit.body}</p>
            <div className="mt-10">
              <a href={book} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-spa-wine px-8 text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-spa-plum">
                {s.visit.online}
                <Arrow />
              </a>
              <p className="mt-3 text-[12.5px] opacity-70">{s.visit.onlineNote}</p>
            </div>
            <div className="mt-12">
              <p className="mb-3 text-[10.5px] uppercase tracking-[0.22em] opacity-70">{s.visit.hoursTitle}</p>
              <dl className="font-spa text-[20px]">
                {s.visit.hours.map((h) => (
                  <div key={h.d} className="flex flex-wrap justify-between gap-4 border-b border-spa-wine/15 py-2">
                    <dt>{h.d}</dt>
                    <dd className="tabular-nums">{h.h}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-[12.5px] opacity-70">{s.visit.hoursNote}</p>
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:self-end">
            <ul className="divide-y divide-spa-wine/15 border-y border-spa-wine/15">
              {[
                { k: s.visit.call, v: spaContact.phone.display, href: spaContact.phone.href },
                { k: `${s.visit.whatsapp} · ${s.visit.viber}`, v: spaContact.mobile.display, href: spaContact.mobile.href, extra: [{ l: s.visit.whatsapp, h: spaContact.mobile.whatsapp }, { l: s.visit.viber, h: spaContact.mobile.viber }] },
                { k: s.visit.email, v: spaContact.email, href: `mailto:${spaContact.email}` },
                { k: s.visit.instagram, v: spaContact.instagramHandle, href: spaContact.instagram, external: true },
              ].map((c) => (
                <li key={c.k} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-5">
                  <a href={c.href} {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group min-w-0">
                    <span className="block text-[10.5px] uppercase tracking-[0.22em] opacity-70">{c.k}</span>
                    <span className="mt-1 block break-all font-spa text-[22px] leading-[1.2] group-hover:underline md:text-[24px]">{c.v}</span>
                  </a>
                  {c.extra && (
                    <span className="flex gap-2">
                      {c.extra.map((x) => (
                        <a key={x.l} href={x.h} {...(x.h.startsWith("https") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="rounded-full border border-spa-wine/40 px-4 py-2 text-[10.5px] uppercase tracking-[0.18em] transition-colors hover:bg-spa-wine hover:text-white">
                          {x.l}
                        </a>
                      ))}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[11px] uppercase tracking-[0.2em] opacity-70">{s.visit.address}</p>
            <Link href={href(locale, "/centralfitnessclub")} className="link-line mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em]">
              {s.visit.fitness} <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
