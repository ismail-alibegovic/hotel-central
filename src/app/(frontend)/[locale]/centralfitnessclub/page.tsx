import type { Metadata } from "next";
import Image from "next/image";
import { getFitnessClub } from "@/cms/clubSpa";
import { getHotelContact } from "@/cms/hotelInfo";
import { Chips, FactGrid, FitButton, FitContact, FitHeadline, FitHero, FitLabel, fitHref, NumberedList, PlanCards, PoolMosaic, Stats, TimetableGrid } from "@/components/fitness/FitnessParts";
import { FadeIn } from "@/components/Reveal";
import { getFitness } from "@/content/fitness";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const m = getFitness(locale).meta.home;
  return pageMetadata(locale, "/centralfitnessclub", m.title, m.description, "/images/3069.jpg");
}

/** CH-010: Central Fitness Club — a site of its own on the hotel's domain. */
export default async function FitnessHome({ params }: P) {
  const { locale } = await params;
  const f = getFitness(locale);
  const [{ timetable, membership }, contact] = await Promise.all([getFitnessClub(locale), getHotelContact(locale)]);
  const preview = { ...timetable, sessions: timetable.sessions.slice(0, 14) };

  return (
    <>
      <FitHero eyebrow={f.hero.eyebrow} title={f.hero.title} intro={f.hero.intro} image="/images/3069.jpg" alt={f.imageAlt.hero}>
        <div className="mt-9 flex flex-wrap gap-3">
          <FitButton href={fitHref(locale, "/membership")}>{f.hero.ctaPrimary}</FitButton>
          <FitButton href={fitHref(locale, "/timetable")} tone="outline">
            {f.hero.ctaSecondary}
          </FitButton>
        </div>
        <Stats items={f.hero.stats} />
      </FitHero>

      {/* (01) The club */}
      <section aria-labelledby="fit-intro" className="px-[var(--gutter)] py-16 md:py-[6vw]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-[2vw]">
          <div className="md:col-span-6">
            <FitLabel className="mb-5 opacity-70">{f.intro.label}</FitLabel>
            <FitHeadline id="fit-intro" lines={f.intro.title} className="text-[clamp(44px,10vw,64px)] md:text-[4.6vw]" />
          </div>
          <FadeIn className="space-y-5 text-[15.5px] leading-[1.65] md:col-span-5 md:col-start-8">
            {f.intro.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </FadeIn>
        </div>
        <div className="mt-12">
          <FactGrid items={f.intro.points} />
        </div>
      </section>

      {/* (02) The gym — no authentic gym photography exists yet, so this section is typographic on purpose */}
      <section aria-labelledby="fit-gym" className="bg-fit-green px-[var(--gutter)] py-16 text-white md:py-[6vw]">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-[2vw]">
          <div className="md:col-span-6">
            <FitLabel className="mb-5 text-white/70">{f.gym.label}</FitLabel>
            <FitHeadline id="fit-gym" lines={f.gym.title} className="text-[clamp(56px,13vw,84px)] md:text-[7vw]" />
            <p className="mt-7 max-w-[46ch] text-[15.5px] leading-[1.65] text-white/90">{f.gym.body}</p>
            <div className="mt-8">
              <Chips items={f.gym.equipment} tone="dark" />
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="mb-4 font-athletic text-[28px] font-bold uppercase">{f.gym.support.title}</p>
            <NumberedList items={f.gym.support.items} />
            <Image src="/brand/central-fitness-club-mark-white.png" alt="" width={542} height={640} className="mt-12 hidden h-auto w-[140px] opacity-90 md:block" />
          </div>
        </div>
      </section>

      {/* (03) Pool & wellness */}
      <section aria-labelledby="fit-pool" className="px-[var(--gutter)] py-16 md:py-[6vw]">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-[2vw]">
          <div className="md:col-span-5">
            <FitLabel className="mb-5 opacity-70">{f.pool.label}</FitLabel>
            <FitHeadline id="fit-pool" lines={f.pool.title} className="text-[clamp(48px,11vw,72px)] md:text-[5vw]" />
            <p className="mt-7 max-w-[44ch] text-[15.5px] leading-[1.65]">{f.pool.body}</p>
            <div className="mt-9">
              <FactGrid items={f.pool.facilities} />
            </div>
          </div>
          <div className="md:col-span-7">
            <PoolMosaic alts={f.imageAlt} />
          </div>
        </div>
      </section>

      {/* (04) Classes */}
      <section aria-labelledby="fit-classes" className="bg-white px-[var(--gutter)] py-16 md:py-[6vw]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-[2vw]">
          <div className="md:col-span-5">
            <FitLabel className="mb-5 opacity-70">{f.classes.label}</FitLabel>
            <FitHeadline id="fit-classes" lines={f.classes.title} className="text-[clamp(52px,12vw,80px)] md:text-[6vw]" />
            <p className="mt-7 max-w-[44ch] text-[15.5px] leading-[1.65]">{f.classes.body}</p>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:self-end">
            <Chips items={f.classes.list} />
            <div className="mt-8">
              <FitButton href={fitHref(locale, "/timetable")} tone="green">
                {f.classes.cta}
              </FitButton>
            </div>
          </div>
        </div>
      </section>

      {/* (05) Programmes */}
      <section aria-labelledby="fit-programmes" className="bg-fit-green px-[var(--gutter)] py-16 text-white md:py-[6vw]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-[2vw]">
          <div className="md:col-span-4">
            <FitLabel className="mb-5 text-white/70">{f.programmes.label}</FitLabel>
            <FitHeadline id="fit-programmes" lines={f.programmes.title} className="text-[clamp(44px,10vw,64px)] md:text-[4.4vw]" />
          </div>
          <div className="md:col-span-7 md:col-start-6 md:columns-2 md:gap-[2vw]">
            <NumberedList items={f.programmes.list} />
          </div>
        </div>
      </section>

      {/* (06) Membership preview */}
      <section aria-labelledby="fit-membership" className="px-[var(--gutter)] py-16 md:py-[6vw]">
        <div className="mb-10 grid gap-6 md:grid-cols-12 md:items-end md:gap-x-[2vw]">
          <div className="md:col-span-6">
            <FitLabel className="mb-5 opacity-70">{f.membershipPreview.label}</FitLabel>
            <FitHeadline id="fit-membership" lines={f.membershipPreview.title} className="text-[clamp(52px,12vw,80px)] md:text-[6vw]" />
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="text-[15.5px] leading-[1.65]">{f.membershipPreview.body}</p>
            <div className="mt-6">
              <FitButton href={fitHref(locale, "/membership")} tone="green">
                {f.membershipPreview.cta}
              </FitButton>
            </div>
          </div>
        </div>
        <PlanCards plans={membership.plans} f={f} locale={locale} contactHref="#contact" />
      </section>

      {/* (07) Timetable preview */}
      <section aria-labelledby="fit-timetable" className="bg-white px-[var(--gutter)] py-16 md:py-[6vw]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <FitLabel className="mb-5 opacity-70">{timetable.month ? `${f.timetablePreview.label} · ${timetable.month}` : f.timetablePreview.label}</FitLabel>
            <FitHeadline id="fit-timetable" lines={f.timetablePreview.title} className="text-[clamp(52px,12vw,80px)] md:text-[6vw]" />
          </div>
          <FitButton href={fitHref(locale, "/timetable")} tone="green">
            {f.timetablePreview.cta}
          </FitButton>
        </div>
        <TimetableGrid timetable={preview} f={f} compact />
      </section>

      <FitContact f={f} contact={contact} />
    </>
  );
}
