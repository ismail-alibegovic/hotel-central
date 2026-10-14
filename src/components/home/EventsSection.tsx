import type { Dictionary } from "@/content/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { Photo } from "../Photo";
import { FadeIn, RevealLines } from "../Reveal";
import { PillLink } from "../ui";
import { fitStyle } from "@/lib/fit";

const MAIN = "[--x:0%] [--y:0%] [--w:50%] [--h:100%]";

function Title({ lines, className = "" }: { lines: string[]; className?: string }) {
  return (
    <div className={`font-display absolute left-[38%] top-[21%] text-[7cqw] leading-[0.9] ${className}`}>
      <RevealLines lines={lines} lineClassName={["", "pl-[9cqw]"]} />
    </div>
  );
}

/** Split photographic composition: full-height conference photograph on the left. */
export function EventsSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const d = dict.home.events;
  return (
    <section aria-labelledby="events-title" className="relative overflow-hidden bg-ivory text-ink">
      <h2 id="events-title" className="sr-only">
        {d.title.join(" ")}
      </h2>

      <div className="comp hidden aspect-[1025/600] md:block">
        <Title lines={d.title} className="z-[1]" />
        <div className={`rect z-[2] ${MAIN}`}>
          <Photo
            src="/images/3073.jpg"
            alt="The conference room on the third floor set up for a meeting"
            sizes="50vw"
            className="h-full w-full"
            grade="grade-dark"
            veil={0.3}
            reveal="right"
            parallax={4}
          />
        </div>
        <div aria-hidden className={`clip-rect pointer-events-none absolute inset-0 z-[3] text-white ${MAIN}`}>
          <Title lines={d.title} />
        </div>

        <div className="label absolute left-[53.5%] right-[var(--gutter)] top-[5.2%] z-[4] flex justify-between gap-6">
          <p>{d.metaLeft}</p>
          <p>{d.metaCenter}</p>
          <p>{d.metaRight}</p>
        </div>

        <div className="rect z-[2] [--x:80%] [--y:56%] [--w:15%] [--h:30%]">
          <Photo src="/images/img_9216.jpg" alt="Chairs and microphones in the conference room" sizes="16vw" className="h-full w-full" position="50% 50%" reveal="down" />
        </div>

        <div className="absolute left-[56.5%] top-[56%] z-[4] w-[19%] space-y-[1.4em]">
          <FadeIn as="p" className="text-[1.02cqw] leading-[1.5]">
            {d.body}
          </FadeIn>
          <FadeIn delay={0.15}>
            <PillLink href={href(locale, "/meetings-events")} className="!h-[2.9cqw] !text-[0.8cqw]">
              {d.cta}
            </PillLink>
          </FadeIn>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="relative">
          <Photo src="/images/3073.jpg" alt="The conference room on the third floor" sizes="100vw" className="aspect-[4/5]" grade="grade-dark" />
          <div className="font-display absolute bottom-8 left-[var(--gutter)] text-[length:var(--fs-m)] leading-[0.9] text-white" style={fitStyle(d.title, 80, 13)}>
            <RevealLines lines={d.title} lineClassName={["", "pl-[8vw]"]} />
          </div>
        </div>
        <div className="space-y-6 px-[var(--gutter)] pb-16 pt-8">
          <p className="label">
            {d.metaLeft} · {d.metaRight}
          </p>
          <p className="body-copy max-w-[38ch]">{d.body}</p>
          <PillLink href={href(locale, "/meetings-events")}>{d.cta}</PillLink>
        </div>
      </div>
    </section>
  );
}
