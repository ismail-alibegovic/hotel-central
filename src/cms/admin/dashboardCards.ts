/**
 * What the Hotel Central start page offers. Pure so the rules can be tested: only things the signed-in person is allowed to
 * use are listed, and no technical vocabulary (database, API, schema, collection) appears in any text.
 */
export type Role = "admin" | "editor";

export type CardLink = { label: string; href: string };
export type Card = {
  id: string;
  title: string;
  text: string;
  links: CardLink[];
  external?: boolean;
};

export type Can = { collection: (slug: string) => boolean; global: (slug: string) => boolean };

export function dashboardCards(can: Can, role: Role): Card[] {
  const cards: Card[] = [];

  if (can.collection("rooms")) {
    cards.push({
      id: "rooms",
      title: "Rooms",
      text: "Descriptions, photos and amenities for each room. Bosnian and English text are edited separately.",
      links: [{ label: "Edit rooms", href: "/admin/collections/rooms" }],
    });
  }

  if (can.collection("pages") || can.collection("custom-pages")) {
    const links: CardLink[] = [];
    if (can.collection("pages")) links.push({ label: "Edit pages", href: "/admin/collections/pages" });
    if (can.collection("custom-pages")) links.push({ label: "New pages", href: "/admin/collections/custom-pages" });
    cards.push({
      id: "pages",
      title: "Pages",
      text: "Text and layout of pages such as About, Spa, Restaurant, Location and Contact. Administrators can also add new pages.",
      links,
    });
  }

  if (can.collection("media")) {
    cards.push({
      id: "media",
      title: "Photos & Media",
      text: "The photo library. Add new photos or replace existing ones, each with a short description for visually impaired visitors.",
      links: [{ label: "Open photo library", href: "/admin/collections/media" }],
    });
  }

  // Offers are a section of a page, not a separate list: point to where they are added.
  if (can.collection("custom-pages") || can.collection("pages")) {
    cards.push({
      id: "offers",
      title: "Special Offers",
      text: "Offers are added as a “Special offers (cards)” section on a page. Prepare a new offer as a draft and publish it only when it is approved.",
      links: can.collection("custom-pages")
        ? [{ label: "Prepare a page with offers", href: "/admin/collections/custom-pages" }]
        : [{ label: "Open pages", href: "/admin/collections/pages" }],
    });
  }

  if (can.global("homepage")) {
    cards.push({
      id: "homepage",
      title: "Homepage",
      text: "The headline, texts and photos visitors see first.",
      links: [{ label: "Edit homepage", href: "/admin/globals/homepage" }],
    });
  }

  if (can.global("hotel-info")) {
    cards.push({
      id: "hotel-info",
      title: "Hotel Information",
      text: "Phone numbers, e-mail addresses, the hotel's address and opening hours. A change here updates every page once it is published.",
      links: [{ label: "Edit hotel information", href: "/admin/globals/hotel-info" }],
    });
  }

  if (can.global("navigation") || can.global("footer")) {
    const links: CardLink[] = [];
    if (can.global("navigation")) links.push({ label: "Navigation (menu)", href: "/admin/globals/navigation" });
    if (can.global("footer")) links.push({ label: "Footer", href: "/admin/globals/footer" });
    cards.push({
      id: "chrome",
      title: "Navigation & Footer",
      text: "The names in the menu at the top of the site and the texts at the bottom of every page.",
      links,
    });
  }

  cards.push({
    id: "preview",
    title: "Website Preview",
    text: "Open the website as visitors see it, including your saved changes that are not published yet.",
    links: [
      { label: "Bosnian site", href: "/api/preview?path=%2Fbs" },
      { label: "English site", href: "/api/preview?path=%2Fen" },
    ],
    external: true,
  });

  void role;
  return cards;
}
