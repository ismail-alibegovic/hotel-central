import { expect, request as pwRequest, test, type APIRequestContext, type Page } from "@playwright/test";
import path from "node:path";
import { clickSave } from "./clickSave";

/**
 * The administration as a hotel employee meets it: branding, a start page with one big button per task, a room form grouped
 * by task, and the everyday flow Edit → Save Changes → Preview Changes → Publish Changes. Runs at phone, tablet and desktop size.
 * Each project edits its own room so the document locks of one project never block another.
 */
const base = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200";
const ADMIN = { email: process.env.SEED_ADMIN_EMAIL!, password: process.env.SEED_ADMIN_PASSWORD! };
const EDITOR = { email: `ux-editor-${Date.now()}@example.test`, password: process.env.E2E_EDITOR_PASSWORD! };
const rooms: Record<string, string> = { "admin-ux-desktop": "family-room", "admin-ux-tablet": "single-room", "admin-ux-mobile": "standard-twin-double" };

let api: APIRequestContext;
const roomIds: Record<string, string> = {};

async function uiLogin(page: Page, who: { email: string; password: string }) {
  await page.goto("/admin/login");
  await page.locator("#field-email").fill(who.email);
  await page.locator("#field-password").fill(who.password);
  await page.locator('form button[type="submit"]').click();
  await expect(page).not.toHaveURL(/\/login/);
}

const noHorizontalScroll = (page: Page) => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);

/** Payload re-opens the tab each person used last a moment after the page loads, so keep choosing the tab until it sticks. */
async function openTab(page: Page, name: string, probe: ReturnType<Page["locator"]>) {
  await expect(async () => {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(probe.first()).toBeVisible({ timeout: 2000 });
  }).toPass({ timeout: 20000 });
}

/** Click a save control and wait for the real API round-trip (status labels are on screen before saving). */
async function clickAndWaitForSave(page: Page, selector: string) {
  await expect(async () => {
    await expect(page.locator(selector)).toBeEnabled();
    const [res] = await Promise.all([
      page.waitForResponse((r) => /\/api\/rooms\/[^/?]+/.test(r.url()) && ["PATCH", "POST"].includes(r.request().method()) && !r.url().includes("autosave=true"), { timeout: 8000 }),
      clickSave(page, selector),
    ]);
    expect(res.status()).toBe(200);
  }).toPass({ timeout: 45000 });
}

test.beforeAll(async () => {
  const anon = await pwRequest.newContext({ baseURL: base });
  const token = (await (await anon.post("/api/users/login", { data: ADMIN })).json()).token;
  api = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Authorization: `JWT ${token}`, Connection: "close" } });
  await api.post("/api/users", { data: EDITOR });
  await api.delete("/api/payload-locked-documents?where[id][exists]=true");
  for (const slug of Object.values(rooms)) roomIds[slug] = (await (await api.get(`/api/rooms?where[slug][equals]=${slug}&limit=1&depth=0&draft=true`)).json()).docs[0].id as string;
});

