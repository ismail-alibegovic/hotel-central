# Staging acceptance checklist — for a person, not a developer

Use this on **https://hotel-central-cms-demo.vercel.app/admin** (the Vercel sign-in comes first, then the Hotel Central sign-in).
It takes about **45 minutes** with a laptop, plus 10 minutes on a phone. Nothing here needs technical knowledge.
Write **Pass**, **Fail** or a note next to each line. A Fail on a line marked ★ should be fixed before the client demonstration.

Use a **demo account** (not the account that created the site). Test with an **administrator** first, then with an **editor**.
Never change the booking button, and do not publish test text on a site real guests can see (this staging site is private).

## A. Sign in
| # | Do this | You should see | Result |
| --- | --- | --- | --- |
| A1 ★ | Open `/admin`. Sign in to Vercel if asked, then to Hotel Central. | The **HOTEL CENTRAL** sign-in page: a welcome line and a short help text. No software logo. | |
| A2 | Sign in with the administrator account. | The **start page**: large cards *Rooms, Pages, Photos & Media, Special Offers, Homepage, Navigation & Footer, Website Preview*. Open the menu (☰ on a small screen): *Dashboard, Homepage, Rooms, Pages, Photos & Media* and, under *Website Settings*, *Navigation, Footer, Team members*. There is one *Pages* entry, not two. | |
| A3 | Look at the browser tab. | Title ends with “Hotel Central Website Manager”; small **HC** icon. | |
| A4 | Click your picture (top right) → *Account settings*. | The page says **Account settings**, not the name of the software. | |

## B. Change a room description (the most common task)
| # | Do this | You should see | Result |
| --- | --- | --- | --- |
| B1 ★ | Start page → **Edit rooms** → open **Junior Suite**. | Six tabs: *1 Basic Information … 6 Advanced Settings*. The form opens on **tab 1**. | |
| B2 | At the top right choose **Editing language: Bosanski**. | Field names say “— Bosanski”. | |
| B3 | Tab **2. Room Description** → add a word at the end of the first paragraph. | The box at the top says **Draft**. | |
| B4 ★ | Click **Save Changes**. | A message “**Saved as draft — not visible to guests yet.**” and the same line stays in the box at the top. | |
| B5 | Click the **eye** (Preview Changes). | On a wide screen the preview opens next to the form and follows your typing within about 2 seconds (the bar above it says “Updated at …”; **Refresh preview** reloads it by hand). On a small screen it replaces the form; click the eye again to return. | |
| B6 | Open `/bs/rooms/junior-suite` in a private window (or the **English** page `/en/rooms/junior-suite`). | The guest page does **not** show your word yet. | |
| B7 ★ | Back in the form click **Publish Changes**. | A box asks first: it lists **Bosnian: 1 change — Description** and **English: no changes**, and says **Bosnian and English are published together**. | |
| B8 | Click **Cancel**. | Nothing is published (check the guest page again). | |
| B9 ★ | Click **Publish Changes** → **Publish in both languages**. | “Published — guests can see this now, in Bosnian and English.” The guest page now shows your word. | |
| B10 | Remove the word, Save Changes, Publish Changes, confirm. | The guest page is back to normal. | |

## C. Photos
| # | Do this | You should see | Result |
| --- | --- | --- | --- |
| C1 ★ | Open a room → tab **3. Photos**. | Four short steps, a big **Upload photos** button, and the room's **original photos** with the sentence “Photos you add replace all of them”. | |
| C2 ★ | Click **Upload photos** and choose **two** photos (JPG or PNG, under 8 MB). | A box opens with both files. Type a short description for each (use the arrows for the second) and click **Save**. | |
| C3 | Look at the list. | “2 photos are listed below. Guests see exactly these…”; both photos appear with a small preview. | |
| C4 ★ | Try **one HEIC photo from an iPhone**, or a PDF. | A red note names the file and says what to do (“share it as a JPG…” / “Only JPG, PNG, WebP or AVIF…”). The other photos still go in. | |
| C5 | Drag the second photo above the first. Click **Save Changes**, **Preview Changes**. | The preview shows the new order; the first photo is the main one. | |
| C6 ★ | **Do not publish** this on a site that matters. To undo: remove both rows (the **X**), Save Changes. | The original photos are shown again in the panel. | |
| C7 | On a **phone**, repeat C1–C2 with a photo from the camera roll. | Works; no sideways scrolling. | |

