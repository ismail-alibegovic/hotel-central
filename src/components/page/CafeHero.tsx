import Image from "next/image";
import { FadeIn, RevealLines } from "../Reveal";
import type { Img } from "./PageParts";

/**
 * The light hero of Central Café and Restaurant Central: the photograph in its own colours (a touch of warmth,
 * no darkening, no black-and-white), only the title over it, and a soft shade where the type and header sit.
 */
export function CafeHero({ image, eyebrow, title, meta }: { image: Img; eyebrow: string; title: string[]; meta?: [string, string, string] }) {
  return (
    <section className="relative flex h-[82svh] min-h-[560px] flex-col overflow-hidden bg-[#3a2a1e] text-white md:h-[92svh] md:min-h-[680px]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="animate-[heroin_2.6s_var(--ease-out)_both] object-cover [filter:saturate(1.05)_brightness(1.03)_sepia(0.08)] motion-reduce:animate-none"
        style={{ objectPosition: image.position ?? "50% 50%" }}
      />
      {/* Shade only under the header and behind the title; the rest of the photograph stays as it is. */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[30%] bg-[linear-gradient(180deg,rgba(30,18,10,0.5)_0%,rgba(30,18,10,0)_100%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[55%] bg-[linear-gradient(0deg,rgba(30,18,10,0.6)_0%,rgba(30,18,10,0.2)_55%,rgba(30,18,10,0)_100%)]" />

      <div className="relative flex flex-1 flex-col items-center justify-end px-[var(--gutter)] pb-12 text-center md:pb-[4.5vw]">
        <FadeIn immediate delay={0.5} className="label mb-6 flex items-center gap-4 [text-shadow:0_1px_10px_rgba(0,0,0,0.35)]">
          <span aria-hidden className="h-px w-8 bg-white/70" />
          {eyebrow}
          <span aria-hidden className="h-px w-8 bg-white/70" />
        </FadeIn>
        <h1 className="font-display text-[clamp(56px,10vw,160px)] uppercase leading-[0.88] [text-shadow:0_4px_40px_rgba(0,0,0,0.3)]">
          <RevealLines immediate delay={0.4} lines={title} />
        </h1>
      </div>

      {meta && (
        <FadeIn immediate delay={1.1} className="label relative grid grid-cols-2 gap-4 border-t border-white/30 px-[var(--gutter)] py-4 md:grid-cols-3 md:py-5">
          <span className="truncate">{meta[0]}</span>
          <span className="hidden text-center md:block">{meta[1]}</span>
          <span className="truncate text-right">{meta[2]}</span>
        </FadeIn>
      )}
    </section>
  );
}