test("the sign-in screen is Hotel Central's, not the software's", async ({ page }) => {
  await page.goto("/admin/login");
  await expect(page).toHaveTitle(/Hotel Central Website Manager/);
  await expect(page.locator('svg[aria-label="Hotel Central"]').first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible();
  await expect(page.locator('link[rel="icon"]').first()).toHaveAttribute("href", /icon\.svg/);
  const text = await page.locator("body").innerText();
  expect(text).not.toMatch(/payload/i);
  expect(await noHorizontalScroll(page)).toBe(true);
});

test("administrator's start page: one large button per task, in everyday words", async ({ page }) => {
  await uiLogin(page, ADMIN);
  await page.goto("/admin");
  await expect(page.getByRole("heading", { name: /^Welcome/ })).toBeVisible();
  for (const [id, title] of [
    ["rooms", "Rooms"],
    ["pages", "Pages"],
    ["media", "Photos & Media"],
    ["offers", "Special Offers"],
    ["homepage", "Homepage"],
    ["hotel-info", "Hotel Information"],
    ["chrome", "Navigation & Footer"],
    ["preview", "Website Preview"],
  ]) {
    const card = page.locator(`[data-card="${id}"]`);
    await expect(card.getByRole("heading", { name: title })).toBeVisible();
    for (const b of await card.locator(".hc-button").all()) expect((await b.boundingBox())!.height).toBeGreaterThanOrEqual(44); // touch-friendly
  }
  await expect(page.getByRole("link", { name: "Team members" }).first()).toBeVisible();
  expect(await noHorizontalScroll(page)).toBe(true);
  const text = await page.locator("main, .template-default").first().innerText();
  expect(text).not.toMatch(/\b(slug|SEO|blocks?|globals?|API|database|collection)\b/i);
});

test("editor's start page has no administration and says what an editor can do", async ({ page }) => {
  await uiLogin(page, EDITOR);
  await page.goto("/admin");
  await expect(page.getByText("You are an editor", { exact: false })).toBeVisible();
  await expect(page.getByRole("link", { name: "Team members" })).toHaveCount(0);
  await expect(page.locator('[data-card="rooms"]')).toBeVisible();
  expect(await noHorizontalScroll(page)).toBe(true);
});

test("room form: six tabs by task for an administrator, five for an editor; the Google tab uses plain words", async ({ page }, testInfo) => {
  const id = roomIds[rooms[testInfo.project.name]];
  await uiLogin(page, ADMIN);
  await page.goto(`/admin/collections/rooms/${id}?locale=en`);
  const tabs = ["1. Basic Information", "2. Room Description", "3. Photos", "4. Amenities", "5. Google & Search Appearance", "6. Advanced Settings"];
  for (const t of tabs) await expect(page.getByRole("button", { name: t, exact: true })).toBeVisible();
  await openTab(page, "5. Google & Search Appearance", page.getByText("Title in Google results"));
  await expect(page.getByText("Hide this page from Google").first()).toBeVisible();
  await openTab(page, "6. Advanced Settings", page.getByText("Page URL"));
  await expect(page.locator('[data-hc-status]')).toBeVisible();
  await expect(page.locator("#action-save-draft")).toContainText("Save Changes");
  await expect(page.locator("#action-save")).toContainText("Publish Changes");
  expect(await noHorizontalScroll(page)).toBe(true);
});

test("editor: no Advanced Settings tab, no Publish button, and the form says an administrator publishes", async ({ page }, testInfo) => {
  const id = roomIds[rooms[testInfo.project.name]];
  await uiLogin(page, EDITOR);
  await page.goto(`/admin/collections/rooms/${id}?locale=en`);
  await expect(page.getByRole("button", { name: "1. Basic Information", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "6. Advanced Settings" })).toHaveCount(0);
  await expect(page.locator("#action-save")).toHaveCount(0);
  await expect(page.locator("#action-save-draft")).toContainText("Save Changes");
  await expect(page.locator("[data-hc-status]")).toContainText("An administrator publishes");
});

test("everyday flow: change a room description in Bosnian, save, preview, then publish", async ({ page }, testInfo) => {
  const slug = rooms[testInfo.project.name];
  const id = roomIds[slug];
  const text = `UX opis sobe ${testInfo.project.name} ${Date.now()}`;
  await uiLogin(page, ADMIN);
  await page.goto(`/admin/collections/rooms/${id}?locale=bs`);
  await openTab(page, "2. Room Description", page.locator("#field-description__0__text"));
  await page.locator("#field-description__0__text").fill(text);
  await clickAndWaitForSave(page, "#action-save-draft"); // Save Changes
  await expect(page.locator("[data-hc-status]")).toContainText("Draft");

  // Visitors still see the old text; staff see the change in the preview.
  const before = await (await page.request.get(`/bs/rooms/${slug}`, { headers: { cookie: "" } })).text();
  expect(before).not.toContain(text);
  await page.goto(`/api/preview?path=${encodeURIComponent(`/bs/rooms/${slug}`)}`);
  await expect(page.getByText(text).first()).toBeVisible();

  await page.goto(`/admin/collections/rooms/${id}?locale=bs`);
  await clickAndWaitForSave(page, "#action-save"); // Publish Changes
  const live = await (await pwRequest.newContext({ baseURL: base })).get(`/bs/rooms/${slug}`);
  expect(await live.text()).toContain(text);
});

test("Save Changes says plainly that guests cannot see the change yet", async ({ page }, testInfo) => {
  const slug = rooms[testInfo.project.name];
  const id = roomIds[slug];
  await uiLogin(page, ADMIN);
  await page.goto(`/admin/collections/rooms/${id}?locale=bs`);
  await openTab(page, "2. Room Description", page.locator("#field-description__0__text"));
  await page.locator("#field-description__0__text").fill(`UX nacrt ${testInfo.project.name} ${Date.now()}`);
  await clickAndWaitForSave(page, "#action-save-draft");
  await expect(page.locator("[data-hc-saved=draft]")).toContainText("Saved as draft — not visible to guests yet.");
  await expect(page.getByText("Saved as draft — not visible to guests yet.").first()).toBeVisible(); // also as a message on screen
  await expect(page.locator("[data-hc-status]")).toContainText("Draft");
});

test("Publish Changes asks first, lists what goes live in each language and says both languages are published together", async ({ page }, testInfo) => {
  const slug = rooms[testInfo.project.name];
  const id = roomIds[slug];
  const text = `UX objava ${testInfo.project.name} ${Date.now()}`;
  const guest = await pwRequest.newContext({ baseURL: base });
  await uiLogin(page, ADMIN);
  await page.goto(`/admin/collections/rooms/${id}?locale=bs`);
  await openTab(page, "2. Room Description", page.locator("#field-description__0__text"));
  await page.locator("#field-description__0__text").fill(text);
  await clickAndWaitForSave(page, "#action-save-draft");

  // Payload's extra "Publish in English" entry is not offered: publishing is shared by both languages.
  await expect(page.locator("#action-save").locator("xpath=ancestor::*[contains(@class,'form-submit')][1]").locator("button")).toHaveCount(1);

  await page.locator("#action-save").click();
  const box = page.locator("[data-hc-publish-summary]");
  await expect(box).toContainText("Bosnian and English are published together");
  await expect(box.locator('li[data-language="bs"]')).toContainText(/1 change — .*Description/);
  await expect(box.locator('li[data-language="en"]')).toContainText("no changes");
  expect(await noHorizontalScroll(page)).toBe(true);

  // Cancelling (Escape) publishes nothing.
  await page.keyboard.press("Escape");
  await expect(box).toHaveCount(0);
  expect(await (await guest.get(`/bs/rooms/${slug}`)).text()).not.toContain(text);

  await clickAndWaitForSave(page, "#action-save"); // opens the confirmation again and confirms it
  await expect(page.locator("[data-hc-saved=published]")).toContainText("Published — guests can see this now");
  expect(await (await guest.get(`/bs/rooms/${slug}`)).text()).toContain(text);
});

test("an editor's Save Changes also says it is only a draft, and an editor is never offered the publish confirmation", async ({ page }, testInfo) => {
  const id = roomIds[rooms[testInfo.project.name]];
  await uiLogin(page, EDITOR);
  await page.goto(`/admin/collections/rooms/${id}?locale=en`);
  await openTab(page, "2. Room Description", page.locator("#field-description__0__text"));
  await page.locator("#field-description__0__text").fill(`UX editor draft ${testInfo.project.name} ${Date.now()}`);
  await clickAndWaitForSave(page, "#action-save-draft");
  await expect(page.locator("[data-hc-saved=draft]")).toContainText("not visible to guests yet");
  await expect(page.locator("#action-save")).toHaveCount(0);
  await expect(page.locator("[data-hc-publish-summary]")).toHaveCount(0);
});

test("Photos tab: shows the photos on the website now, explains the result of adding photos, and refuses unusable files with advice", async ({ page }, testInfo) => {
  const id = roomIds[rooms[testInfo.project.name]];
  await uiLogin(page, ADMIN);
  await page.goto(`/admin/collections/rooms/${id}?locale=en`);
  await openTab(page, "3. Photos", page.locator("[data-hc-photos]"));
  await expect(page.locator("[data-hc-photos-live] img").first()).toBeVisible();
  await expect(page.locator("[data-hc-photos-live]")).toContainText("replace all of them");
  await expect(page.getByRole("button", { name: "Upload photos" })).toBeVisible();
  const input = page.locator("[data-hc-photo-input]");
  await input.setInputFiles([
    { name: "IMG_0001.HEIC", mimeType: "image/heic", buffer: Buffer.from("x") },
    { name: "menu.pdf", mimeType: "application/pdf", buffer: Buffer.from("x") },
  ]);
  const problems = page.locator(".hc-photos__problems");
  await expect(problems).toContainText("2 photos were not added");
  await expect(problems).toContainText("share it as a JPG");
  await expect(problems).toContainText("Only JPG, PNG, WebP or AVIF");
  await expect(page.locator("[data-hc-photos-live]")).toContainText("replace all of them"); // nothing was added
  expect(await noHorizontalScroll(page)).toBe(true);
});

test("Photos tab: choose photos, describe them once, and they are in the room's list (one place, no trip to the library)", async ({ page }, testInfo) => {
  const slug = rooms[testInfo.project.name];
  const id = roomIds[slug];
  await uiLogin(page, ADMIN);
  await page.goto(`/admin/collections/rooms/${id}?locale=en`);
  await openTab(page, "3. Photos", page.locator("[data-hc-photos]"));
  const original = await page.locator("[data-hc-photos-live] img").count();
  const dir = path.join(process.cwd(), "public", "images");
  await page.locator("[data-hc-photo-input]").setInputFiles([path.join(dir, "junior01.jpg"), path.join(dir, "junior02.jpg")]);
  // Payload's own upload box opens with both files; each needs a short description.
  const description = page.locator('input[id^="field-alt"]');
  await expect(description).toBeVisible();
  await description.fill(`UX photo one ${testInfo.project.name}`);
  await page.locator(".bulk-upload--actions-bar").getByRole("button", { name: "Next", exact: true }).click(); // the second photo (the list of files is hidden on a phone)
  await expect(page.locator(".bulk-upload--actions-bar__locationText")).toContainText("2 of 2");
  await description.fill(`UX photo two ${testInfo.project.name}`);
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.locator("[data-hc-photos-replaced]")).toContainText("2 photos are listed below");
  // When the room had more original photos than were added, the panel says the others are no longer shown.
  if (original > 2) await expect(page.locator("[data-hc-photos-replaced]")).toContainText("no longer shown");
  else await expect(page.locator("[data-hc-photos-replaced]")).not.toContainText("no longer shown");
  await expect(page.getByText(/junior01(-\d+)?\.jpg/).first()).toBeVisible();
  await expect(page.getByText(/junior02(-\d+)?\.jpg/).first()).toBeVisible();
  expect(await noHorizontalScroll(page)).toBe(true);

  // Leave the room as it was: no photos of our own, and no leftover uploads.
  // (the form saves its draft by itself about 1.5 s after a change; wait for that before putting things back)
  await expect.poll(async () => ((await (await api.get(`/api/rooms/${id}?draft=true&depth=0`)).json()).gallery ?? []).length, { timeout: 15000 }).toBe(2);
  await api.patch(`/api/rooms/${id}?draft=true`, { data: { gallery: [] } });
  const uploads = (await (await api.get("/api/media?where[filename][like]=junior0&limit=50&depth=0")).json()).docs as { id: string }[];
  for (const m of uploads) await api.delete(`/api/media/${m.id}`);
});

