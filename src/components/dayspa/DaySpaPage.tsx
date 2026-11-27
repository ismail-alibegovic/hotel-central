import Image from "next/image";
import { ArrowUpRight } from "@/components/ui";
import Link from "next/link";
import { FadeIn, RevealLines } from "@/components/Reveal";
import type { BrandContact } from "@/components/brands/contact";
import { DAYSPA_INSTAGRAM, type DaySpaCopy } from "@/content/dayspa";
import { href, type Locale } from "@/lib/i18n";
import { PriceList, type PriceCategory } from "./PriceList";

export type DaySpaImg = { src: string; alt: string; position?: string };
export type DaySpaPackage = { name: string; duration: string; price: string; includes: string[] };
export type DaySpaData = {
  c: DaySpaCopy;
  categories: PriceCategory[];
  packages: DaySpaPackage[];
  images: { hero: DaySpaImg; aboutA: DaySpaImg; aboutB: DaySpaImg; whyA: DaySpaImg; whyB: DaySpaImg; whyC: DaySpaImg; cta: DaySpaImg; gallery: DaySpaImg[] };
  bookingUrl: string;
  contact: BrandContact;
};

const minPrice = (c: PriceCategory) => {
  const n = c.items.map((i) => parseFloat(i.price)).filter((v) => !Number.isNaN(v));
  return n.length ? Math.min(...n) : undefined;
};

