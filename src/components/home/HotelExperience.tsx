import type { Dictionary } from "@/content/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { DecorativeLine } from "../DecorativeLine";
import { Photo } from "../Photo";
import { FadeIn, RevealLines } from "../Reveal";
import { MetaRow, PillLink } from "../ui";
import { img, type HomeImages } from "./homeImages";

/*
 * Rects in % of the composition, measured from the reference artboard (1025×640).
 * Mobile values recompose the same three frames for a portrait screen.
 */
const R = {
  left: "[--x:0%] [--y:4%] [--w:34%] [--h:25%] md:[--x:0%] md:[--y:28.75%] md:[--w:21.27%] md:[--h:41.4%]",
  center: "[--x:13%] [--y:19%] [--w:74%] [--h:52%] md:[--x:34.39%] md:[--y:25.16%] md:[--w:31.22%] md:[--h:50%]",
  right: "[--x:66%] [--y:66%] [--w:34%] [--h:26%] md:[--x:78.73%] md:[--y:28.75%] md:[--w:21.27%] md:[--h:41.4%]",
};

function Title({ lines, className = "" }: { lines: string[]; className?: string }) {
  return (
    <div
      className={`font-display absolute inset-x-0 top-[33.5%] text-center text-[14.2cqw] leading-[0.86] md:top-[37.6%] md:text-[8.15cqw] ${className}`}
    >
      <RevealLines lines={lines} delay={0.25} stagger={0.12} />
    </div>
  );
}

export function HotelExperience({ locale, dict, images }: { locale: Locale; dict: Dictionary; images?: HomeImages }) {
  const d = dict.home.hotel;
  const left = img(images?.hotelLeft, { src: "/images/final-6230.jpg", alt: "Relaxation lounge of the Club & Spa with a forest mural", position: "38% 50%" });
  const center = img(images?.hotelCenter, { src: "/images/3064.jpg", alt: "The white façade and corner tower of Hotel Central in Sarajevo's old town", position: "56% 30%" });
  const right = img(images?.hotelRight, { src: "/images/dorucak5.jpg", alt: "Restaurant Central breakfast buffet", position: "50% 50%" });
  return (
    <section aria-labelledby="hotel-title" className="relative overflow-hidden bg-ivory pt-[30px] text-ink md:pt-0">
      <h2 id="hotel-title" className="sr-only">
        {d.title.join(" ")}
      </h2>
      <MetaRow className="md:hidden" left={d.metaLeft} center={d.metaCenter} index={d.metaIndex} right={d.metaRight} rightSub={d.metaRightSub} />

      <div className="comp mt-8 aspect-[390/560] md:mt-0 md:aspect-[1025/640]">
        <div className="absolute inset-x-0 top-[4.85%] z-[4] hidden md:block">
          <MetaRow left={d.metaLeft} center={d.metaCenter} index={d.metaIndex} right={d.metaRight} rightSub={d.metaRightSub} />
        </div>
        <DecorativeLine variant="hotel" className="z-0" />

        {/* Base title: ink on paper, sits beneath the photographs */}
        <Title lines={d.title} className="z-[1] text-ink" />

        <div className={`rect z-[2] ${R.left}`}>
          <Photo
            src={left.src}
            alt={left.alt}
            sizes="(min-width: 1024px) 22vw, 34vw"
            position={left.position}
            className="h-full w-full"
            reveal="up"
            parallax={4}
          />
        </div>
        <div className={`rect z-[2] ${R.center}`}>
          <Photo
            src={center.src}
            alt={center.alt}
            sizes="(min-width: 1024px) 32vw, 74vw"
            position={center.position}
            className="h-full w-full"
            grade="grade-dark"
            veil={0.32}
            reveal="up"
            parallax={3}
          />
        </div>
        <div className={`rect z-[2] ${R.right}`}>
          <Photo
            src={right.src}
            alt={right.alt}
            sizes="(min-width: 1024px) 22vw, 34vw"
            position={right.position}
            className="h-full w-full"
            reveal="up"
            parallax={4}
          />
        </div>

        {/* Overprint: the same title re-coloured where it crosses the central photograph */}
        <div aria-hidden className={`clip-rect pointer-events-none absolute inset-0 z-[3] ${R.center}`}>
          <Title lines={d.title} className="text-white" />
        </div>

        <div className="absolute left-[34.5%] top-[78.6%] z-[3] hidden w-[31.1%] items-start justify-between gap-6 md:flex">
          <FadeIn as="p" className="max-w-[20cqw] text-[1.06cqw] leading-[1.45]">
            {d.body}
          </FadeIn>
          <FadeIn delay={0.15}>
            <PillLink href={href(locale, "/about")} tone="dark" className="!h-[2.95cqw] !text-[0.86cqw]">
              {d.cta}
            </PillLink>
          </FadeIn>
        </div>
      </div>

      {/* Mobile caption */}
      <div className="flex flex-col items-start gap-6 px-[var(--gutter)] pb-16 pt-2 md:hidden">
        <p className="body-copy max-w-[30ch]">{d.body}</p>
        <PillLink href={href(locale, "/about")} tone="dark">
          {d.cta}
        </PillLink>
      </div>
    </section>
  );
}
