import Image from "next/image";
import Link from "next/link";
import { FadeIn, RevealLines } from "../Reveal";
import type { Img } from "./PageParts";

/**
 * Central Café's own hero: the bright café photograph almost untouched (a light warm grade, a soft shade only
 * under the header), with the words on a warm cream card instead of white type over a darkened picture.
 */
export function CafeHero({
  image,
  detail,
  eyebrow,
  title,
  intro,
  chips,
  link,
  meta,
}: {
  image: Img;
  detail?: Img;
  eyebrow: string;
  title: string[];
  intro?: string;
  chips?: string[];
  link?: { label: string; href: string };
  meta?: [string, string, string];
}) {
  return (
    <section className="relative flex min-h-[640px] flex-col justify-end overflow-hidden bg-[#efe3d3] md:h-[92svh] md:min-h-[680px]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="animate-[heroin_2.6s_var(--ease-out)_both] object-cover [filter:saturate(1.06)_brightness(1.04)_sepia(0.12)] motion-reduce:animate-none"
        style={{ objectPosition: image.position ?? "50% 50%" }}
      />
      {/* Only enough shade for the white header to read; the photograph itself stays light. */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[34%] bg-[linear-gradient(180deg,rgba(40,24,14,0.55)_0%,rgba(40,24,14,0)_100%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(0deg,rgba(60,36,18,0.35)_0%,rgba(60,36,18,0)_100%)]" />

      <div className="relative px-[var(--gutter)] pb-[var(--gutter)] pt-[calc(var(--header-h)+40px)] md:pb-[3.2vw]">
        <FadeIn immediate delay={0.5} className="grid max-w-[760px] gap-6 bg-[#f8f1e7]/95 p-7 text-[#2a1d14] shadow-[0_30px_80px_-40px_rgba(40,24,14,0.6)] backdrop-blur-sm sm:grid-cols-[minmax(0,1fr)_150px] md:p-10">
          <div>
            <p className="label flex items-center gap-4 text-[#9a5b32]">
              <span aria-hidden className="h-px w-8 bg-current" />
              {eyebrow}
            </p>
            <h1 className="font-display mt-5 text-[clamp(52px,7vw,104px)] uppercase leading-[0.9]">
              <RevealLines immediate delay={0.6} lines={title} />
            </h1>
            {intro && <p className="body-copy mt-6 max-w-[44ch] text-[#4a3a2e]">{intro}</p>}
            {chips && chips.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {chips.map((c) => (
                  <li key={c} className="label rounded-full border border-[#9a5b32]/35 px-4 py-2 text-[#6b4225]">
                    {c}
                  </li>
                ))}
              </ul>
            )}
            {link && (
              <Link href={link.href} className="label link-line mt-7 inline-block text-[#2a1d14]">
                {link.label} →
              </Link>
            )}
          </div>
          {detail && (
            <div className="relative hidden aspect-[3/4] self-end overflow-hidden sm:block">
              <Image src={detail.src} alt={detail.alt} fill sizes="150px" className="object-cover" style={{ objectPosition: detail.position ?? "50% 50%" }} />
            </div>
          )}
        </FadeIn>
      </div>

      {meta && (
        <div className="label relative hidden grid-cols-3 gap-4 border-t border-white/30 px-[var(--gutter)] py-4 text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] md:grid">
          <span>{meta[0]}</span>
          <span className="text-center">{meta[1]}</span>
          <span className="text-right">{meta[2]}</span>
        </div>
      )}
    </section>
  );
}
