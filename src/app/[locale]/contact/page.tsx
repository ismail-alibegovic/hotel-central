import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { DecorativeLine } from "@/components/DecorativeLine";
import { PageHero } from "@/components/page/PageParts";
import { FadeIn } from "@/components/Reveal";
import { Arrow } from "@/components/ui";
import { getDictionary } from "@/content/dictionary";
import { booking, hotel, maps } from "@/content/hotel";
import { getPages } from "@/content/pages";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const m = getPages(locale).contact.meta;
  return pageMetadata(locale, "/contact", m.title, m.description, "/images/3075.jpg");
}

export default async function Contact({ params }: P) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const c = getPages(locale).contact;
  const blocks = [
    { label: c.office, body: c.officeBody, link: { href: hotel.phoneHref, text: hotel.phoneDisplay } },
    { label: c.reservations, body: c.reservationsBody, link: { href: booking.bookingUrl, text: dict.nav.book, external: true } },
    { label: c.write, body: hotel.email, link: { href: `mailto:${hotel.email}`, text: dict.common.email } },
    { label: c.social, body: c.socialBody, link: { href: hotel.facebook, text: "Facebook", external: true } },
  ];
  return (
    <>
      <PageHero
        image={{ src: "/images/3075.jpg", alt: "Hotel Central at night", position: "50% 40%" }}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        intro={c.hero.intro}
        meta={[hotel.phoneDisplay, "(Contact)", hotel.email]}
      />
      <section className="relative overflow-hidden bg-ivory px-[var(--gutter)] py-16 text-ink md:py-[6vw]">
        <DecorativeLine variant="hotel" className="z-0 hidden md:block" />
        <div className="relative z-[1] grid gap-14 md:grid-cols-12 md:gap-x-[2vw]">
          <div className="md:col-span-4">
            <ul className="divide-y divide-ink/20 border-y border-ink/20">
              {blocks.map((b, i) => (
                <FadeIn as="li" key={b.label} delay={i * 0.06} className="py-6">
                  <p className="label mb-2 opacity-60">{b.label}</p>
                  <p className="body-copy mb-3">{b.body}</p>
                  <a
                    href={b.link.href}
                    {...(b.link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="label link-line inline-flex items-center gap-3"
                  >
                    {b.link.text} <Arrow />
                  </a>
                </FadeIn>
              ))}
            </ul>
            <address className="label mt-8 not-italic leading-[1.8]">
              {hotel.name}
              <br />
              {hotel.street}, {hotel.postalCode} {hotel.city}
              <br />
              {locale === "bs" ? hotel.countryBs : hotel.country}
              <br />
              <a href={maps.directions} target="_blank" rel="noopener noreferrer" className="link-line mt-2 inline-block">
                {dict.common.directions}
              </a>
            </address>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <h2 className="font-display mb-10 text-[11vw] leading-[0.9] md:text-[4.4vw]">{dict.contact.formTitle}</h2>
            <ContactForm locale={locale} dict={dict} />
          </div>
        </div>
      </section>
    </>
  );
}
