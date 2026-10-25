# Special offers that expire — design proposal

Status: **proposal only. Nothing in this document is implemented, and no migration has been written or applied.** The hosted database
must not be changed without explicit approval.

## What offers are today (verified in the code)
* An offer is **a row of the "Special offers (cards)" page section** (`blocks/config.ts`, block `offers`, array `items`, at most 6 per
  section). It belongs to a page: one of the seven built-in pages (collection `pages`) or a page created in the CMS (`custom-pages`).
  There is no stand-alone Offers list (PR #12 is not merged).
* Every offer has an optional free-text **"When it is valid"** (`validity`). It is only text shown to guests. **Nothing hides an offer
  automatically**, so an expired summer offer stays on the website until somebody edits and publishes the page.
* Built-in pages are **prerendered** and regenerated only when somebody publishes (`revalidatePath` in `hooks/revalidate.ts`).
  Pages created in the CMS use `dynamic = "force-dynamic"` (rendered on every request).

## Why it matters
An expired offer left live is a promise the hotel may have to honour or argue about with a guest. Free text cannot be checked by the
website, and people forget.

## Smallest safe design
Two optional **date** fields on each offer, no other change:

| Field | Label for staff | Meaning |
| --- | --- | --- |
| `showFrom` | "Show from (optional)" | Offer appears from the **start** of this day |
| `showUntil` | "Show until (optional)" | Offer is still shown **during** this day and disappears at the **end** of it |

* Type: Payload `date` with `pickerAppearance: "dayOnly"`; stored as a date without a time of day, **shared by both languages** (an offer
  does not expire in one language only).
* Empty means "no limit", so every existing offer behaves exactly as before.
* Validation: `showUntil` may not be before `showFrom`; a date in the past is allowed (it simply means "already over") but the form
  warns: "This offer is already over, guests will not see it."
* The **free-text "When it is valid"** stays (it is what guests read, e.g. "1 June – 31 August"). The dates only control visibility.
  The helper text tells staff to keep the two consistent.

### Rules, in one place (a pure function, unit-tested)
`isOfferVisible(offer, now)`:
1. `now` is converted to a **calendar day in Europe/Sarajevo** (not UTC and not the server's clock).
2. Hidden when `showFrom` is later than today; hidden when `showUntil` is earlier than today; otherwise visible.
3. Offers hidden by rule are removed in `resolve.ts` before rendering, together with their card. If **all** offers of a section are
   hidden the **whole section is skipped** (the resolver already skips sections without usable rows), so no empty heading is shown.
4. A hidden offer is never in the HTML, so there is no way for a guest to see it by viewing the source. (Structured data: offers
   emit none.)

### Timezone
All comparisons use the hotel's calendar day (`Europe/Sarajevo`, UTC+1 / UTC+2 in summer). Example: "Show until 31 August" stays visible
until 31 Aug 23:59:59 Sarajevo time and is gone at 00:00 on 1 Sept, whatever the server's clock is. Tests cover the midnight and the
summer/winter-time boundaries.

### Caching (the part that is easy to get wrong)
| Page type | Behaviour today | What is needed |
| --- | --- | --- |
| Pages created in the CMS | rendered on every request | nothing: the rule is applied at render time and takes effect immediately |
| The seven built-in pages | prerendered, refreshed when published | the page must be regenerated **after midnight**, or an expired offer would remain until the next publish |

Recommended (cheapest, no new service): give the built-in pages that can hold offers a **time-based refresh of one hour**
(`export const revalidate = 3600` on those routes). An offer then disappears within an hour after midnight. If the hotel wants it gone
at 00:00 sharp, add a **Vercel Cron job** (one call per day at 22:05/23:05 UTC, free on all plans) that calls a protected route which runs
`revalidatePath` for the built-in pages. Both are small; the hourly refresh needs no secrets, the cron needs one shared secret.
`next/image` and the sitemap are not affected.

### Preview and drafts
Staff preview applies the same rule, so an expired offer is not shown in the preview either. The publish confirmation lists
"Page Sections" as changed, as for any section edit.

## Database impact (needs approval before anything is applied)
`showFrom` and `showUntil` are two **nullable columns** on the offers-items table and on its versions table (the `_v` copy used for
drafts). The migration is **purely additive** (`ALTER TABLE … ADD COLUMN`, no default, no rewrite, no data change), reversible
(`DROP COLUMN`), and takes a fraction of a second on this database size. Procedure when approved:
1. generate the migration with `npm run cms:migrate -- create` and **review the SQL**;
2. run it against a **copy** (restore a `pg_dump`) and check existing offers are untouched;
3. take a fresh `pg_dump` of the hosted database, then apply with `npm run cms:migrate`;
4. deploy the code. (Code that reads the new fields must not be deployed before the columns exist.)

## What it deliberately does not do
* No scheduled publishing/unpublishing of pages, no automatic emails or reminders, no recurring offers, no promo codes or prices.
* No hiding of a whole page by date (that is "Unpublish", an administrator decision).
* No time of day (day precision is what a hotel means by "until the 31st").

## Interim process until this is built (no code, no cost)
Put a monthly reminder in the administrator's calendar: **"Check Special Offers on the website"**: open each page that has offers, remove
or update anything that has ended, Save Changes, Publish Changes. The staging acceptance checklist includes this check.

## Tests that would accompany it
* Unit: `isOfferVisible` for no dates, only from, only until, both, "until" = today (visible), "until" = yesterday (hidden), "from" =
  tomorrow (hidden), midnight in Sarajevo, the March and October clock changes, `showUntil < showFrom` refused.
* Integration: a published page with one expired and one valid offer renders only the valid one in both languages; a section whose
  offers are all expired disappears; a built-in page with no dates is byte-for-byte unchanged (the existing HTML-parity suite).
* Browser: the two date fields are in the offer row with plain-language labels and work on a phone.

## Effort and risk
About one day including tests. Risk: low (additive columns, defaults to "no limit", the parity suite proves existing pages are unchanged).
The part that needs a decision is caching: hourly refresh (simplest) or a daily cron (exact midnight).
