import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { ContactForm } from "@/components/ContactForm";
import { DecorativeLine } from "@/components/DecorativeLine";
import { FinalBooking } from "@/components/home/FinalBooking";
import { EditorialSplit, FactList, Gallery, PageHero, Statement } from "@/components/page/PageParts";
import { Photo } from "@/components/Photo";
import { FadeIn, RevealLines } from "@/components/Reveal";
import { Arrow, PillLink } from "@/components/ui";
import { CtaBand, Faq, Offers } from "./Sections";
import type { Block, Cta, FaqBlock, SplitBlock } from "@/cms/blocks/types";
import type { Dictionary } from "@/content/dictionary";
import { getHotelContact } from "@/cms/hotelInfo";
import { followContact } from "@/cms/hotelInfoMerge";
import { booking, hotel } from "@/content/hotel";
import type { Room } from "@/content/rooms";
import { fitStyle } from "@/lib/fit";
import { href, type Locale } from "@/lib/i18n";

const isDark = (tone: SplitBlock["tone"]) => tone === "deep" || tone === "olive" || tone === "ink";
const faqJsonLd = (b: FaqBlock) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: b.items.map((q) => ({ "@type": "Question", name: q.q, acceptedAnswer: { "@type": "Answer", text: q.a.join("\n") } })),
});
const pad2 = (n: number) => String(n).padStart(2, "0");

function Pill({ cta, dark }: { cta: Cta; dark: boolean }) {
  return (
    <PillLink href={cta.link.href} external={cta.link.external} tone={dark ? "light" : "dark"}>
      {cta.label}
    </PillLink>
  );
}

