import Image from "next/image";
import type { ReactNode } from "react";
import { DecorativeLine, type linePaths } from "../DecorativeLine";
import { Photo } from "../Photo";
import { FadeIn, RevealLines } from "../Reveal";
import { fitStyle } from "@/lib/fit";

export type Img = { src: string; alt: string; position?: string };
type Tone = "ivory" | "deep" | "olive" | "sage" | "ink";

export const tones: Record<Tone, string> = {
  ivory: "bg-ivory text-ink",
  deep: "bg-deep text-white",
  olive: "bg-olive text-white",
  sage: "bg-sage text-ink",
  ink: "bg-ink text-white",
};
const isDark = (t: Tone) => t === "deep" || t === "olive" || t === "ink";

/** Cinematic photographic hero shared by every secondary page. */
export function PageHero({
  image,
  title,
  eyebrow,
  intro,
  meta,
}: {
  image: Img;
  title: string[];
  eyebrow: string;
  intro?: string;
  meta?: [ReactNode, ReactNode, ReactNode];
}) {
  return (
    <section className="relative flex h-[78svh] min-h-[520px] flex-col md:h-[82svh] md:min-h-[560px] overflow-hidden bg-ink text-white">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="animate-[heroin_2.6s_var(--ease-out)_both] object-cover [filter:saturate(0.28)_contrast(1.1)_brightness(0.6)_sepia(0.3)_hue-rotate(28deg)] motion-reduce:animate-none"
        style={{ objectPosition: image.position ?? "50% 50%" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,13,16,0.6)_0%,rgba(2,13,16,0.15)_35%,rgba(2,13,16,0.65)_100%)]" />
      <div className="relative flex flex-1 flex-col items-center justify-center px-[var(--gutter)] pt-[var(--header-h)] text-center">
        <FadeIn immediate delay={0.6} className="label mb-6 flex items-center gap-4">
          <span aria-hidden className="h-px w-8 bg-white/50" />
          {eyebrow}
          <span aria-hidden className="h-px w-8 bg-white/50" />
        </FadeIn>
        <h1 className="font-display text-[length:var(--fs-m)] leading-[0.9] md:text-[clamp(40px,6.6vw,112px)]" style={fitStyle(title, 90, 13)}>
          <RevealLines immediate delay={0.4} lines={title} />
        </h1>
        {intro && (
          <FadeIn immediate delay={1} as="p" className="body-copy mt-8 max-w-[52ch] opacity-85">
            {intro}
          </FadeIn>
        )}
      </div>
      {meta && (
        <FadeIn immediate delay={1.2} className="label relative grid grid-cols-2 gap-4 border-t border-white/20 px-[var(--gutter)] py-4 md:grid-cols-3 md:py-5">
          <span className="truncate">{meta[0]}</span>
          <span className="hidden text-center md:block">{meta[1]}</span>
          <span className="truncate text-right normal-case tracking-[0.08em] md:uppercase md:tracking-[0.16em]">{meta[2]}</span>
        </FadeIn>
      )}
    </section>
  );
}

/**
 * Photograph-led editorial block: a large frame, a smaller offset frame and an oversized
 * serif title that crosses into the photograph on dark grounds.
 */