test("polish: friendly page names, no developer words on the common screens, and forms open on their first tab", async ({ page }, testInfo) => {
  const id = roomIds[rooms[testInfo.project.name]];
  await uiLogin(page, ADMIN);

  // A built-in page shows "Meetings & Events", not its key "meetings-events", in the title and the breadcrumb.
  await page.goto("/admin/collections/pages?locale=en");
  await page.getByRole("link", { name: "Meetings & Events" }).first().click();
  await expect(page.locator("h1").first()).toHaveText("Meetings & Events");
  await expect(page.locator(".step-nav").first()).toContainText("Meetings & Events");
  await expect(page.locator(".step-nav").first()).not.toContainText("meetings-events");

  // The software's own words are replaced where staff meet them.
  await page.goto("/admin/account");
  const text = await page.locator("body").innerText();
  expect(text).toContain("Account settings");
  expect(text).not.toMatch(/Payload|Locale:/);

  // Choosing another tab, leaving, and coming back: the form opens on its first tab (Payload would re-open the old one a moment later).
  await page.goto(`/admin/collections/rooms/${id}?locale=en`);
  await openTab(page, "3. Photos", page.locator("[data-hc-photos]"));
  await page.goto("/admin");
  await page.goto(`/admin/collections/rooms/${id}?locale=en`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1500);
  await expect(page.locator(".tabs-field__tab-button--active")).toHaveText("1. Basic Information");
  expect(await noHorizontalScroll(page)).toBe(true);
});