function SplitExtras({ b }: { b: SplitBlock }): ReactNode {
  const dark = isDark(b.tone);
  const parts: ReactNode[] = [];
  if (b.facts?.length)
    parts.push(
      <div key="facts" className={dark ? "max-w-[440px]" : "max-w-[420px]"}>
        <FactList items={b.facts} tone={dark ? "light" : "dark"} />
      </div>,
    );
  if (b.bullets?.items.length)
    parts.push(
      <div key="bullets">
        <p className="label mb-4 opacity-60">{b.bullets.title}</p>
        <ul className="label space-y-2">
          {b.bullets.items.map((x) => (
            <li key={x} className="border-t border-white/15 pt-2">
              {x}
            </li>
          ))}
        </ul>
      </div>,
    );
  if (b.primary && b.secondary) {
    const s = b.secondary;
    parts.push(
      <div key="cta" className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <Pill cta={b.primary} dark={dark} />
        <a
          href={s.link.href}
          {...(s.link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={`label link-line${s.link.kind === "email" ? " normal-case tracking-[0.06em]" : ""}`}
        >
          {s.label}
        </a>
      </div>,
    );
  } else if (b.primary) parts.push(<Pill key="cta" cta={b.primary} dark={dark} />);
  return parts.length ? <>{parts}</> : undefined;
}

function RoomList({ rooms, locale, dict }: { rooms: Room[]; locale: Locale; dict: Dictionary }) {
  return (
    <section className="bg-deep text-white">
      {rooms.map((room, i) => {
        const flip = i % 2 === 1;
        const roomHref = href(locale, `/rooms/${room.slug}`);
        return (
          <article key={room.slug} className="relative grid grid-cols-1 gap-8 border-t border-white/15 px-[var(--gutter)] py-14 md:grid-cols-12 md:gap-x-[2vw] md:py-[6vw]">
            <div className={`md:col-span-6 ${flip ? "md:col-start-7" : ""}`}>
              <Link href={roomHref} aria-label={room.name[locale]} className="group block">
                <Photo
                  src={room.images[0].src}
                  alt={room.images[0].alt[locale]}
                  position={room.images[0].position}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="aspect-[4/3] transition-transform duration-[1.4s] ease-[var(--ease-out)]"
                  imgClassName="transition-transform duration-[1.6s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                  parallax={3}
                />
              </Link>
            </div>
            <div className={`flex flex-col justify-between md:col-span-5 ${flip ? "md:col-start-1 md:row-start-1" : "md:col-start-8"}`}>
              <div className="label flex justify-between">
                <span className="tabular-nums">({pad2(i + 1)})</span>
                <span>{room.sizeLabel[locale]}</span>
              </div>
              <div className="my-10 md:my-0">
                <p className="text-[7vw] font-light uppercase leading-none tracking-[-0.01em] md:text-[2.6vw]">{room.feature[locale]}</p>
                <h2
                  style={fitStyle(room.titleLines[locale], 84, 13)}
                  className={`font-display relative z-[2] mt-3 text-[length:var(--fs-m)] leading-[0.9] md:text-[5.4vw] ${flip ? "" : "md:-ml-[9vw]"}`}
                >
                  <Link href={roomHref} className="hover:opacity-80 transition-opacity">
                    <RevealLines lines={room.titleLines[locale]} lineClassName={["", "pl-[6vw] md:pl-[3vw]"]} />
                  </Link>
                </h2>
                <FadeIn as="p" className="body-copy mt-8 max-w-[42ch] opacity-85">
                  {room.summary[locale]}
                </FadeIn>
              </div>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <a href={booking.roomUrl(room.roomTypeId)} target="_blank" rel="noopener noreferrer" className="pill pill-light">
                  <span>{dict.common.checkAvailability}</span>
                </a>
                <Link href={roomHref} className="label link-line flex items-center gap-3">
                  {dict.common.viewRoom} <Arrow />
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

/**
 * Turns resolved blocks into the existing Hotel Central components. Markup is identical to what the
 * hand-written pages used to render; the HTML-parity and visual tests guard that.
 * Contact details come from Hotel Information; sections that still hold the built-in details as text follow it too.
 */
export async function BlockRenderer({ blocks: stored, locale, dict: storedDict, rooms }: { blocks: Block[]; locale: Locale; dict: Dictionary; rooms: Room[] }) {
  const contact = await getHotelContact(locale);
  const blocks = followContact(stored, contact);
  // e.g. the contact form's "email us at … or call …" messages
  const dict = followContact(storedDict, contact);
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "hero":
            return (
              <PageHero
                key={i}
                image={b.image}
                eyebrow={b.eyebrow}
                title={b.title}
                intro={b.intro}
                meta={b.meta?.map((m) => m.replace("{roomCount}", pad2(rooms.length))) as [string, string, string] | undefined}
              />
            );
          case "split": {
            const [main, second] = b.images;
            return (
              <EditorialSplit key={i} tone={b.tone} reverse={b.reverse} index={b.index} label={b.label} title={b.title} body={b.body} line={b.line} images={second ? [main, second] : [main]}>
                {SplitExtras({ b })}
              </EditorialSplit>
            );
          }
          case "facts":
            return (
              <section key={i} className="bg-ivory px-[var(--gutter)] py-16 text-ink md:py-[6vw]">
                <div className="grid gap-10 md:grid-cols-12 md:gap-x-[2vw]">
                  <p className="label md:col-span-3">{b.label}</p>
                  <FadeIn className="md:col-span-6 md:col-start-5">
                    <FactList items={b.items} />
                  </FadeIn>
                </div>
              </section>
            );
          case "statement":
            return <Statement key={i} text={b.text} label={b.label} tone={b.tone} />;
          case "gallery":
            return <Gallery key={i} images={b.images} tone={b.tone} label={b.label} />;
          case "finalBooking":
            return <FinalBooking key={i} dict={dict} phone={contact.phone} {...(b.image ? { image: b.image } : {})} {...(b.alt ? { alt: b.alt } : {})} />;
          case "arrival":
            return (
              <section key={i} className="relative overflow-hidden bg-ivory px-[var(--gutter)] py-16 text-ink md:py-[6vw]">
                <DecorativeLine variant="location" className="z-0 hidden md:block" />
                <div className="relative z-[1] grid gap-12 md:grid-cols-12 md:gap-x-[2vw]">
                  <div className="md:col-span-7">
                    <div className="relative aspect-[4/3] overflow-hidden ring-1 ring-inset ring-ink/15 md:aspect-[16/11]">
                      <iframe
                        title={`Map — ${hotel.name}, ${contact.street}`}
                        src={contact.mapEmbed}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="map-tint absolute inset-0 h-full w-full border-0"
                      />
                    </div>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
                      <address className="label not-italic">
                        {hotel.name} · {contact.street}, {contact.postalCode} {contact.city}
                      </address>
                      <PillLink href={contact.directions} external>
                        {dict.common.directions}
                      </PillLink>
                    </div>
                  </div>
                  <div className="md:col-span-4 md:col-start-9">
                    <p className="label mb-6">(01) {b.label}</p>
                    <ol className="divide-y divide-ink/20 border-y border-ink/20">
                      {b.transport.map((t, n) => (
                        <FadeIn as="li" key={t.title} delay={n * 0.05} className="py-5">
                          <p className="label mb-2">{t.title}</p>
                          <p className="body-copy opacity-85">{t.body}</p>
                        </FadeIn>
                      ))}
                    </ol>
                  </div>
                </div>
              </section>
            );
          case "contact": {
            const items = [
              { label: b.office.label, body: b.office.body, link: { href: contact.phone.href, text: contact.phone.display } },
              { label: b.reservations.label, body: b.reservations.body, link: { href: booking.bookingUrl, text: dict.nav.book, external: true } },
              { label: b.write.label, body: contact.email, link: { href: `mailto:${contact.email}`, text: dict.common.email } },
              { label: b.social.label, body: b.social.body, link: { href: hotel.facebook, text: "Facebook", external: true } },
            ];
            return (
              <section key={i} className="relative overflow-hidden bg-ivory px-[var(--gutter)] py-16 text-ink md:py-[6vw]">
                <DecorativeLine variant="hotel" className="z-0 hidden md:block" />
                <div className="relative z-[1] grid gap-14 md:grid-cols-12 md:gap-x-[2vw]">
                  <div className="md:col-span-4">
                    <ul className="divide-y divide-ink/20 border-y border-ink/20">
                      {items.map((c, n) => (
                        <FadeIn as="li" key={c.label} delay={n * 0.06} className="py-6">
                          <p className="label mb-2 opacity-60">{c.label}</p>
                          <p className="body-copy mb-3">{c.body}</p>
                          <a
                            href={c.link.href}
                            {...("external" in c.link && c.link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="label link-line inline-flex items-center gap-3"
                          >
                            {c.link.text} <Arrow />
                          </a>
                        </FadeIn>
                      ))}
                    </ul>
                    <address className="label mt-8 not-italic leading-[1.8]">
                      {hotel.name}
                      <br />
                      {contact.street}, {contact.postalCode} {contact.city}
                      <br />
                      {contact.country}
                      <br />
                      <a href={contact.directions} target="_blank" rel="noopener noreferrer" className="link-line mt-2 inline-block">
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
            );
          }
          case "roomList":
            return <RoomList key={i} rooms={rooms} locale={locale} dict={dict} />;
          case "offers":
            return <Offers key={i} b={b} />;
          case "faq":
            return (
              <Fragment key={i}>
                <Faq b={b} />
                {/* Structured data only for real content, never for DEMO / SAMPLE text. */}
                {!b.sample && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(b)).replace(/</g, "\\u003c") }} />}
              </Fragment>
            );
          case "cta":
            return <CtaBand key={i} b={b} />;
        }
      })}
    </>
  );
}
