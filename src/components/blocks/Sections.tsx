import { Photo } from "@/components/Photo";
import { FadeIn, RevealLines } from "@/components/Reveal";
import { tones } from "@/components/page/PageParts";
import { Arrow, PillLink } from "@/components/ui";
import type { CtaBlock, Cta, FaqBlock, Offer, OffersBlock } from "@/cms/blocks/types";
import type { Locale } from "@/lib/i18n";

const dark = (tone: CtaBlock["tone"]) => tone === "deep" || tone === "olive" || tone === "ink";
const sampleLabel: Record<Locale, string> = { en: "Sample offer — not hotel-approved", bs: "Primjer ponude — nije odobreno od hotela" };

function Heading({ label, title }: { label: string; title?: string[] }) {
  return (
    <div className="mb-10 md:mb-[3vw]">
      <p className="label mb-6">{label}</p>
      {title && (
        <h2 className="font-display text-[10vw] leading-[0.95] md:text-[4.4vw]">
          <RevealLines lines={title} />
        </h2>
      )}
    </div>
  );
}

/** Questions and answers as native <details> (keyboard and screen-reader friendly, no script) + FAQPage structured data. */
export function FaqSection({ b }: { b: FaqBlock }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: b.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
  return (
    <section className={`${tones.ivory} px-[var(--gutter)] py-16 md:py-[6vw]`}>
      {/* "<" is escaped so editor text can never close the script element */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <div className="grid gap-10 md:grid-cols-12 md:gap-x-[2vw]">
        <div className="md:col-span-4">
          <Heading label={b.label} title={b.title} />
        </div>
        <FadeIn className="md:col-span-7 md:col-start-6">
          <div className="divide-y divide-ink/20 border-y border-ink/20">
            {b.items.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-[5.2vw] leading-[1.15] md:text-[1.5vw]">{item.q}</span>
                  <span aria-hidden className="label shrink-0 transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="body-copy max-w-[60ch] pb-6 opacity-85">{item.a}</p>
              </details>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function CtaButtons({ primary, secondary, light }: { primary?: Cta; secondary?: Cta; light: boolean }) {
  if (!primary && !secondary) return null;
  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
      {primary && (
        <PillLink href={primary.link.href} external={primary.link.external} tone={light ? "light" : "dark"}>
          {primary.label}
        </PillLink>
      )}
      {secondary && (
        <a href={secondary.link.href} {...(secondary.link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="label link-line">
          {secondary.label}
        </a>
      )}
    </div>
  );
}

export function CtaSection({ b }: { b: CtaBlock }) {
  const light = dark(b.tone);
  return (
    <section className={`${tones[b.tone]} px-[var(--gutter)] py-20 md:py-[8vw]`}>
      {b.label && <p className="label mb-8">{b.label}</p>}
      <h2 className="font-display max-w-[18ch] text-[11vw] leading-[0.95] md:text-[5vw]">
        <RevealLines lines={b.title} />
      </h2>
      {b.body && (
        <FadeIn as="p" className="body-copy mt-8 max-w-[52ch] opacity-85">
          {b.body}
        </FadeIn>
      )}
      <CtaButtons primary={b.primary} secondary={b.secondary} light={light} />
    </section>
  );
}

export function OffersSection({ b, offers, locale }: { b: OffersBlock; offers: Offer[]; locale: Locale }) {
  if (!offers.length) return null; // nothing published in this language: no empty heading
  const light = dark(b.tone);
  return (
    <section className={`${tones[b.tone]} px-[var(--gutter)] py-16 md:py-[6vw]`}>
      <Heading label={b.label} title={b.title} />
      <ul className="grid gap-x-[2vw] gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((o, i) => (
          <FadeIn as="li" key={o.id} delay={i * 0.05} className="flex flex-col">
            {o.image && <Photo src={o.image.src} alt={o.image.alt} position={o.image.position} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="mb-6 aspect-[4/3]" />}
            {o.sample && <p className="label mb-3 opacity-70">{sampleLabel[locale]}</p>}
            {o.validity && <p className="label mb-3 opacity-70">{o.validity}</p>}
            <h3 className="font-display text-[7vw] leading-[1] md:text-[2vw]">{o.title}</h3>
            {o.summary && <p className="body-copy mt-4 max-w-[42ch] opacity-85">{o.summary}</p>}
            {o.cta && (
              <div className="mt-6">
                {o.cta.link.external ? (
                  <a href={o.cta.link.href} target="_blank" rel="noopener noreferrer" className={`pill ${light ? "pill-light" : "pill-dark"}`}>
                    <span>{o.cta.label}</span>
                    <Arrow />
                  </a>
                ) : (
                  <PillLink href={o.cta.link.href} tone={light ? "light" : "dark"}>
                    {o.cta.label}
                  </PillLink>
                )}
              </div>
            )}
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}
