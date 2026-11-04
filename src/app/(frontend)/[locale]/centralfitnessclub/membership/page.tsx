import type { Metadata } from "next";
import { getFitnessClub } from "@/cms/clubSpa";
import { getHotelContact } from "@/cms/hotelInfo";
import { FactGrid, FitButton, FitContact, FitHeadline, FitHero, FitLabel, NumberedList, PlanCards } from "@/components/fitness/FitnessParts";
import { getFitness } from "@/content/fitness";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const m = getFitness(locale).meta.membership;
  return pageMetadata(locale, "/centralfitnessclub/membership", m.title, m.description, "/images/pool-03.jpg");
}

/** CH-011: membership options, benefits, included facilities, pricing (only once confirmed) and the enquiry. */
export default async function Membership({ params }: P) {
  const { locale } = await params;
  const f = getFitness(locale);
  const m = f.membership;
  const [{ membership }, contact] = await Promise.all([getFitnessClub(locale), getHotelContact(locale)]);
  const pricesPending = !membership.fromCms || !membership.plans.some((p) => p.price);

  return (
    <>
      <FitHero compact eyebrow={m.hero.eyebrow} title={m.hero.title} intro={m.hero.intro} image="/images/pool-03.jpg" alt={f.imageAlt.pool1}>
        <div className="mt-9">
          <FitButton href="#contact">{f.nav.enquire}</FitButton>
        </div>
      </FitHero>

      <section aria-labelledby="mem-options" className="px-[var(--gutter)] py-16 md:py-[6vw]">
        <FitLabel className="mb-5 opacity-70">{m.optionsLabel}</FitLabel>
        <FitHeadline id="mem-options" lines={m.optionsTitle} className="mb-10 text-[clamp(48px,11vw,76px)] md:text-[5.6vw]" />
        <PlanCards plans={membership.plans} f={f} locale={locale} contactHref="#contact" />
        {(pricesPending || membership.note) && (
          <p className="mt-6 max-w-[70ch] text-[14px] leading-[1.6] opacity-80">
            {membership.note ?? m.pricingPending}
          </p>
        )}
      </section>

      <section aria-labelledby="mem-benefits" className="bg-fit-green px-[var(--gutter)] py-16 text-white md:py-[6vw]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-[2vw]">
          <div className="md:col-span-5">
            <FitLabel className="mb-5 text-white/70">{m.benefitsLabel}</FitLabel>
            <FitHeadline id="mem-benefits" lines={m.benefitsTitle} className="text-[clamp(48px,11vw,76px)] md:text-[5.6vw]" />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <NumberedList items={m.benefits} />
          </div>
        </div>
      </section>

      <section aria-labelledby="mem-included" className="bg-white px-[var(--gutter)] py-16 md:py-[6vw]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-[2vw]">
          <div className="md:col-span-4">
            <FitLabel className="mb-5 opacity-70">{m.includedLabel}</FitLabel>
            <h2 id="mem-included" className="sr-only">
              {m.includedLabel}
            </h2>
            <p className="max-w-[36ch] text-[15.5px] leading-[1.65]">{m.enquireBody}</p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <FactGrid items={m.included} />
          </div>
        </div>
      </section>

      <FitContact f={{ ...f, contact: { ...f.contact, title: m.enquireTitle } }} contact={contact} />
    </>
  );
}
