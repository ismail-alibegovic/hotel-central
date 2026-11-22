import type { Dictionary } from "@/content/dictionary";
import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { DecorativeLine } from "../DecorativeLine";
import { Photo } from "../Photo";
import { FadeIn, RevealLines } from "../Reveal";
import Image from "next/image";
import { MetaRow } from "../ui";
import { img, type HomeImages } from "./homeImages";

const BIG = "[--x:40%] [--y:15.5%] [--w:57.46%] [--h:64%]";

function SpaTitle({ lines, className = "" }: { lines: string[]; className?: string }) {
  return (
    <div className={`font-display absolute left-[6%] top-[23%] text-[8.4cqw] leading-[0.9] ${className}`}>
      <RevealLines lines={lines} lineClassName={["", "pl-[14.5cqw]"]} />
    </div>
  );
}

export function SpaShowcase({ locale, dict, images }: { locale: Locale; dict: Dictionary; images?: HomeImages }) {
  const d = dict.home.spa;
  const main = img(images?.spaMain, { src: "/images/club/pool-lanes.jpg", alt: "The heated 25-metre pool with its mosaic columns", position: "50% 62%" });
  const mainM = img(images?.spaMain, { src: "/images/club/pool-lanes.jpg", alt: "The heated 25-metre pool", position: "50% 60%" });
  const second = img(images?.spaSecondary, { src: "/images/dayspa/guest-robe.jpg", alt: "A guest in a white robe in the corridor of Central Day Spa", position: "50% 35%" });
  const secondM = img(images?.spaSecondary, { src: "/images/dayspa/guest-robe.jpg", alt: "" });
  return (
    <section aria-labelledby="spa-title" className="relative overflow-hidden bg-olive text-white">
      <h2 id="spa-title" className="sr-only">
        {d.title.join(" ")}
      </h2>

      {/* Desktop artboard */}
      <div className="comp hidden aspect-[1025/700] md:block">
        <DecorativeLine variant="spa" tone="light" className="z-0" />
        <div className="absolute inset-x-0 top-[4.4%] z-[4]">
          <MetaRow left={d.metaLeft} center={d.metaCenter} right={d.metaRight} />
        </div>

        <SpaTitle lines={d.title} className="z-[1]" />

        <div className={`rect z-[2] ${BIG}`}>
          <Photo
            src={main.src}
            alt={main.alt}
            sizes="58vw"
            position={main.position}
            className="h-full w-full"
            grade="grade-dark"
            parallax={5}
          />
        </div>
        <div className="rect z-[2] [--x:6%] [--y:51%] [--w:17%] [--h:37%]">
          <Photo
            src={second.src}
            alt={second.alt}
            sizes="18vw"
            position={second.position}
            className="h-full w-full"
            parallax={6}
          />
        </div>

        <div aria-hidden className={`clip-rect pointer-events-none absolute inset-0 z-[3] ${BIG}`}>
          <SpaTitle lines={d.title} />
        </div>

        <FadeIn as="p" className="absolute left-[25.4%] top-[62%] z-[4] w-[12.2%] text-[0.98cqw] leading-[1.5] opacity-90">
          {d.body}
        </FadeIn>

        <div className="absolute left-[40%] top-[84.5%] z-[4] flex w-[57.46%] items-start justify-between gap-8">
          <ul className="grid max-w-[34cqw] grid-cols-2 gap-x-[3cqw] gap-y-[0.5em] text-[0.78cqw] uppercase tracking-[0.14em]">
            {d.facts.map((f) => (
              <li key={f} className="flex items-center gap-3 border-t border-white/20 pt-[0.6em]">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile recomposition */}
      <div className="relative pb-16 pt-[30px] md:hidden">
        <MetaRow left={d.metaLeft} center={d.metaCenter} />
        <div className="comp mt-8 aspect-[390/470]">
          <div className="font-display absolute left-[4%] top-0 z-[1] text-[12.2cqw] leading-[0.9]">
            <RevealLines lines={d.title} lineClassName={["", "pl-[6cqw]"]} />
          </div>
          <div className="rect z-[2] [--x:18%] [--y:33%] [--w:82%] [--h:67%]">
            <Photo src={mainM.src} alt={mainM.alt} sizes="82vw" grade="grade-dark" className="h-full w-full" position={mainM.position} />
          </div>
          <div aria-hidden className="clip-rect pointer-events-none absolute inset-0 z-[3] [--x:18%] [--y:33%] [--w:82%] [--h:67%]">
            <div className="font-display absolute left-[4%] top-0 text-[12.2cqw] leading-[0.9]">
              <RevealLines lines={d.title} lineClassName={["", "pl-[6cqw]"]} />
            </div>
          </div>
          <div className="rect z-[4] [--x:4%] [--y:72%] [--w:30%] [--h:40%]">
            <Photo src={secondM.src} alt={secondM.alt} sizes="30vw" className="h-full w-full" position={secondM.position} />
          </div>
        </div>
        <div className="mt-28 space-y-8 px-[var(--gutter)]">
          <p className="body-copy max-w-[34ch] opacity-90">{d.body}</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.14em]">
            {d.facts.map((f) => (
              <li key={f} className="border-t border-white/20 pt-2">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <BrandDoors locale={locale} d={d} />
    </section>
  );
}

/**
 * The two doors of CH-004: Central Fitness Club and Central Day Spa, each with its own logo and photograph,
 * in the hotel's typography and olive ground. They lead to the two sites, which carry their own design.
 */
function BrandDoors({ locale, d }: { locale: Locale; d: Dictionary["home"]["spa"] }) {
  const doors = [
    { href: href(locale, "/centralfitnessclub"), logo: "/brand/cfc-white.png", logoW: 54, logoH: 64, photo: "/images/club/feel-your-power.jpg", position: "50% 35%", ...d.club },
    { href: href(locale, "/dayspa"), logo: "/brand/dayspa-on-dark.png", logoW: 104, logoH: 75, photo: "/images/dayspa/treatment-room.jpg", position: "50% 50%", ...d.dayspa },
  ];
  return (
    <div className="relative z-[5] grid gap-[var(--gutter)] px-[var(--gutter)] pb-16 md:grid-cols-2 md:pb-[6vw]">
      {doors.map((door, i) => (
        <FadeIn key={door.href} delay={0.1 * i}>
          <Link href={door.href} className="group relative block aspect-[4/5] overflow-hidden text-white sm:aspect-[5/4] md:aspect-[4/3.2]">
            <Image src={door.photo} alt="" fill sizes="(min-width: 768px) 48vw, 92vw" className="grade-dark object-cover transition-transform duration-[1.4s] ease-[var(--ease-out)] group-hover:scale-[1.04]" style={{ objectPosition: door.position }} />
            <span aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgb(2_13_16/0.45)_0%,rgb(2_13_16/0.05)_40%,rgb(2_13_16/0.7)_100%)]" />
            <span className="absolute left-6 top-6 md:left-8 md:top-8">
              <Image src={door.logo} alt="" width={door.logoW} height={door.logoH} className="h-auto" style={{ width: door.logoW }} />
            </span>
            <span className="absolute inset-x-6 bottom-6 flex flex-col gap-4 md:inset-x-8 md:bottom-8">
              <span className="font-display text-[34px] leading-[0.95] md:text-[2.6vw]">{door.name}</span>
              <span className="body-copy max-w-[36ch] opacity-85">{door.body}</span>
              <span className="pill pill-light self-start">
                <span>{door.cta}</span>
              </span>
            </span>
          </Link>
        </FadeIn>
      ))}
    </div>
  );
}
