import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OpeningHours } from "@/components/page/OpeningHours";
import { Photo } from "@/components/Photo";
import { FadeIn } from "@/components/Reveal";
import { Arrow } from "@/components/ui";
import { getHotelContact } from "@/cms/hotelInfo";
import { getClubCopy } from "@/content/club";
import { href, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const c = getClubCopy(locale);
  return pageMetadata(locale, "/centralfitnessclub", c.meta.title, c.meta.description, "/images/club/cardio-treadmill.jpg");
}

const alt = (locale: Locale, en: string, bs: string) => (locale === "bs" ? bs : en);

/** Central Fitness Club — home of the club's own section (approved sitemap 04, CH-009, CH-010). */
export default async function Club({ params }: P) {
  const { locale } = await params;
  const c = getClubCopy(locale);
  const contact = await getHotelContact(locale);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-110px)] items-end overflow-hidden bg-cfc-deep text-white">
        <Image
          src="/images/club/cardio-treadmill.jpg"
          alt={alt(locale, "A member running on a treadmill by the tall windows of the club", "Članica trči na traci uz visoke prozore kluba")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_45%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,54,38,0.92)_0%,rgba(24,54,38,0.65)_45%,rgba(24,54,38,0.1)_100%)] max-md:bg-[linear-gradient(180deg,rgba(24,54,38,0.25)_0%,rgba(24,54,38,0.9)_70%)]" />
        <div className="relative w-full px-[var(--gutter)] pb-12 pt-32 md:pb-[6vw]">
          <p className="label opacity-80">{c.hero.eyebrow}</p>
          <h1 className="font-club mt-5 text-[19vw] md:text-[9.5vw]">
            {c.hero.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h1>
          <p className="body-copy mt-6 max-w-[42ch] text-[16px] opacity-90 md:text-[17px]">{c.hero.intro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={href(locale, "/centralfitnessclub/membership")} className="pill border-white bg-white text-cfc hover:bg-transparent hover:text-white">
              <span>{c.nav.membership}</span>
              <Arrow />
            </Link>
            <Link href={href(locale, "/centralfitnessclub/timetable")} className="pill pill-light">
              <span>{c.nav.timetable}</span>
              <Arrow />
            </Link>
          </div>
          <dl className="mt-14 grid max-w-[760px] grid-cols-3 gap-6 border-t border-white/25 pt-6">
            {c.stats.map((s) => (
              <div key={s.k}>
                <dt className="sr-only">{s.k}</dt>
                <dd>
                  <span className="font-club block text-[44px] md:text-[56px]">{s.v}</span>
                  <span className="label mt-1 block opacity-75">{s.k}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The gym */}
      <section aria-labelledby="gym-title" className="px-[var(--gutter)] py-16 md:py-[7vw]">
        <div className="grid gap-12 md:grid-cols-[1fr_1.15fr] md:gap-[5vw]">
          <div>
            <p className="label text-cfc">{c.gym.label}</p>
            <h2 id="gym-title" className="font-club mt-5 text-[13vw] text-cfc md:text-[5.4vw]">
              {c.gym.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <FadeIn className="mt-8 space-y-4">
              {c.gym.body.map((b) => (
                <p key={b} className="body-copy max-w-[48ch] opacity-85">
                  {b}
                </p>
              ))}
            </FadeIn>
            <FadeIn className="mt-10">
              <h3 className="label mb-4 opacity-60">{c.gym.equipment.title}</h3>
              <ul className="grid gap-x-8 sm:grid-cols-2">
                {c.gym.equipment.items.map((i) => (
                  <li key={i} className="flex items-center gap-3 border-t border-cfc/20 py-3 text-[14px]">
                    <span aria-hidden className="h-[6px] w-[6px] bg-cfc" />
                    {i}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-[1.2vw]">
            <Photo src="/images/club/kettlebells-window.jpg" alt={alt(locale, "Rows of kettlebells and sandbags under the windows", "Redovi girja i vreća s pijeskom ispod prozora")} sizes="(min-width: 1024px) 26vw, 50vw" className="row-span-2 h-full min-h-[320px]" grade="none" />
            <Photo src="/images/club/cardio-elliptical.jpg" alt={alt(locale, "A member on the elliptical trainer beneath the “Feel your power” sign", "Članica na eliptičnom trenažeru ispod natpisa „Feel your power”")} sizes="(min-width: 1024px) 26vw, 50vw" className="aspect-[4/5]" position="50% 40%" grade="none" />
            <Photo src="/images/club/dumbbell-rack.jpg" alt={alt(locale, "Dumbbell rack in front of the mirrored weights floor", "Stalak sa bučicama ispred zone sa tegovima")} sizes="(min-width: 1024px) 26vw, 50vw" className="aspect-[4/5]" grade="none" />
          </div>
        </div>
      </section>

      {/* Classes */}
      <section aria-labelledby="classes-title" className="bg-cfc px-[var(--gutter)] py-16 text-white md:py-[7vw]">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-[5vw]">
          <div className="grid grid-cols-[1fr_0.8fr] items-end gap-3 md:gap-[1.2vw] md:order-1">
            <Photo src="/images/club/studio-window.jpg" alt={alt(locale, "Stretching on a mat in the group exercise studio", "Istezanje na prostirci u studiju za grupne treninge")} sizes="(min-width: 1024px) 30vw, 55vw" className="aspect-[3/4]" grade="none" />
            <Photo src="/images/club/studio-roller.jpg" alt={alt(locale, "Mobility work with a foam roller in the studio", "Vježbe mobilnosti s valjkom u studiju")} sizes="(min-width: 1024px) 22vw, 40vw" className="aspect-[3/4]" grade="none" />
          </div>
          <div className="md:order-2">
            <p className="label opacity-75">{c.classes.label}</p>
            <h2 id="classes-title" className="font-club mt-5 text-[13vw] md:text-[5.4vw]">
              {c.classes.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p className="body-copy mt-8 max-w-[46ch] opacity-90">{c.classes.body}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {c.classes.list.map((k) => (
                <li key={k} className="label rounded-full border border-white/35 px-4 py-2">
                  {k}
                </li>
              ))}
            </ul>
            <Link href={href(locale, "/centralfitnessclub/timetable")} className="pill mt-10 border-white bg-white text-cfc hover:bg-transparent hover:text-white">
              <span>{c.classes.cta}</span>
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* Pool & wellness */}
      <section aria-labelledby="pool-title" className="px-[var(--gutter)] py-16 md:py-[7vw]">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-[5vw]">
          <div>
            <p className="label text-cfc">{c.pool.label}</p>
            <h2 id="pool-title" className="font-club mt-5 text-[13vw] text-cfc md:text-[5.4vw]">
              {c.pool.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p className="body-copy mt-8 max-w-[46ch] opacity-85">{c.pool.body}</p>
            <ul className="mt-8 grid grid-cols-2 gap-x-8">
              {c.pool.facts.map((f) => (
                <li key={f} className="border-t border-cfc/20 py-3 text-[13px] uppercase tracking-[0.12em]">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-[1.2fr_1fr] gap-3 md:gap-[1.2vw]">
            <Photo src="/images/hotel/pool-lanes.jpg" alt={alt(locale, "Steps into the 25-metre pool between mosaic columns", "Stepenice u bazen od 25 metara između stubova s mozaikom")} sizes="(min-width: 1024px) 30vw, 55vw" className="aspect-[3/4]" grade="none" />
            <Photo src="/images/hotel/pool-hydro.jpg" alt={alt(locale, "Hydrotherapy pools with water cascades beside the main pool", "Hidroterapijski bazeni s vodenim kaskadama pored glavnog bazena")} sizes="(min-width: 1024px) 24vw, 45vw" className="mt-[18%] aspect-[3/4]" grade="none" />
          </div>
        </div>
      </section>

      <OpeningHours
        hours={contact.hours}
        facilities={["gym", "pool"]}
        label={c.hours.label}
        title={c.hours.title}
        fallback={c.hours.fallback}
        phone={contact.phone}
        className="bg-white text-ink"
        titleClass="font-club text-cfc"
      />

      {/* Join */}
      <section aria-labelledby="join-title" className="bg-cfc-deep px-[var(--gutter)] py-16 text-white md:py-[6vw]">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-[5vw]">
          <div>
            <h2 id="join-title" className="font-club text-[15vw] md:text-[6.4vw]">
              {c.join.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p className="body-copy mt-6 max-w-[48ch] opacity-90">{c.join.body}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={contact.phone.href} className="pill border-white bg-white text-cfc hover:bg-transparent hover:text-white">
                <span>
                  {c.join.call} {contact.phone.display}
                </span>
              </a>
              <a href={`mailto:${contact.email}?subject=${encodeURIComponent("Central Fitness Club")}`} className="pill pill-light">
                <span>{c.join.email}</span>
                <Arrow />
              </a>
            </div>
          </div>
          <Photo src="/images/club/merch.jpg" alt={alt(locale, "Central Fitness Club T-shirt and water bottle", "Majica i boca Central Fitness Cluba")} sizes="(min-width: 1024px) 34vw, 90vw" className="aspect-[4/5] max-h-[620px]" position="60% 50%" grade="none" />
        </div>
      </section>
    </>
  );
}
