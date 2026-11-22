import { getChrome } from "@/cms/chrome";
import { getHotelContact } from "@/cms/hotelInfo";
import { contactLinks, followContact } from "@/cms/hotelInfoMerge";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileBookBar } from "@/components/MobileBookBar";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";

/** The hotel's own pages: hotel header, footer and mobile booking bar. */
export default async function HotelLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const [chrome, contact] = await Promise.all([getChrome(locale, getDictionary(locale)), getHotelContact(locale)]);
  // Built-in sentences that mention the phone number or e-mail (e.g. the contact form's messages) follow Hotel Information.
  const dict = followContact(chrome.dict, contact);
  const links = contactLinks(contact);
  return (
    <>
      <Header locale={locale} dict={dict} contact={links} />
      <main id="content">{children}</main>
      <Footer locale={locale} dict={dict} social={chrome.social} contact={contact} />
      <MobileBookBar dict={dict} contact={links} />
    </>
  );
}
