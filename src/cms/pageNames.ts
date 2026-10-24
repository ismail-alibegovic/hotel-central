/** Friendly names for the built-in pages, shown instead of their technical keys in the admin lists and titles. */
export const pageNames: Record<string, string> = {
  about: "About",
  rooms: "Rooms overview",
  spa: "Spa",
  restaurant: "Restaurant",
  "meetings-events": "Meetings & Events",
  location: "Location",
  contact: "Contact",
};

export const pageName = (slug: unknown): string => (typeof slug === "string" ? (pageNames[slug] ?? slug) : "");
