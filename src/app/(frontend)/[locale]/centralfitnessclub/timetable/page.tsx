import type { Metadata } from "next";
import { getFitnessClub } from "@/cms/clubSpa";
import { getHotelContact } from "@/cms/hotelInfo";
import { Chips, FitContact, FitHero, FitLabel, TimetableGrid } from "@/components/fitness/FitnessParts";
import { getFitness } from "@/content/fitness";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const m = getFitness(locale).meta.timetable;
  return pageMetadata(locale, "/centralfitnessclub/timetable", m.title, m.description, "/images/pool-02.jpg");
}

/** CH-012: the monthly class timetable, edited by staff in the CMS (Central Fitness Club → Class timetable). */
export default async function TimetablePage({ params }: P) {
  const { locale } = await params;
  const f = getFitness(locale);
  const t = f.timetable;
  const [{ timetable }, contact] = await Promise.all([getFitnessClub(locale), getHotelContact(locale)]);

  return (
    <>
      <FitHero compact eyebrow={t.hero.eyebrow} title={t.hero.title} intro={t.hero.intro} />

      <section aria-labelledby="tt-month" className="px-[var(--gutter)] py-14 md:py-[5vw]">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="tt-month" className="font-athletic text-[clamp(36px,8vw,56px)] font-bold uppercase leading-none">
            {timetable.month ? `${t.month} · ${timetable.month}` : t.month}
          </h2>
        </div>
        <TimetableGrid timetable={timetable} f={f} />
        {timetable.note && <p className="mt-6 max-w-[70ch] text-[14px] leading-[1.6] opacity-80">{timetable.note}</p>}
      </section>

      <section aria-labelledby="tt-classes" className="bg-white px-[var(--gutter)] py-14 md:py-[5vw]">
        <FitLabel className="mb-5 opacity-70">{f.classes.label}</FitLabel>
        <h2 id="tt-classes" className="mb-6 font-athletic text-[clamp(32px,7vw,48px)] font-bold uppercase leading-none">
          {t.classesTitle}
        </h2>
        <p className="mb-8 max-w-[60ch] text-[15.5px] leading-[1.65]">{f.classes.body}</p>
        <Chips items={f.classes.list} />
      </section>

      <FitContact f={f} contact={contact} />
    </>
  );
}
