import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { Photo } from "../Photo";
import { FadeIn, RevealLines } from "../Reveal";
import { Arrow, MetaRow } from "../ui";
import { img, type HomeImages } from "./homeImages";

/**
 * Home — Club & Spa (CH-004): the two in-house brands side by side, each with its official logo, its own photograph,
 * its colour and its own button. The section title and introduction stay editable in the CMS (Home page → Club & Spa);
 * the two photographs default to the hotel's 2026 photography and can be replaced there as well.
 */
export function SpaShowcase({ locale, dict, images }: { locale: Locale; dict: Dictionary; images?: HomeImages }) {
  const d = dict.home.spa;
  const club = img(images?.spaMain, { src: "/images/club/cardio-treadmill.jpg", alt: "Treadmills and stair climbers by the windows of Central Fitness Club", position: "50% 55%" });
  const spa = img(images?.spaSecondary, { src: "/images/dayspa/relax-curtain.jpg", alt: "Relaxation lounge of Central Day Spa, with loungers behind a string curtain", position: "50% 55%" });

  const cards = [
    {
      key: "club",
      copy: d.club,
      photo: club,
      path: "/centralfitnessclub",
      panel: "bg-cfc text-white",
      logo: <Image src="/brand/central-fitness-club-white.svg" alt="Central Fitness Club" width={628} height={740} unoptimized className="h-[88px] w-auto md:h-[104px]" />,
    },
    {
      key: "dayspa",
      copy: d.dayspa,
      photo: spa,
      path: "/dayspa",
      panel: "bg-wine text-white",
      logo: <Image src="/brand/day-spa.png" alt="Day Spa — Hotel Central Sarajevo" width={652} height={468} sizes="160px" className="h-[96px] w-auto md:h-[112px]" />,
    },
  ] as const;

  return (
    <section aria-labelledby="spa-title" className="relative overflow-hidden bg-white pb-16 pt-[30px] text-ink md:pb-[6vw] md:pt-[3vw]">
      <MetaRow left={d.metaLeft} center={d.metaCenter} right={d.metaRight} />

      <div className="mt-10 grid gap-8 px-[var(--gutter)] md:mt-[4vw] md:grid-cols-[1.1fr_1fr] md:items-end md:gap-[6vw]">
        <h2 id="spa-title" className="font-display text-[12vw] leading-[0.9] md:text-[6.2vw]">
          <RevealLines lines={d.title} lineClassName={["", "pl-[8vw] md:pl-[9vw]"]} />
        </h2>
        <FadeIn as="p" className="body-copy max-w-[46ch] opacity-85 md:pb-[0.6vw]">
          {d.body}
        </FadeIn>
      </div>

      <div className="mt-12 grid gap-6 px-[var(--gutter)] md:mt-[4.5vw] md:grid-cols-2 md:gap-[2vw]">
        {cards.map((c) => (
          <FadeIn key={c.key} className={`group flex flex-col overflow-hidden ${c.panel}`}>
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/11]">
              <Photo src={c.photo.src} alt={c.photo.alt} position={c.photo.position} sizes="(min-width: 1024px) 48vw, 100vw" className="h-full w-full" grade="grade-soft" />
            </div>
            <div className="flex flex-1 flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-8 md:p-[2.4vw]">
              <div className="shrink-0">{c.logo}</div>
              <div className="flex flex-1 flex-col gap-5">
                <h3 className="sr-only">{c.copy.name}</h3>
                <p className="body-copy max-w-[44ch] opacity-90">{c.copy.body}</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[10px] uppercase tracking-[0.16em] opacity-75">
                  {c.copy.facts.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link href={href(locale, c.path)} className="pill pill-light self-start">
                  <span>{c.copy.cta}</span>
                  <Arrow />
                </Link>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
