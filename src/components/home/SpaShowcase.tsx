import type { Dictionary } from "@/content/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { DecorativeLine } from "../DecorativeLine";
import { Photo } from "../Photo";
import { FadeIn, RevealLines } from "../Reveal";
import { MetaRow, PillLink } from "../ui";

const BIG = "[--x:40%] [--y:15.5%] [--w:57.46%] [--h:64%]";

function SpaTitle({ lines, className = "" }: { lines: string[]; className?: string }) {
  return (
    <div className={`font-display absolute left-[6%] top-[23%] text-[8.4cqw] leading-[0.9] ${className}`}>
      <RevealLines lines={lines} lineClassName={["", "pl-[14.5cqw]"]} />
    </div>
  );
}

export function SpaShowcase({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const d = dict.home.spa;
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
            src="/images/3069.jpg"
            alt="The heated 25-metre indoor pool with a wave mosaic"
            sizes="58vw"
            position="50% 60%"
            className="h-full w-full"
            grade="grade-dark"
            parallax={5}
          />
        </div>
        <div className="rect z-[2] [--x:6%] [--y:51%] [--w:17%] [--h:37%]">
          <Photo
            src="/images/final-6202.jpg"
            alt="Candle-lit treatment room of the day spa"
            sizes="18vw"
            position="50% 50%"
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
          <PillLink href={href(locale, "/spa")} tone="light" className="!h-[2.9cqw] !text-[0.8cqw]">
            {d.cta}
          </PillLink>
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
            <Photo src="/images/3069.jpg" alt="The heated 25-metre indoor pool" sizes="82vw" grade="grade-dark" className="h-full w-full" position="40% 60%" />
          </div>
          <div aria-hidden className="clip-rect pointer-events-none absolute inset-0 z-[3] [--x:18%] [--y:33%] [--w:82%] [--h:67%]">
            <div className="font-display absolute left-[4%] top-0 text-[12.2cqw] leading-[0.9]">
              <RevealLines lines={d.title} lineClassName={["", "pl-[6cqw]"]} />
            </div>
          </div>
          <div className="rect z-[4] [--x:4%] [--y:72%] [--w:30%] [--h:40%]">
            <Photo src="/images/final-6202.jpg" alt="" sizes="30vw" className="h-full w-full" />
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
          <PillLink href={href(locale, "/spa")} tone="light">
            {d.cta}
          </PillLink>
        </div>
      </div>
    </section>
  );
}
