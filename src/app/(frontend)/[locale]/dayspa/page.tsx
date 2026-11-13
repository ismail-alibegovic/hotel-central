import type { Metadata } from "next";
import { OpeningHours } from "@/components/page/OpeningHours";
import { Photo } from "@/components/Photo";
import { FadeIn } from "@/components/Reveal";
import { Arrow } from "@/components/ui";
import { getHotelContact } from "@/cms/hotelInfo";
import { formatKm, getDaySpaCopy, spaBookingUrl, treatmentGroups } from "@/content/dayspa";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const c = getDaySpaCopy(locale);
  return pageMetadata(locale, "/dayspa", c.meta.title, c.meta.description, "/images/dayspa/maderotherapy.jpg");
}

const alt = (locale: Locale, en: string, bs: string) => (locale === "bs" ? bs : en);

/** Central Day Spa (approved sitemap 05, CH-009, CH-013): treatments, current prices, booking and contact. */
export default async function DaySpa({ params }: P) {
  const { locale } = await params;
  const c = getDaySpaCopy(locale);
  const contact = await getHotelContact(locale);
  const booking = spaBookingUrl(locale);

  return (
    <>
      {/* Hero */}
      <section className="grid md:min-h-[calc(100svh-110px)] md:grid-cols-[1fr_1fr]">
        <div className="flex flex-col justify-center px-[var(--gutter)] py-16 md:px-[6vw] md:py-[6vw]">
          <p className="label tracking-[0.3em] text-berry">{c.hero.eyebrow}</p>
          <h1 className="font-spa mt-6 text-[13vw] text-wine md:text-[5.6vw]">
            {c.hero.title.map((l, i) => (
              <span key={l} className={`block ${i ? "italic md:pl-[3vw]" : ""}`}>
                {l}
              </span>
            ))}
          </h1>
          <p className="body-copy mt-8 max-w-[40ch] text-[16px] opacity-85">{c.hero.intro}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href={booking} target="_blank" rel="noopener noreferrer" className="pill border-wine bg-wine text-white hover:bg-transparent hover:text-wine">
              <span>{c.nav.book}</span>
              <Arrow />
            </a>
            <a href="#treatments" className="pill pill-dark">
              <span>{c.nav.treatments}</span>
            </a>
          </div>
          <p className="label mt-12 flex items-center gap-4 text-wine">
            <span aria-hidden className="h-px w-10 bg-spa-sage" />
            {c.perk}
          </p>
        </div>
        <Photo
          src="/images/dayspa/treatment-room.jpg"
          alt={alt(locale, "A treatment room in warm light, with the balneo bath behind a string curtain", "Tretman soba u toplom svjetlu, s balneo kadom iza zavjese od niti")}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[4/5] md:aspect-auto md:h-full"
          position="50% 55%"
          grade="none"
        />
      </section>

      {/* The spa */}
      <section aria-labelledby="spa-intro" className="bg-white px-[var(--gutter)] py-16 md:px-[6vw] md:py-[7vw]">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-[6vw]">
          <div>
            <p className="label tracking-[0.3em] text-berry">{c.intro.label}</p>
            <h2 id="spa-intro" className="font-spa mt-6 text-[12vw] text-wine md:text-[4.4vw]">
              {c.intro.title.map((l, i) => (
                <span key={l} className={`block ${i ? "italic" : ""}`}>
                  {l}
                </span>
              ))}
            </h2>
            <FadeIn className="mt-8 space-y-4">
              {c.intro.body.map((b) => (
                <p key={b} className="body-copy max-w-[48ch] opacity-85">
                  {b}
                </p>
              ))}
            </FadeIn>
          </div>
          <div className="grid grid-cols-[1fr_1.2fr] items-start gap-3 md:gap-[1.4vw]">
            <Photo src="/images/dayspa/maderotherapy.jpg" alt={alt(locale, "Wooden maderotherapy tools laid out on a towel", "Drveni alati za maderoterapiju na peškiru")} sizes="(min-width: 1024px) 22vw, 45vw" className="mt-[30%] aspect-[3/4]" grade="none" />
            <Photo src="/images/dayspa/pedicure-room.jpg" alt={alt(locale, "A treatment room seen through a string curtain, with an orchid on the shelf", "Tretman soba viđena kroz zavjesu od niti, s orhidejom na polici")} sizes="(min-width: 1024px) 26vw, 55vw" className="aspect-[3/4]" grade="none" />
          </div>
        </div>
      </section>

      {/* Treatments & prices */}
      <section id="treatments" aria-labelledby="menu-title" className="scroll-mt-[130px] px-[var(--gutter)] py-16 md:px-[6vw] md:py-[7vw]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label tracking-[0.3em] text-berry">{c.menu.label}</p>
            <h2 id="menu-title" className="font-spa mt-6 text-[12vw] text-wine md:text-[4.4vw]">
              {c.menu.title.map((l, i) => (
                <span key={l} className={`block ${i ? "italic" : ""}`}>
                  {l}
                </span>
              ))}
            </h2>
          </div>
          <p className="label max-w-[40ch] opacity-70 md:text-right">{c.menu.note}</p>
        </div>

        <nav aria-label={c.menu.label} className="mt-10 flex flex-wrap gap-2">
          {treatmentGroups.map((g) => (
            <a key={g.id} href={`#t-${g.id}`} className="label rounded-full border border-wine/30 px-4 py-2 text-wine transition-colors hover:bg-wine hover:text-white">
              {g.name[locale]}
            </a>
          ))}
        </nav>

        <div className="mt-12 grid gap-x-[6vw] gap-y-14 md:grid-cols-2">
          {treatmentGroups.map((g) => (
            <section key={g.id} id={`t-${g.id}`} aria-labelledby={`h-${g.id}`} className="scroll-mt-[130px]">
              <h3 id={`h-${g.id}`} className="font-spa border-b border-wine/25 pb-3 text-[30px] text-wine md:text-[34px]">
                {g.name[locale]}
              </h3>
              {g.intro && <p className="body-copy mt-3 opacity-75">{g.intro[locale]}</p>}
              <ul>
                {g.items.map((it, i) => (
                  <li key={i} className="flex items-baseline gap-3 border-b border-wine/10 py-3">
                    <span className="flex-1">
                      <span className="text-[15px]">{it.name[locale]}</span>
                      {it.includes && (
                        <span className="mt-1 block text-[13px] opacity-70">
                          {c.menu.includes}: {it.includes.map((x) => x[locale]).join(" · ")}
                        </span>
                      )}
                    </span>
                    {it.minutes && (
                      <span className="label whitespace-nowrap opacity-60">
                        {it.minutes} {c.menu.min}
                      </span>
                    )}
                    <span className="w-[86px] whitespace-nowrap text-right text-[15px] font-medium text-wine">{formatKm(it.price, locale)}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      {/* Book */}
      <section id="book" aria-labelledby="book-title" className="scroll-mt-[130px] bg-wine px-[var(--gutter)] py-16 text-white md:px-[6vw] md:py-[6vw]">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-[6vw]">
          <div>
            <h2 id="book-title" className="font-spa text-[13vw] md:text-[5vw]">
              {c.book.title.map((l, i) => (
                <span key={l} className={`block ${i ? "italic md:pl-[3vw]" : ""}`}>
                  {l}
                </span>
              ))}
            </h2>
            <p className="body-copy mt-6 max-w-[46ch] opacity-90">{c.book.body}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={booking} target="_blank" rel="noopener noreferrer" className="pill border-sand bg-sand text-wine hover:bg-transparent hover:text-sand">
                <span>{c.book.online}</span>
                <Arrow />
              </a>
              <a href={contact.phone.href} className="pill pill-light">
                <span>
                  {c.book.call} {contact.phone.display}
                </span>
              </a>
              <a href={`mailto:${contact.email}?subject=${encodeURIComponent("Central Day Spa")}`} className="pill pill-light">
                <span>{c.book.email}</span>
              </a>
            </div>
            <p className="label mt-10 flex items-center gap-4 opacity-85">
              <span aria-hidden className="h-px w-10 bg-spa-sage" />
              {c.perk}
            </p>
          </div>
          <Photo src="/images/dayspa/facial.jpg" alt={alt(locale, "A facial treatment in progress", "Tretman lica u toku")} sizes="(min-width: 1024px) 34vw, 90vw" className="aspect-[4/5] max-h-[600px]" grade="none" />
        </div>
      </section>

      <OpeningHours
        hours={contact.hours}
        facilities={["spa"]}
        label={c.hours.label}
        title={c.hours.title}
        fallback={c.hours.fallback}
        phone={contact.phone}
        className="bg-blush text-[#2b1a1c]"
        rule="border-wine/20"
        titleClass="font-spa text-wine"
        photos={[
          { src: "/images/dayspa/product-cabinet.jpg", alt: alt(locale, "Glass cabinet with the spa's oils and skincare products", "Vitrina sa uljima i kozmetikom spa centra") },
          { src: "/images/dayspa/yin-yang.jpg", alt: alt(locale, "Yin-yang inlay in the wooden floor of a treatment room", "Yin-yang intarzija u drvenom podu tretman sobe") },
        ]}
      />
    </>
  );
}
