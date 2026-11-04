import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { Photo } from "../Photo";
import { FadeIn, RevealLines } from "../Reveal";
import { Arrow, MetaRow } from "../ui";
import { img, type HomeImages } from "./homeImages";

/**
 * CH-004: the former "Club & Spa" preview, split into two visually distinct worlds — Central Fitness Club (the club's
 * green, its own logo, the pool) and Central Day Spa (the spa's burgundy and blush, its own logo, the treatment rooms) —
 * each with its own button to its own section of the site. The two photographs stay editable as the homepage's
 * "Club & Spa" photos in the CMS (main photo → fitness, second photo → spa).
 */
export function ClubSpaShowcase({ locale, dict, images }: { locale: Locale; dict: Dictionary; images?: HomeImages }) {
  const d = dict.home.club;
  const pool = img(images?.spaMain, { src: "/images/3069.jpg", alt: d.fitness.alt, position: "50% 60%" });
  const spa = img(images?.spaSecondary, { src: "/images/final-6202.jpg", alt: d.spa.alt, position: "50% 50%" });

  return (
    <section aria-labelledby="club-title" className="relative overflow-hidden bg-ivory pb-16 pt-[30px] text-ink md:pb-[5vw] md:pt-[3vw]">
      <MetaRow left={d.metaLeft} center={d.metaCenter} right={d.metaRight} />

      <div className="mt-10 grid gap-8 px-[var(--gutter)] md:mt-[4vw] md:grid-cols-12 md:items-end md:gap-x-[2vw]">
        <h2 id="club-title" className="font-display text-[13vw] leading-[0.9] md:col-span-7 md:text-[6.4vw]">
          <RevealLines lines={d.title} lineClassName={["", "pl-[8vw] md:pl-[9vw]"]} />
        </h2>
        <FadeIn as="p" className="body-copy max-w-[44ch] opacity-85 md:col-span-4 md:col-start-9 md:pb-[0.8vw]">
          {d.intro}
        </FadeIn>
      </div>

      <div className="mt-12 grid gap-5 px-[var(--gutter)] md:mt-[4vw] md:grid-cols-2 md:gap-[1.4vw]">
        {/* Central Fitness Club */}
        <article aria-labelledby="club-fitness" className="group relative flex flex-col overflow-hidden bg-fit-green text-white">
          <Link href={href(locale, "/centralfitnessclub")} tabIndex={-1} aria-hidden className="block">
            <Photo src={pool.src} alt="" position={pool.position} sizes="(min-width: 1024px) 48vw, 100vw" grade="grade-bright" className="aspect-[4/3] md:aspect-[16/11]" imgClassName="transition-transform duration-[1.6s] ease-[var(--ease-out)] group-hover:scale-[1.04]" />
          </Link>
          <div className="relative flex flex-1 flex-col gap-7 p-7 md:p-[2.6vw]">
            <div className="flex items-start justify-between gap-6">
              <Image src="/brand/central-fitness-club-mark-white.png" alt="Central Fitness Club" width={542} height={640} className="h-auto w-[92px] md:w-[7vw] md:min-w-[96px]" />
              <p className="label text-right opacity-75">{d.fitness.tagline}</p>
            </div>
            <h3 id="club-fitness" className="sr-only">
              {d.fitness.name}
            </h3>
            <p className="body-copy max-w-[46ch] opacity-90">{d.fitness.body}</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.16em]">
              {d.fitness.facts.map((f) => (
                <li key={f} className="border-t border-white/25 pt-2">
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-2">
              <Link
                href={href(locale, "/centralfitnessclub")}
                className="inline-flex min-h-[46px] items-center gap-3 rounded-full bg-white px-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-fit-green transition-colors duration-500 hover:bg-fit-mist"
              >
                {d.fitness.cta}
                <Arrow />
              </Link>
            </div>
          </div>
        </article>

        {/* Central Day Spa */}
        <article aria-labelledby="club-spa" className="group relative flex flex-col overflow-hidden bg-spa-blush text-spa-wine">
          <Link href={href(locale, "/dayspa")} tabIndex={-1} aria-hidden className="block">
            <Photo src={spa.src} alt="" position={spa.position} sizes="(min-width: 1024px) 48vw, 100vw" grade="grade-soft" className="aspect-[4/3] md:aspect-[16/11]" imgClassName="transition-transform duration-[1.6s] ease-[var(--ease-out)] group-hover:scale-[1.04]" />
          </Link>
          <div className="relative flex flex-1 flex-col gap-7 p-7 md:p-[2.6vw]">
            <div className="flex items-start justify-between gap-6">
              <Image src="/brand/central-day-spa-mark.png" alt="Central Day Spa" width={640} height={579} className="h-auto w-[104px] md:w-[8vw] md:min-w-[108px]" />
              <p className="label text-right opacity-75">{d.spa.tagline}</p>
            </div>
            <h3 id="club-spa" className="sr-only">
              {d.spa.name}
            </h3>
            <p className="body-copy max-w-[46ch] opacity-90">{d.spa.body}</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.16em]">
              {d.spa.facts.map((f) => (
                <li key={f} className="border-t border-spa-wine/25 pt-2">
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-2">
              <Link
                href={href(locale, "/dayspa")}
                className="inline-flex min-h-[46px] items-center gap-3 rounded-full border border-spa-wine px-7 text-[11px] uppercase tracking-[0.16em] transition-colors duration-500 hover:bg-spa-wine hover:text-white"
              >
                {d.spa.cta}
                <Arrow />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
