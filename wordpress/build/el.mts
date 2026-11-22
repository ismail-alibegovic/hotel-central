/**
 * Builders for Elementor (free) page data. Every element here is a core, free Elementor element:
 * container, heading, text-editor, image, button, icon-list, image-gallery, google_maps, accordion, shortcode.
 * Layout and brand styling come from CSS classes (Advanced → CSS Classes, a free setting) styled by the
 * Hotel Central child theme, so staff edit text, photos and links in Elementor without touching the design.
 *
 * Media and links are written as placeholders the importer resolves on the target site:
 *   hc-media://images/x.jpg  → the attachment imported from public/images/x.jpg
 *   hc-page://key            → the page with that key in the same language
 */

let counter = 0;
const id = () => (++counter).toString(16).padStart(7, "0");
export const resetIds = (seed: number) => {
  counter = seed;
};

export type El = { id: string; elType: string; widgetType?: string; isInner?: boolean; settings: Record<string, unknown>; elements: El[] };

export const media = (path: string) => ({ url: `hc-media://${path.replace(/^\//, "")}`, id: "" });
export const page = (key: string, hash = "") => `hc-page://${key}${hash}`;
const link = (url: string) => ({ url, is_external: /^https?:/.test(url) ? "on" : "", nofollow: "" });

/** A full-width flex container. `bg` adds a classic cover background image (editable in Elementor's Style tab). */
export function box(cls: string, children: El[], opts: { row?: boolean; bg?: string; tag?: string; anchor?: string } = {}): El {
  return {
    id: id(),
    elType: "container",
    isInner: false,
    settings: {
      content_width: "full",
      flex_direction: opts.row ? "row" : "column",
      css_classes: cls,
      ...(opts.tag ? { html_tag: opts.tag } : {}),
      ...(opts.anchor ? { _element_id: opts.anchor } : {}),
      ...(opts.bg ? { background_background: "classic", background_image: media(opts.bg), background_position: "center center", background_size: "cover", background_repeat: "no-repeat" } : {}),
    },
    elements: children.map((c) => (c.elType === "container" ? { ...c, isInner: true } : c)),
  };
}

const widget = (widgetType: string, settings: Record<string, unknown>, cls = ""): El => ({ id: id(), elType: "widget", widgetType, settings: { ...settings, ...(cls ? { _css_classes: cls } : {}) }, elements: [] });

export const heading = (text: string, tag: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span" = "h2", cls = "") => widget("heading", { title: text, header_size: tag }, cls);
export const lines = (xs: string[]) => xs.join("<br>");
export const text = (html: string, cls = "") => widget("text-editor", { editor: html }, cls);
export const paras = (xs: string[], cls = "") => text(xs.map((x) => `<p>${x}</p>`).join(""), cls);
export const image = (path: string, cls = "") => widget("image", { image: media(path), image_size: "full" }, cls);
export const button = (label: string, url: string, cls = "") => widget("button", { text: label, link: link(url) }, cls);
export const list = (items: { text: string; url?: string }[], cls = "") =>
  widget("icon-list", { view: "traditional", icon_list: items.map((i) => ({ _id: id(), text: i.text, selected_icon: { value: "", library: "" }, ...(i.url ? { link: link(i.url) } : {}) })) }, cls);
export const gallery = (paths: string[], cls = "", columns = 4) =>
  widget("image-gallery", { wp_gallery: paths.map((p) => media(p)), gallery_columns: String(columns), gallery_link: "file", thumbnail_size: "large", open_lightbox: "yes" }, cls);
export const map = (address: string, cls = "") => widget("google_maps", { address, zoom: { unit: "px", size: 16, sizes: [] }, height: { unit: "px", size: 460, sizes: [] } }, cls);
export const accordion = (items: { q: string; a: string }[], cls = "") =>
  widget("accordion", { tabs: items.map((i) => ({ _id: id(), tab_title: i.q, tab_content: `<p>${i.a}</p>` })), title_html_tag: "h3" }, cls);
/** Text that comes from the site settings (Customizer): phone numbers, e-mails, opening hours. */
export const shortcode = (code: string, cls = "") => widget("shortcode", { shortcode: code }, cls);