test("sidebar: one short list of working destinations; Team members for administrators only; every link opens", async ({ page }, testInfo) => {
  // Below about 1366 px the menu is a drawer behind the "Open Menu" button (it closes again after each navigation).
  const openMenu = async () => {
    // Payload renders two toggles (one in the header on small screens); use whichever one is on screen.
    const opener = page.locator('button.nav-toggler[aria-label="Open Menu"]:visible').first();
    if (await opener.count()) await opener.click();
    await expect(page.locator("#hc-nav-dashboard")).toBeInViewport();
  };
  const seen = async () => {
    await openMenu();
    return (await page.locator("[data-hc-sidenav] .nav__link-label").allInnerTexts()).map((t) => t.trim());
  };
  await uiLogin(page, ADMIN);
  await page.goto("/admin");
  expect(await seen()).toEqual(["Dashboard", "Homepage", "Rooms", "Pages", "Photos & Media", "Hotel Information", "Navigation", "Footer", "Team members"]);
  // Payload's own grouped list (two page lists, developer-style names) is gone.
  await expect(page.locator("#nav-custom-pages, #nav-pages, #nav-rooms, #nav-global-homepage")).toHaveCount(0);
  for (const [id, url, heading] of [
    ["homepage", /globals\/homepage/, /Homepage/],
    ["rooms", /collections\/rooms/, /Rooms/],
    ["pages", /collections\/pages/, /Pages/],
    ["media", /collections\/media/, /Photos & Media/],
    ["hotel-info", /globals\/hotel-info/, /Hotel Information/],
    ["navigation", /globals\/navigation/, /Navigation/],
    ["footer", /globals\/footer/, /Footer/],
    ["users", /collections\/users/, /Team members/],
  ] as const) {
    await openMenu();
    await page.locator(`#hc-nav-${id}`).click();
    await expect(page).toHaveURL(url);
    await expect(page.locator("h1").first()).toContainText(heading);
  }
  await page.goto("/admin/collections/pages");
  await expect(page.locator("[data-hc-added-pages] a")).toHaveAttribute("href", /custom-pages/);
  expect(await noHorizontalScroll(page)).toBe(true);
  await openMenu();
  await page.waitForTimeout(800); // let the drawer finish sliding in before the picture
  await page.screenshot({ path: path.join("docs/admin-ux/real-staging", `sidebar-admin-${testInfo.project.name.replace("admin-ux-", "")}.png`) });

  await page.context().clearCookies();
  await uiLogin(page, EDITOR);
  await page.goto("/admin");
  expect(await seen()).toEqual(["Dashboard", "Homepage", "Rooms", "Pages", "Photos & Media", "Hotel Information", "Navigation", "Footer"]);
  await openMenu();
  await page.waitForTimeout(800); // let the drawer finish sliding in before the picture
  await page.screenshot({ path: path.join("docs/admin-ux/real-staging", `sidebar-editor-${testInfo.project.name.replace("admin-ux-", "")}.png`) });
  await page.context().clearCookies();
});

