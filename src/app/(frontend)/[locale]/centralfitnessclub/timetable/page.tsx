import type { Metadata } from "next";
import { ClubSubHero } from "@/components/microsite/ClubSubHero";
import { getHotelContact } from "@/cms/hotelInfo";
import { getClubCopy, timetable } from "@/content/club";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const t = getClubCopy(locale).timetableCopy;
  return pageMetadata(locale, "/centralfitnessclub/timetable", t.meta.title, t.meta.description, "/images/club/studio-stretch.jpg");
}

/**
 * Class timetable (approved sitemap 04.2, CH-012). The month's classes come from `timetable` in src/content/club.ts
 * (day, start, end, class). Until the hotel supplies the timetable the page lists the classes the club runs and
 * says how to check today's schedule.
 */
export default async function Timetable({ params }: P) {
  const { locale } = await params;
  const c = getClubCopy(locale);
  const t = c.timetableCopy;
  const contact = await getHotelContact(locale);
  const days = t.days.map((name, i) => ({ name, slots: timetable.slots.filter((s) => s.day === i + 1).sort((a, b) => a.start.localeCompare(b.start)) }));

  return (
    <>
      <ClubSubHero eyebrow={t.hero.eyebrow} title={t.hero.title} intro={t.hero.intro} image="/images/club/studio-stretch.jpg" alt={locale === "bs" ? "Istezanje u studiju za grupne treninge" : "Stretching in the group exercise studio"} />

      <section aria-labelledby="tt-title" className="px-[var(--gutter)] py-16 md:py-[6vw]">
        <p id="tt-title" className="label text-cfc">
          {t.label}
          {timetable.month ? ` — ${timetable.month[locale]}` : ""}
        </p>
        {timetable.slots.length ? (
          <div className="mt-8 grid gap-px overflow-hidden border border-cfc/20 bg-cfc/20 md:grid-cols-7">
            {days.map((d) => (
              <div key={d.name} className="bg-white p-4">
                <h2 className="font-club text-[20px] text-cfc">{d.name}</h2>
                {d.slots.length ? (
                  <ul className="mt-3 space-y-3">
                    {d.slots.map((s) => (
                      <li key={s.start + s.name.en} className="border-t border-cfc/15 pt-2">
                        <span className="label block opacity-70">
                          {s.start}–{s.end}
                        </span>
                        <span className="text-[14px]">{s.name[locale]}</span>
                        {s.place && <span className="label-sm block opacity-60">{s.place[locale]}</span>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="label mt-3 opacity-50">{t.noClasses}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1fr] md:gap-[5vw]">
            <div className="border-l-2 border-cfc pl-6">
              <p className="body-copy text-[16px] opacity-90">{t.pending}</p>
              <a href={contact.phone.href} className="pill mt-6 border-cfc bg-cfc text-white hover:bg-transparent hover:text-cfc">
                <span>
                  {c.join.call} {contact.phone.display}
                </span>
              </a>
            </div>
            <div>
              <h2 className="label mb-4 opacity-60">{t.classesLabel}</h2>
              <ul className="flex flex-wrap gap-2">
                {c.classes.list.map((k) => (
                  <li key={k} className="label rounded-full border border-cfc/35 px-4 py-2 text-cfc">
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
