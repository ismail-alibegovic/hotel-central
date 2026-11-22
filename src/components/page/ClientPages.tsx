import Link from "next/link";
import { clientCopy } from "@/content/clientCopy";
import type { FaqSection } from "@/content/faq";
import { href, type Locale } from "@/lib/i18n";
import { FadeIn } from "../Reveal";
import { PageHero } from "./PageParts";

/** /faq — the hotel's own questions and answers, grouped as on hotelcentral.ba, each answer folding open. */
export function FaqPage({ locale, sections }: { locale: Locale; sections: FaqSection[] }) {
  const t = clientCopy.faq[locale];
  return (
    <>
      <PageHero image={{ src: "/images/hc26-reception.jpg", alt: "", position: "50% 40%" }} eyebrow={t.eyebrow} title={[t.title]} meta={["Hotel Central", `(${t.eyebrow})`, "Ćumurija 8"]} />
      <section className="bg-ivory px-[var(--gutter)] py-16 text-ink md:py-[6vw]">
        <div className="mx-auto grid max-w-[1100px] gap-14">
          {sections.map((s) => (
            <FadeIn key={s.title} className="grid gap-6 md:grid-cols-12 md:gap-x-[2vw]">
              <h2 className="font-display text-[34px] uppercase leading-[0.95] md:col-span-4 md:text-[2.6vw]">{s.title}</h2>
              <div className="divide-y divide-ink/20 border-y border-ink/20 md:col-span-8">
                {s.items.map((i) => (
                  <details key={i.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[17px] leading-[1.4] [&::-webkit-details-marker]:hidden">
                      <span>{i.q}</span>
                      <span aria-hidden className="mt-[2px] text-[20px] leading-none transition-transform duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <div className="body-copy mt-4 max-w-[62ch] space-y-3 opacity-85">
                      {i.a.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </FadeIn>
          ))}
          <p className="body-copy opacity-80">
            {locale === "en" ? "Another question? " : "Imate drugo pitanje? "}
            <Link href={href(locale, "/contact")} className="link-line">
              {locale === "en" ? "Contact us" : "Kontaktirajte nas"}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

/** /privacy-policy — factual about what this website does (CH-020); to be confirmed by the hotel's legal adviser. */
export function PrivacyPage({ locale }: { locale: Locale }) {
  const t = clientCopy.privacy[locale];
  return (
    <>
      <section className="bg-deep px-[var(--gutter)] pb-14 pt-[calc(var(--header-h)+64px)] text-white md:pb-[5vw]">
        <h1 className="font-display mx-auto max-w-[900px] text-[clamp(44px,6vw,96px)] uppercase leading-[0.92]">{t.title}</h1>
      </section>
      <section className="bg-ivory px-[var(--gutter)] py-16 text-ink md:py-[6vw]">
        <div className="body-copy mx-auto max-w-[900px] space-y-6 text-[17px] leading-[1.7] [&_strong]:font-medium">
          {t.body.map((p) => (
            <p key={p} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>
      </section>
    </>
  );
}