test("polish: only an administrator can add a page, so an editor cannot leave a blank page behind", async ({ page }) => {
  await uiLogin(page, EDITOR);
  await page.goto("/admin/collections/pages");
  await expect(page.getByRole("link", { name: "Meetings & Events" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Add new" })).toHaveCount(0);
  await page.context().clearCookies();
  await uiLogin(page, ADMIN);
  await page.goto("/admin/collections/pages");
  await expect(page.getByRole("link", { name: "Add new" }).first()).toBeVisible();
});

test("photo field: shows the photo guests see, replaces it in one click, keeps file names and crop settings out of the way", async ({ page }, testInfo) => {
  await uiLogin(page, ADMIN);
  await page.goto("/admin/globals/homepage?locale=en");
  const card = page.locator("[data-hc-photo-current]").first();
  await expect(card).toBeVisible();
  // Plain wording, no file names; the technical choices are folded away.
  await expect(card).not.toContainText(/\.(jpe?g|png|webp|avif)/i);
  // Payload lays its own toggle button over the label, so the toggle is what gets clicked.
  const moreOptions = page.locator("div.collapsible", { has: page.locator(".row-label", { hasText: "More photo options" }) }).first().locator(".collapsible__toggle").first();
  const advanced = page.getByText("Use a photo that is already on the website").first();
  await expect(advanced).toBeHidden();
  await expect(page.getByText("Which part of the photo stays in view").first()).toBeHidden();
  await moreOptions.click();
  await expect(advanced).toBeVisible();
  await moreOptions.click();
  await expect(advanced).toBeHidden();

  const had = await card.getAttribute("data-hc-photo-source");
  await card.locator("[data-hc-photo-replace-input]").setInputFiles(path.join(process.cwd(), "public", "images", "junior01.jpg"));
  await page.locator('input[id^="field-alt"]').fill(`UX replaced photo ${testInfo.project.name}`);
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(card).toHaveAttribute("data-hc-photo-source", "uploaded");
  await expect(card).toContainText("Your uploaded photo");
  await expect(card.locator("img")).toBeVisible();
  await expect.poll(() => card.locator("img").evaluate((i: HTMLImageElement) => i.complete && i.naturalWidth > 0)).toBe(true);
  await expect(card.getByRole("button", { name: "Replace photo" })).toBeVisible();
  expect(await noHorizontalScroll(page)).toBe(true);

  // Undo, so nothing is left in the homepage draft or the library.
  await card.getByRole("button", { name: /Go back to the website’s photo|Remove photo/ }).click();
  await expect(card).toHaveAttribute("data-hc-photo-source", had ?? "none");
  await page.waitForTimeout(2500); // let the automatic save of the undo settle
  const uploads = (await (await api.get("/api/media?where[filename][like]=junior01&limit=50&depth=0")).json()).docs as { id: string; alt?: string }[];
  for (const m of uploads) if (String(m.alt ?? "").startsWith("UX replaced photo")) await api.delete(`/api/media/${m.id}`);
});

test("Photos & Media: says what the library is (and why it may look empty), offers Add photos, and takes an upload", async ({ page }, testInfo) => {
  await uiLogin(page, ADMIN);
  const total = (await (await api.get("/api/media?limit=1&depth=0")).json()).totalDocs as number;
  await page.goto("/admin/collections/media");
  const intro = page.locator("[data-hc-library]");
  await expect(intro).toBeVisible();
  if (total === 0) {
    await expect(intro).toContainText("Your photo library is empty");
    await expect(intro).toContainText("built into the website");
  } else {
    await expect(intro).toContainText(`Photos in the library: ${total}`);
  }
  await expect(intro.getByRole("button", { name: "Add photos" })).toBeVisible();
  // The website's own photographs are listed for reference (collapsed until opened).
  await intro.locator("summary").click();
  await expect(intro.locator("[data-hc-library-builtin] img").first()).toBeVisible();
  expect(await noHorizontalScroll(page)).toBe(true);

  // Files that cannot be used are explained before anything is sent.
  await page.locator("[data-hc-library-input]").setInputFiles([{ name: "IMG_0001.HEIC", mimeType: "image/heic", buffer: Buffer.from("x") }]);
  await expect(page.locator(".hc-photos__problems")).toContainText("share it as a JPG");

  // A real upload goes through Payload's upload box and appears in the library.
  await page.locator("[data-hc-library-input]").setInputFiles([path.join(process.cwd(), "public", "images", "junior03.jpg")]);
  await page.locator('input[id^="field-alt"]').fill(`UX library photo ${testInfo.project.name}`);
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByText(/1 photo added to the photo library/).first()).toBeVisible();
  await expect.poll(async () => ((await (await api.get("/api/media?limit=1&depth=0")).json()).totalDocs as number)).toBe(total + 1);
  await expect(intro).toContainText(`Photos in the library: ${total + 1}`, { timeout: 15000 });

  // Leave the library as it was.
  const uploads = (await (await api.get("/api/media?where[filename][like]=junior03&limit=50&depth=0")).json()).docs as { id: string }[];
  for (const m of uploads) await api.delete(`/api/media/${m.id}`);
});

test("log out and back in again (works on a phone too)", async ({ page }) => {
  await uiLogin(page, ADMIN);
  await page.goto("/admin/logout");
  await expect(page.getByText(/logged out|log back in|login/i).first()).toBeVisible();
  await uiLogin(page, ADMIN);
  await expect(page.getByRole("heading", { name: /^Welcome/ })).toBeVisible();
});