function Btn({ href: to, children, variant = "", external }: { href: string; children: React.ReactNode; variant?: string; external?: boolean }) {
  return (
    <a href={to} className={`ds-btn ${variant}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
      <i aria-hidden>→</i>
    </a>
  );
}

const Icon = {
  lotus: (
    <svg viewBox="0 0 40 40" aria-hidden className="h-10 w-10 fill-none stroke-current" strokeWidth="1.3">
      <path d="M20 8c4 5 5 10 0 17-5-7-4-12 0-17ZM20 25c5-6 11-7 16-5-3 6-9 8-16 5ZM20 25c-5-6-11-7-16-5 3 6 9 8 16 5ZM12 32h16" />
    </svg>
  ),
  drop: (
    <svg viewBox="0 0 40 40" aria-hidden className="h-10 w-10 fill-none stroke-current" strokeWidth="1.3">
      <path d="M20 6c6 8 9 13 9 18a9 9 0 0 1-18 0c0-5 3-10 9-18Z" />
      <path d="M15 25a5 5 0 0 0 5 5" />
    </svg>
  ),
};

/** Central Day Spa, one page: hero, about, treatments, price list, packages, why us, gallery, booking, footer. */
export function DaySpaPage({ locale, data }: { locale: Locale; data: DaySpaData }) {
  const { c, categories, packages, images, bookingUrl, contact } = data;
  const featured = categories.slice(0, 6);
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent("Central Day Spa")}`;

  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="relative isolate flex min-h-[680px] flex-col overflow-hidden bg-[var(--ds-wine-deep)] text-white md:h-[100svh] md:max-h-[960px] md:min-h-[720px]">
        <Image src={images.hero.src} alt={images.hero.alt} fill priority sizes="100vw" className="-z-10 object-cover" style={{ objectPosition: images.hero.position }} />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(30_7_10/0.5)_0%,rgb(30_7_10/0.2)_35%,rgb(30_7_10/0.55)_70%,rgb(30_7_10/0.85)_100%)]" />

        <div className="ds-wrap ds-max flex w-full flex-1 flex-col items-center justify-center pb-10 pt-[120px] text-center">
          <FadeIn immediate delay={0.2}>
            <p className="ds-eyebrow text-white/85">{c.hero.eyebrow}</p>
          </FadeIn>
          <h1 className="ds-display mt-6 text-[52px] !leading-[0.98] sm:text-[72px] md:text-[clamp(80px,8.4vw,132px)]">
            <RevealLines lines={c.hero.title.map((l, i) => (i === 1 ? <em key={i}>{l}</em> : l))} immediate delay={0.35} />
          </h1>
          <FadeIn immediate delay={0.8} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Btn href={bookingUrl} variant="ds-btn--light" external>
              {c.hero.cta}
            </Btn>
            <a href="#prices" className="ds-btn ds-btn--ghost">
              {c.hero.prices}
              <i aria-hidden>↓</i>
            </a>
          </FadeIn>
        </div>

        {/* The perk, as a quiet bar along the bottom of the photograph */}
        <FadeIn immediate delay={1} className="border-t border-white/15 bg-[rgb(30_7_10/0.35)] backdrop-blur-md">
          <div className="ds-wrap ds-max flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-8">
            <p className="ds-display shrink-0 text-[44px] leading-none text-[var(--ds-lilac)]">{c.hero.perkBig}</p>
            <span aria-hidden className="hidden h-10 w-px bg-white/20 sm:block" />
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-medium">{c.hero.perkTitle}</p>
              <p className="mt-0.5 text-[13px] text-white/70">{c.hero.perkBody}</p>
            </div>
            <Link href={href(locale, "/centralfitnessclub")} className="ds-link shrink-0 self-start text-[12px] uppercase tracking-[0.16em] text-white sm:self-center">
              Central Fitness Club →
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ───────────── About ───────────── */}
      <section id="about" className="ds-wrap grid scroll-mt-24 gap-14 py-20 md:grid-cols-2 md:items-center md:gap-[6vw] md:py-28">
        <div className="relative mx-auto aspect-[1/1.04] w-full max-w-[560px]">
          <div className="absolute left-0 top-0 h-[78%] w-[62%] overflow-hidden rounded-[18px]">
            <Image src={images.aboutA.src} alt={images.aboutA.alt} fill sizes="(min-width: 768px) 30vw, 60vw" className="object-cover" style={{ objectPosition: images.aboutA.position }} />
          </div>
          <div className="absolute bottom-0 right-[2%] h-[68%] w-[56%] overflow-hidden rounded-[18px] border-[8px] border-[var(--ds-cream)]">
            <Image src={images.aboutB.src} alt={images.aboutB.alt} fill sizes="(min-width: 768px) 28vw, 55vw" className="object-cover" style={{ objectPosition: images.aboutB.position }} />
          </div>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" aria-label={c.about.cta} className="absolute left-1/2 top-[34%] grid h-[124px] w-[124px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--ds-cream)]">
            <svg viewBox="0 0 124 124" aria-hidden className="ds-seal absolute inset-0 h-full w-full">
              <defs>
                <path id="ds-seal-path" d="M62,62 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
              </defs>
              {/* CH-051: the words go round the circle exactly once (they used to overlap: "centrcentral day spa") */}
              <text fontSize="10.5" fill="var(--ds-wine)" style={{ textTransform: "uppercase" }}>
                <textPath href="#ds-seal-path" textLength="293" lengthAdjust="spacing">
                  {c.about.seal}
                </textPath>
              </text>
            </svg>
            <span className="relative grid h-[58px] w-[58px] place-items-center rounded-full bg-[var(--ds-wine)] text-white">→</span>
          </a>
        </div>
        <div>
          <FadeIn>
            <p className="ds-eyebrow text-[var(--ds-wine)]">{c.about.label}</p>
            <h2 className="ds-display mt-4 text-[40px] text-[var(--ds-wine)] md:text-[58px]">{c.about.title}</h2>
            <p className="mt-5 max-w-[54ch] text-[var(--ds-mute)]">{c.about.body}</p>
          </FadeIn>
          <div className="mt-9 grid gap-6 border-y border-[var(--ds-line)] py-7">
            {c.about.features.map((f, i) => (
              <FadeIn key={f.title} delay={0.1 * i} className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-5 gap-y-1 sm:grid-cols-[44px_minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <span className="text-[var(--ds-wine)]">{i === 0 ? Icon.lotus : Icon.drop}</span>
                <p className="ds-display text-[24px] leading-[1.15] text-[var(--ds-ink)]">{f.title}</p>
                <p className="col-start-2 text-[14px] text-[var(--ds-mute)] sm:col-start-3 sm:border-l sm:border-[var(--ds-line)] sm:pl-5">{f.body}</p>
              </FadeIn>
            ))}
          </div>
          <div className="mt-8">
            <Btn href={bookingUrl} external>
              {c.about.cta}
            </Btn>
          </div>
        </div>
      </section>

      {/* ───────────── Treatments ───────────── */}
      <section id="treatments" className="scroll-mt-20">
        <div className="bg-[var(--ds-wine)] px-5 py-16 text-center text-white md:py-20">
          <p className="ds-eyebrow text-[var(--ds-lilac)]">{c.services.label}</p>
          <h2 className="ds-display mx-auto mt-4 text-[42px] md:text-[64px]">
            <RevealLines lines={c.services.title} className="block" />
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((cat, i) => {
            const price = minPrice(cat);
            // Image and text alternate like a chessboard: row 1 image-text-image-text, row 2 text-image-text-image.
            const imageFirst = Math.floor(i / 2) % 2 === 0;
            const photo = (
              <div key="p" className="relative aspect-[4/5] overflow-hidden">
                <Image src={cat.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] hover:scale-[1.04]" />
                {price !== undefined && (
                  <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-[var(--ds-ink)] [font-variant-numeric:tabular-nums]">
                    {c.services.from} {price} KM
                  </span>
                )}
              </div>
            );
            const text = (
              <div key="t" className="flex flex-col items-center justify-center gap-4 bg-[var(--ds-paper)] px-7 py-12 text-center">
                <span className="text-[var(--ds-wine)]">{i % 2 ? Icon.drop : Icon.lotus}</span>
                <h3 className="ds-display text-[30px] text-[var(--ds-ink)]">{cat.name}</h3>
                <p className="max-w-[28ch] text-[14px] text-[var(--ds-mute)]">{cat.summary}</p>
                <span className="my-1 h-px w-full max-w-[200px] bg-[var(--ds-line)]" />
                <a href="#prices" className="ds-btn ds-btn--outline !min-h-[42px] !px-5 !text-[12px]">
                  {c.services.view}
                  <i aria-hidden>→</i>
                </a>
              </div>
            );
            return <div key={cat.id} className="contents">{imageFirst ? [photo, text] : [text, photo]}</div>;
          })}
        </div>
      </section>

      {/* ───────────── Price list ───────────── */}
      <section id="prices" className="scroll-mt-16 py-20 md:py-28">
        <div className="ds-wrap ds-max">
          <FadeIn className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end">
            <div>
              <p className="ds-eyebrow ds-eyebrow--line text-[var(--ds-wine)]">{c.prices.label}</p>
              <h2 className="ds-display mt-4 text-[44px] text-[var(--ds-wine)] md:text-[72px]">{c.prices.title}</h2>
            </div>
            <p className="max-w-[48ch] text-[var(--ds-mute)] md:justify-self-end">{c.prices.intro}</p>
          </FadeIn>
          <PriceList categories={categories} labels={{ duration: c.prices.duration, price: c.prices.price }} />
        </div>
      </section>

      {/* ───────────── Packages ───────────── */}
      {packages.length > 0 && (
        <section id="packages" className="scroll-mt-24 bg-[var(--ds-lilac-soft)] py-20 md:py-28">
          <div className="ds-wrap">
            <FadeIn className="mx-auto mb-12 max-w-[40ch] text-center">
              <p className="ds-eyebrow text-[var(--ds-wine)]">{c.packages.label}</p>
              <h2 className="ds-display mt-4 text-[40px] text-[var(--ds-wine)] md:text-[58px]">{c.packages.title}</h2>
            </FadeIn>
            <div className={`mx-auto grid max-w-[1180px] gap-5 ${packages.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
              {packages.map((p, i) => {
                const hl = packages.length >= 3 && i === 1;
                return (
                  <FadeIn key={p.name} delay={0.08 * i} className={`relative flex flex-col gap-5 rounded-[22px] p-7 md:p-8 ${hl ? "bg-[var(--ds-wine)] text-white md:-translate-y-4" : "bg-[var(--ds-paper)]"}`}>
                    {/* CH-053: "Most popular", centred on the card */}
                    {hl && (
                      <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[var(--ds-lilac)] px-4 py-1.5 text-center text-[11px] uppercase tracking-[0.14em] text-[var(--ds-wine)] shadow-[0_2px_10px_rgb(0_0_0/0.12)]">
                        {c.packages.popular}
                      </span>
                    )}
                    <h3 className={`ds-display text-[30px] ${hl ? "pt-2" : ""}`}>{p.name}</h3>
                    <p className="ds-display text-[56px] leading-none [font-variant-numeric:tabular-nums]">
                      {p.price} KM <span className={`text-[15px] font-normal ${hl ? "text-white/70" : "text-[var(--ds-mute)]"}`}>/ {p.duration}</span>
                    </p>
                    <ul className="grid gap-2.5 text-[14px]">
                      {p.includes.map((x) => (
                        <li key={x} className="ds-star">
                          {x}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-3">
                      <Btn href={bookingUrl} variant={hl ? "ds-btn--light" : ""} external>
                        {c.packages.book}
                      </Btn>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ───────────── Why us ───────────── */}
      {/* CH-053: the text starts at the top of the photographs, no empty band above "Why Central Day Spa" */}
      <section className="ds-wrap grid gap-14 py-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-start md:gap-[6vw] md:py-28">
        <FadeIn>
          <p className="ds-eyebrow text-[var(--ds-wine)]">{c.why.label}</p>
          <h2 className="ds-display mt-4 text-[40px] text-[var(--ds-wine)] md:text-[58px]">{c.why.title}</h2>
          <p className="mt-5 max-w-[52ch] text-[var(--ds-mute)]">{c.why.body}</p>
          <ul className="mt-8 grid gap-x-6 gap-y-4 text-[15px] sm:grid-cols-2">
            {c.why.ticks.map((x) => (
              <li key={x} className="flex gap-3">
                <span aria-hidden className="text-[var(--ds-wine)]">✦</span>
                {x}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <Btn href={bookingUrl} external>
              {c.hero.cta}
            </Btn>
          </div>
        </FadeIn>
        <div className="relative grid grid-cols-2 gap-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[16px]">
            <Image src={images.whyA.src} alt={images.whyA.alt} fill sizes="(min-width: 768px) 24vw, 46vw" className="object-cover" style={{ objectPosition: images.whyA.position }} />
          </div>
          <div className="relative mt-12 aspect-[4/5] overflow-hidden rounded-[16px]">
            <Image src={images.whyB.src} alt={images.whyB.alt} fill sizes="(min-width: 768px) 24vw, 46vw" className="object-cover" style={{ objectPosition: images.whyB.position }} />
          </div>
          <div className="relative col-span-2 aspect-[16/8] overflow-hidden rounded-[16px]">
            <Image src={images.whyC.src} alt={images.whyC.alt} fill sizes="(min-width: 768px) 48vw, 92vw" className="object-cover" style={{ objectPosition: images.whyC.position }} />
          </div>
          <div className="absolute -left-3 bottom-[22%] rounded-[16px] bg-[var(--ds-wine)] px-6 py-5 text-center text-white shadow-[0_18px_40px_-18px_rgb(43_10_13/0.6)] md:-left-8">
            <p className="ds-display text-[52px] leading-none">6</p>
            <p className="mt-1 text-[13px] text-white/80">{c.why.stat}</p>
          </div>
        </div>
      </section>

      {/* ───────────── Gallery ───────────── */}
      {images.gallery.length > 0 && (
        <section aria-label={c.gallery} className="overflow-hidden pb-20 md:pb-28">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--ds-gutter)] pb-2 [scrollbar-width:none]">
            {images.gallery.map((g, i) => (
              <div key={g.src} className={`relative shrink-0 snap-start overflow-hidden rounded-[16px] ${i % 3 === 1 ? "aspect-[3/4] w-[62vw] sm:w-[300px]" : "aspect-[4/5] w-[70vw] sm:w-[340px]"}`}>
                <Image src={g.src} alt={g.alt} fill sizes="340px" className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ───────────── Booking CTA ───────────── */}
      <section id="book" className="relative isolate overflow-hidden px-5 py-24 text-center text-white md:py-32">
        <Image src={images.cta.src} alt={images.cta.alt} fill sizes="100vw" className="-z-10 object-cover" style={{ objectPosition: images.cta.position }} />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[rgb(36_8_11/0.66)]" />
        <FadeIn className="mx-auto flex max-w-[760px] flex-col items-center gap-6">
          <p className="ds-eyebrow text-[var(--ds-lilac)]">{c.cta.eyebrow}</p>
          <h2 className="ds-display text-[42px] md:text-[72px]">{c.cta.title}</h2>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <Btn href={bookingUrl} variant="ds-btn--light" external>
              {c.cta.book}
            </Btn>
            <Btn href={contact.phone.href} variant="ds-btn--ghost">
              {c.cta.call} · {contact.phone.display}
            </Btn>
          </div>
          <p className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px] text-white/85">
            <a href={mailto} className="ds-link">
              {contact.email}
            </a>
            <a href={DAYSPA_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="ds-link">
              Instagram @central.day.spa<ArrowUpRight />
            </a>
          </p>
        </FadeIn>
      </section>
    </>
  );
}

/** Day Spa footer: wine ground, centred logo over a line, then address, contact, hours and the sister sites. */
export function DaySpaFooter({ locale, c, contact, address }: { locale: Locale; c: DaySpaCopy; contact: BrandContact; address: { street: string; city: string; directions: string } }) {
  const f = c.footer;
  const label = "ds-eyebrow mb-5 !text-[10.5px] text-[var(--ds-lilac)]";
  return (
    <footer id="contact" className="scroll-mt-20 bg-[var(--ds-wine-deep)] text-white">
      <div className="ds-wrap ds-max">
        <div className="flex flex-col items-center gap-6 border-b border-white/10 py-14 text-center md:py-20">
          <Image src="/brand/dayspa-on-dark.png" alt="Central Day Spa" width={150} height={108} className="h-auto w-[130px] md:w-[150px]" />
          <p className="max-w-[40ch] text-[14px] text-white/60">{f.rights}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10">
          <div className="break-words text-[14px] leading-[1.75] md:text-[15px] lg:pr-10">
            <p className={label}>{f.address}</p>
            <p>{address.street}</p>
            <p>{address.city}</p>
            <a href={address.directions} target="_blank" rel="noopener noreferrer" className="ds-link mt-3 inline-block text-white/65">
              Google Maps<ArrowUpRight />
            </a>
          </div>
          <div className="break-words text-[14px] leading-[1.75] md:text-[15px] lg:px-10">
            <p className={label}>{f.contact}</p>
            <p>
              <a href={contact.phone.href} className="ds-link">
                {contact.phone.display}
              </a>
            </p>
            <p>
              <a href={`mailto:${contact.email}`} className="ds-link">
                {contact.email}
              </a>
            </p>
            <p className="mt-3">
              <a href={DAYSPA_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="ds-link text-white/65">
                Instagram<ArrowUpRight />
              </a>
            </p>
          </div>
          <div className="break-words text-[14px] leading-[1.75] md:text-[15px] lg:px-10">
            <p className={label}>{f.hours}</p>
            {contact.hours.length ? (
              contact.hours.map((h) => (
                <div key={h.name} className="mb-3">
                  {contact.hours.length > 1 && <p className="text-white/55">{h.name}</p>}
                  {h.rows.map((r) => (
                    <p key={r.days}>
                      {r.days}: {r.closed ? f.closed : r.time}
                    </p>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-white/65">{f.hoursFallback}</p>
            )}
          </div>
          <div className="break-words text-[14px] leading-[1.75] md:text-[15px] lg:pl-10">
            <p className={label}>{f.follow}</p>
            <p>
              <Link href={href(locale)} className="ds-link">
                {f.hotel}
              </Link>
            </p>
            <p>
              <Link href={href(locale, "/centralfitnessclub")} className="ds-link">
                {f.club}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="ds-wrap ds-max flex flex-wrap items-center justify-center gap-4 py-6 text-[12px] text-white/45 sm:justify-between">
          <span>© {new Date().getFullYear()} Hotel Central Sarajevo</span>
          <span className="ds-display text-[16px] italic text-white/60">{c.hero.eyebrow}</span>
        </div>
      </div>
    </footer>
  );
}