export function EditorialSplit({
  index,
  label,
  title,
  body,
  images,
  tone = "ivory",
  reverse = false,
  children,
  line,
}: {
  index?: string;
  label: string;
  title: string[];
  body: string[];
  images: [Img, Img?];
  tone?: Tone;
  reverse?: boolean;
  children?: ReactNode;
  line?: keyof typeof linePaths;
}) {
  const dark = isDark(tone);
  const [main, second] = images;
  return (
    <section className={`relative overflow-hidden ${tones[tone]} py-16 md:py-[7vw]`}>
      {line && <DecorativeLine variant={line} tone={dark ? "light" : "dark"} className="z-0 hidden md:block" />}
      <div className="label relative z-[1] mb-10 flex justify-between px-[var(--gutter)] md:mb-[4vw]">
        <span>{label}</span>
        {index && <span>{index}</span>}
      </div>
      <div
        className={`relative z-[1] grid grid-cols-1 gap-12 px-[var(--gutter)] md:grid-cols-12 md:gap-x-[2vw] ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className={`relative md:col-span-6 ${reverse ? "md:col-start-7" : ""}`}>
          <Photo src={main.src} alt={main.alt} position={main.position} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/5] w-full md:aspect-[5/6]" parallax={4} />
          {second && (
            <div className={`absolute -bottom-10 w-[40%] md:-bottom-[4vw] ${reverse ? "left-3 md:-left-[5vw]" : "right-3 md:-right-[5vw]"}`}>
              <Photo src={second.src} alt={second.alt} position={second.position} sizes="(min-width: 1024px) 20vw, 40vw" className="aspect-[3/4]" reveal="down" />
            </div>
          )}
        </div>
        <div className={`relative flex flex-col justify-center md:col-span-5 ${reverse ? "md:col-start-1 md:row-start-1" : "md:col-start-8"}`}>
          <h2
            style={fitStyle(title, 84, 12)}
            className={`font-display relative z-[3] text-[length:var(--fs-m)] leading-[0.9] md:text-[5vw] ${
              dark ? (reverse ? "md:-mr-[12vw] md:text-right" : "md:-ml-[12vw]") : ""
            }`}
          >
            <RevealLines lines={title} lineClassName={["", reverse && dark ? "" : "pl-[6vw] md:pl-[4vw]"]} />
          </h2>
          <div className="mt-10 max-w-[44ch] space-y-4 md:mt-[3.2vw]">
            {body.map((p, i) => (
              <FadeIn key={i} as="p" delay={i * 0.08} className={`body-copy ${i > 0 ? "opacity-80" : ""}`}>
                {p}
              </FadeIn>
            ))}
          </div>
          {children && <FadeIn delay={0.2} className="mt-10">{children}</FadeIn>}
        </div>
      </div>
      {second && <div className="h-10 md:h-[3vw]" />}
    </section>
  );
}

/** Hairline list of facts: label / value rows, editorial and restrained. */
export function FactList({ items, tone = "dark" }: { items: { k: string; v: string }[]; tone?: "dark" | "light" }) {
  const line = tone === "dark" ? "border-ink/20 divide-ink/20" : "border-white/20 divide-white/20";
  return (
    <dl className={`label divide-y border-y ${line}`}>
      {items.map((f) => (
        <div key={f.k} className="grid grid-cols-[1fr_1.4fr] gap-6 py-[0.9em]">
          <dt className="opacity-60">{f.k}</dt>
          <dd>{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Asymmetric three-frame photographic strip (never a uniform grid). */
export function Gallery({ images, tone = "ivory", label }: { images: Img[]; tone?: Tone; label?: string }) {
  const frames = [
    "md:col-span-5 aspect-[4/5]",
    "md:col-span-3 md:mt-[12vw] aspect-[3/4]",
    "md:col-span-4 md:mt-[4vw] aspect-[4/3]",
    "md:col-span-4 md:col-start-2 md:-mt-[6vw] aspect-[4/3]",
    "md:col-span-4 md:col-start-8 md:-mt-[2vw] aspect-[3/4]",
  ];
  return (
    <section className={`relative ${tones[tone]} px-[var(--gutter)] py-16 md:py-[6vw]`}>
      {label && <p className="label mb-10">{label}</p>}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-[2vw]">
        {images.slice(0, 5).map((img, i) => (
          <div key={img.src} className={`${frames[i]} ${i === 0 ? "col-span-2" : ""}`}>
            <Photo src={img.src} alt={img.alt} position={img.position} sizes="(min-width: 1024px) 40vw, 50vw" className="h-full w-full" reveal={i % 2 ? "down" : "up"} />
          </div>
        ))}
      </div>
    </section>
  );
}

/** Big centred statement used between photographic sections. */
export function Statement({ text, tone = "ivory", label }: { text: string; tone?: Tone; label?: string }) {
  return (
    <section className={`${tones[tone]} px-[var(--gutter)] py-20 text-center md:py-[8vw]`}>
      {label && <p className="label mb-8">{label}</p>}
      <FadeIn as="p" className="font-display mx-auto max-w-[22ch] text-[8vw] normal-case leading-[1.05] md:text-[3.4vw]">
        {text}
      </FadeIn>
    </section>
  );
}
