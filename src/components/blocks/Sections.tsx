import type { ReactNode } from "react";
import type { CtaBlock, FaqBlock, OffersBlock, Tone } from "@/cms/blocks/types";
import { Photo } from "@/components/Photo";
import { FadeIn, RevealLines } from "@/components/Reveal";
import { PillLink } from "@/components/ui";
import { fitStyle } from "@/lib/fit";

const grounds: Record<Tone, string> = {
  ivory: "bg-ivory text-ink",
  deep: "bg-deep text-white",
  olive: "bg-olive text-white",
  sage: "bg-sage text-ink",
  ink: "bg-ink text-white",
};
const isDark = (t: Tone) => t === "deep" || t === "olive" || t === "ink";

/** Unmissable marker for example content. Rendered by every block whose editor flagged it as sample content. */
export function SampleBadge({ dark }: { dark: boolean }) {
  return (
    <p
      data-sample="true"
      className={`label mb-8 inline-flex items-center gap-3 border border-dashed px-3 py-2 ${dark ? "border-white/60" : "border-ink/60"}`}
    >
      <span aria-hidden className="h-[6px] w-[6px] bg-current" />
      DEMO / SAMPLE — not a real offer
    </p>
  );
}

function Heading({ label, title, sample, dark, children }: { label: string; title: string[]; sample: boolean; dark: boolean; children?: ReactNode }) {
  return (
    <div className="mb-12 md:mb-[4vw]">
      {sample && <SampleBadge dark={dark} />}
      <p className="label mb-6">{label}</p>
      <h2 style={fitStyle(title, 84, 12)} className="font-display text-[length:var(--fs-m)] leading-[0.92] md:text-[4.4vw]">
        <RevealLines lines={title} />
      </h2>
      {children}
    </div>
  );
}

/** Cards for hotel offers: photograph, tag, title, description, validity/price wording supplied by editors, optional call to action. */
export function Offers({ b }: { b: OffersBlock }) {
  const dark = isDark(b.tone);
  return (
    <section data-block="offers" className={`${grounds[b.tone]} px-[var(--gutter)] py-16 md:py-[7vw]`}>
      <Heading label={b.label} title={b.title} sample={b.sample} dark={dark}>
        {b.intro && (
          <FadeIn as="p" className="body-copy mt-8 max-w-[52ch] opacity-85">
            {b.intro}
          </FadeIn>
        )}
      </Heading>
      <ul className="grid grid-cols-1 gap-x-[2vw] gap-y-14 md:grid-cols-3">
        {b.items.map((o, n) => (
          <FadeIn as="li" key={`${n}-${o.title}`} delay={n * 0.06} className={`flex flex-col border-t pt-6 ${dark ? "border-white/20" : "border-ink/20"}`}>
            {o.image && <Photo src={o.image.src} alt={o.image.alt} position={o.image.position} sizes="(min-width: 1024px) 30vw, 100vw" className="mb-8 aspect-[4/3] w-full" />}
            {o.tag && <p className="label mb-3 opacity-60">{o.tag}</p>}
            <h3 className="font-display text-[8vw] leading-[1] md:text-[2.4vw]">{o.title}</h3>
            <p className="body-copy mt-5 max-w-[46ch] opacity-85">{o.description}</p>
            {(o.validity || o.priceNote) && (
              <dl className={`label mt-6 divide-y border-y ${dark ? "divide-white/20 border-white/20" : "divide-ink/20 border-ink/20"}`}>
                {o.validity && (
                  <div className="grid grid-cols-[1fr_1.4fr] gap-4 py-[0.9em]">
                    <dt className="opacity-60">{b.validityLabel}</dt>
                    <dd>{o.validity}</dd>
                  </div>
                )}
                {o.priceNote && (
                  <div className="grid grid-cols-[1fr_1.4fr] gap-4 py-[0.9em]">
                    <dt className="opacity-60">{b.priceLabel}</dt>
                    <dd>{o.priceNote}</dd>
                  </div>
                )}
              </dl>
            )}
            {o.cta && (
              <div className="mt-8">
                <PillLink href={o.cta.link.href} external={o.cta.link.external} tone={dark ? "light" : "dark"}>
                  {o.cta.label}
                </PillLink>
              </div>
            )}
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}

/** Questions and answers as native disclosure widgets: keyboard accessible, no client JavaScript. */
export function Faq({ b }: { b: FaqBlock }) {
  const dark = isDark(b.tone);
  const line = dark ? "border-white/20" : "border-ink/20";
  return (
    <section data-block="faq" className={`${grounds[b.tone]} px-[var(--gutter)] py-16 md:py-[7vw]`}>
      <div className="grid gap-10 md:grid-cols-12 md:gap-x-[2vw]">
        <div className="md:col-span-4">
          {b.sample && <SampleBadge dark={dark} />}
          <p className="label mb-6">{b.label}</p>
          <h2 style={fitStyle(b.title, 84, 12)} className="font-display text-[length:var(--fs-m)] leading-[0.92] md:text-[3.6vw]">
            <RevealLines lines={b.title} />
          </h2>
        </div>
        <FadeIn className="md:col-span-7 md:col-start-6">
          <div className={`border-y ${line}`}>
            {b.items.map((q, n) => (
              <details key={`${n}-${q.q}`} className={`group ${n > 0 ? `border-t ${line}` : ""}`}>
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-[5.4vw] leading-[1.1] md:text-[1.6vw]">{q.q}</span>
                  <span aria-hidden className="relative block h-[11px] w-[11px] shrink-0">
                    <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                    <span className="absolute left-1/2 top-0 h-full w-px bg-current transition-transform duration-500 group-open:scale-y-0" />
                  </span>
                </summary>
                <div className="body-copy max-w-[60ch] space-y-3 pb-6 opacity-85">
                  {q.a.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/** A band with a heading, a few words and one or two buttons. */
export function CtaBand({ b }: { b: CtaBlock }) {
  const dark = isDark(b.tone);
  return (
    <section data-block="cta" className={`${grounds[b.tone]} px-[var(--gutter)] py-20 text-center md:py-[8vw]`}>
      {b.sample && <SampleBadge dark={dark} />}
      {b.label && <p className="label mb-8">{b.label}</p>}
      <h2 style={fitStyle(b.title, 84, 12)} className="font-display mx-auto text-[length:var(--fs-m)] leading-[0.95] md:text-[4.4vw]">
        <RevealLines lines={b.title} />
      </h2>
      {b.body && (
        <FadeIn as="p" className="body-copy mx-auto mt-8 max-w-[48ch] opacity-85">
          {b.body}
        </FadeIn>
      )}
      <FadeIn delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        <PillLink href={b.primary.link.href} external={b.primary.link.external} tone={dark ? "light" : "dark"}>
          {b.primary.label}
        </PillLink>
        {b.secondary && (
          <a
            href={b.secondary.link.href}
            {...(b.secondary.link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`label link-line${b.secondary.link.kind === "email" ? " normal-case tracking-[0.06em]" : ""}`}
          >
            {b.secondary.label}
          </a>
        )}
      </FadeIn>
    </section>
  );
}
