import Image from "next/image";
import Link from "next/link";
import { FadeIn, RevealLines } from "@/components/Reveal";
import type { BrandContact } from "@/components/brands/contact";
import type { DaySpaCopy } from "@/content/dayspa";
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
      <section className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-[var(--ds-wine-deep)] text-white md:min-h-[min(860px,100svh)]">
        <Image src={images.hero.src} alt={images.hero.alt} fill priority sizes="100vw" className="-z-10 object-cover" style={{ objectPosition: images.hero.position }} />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(30_7_10/0.62)_0%,rgb(30_7_10/0.12)_38%,rgb(30_7_10/0.78)_100%)]" />
        <div className="ds-wrap grid w-full gap-8 pb-12 pt-[130px] md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] md:items-end md:pb-16">
          <div>
            <FadeIn immediate delay={0.2}>
              <p className="ds-eyebrow text-white/85">{c.hero.eyebrow}</p>
            </FadeIn>
            <h1 className="ds-display mt-5 text-[44px] sm:text-[56px] md:text-[clamp(56px,6.2vw,92px)]">
              <RevealLines lines={c.hero.title} immediate delay={0.35} />
            </h1>
            <FadeIn immediate delay={0.8} className="mt-9 flex flex-wrap items-center gap-4">
              <Btn href={bookingUrl} variant="ds-btn--light" external>
                {c.hero.cta}
              </Btn>
              <a href="#prices" className="ds-btn ds-btn--ghost">
                {c.hero.prices}
                <i aria-hidden>↓</i>
              </a>
            </FadeIn>
          </div>
          <FadeIn immediate delay={1} className="max-w-[340px] rounded-[20px] border border-white/20 bg-[rgb(43_10_13/0.42)] p-6 backdrop-blur-md md:justify-self-end">
            <p className="ds-display text-[19px] leading-[1.25]">{c.hero.perkTitle}</p>
            <p className="ds-display mt-4 text-[44px] leading-none">{c.hero.perkBig}</p>
            <p className="mt-3 text-[14px] text-white/80">{c.hero.perkBody}</p>
            <Link href={href(locale, "/centralfitnessclub")} className="ds-link mt-3 inline-block text-[13px] text-white">
              Central Fitness Club →
            </Link>
          </FadeIn>
        </div>
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
              <text fontSize="10.5" letterSpacing="3.1" fill="var(--ds-wine)" style={{ textTransform: "uppercase" }}>
                <textPath href="#ds-seal-path">{c.about.seal} {c.about.seal}</textPath>
              </text>
            </svg>
            <span className="relative grid h-[58px] w-[58px] place-items-center rounded-full bg-[var(--ds-wine)] text-white">→</span>
          </a>
        </div>
        <div>
          <FadeIn>
            <p className="ds-eyebrow text-[var(--ds-wine)]">{c.about.label}</p>
            <h2 className="ds-display mt-4 text-[34px] text-[var(--ds-wine)] md:text-[44px]">{c.about.title}</h2>
            <p className="mt-5 max-w-[54ch] text-[var(--ds-mute)]">{c.about.body}</p>
          </FadeIn>
          <div className="mt-9 grid gap-6 border-y border-[var(--ds-line)] py-7">
            {c.about.features.map((f, i) => (
              <FadeIn key={f.title} delay={0.1 * i} className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-5 gap-y-1 sm:grid-cols-[44px_minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <span className="text-[var(--ds-wine)]">{i === 0 ? Icon.lotus : Icon.drop}</span>
                <p className="ds-display text-[18px] text-[var(--ds-ink)]">{f.title}</p>
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
          <h2 className="ds-display mx-auto mt-4 text-[34px] md:text-[48px]">
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
                <h3 className="ds-display text-[22px] text-[var(--ds-ink)]">{cat.name}</h3>
                <p className="max-w-[28ch] text-[14px] text-[var(--ds-mute)]">{cat.summary}</p>
                <span className="my-1 h-px w-full max-w-[200px] bg-[var(--ds-line)]" />
                <a href="#prices" className="ds-btn !min-h-[42px] !text-[13px]">
                  {c.services.view}
                  <i aria-hidden className="!h-[30px] !w-[30px]">→</i>
                </a>
              </div>
            );
            return <div key={cat.id} className="contents">{imageFirst ? [photo, text] : [text, photo]}</div>;
          })}
        </div>
      </section>

      {/* ───────────── Price list ───────────── */}
      <section id="prices" className="ds-wrap scroll-mt-24 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-[62ch]">
          <p className="ds-eyebrow text-[var(--ds-wine)]">{c.prices.label}</p>
          <h2 className="ds-display mt-4 text-[34px] text-[var(--ds-wine)] md:text-[46px]">{c.prices.title}</h2>
          <p className="mt-4 text-[var(--ds-mute)]">{c.prices.intro}</p>
        </FadeIn>
        <PriceList categories={categories} labels={{ duration: c.prices.duration, price: c.prices.price }} />
      </section>

      {/* ───────────── Packages ───────────── */}
      {packages.length > 0 && (
        <section id="packages" className="scroll-mt-24 bg-[var(--ds-lilac-soft)] py-20 md:py-28">
          <div className="ds-wrap">
            <FadeIn className="mx-auto mb-12 max-w-[40ch] text-center">
              <p className="ds-eyebrow text-[var(--ds-wine)]">{c.packages.label}</p>
              <h2 className="ds-display mt-4 text-[34px] text-[var(--ds-wine)] md:text-[46px]">{c.packages.title}</h2>
            </FadeIn>
            <div className={`mx-auto grid max-w-[1180px] gap-5 ${packages.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
              {packages.map((p, i) => {
                const hl = packages.length >= 3 && i === 1;
                return (
                  <FadeIn key={p.name} delay={0.08 * i} className={`flex flex-col gap-5 rounded-[22px] p-7 md:p-8 ${hl ? "bg-[var(--ds-wine)] text-white md:-translate-y-4" : "bg-[var(--ds-paper)]"}`}>
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="ds-display text-[22px]">{p.name}</h3>
                      {hl && <span className="rounded-full bg-[var(--ds-lilac)] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[var(--ds-wine)]">{c.packages.popular}</span>}
                    </div>
                    <p className="ds-display text-[46px] leading-none [font-variant-numeric:tabular-nums]">
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
      <section className="ds-wrap grid gap-14 py-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-center md:gap-[6vw] md:py-28">
        <FadeIn>
          <p className="ds-eyebrow text-[var(--ds-wine)]">{c.why.label}</p>
          <h2 className="ds-display mt-4 text-[34px] text-[var(--ds-wine)] md:text-[44px]">{c.why.title}</h2>
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
            <p className="ds-display text-[40px] leading-none">6</p>
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
          <h2 className="ds-display text-[34px] md:text-[54px]">{c.cta.title}</h2>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <Btn href={bookingUrl} variant="ds-btn--light" external>
              {c.cta.book}
            </Btn>
            <Btn href={contact.phone.href} variant="ds-btn--ghost">
              {c.cta.call} · {contact.phone.display}
            </Btn>
          </div>
          <a href={mailto} className="ds-link text-[15px] text-white/85">
            {contact.email}
          </a>
        </FadeIn>
      </section>
    </>
  );
}

/** Day Spa footer: wine ground, logo, address, contact, hours, links to the hotel and the club. */
export function DaySpaFooter({ locale, c, contact, address }: { locale: Locale; c: DaySpaCopy; contact: BrandContact; address: { street: string; city: string; directions: string } }) {
  const f = c.footer;
  return (
    <footer id="contact" className="scroll-mt-20 bg-[var(--ds-wine-deep)] text-white">
      <div className="ds-wrap grid gap-12 py-16 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:py-20">
        <div>
          <Image src="/brand/dayspa-on-dark.png" alt="Central Day Spa" width={150} height={108} className="h-auto w-[130px]" />
          <p className="mt-6 max-w-[30ch] text-[14px] text-white/65">{f.rights}</p>
        </div>
        <div className="text-[14px]">
          <p className="ds-eyebrow mb-4 text-[var(--ds-lilac)]">{f.address}</p>
          <p>{address.street}</p>
          <p>{address.city}</p>
          <a href={address.directions} target="_blank" rel="noopener noreferrer" className="ds-link mt-3 inline-block text-white/75">
            Google Maps ↗
          </a>
        </div>
        <div className="text-[14px]">
          <p className="ds-eyebrow mb-4 text-[var(--ds-lilac)]">{f.contact}</p>
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
          <p className="ds-eyebrow mb-3 mt-7 text-[var(--ds-lilac)]">{f.hours}</p>
          {contact.hours.length ? (
            contact.hours.map((h) => (
              <div key={h.name} className="mb-3">
                {contact.hours.length > 1 && <p className="text-white/60">{h.name}</p>}
                {h.rows.map((r) => (
                  <p key={r.days}>
                    {r.days}: {r.closed ? "—" : r.time}
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p className="text-white/70">{f.hoursFallback}</p>
          )}
        </div>
        <div className="text-[14px]">
          <p className="ds-eyebrow mb-4 text-[var(--ds-lilac)]">{f.follow}</p>
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
      <div className="ds-wrap flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6 text-[12px] text-white/50">
        <span>© {new Date().getFullYear()} Hotel Central Sarajevo</span>
        <span className="h-[2px] w-16 bg-[var(--ds-sage)]" aria-hidden />
      </div>
    </footer>
  );
}
