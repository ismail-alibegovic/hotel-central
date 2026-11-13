import type { Metadata } from "next";
import { ClubSubHero } from "@/components/microsite/ClubSubHero";
import { Arrow } from "@/components/ui";
import { getHotelContact } from "@/cms/hotelInfo";
import { getClubCopy, memberships } from "@/content/club";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const m = getClubCopy(locale).membership;
  return pageMetadata(locale, "/centralfitnessclub/membership", m.meta.title, m.meta.description, "/images/club/kettlebells-rack.jpg");
}

/**
 * Membership (approved sitemap 04.1, CH-011). Types, prices and benefits come from `memberships` in src/content/club.ts;
 * the hotel has not supplied them yet, so the page shows what every membership gives access to and how to ask for prices.
 */
export default async function Membership({ params }: P) {
  const { locale } = await params;
  const c = getClubCopy(locale);
  const m = c.membership;
  const contact = await getHotelContact(locale);
  const mail = (subject: string) => `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;

  return (
    <>
      <ClubSubHero eyebrow={m.hero.eyebrow} title={m.hero.title} intro={m.hero.intro} image="/images/club/kettlebells-rack.jpg" alt={locale === "bs" ? "Girje na stalku uz prozor kluba" : "Kettlebells on a rack by the club's window"} />

      <section aria-labelledby="included-title" className="px-[var(--gutter)] py-16 md:py-[6vw]">
        <p id="included-title" className="label text-cfc">
          {m.includedLabel}
        </p>
        <ul className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {m.included.map((i) => (
            <li key={i} className="font-club flex items-center gap-4 border-t border-cfc/25 py-5 text-[22px] text-cfc md:text-[26px]">
              <span aria-hidden className="h-[8px] w-[8px] shrink-0 bg-cfc" />
              {i}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="options-title" className="bg-white px-[var(--gutter)] py-16 md:py-[6vw]">
        <p id="options-title" className="label text-cfc">
          {m.optionsLabel}
        </p>
        {memberships.length ? (
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {memberships.map((o) => (
              <li key={o.name.en} className={`flex flex-col gap-6 p-8 ${o.highlight ? "bg-cfc text-white" : "border border-cfc/25"}`}>
                <h2 className="font-club text-[30px]">{o.name[locale]}</h2>
                <p>
                  <span className="font-club text-[54px]">{o.price} KM</span>{" "}
                  <span className="label opacity-70">
                    {m.perPeriod} {o.period[locale]}
                  </span>
                </p>
                <ul className="body-copy flex-1 space-y-2">
                  {o.includes.map((i) => (
                    <li key={i.en}>— {i[locale]}</li>
                  ))}
                </ul>
                <a href={mail(`Central Fitness Club — ${o.name[locale]}`)} className={`pill self-start ${o.highlight ? "pill-light" : "pill-dark"}`}>
                  <span>{m.enquire}</span>
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 grid gap-8 border-l-2 border-cfc pl-6 md:max-w-[760px]">
            <p className="body-copy text-[16px] opacity-90">{m.pending}</p>
            <div className="flex flex-wrap gap-4">
              <a href={contact.phone.href} className="pill border-cfc bg-cfc text-white hover:bg-transparent hover:text-cfc">
                <span>
                  {c.join.call} {contact.phone.display}
                </span>
              </a>
              <a href={mail("Central Fitness Club — membership")} className="pill pill-dark">
                <span>{c.join.email}</span>
                <Arrow />
              </a>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