## C2. Replacing one photo in a page section
| # | Do this | You should see | Result |
| --- | --- | --- | --- |
| C2a ★ | **Homepage** → find a photo field (for example the social media photo or the background photo). | The photo guests see now, a **Replace photo** or **Add photo** button, then **Photo description**. File names and crop settings are folded under **More photo options**. | |
| C2b | Click **Replace photo**, choose a JPG, describe it, **Save**. | The new photo appears in the box: “Your uploaded photo”. Nothing is public yet. | |
| C2c | Click **Remove photo** (or **Go back to the website's photo**). | The box shows the earlier photo again. | |

## D. Pages, contact details and the homepage
| # | Do this | You should see | Result |
| --- | --- | --- | --- |
| D1 | Sidebar → **Pages**. | Friendly names: *About, Contact, Location, Meetings & Events, Restaurant, Rooms overview, Spa*. Open **Contact**: the title says **Contact**, not “contact”. | |
| D2 ★ | In **Contact**, tab **Page Sections** → open the contact section. | You can edit “Reception — address and opening hours” and “Reservations — phone and e-mail” (per language). | |
| D3 ★ | Sidebar → **Website Settings → Hotel Information**. Tab **Phone numbers**: change the first number, **Save Changes**, then (administrator) **Publish Changes**. | The form already shows +387 33 561 800, info@hotelcentral.ba and Ćumurija 8. After publishing, the new number is in the menu, the footer, the phone button on a phone, the booking banner and the Contact page, **in both languages**. Put the real number back and publish again. An editor only gets **Save Changes**. A wrong number (letters) is refused with an explanation. Where contact-form messages are delivered and the booking system address **cannot** be changed here (on purpose). | |
| D4 | Start page → **Homepage**. | Texts and photos can be replaced; empty fields keep the built-in ones. Change one heading in Bosnian, Save Changes, Preview Changes. | |
| D5 | **Navigation & Footer**. | Menu wording can be changed; adding or moving menu entries is for administrators only. | |

## E. Special offers
| # | Do this | You should see | Result |
| --- | --- | --- | --- |
| E1 | Start page → **Special Offers**. | The card explains that an offer is a “**Special offers (cards)**” section on a page. | |
| E2 | **New pages** → Add new → add a *Special offers (cards)* section with one offer (use sample wording, leave **DEMO / SAMPLE** ticked). | Publishing is **refused** while DEMO / SAMPLE is ticked (nothing wrong can reach guests). | |
| E3 ★ | **Monthly habit (until expiry dates exist):** open every page that has offers; remove or update any offer whose dates are over; Save Changes; Publish Changes. | Offers do **not** expire by themselves yet (see `OFFER_EXPIRY_PROPOSAL.md`). Put a monthly reminder in the administrator's calendar. | |

## F. The editor account
Sign in as an **editor** (Team members → add one if needed).
| # | Do this | You should see | Result |
| --- | --- | --- | --- |
| F1 ★ | Open a room. | The top box says “You are an editor… an administrator publishes”. **No Publish Changes button**, no *6. Advanced Settings* tab. | |
| F2 ★ | Edit a description → **Save Changes**. | “Saved as draft — not visible to guests yet.” The guest page is unchanged. | |
| F3 | Sidebar → **Pages**. | There is **no “Add new” button** (an editor cannot leave a blank page behind). **Team members** is not in the menu. | |

## G. Both website languages and the phone
| # | Do this | You should see | Result |
| --- | --- | --- | --- |
| G1 ★ | Open `/en` and `/bs` (private window, signed in to Vercel). | Both home pages load; the language switch goes to the other language. | |
| G2 | Open `/en/rooms`, `/bs/rooms`, `/en/contact`, `/bs/contact`. | All load, design unchanged. | |
| G3 ★ | Open the admin on a **phone** (or a narrow window). | Sign-in, start page and a room form fit the screen without sideways scrolling; buttons are easy to tap; the publish box fits and its buttons stack. | |
| G4 | Make the window **1366 px wide** (a common laptop). | The menu hides behind the ☰ button, but the **start page** cards are always there. | |

## H. Safety and recovery
| # | Do this | You should see | Result |
| --- | --- | --- | --- |
| H1 | Open a room → **Earlier versions**. | A list of versions; an administrator can open one and restore it. | |
| H2 ★ | Sign out and open `/admin` in a new private window **without signing in to Vercel**. | You are stopped at the **Vercel sign-in**: the staging site is private. | |
| H3 | Open the **public demo** (hotel-central-pi.vercel.app) `/admin`. | **Page not found** — the public demo has no administration. | |
| H4 | Ask the person who looks after hosting: when did the last **database backup** happen, and where is it? | A real answer with a date. (Today backups are made by hand with `pg_dump`.) | |

## Things only a person on the live site can confirm (not covered by automatic tests)
* Uploading a **real photo** to the hosted storage (Vercel Blob) and seeing it on the website (the media library was empty when this list was written).
* The sign-in, saving and publishing speed over the hosted database (the database is in Frankfurt; the first request after a quiet period can take a few seconds).
* That the Supabase project is **awake** (the free plan pauses after about a week without use) — open the admin the same morning as a demo.

## Known limitations to say out loud in the demonstration
1. **Bosnian and English are published together** (the publish box says so).
2. **Offers do not expire by themselves** yet.
3. **Phone, e-mail and address** in the footer are fixed in the website code.
4. **No password-reset e-mail** is set up yet: a forgotten password is reset by an administrator or the developer.
5. A room's photos replace the built-in photos as a **set**.
