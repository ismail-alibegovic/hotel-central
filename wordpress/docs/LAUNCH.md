# Launch checklist (NOT performed — requires the hotel's explicit approval)
No production site, database, DNS or hosting was touched. To go live:
1. Install on production hosting (docs/INSTALL.md B) — back up the existing hotelcentral.ba first.
2. Change the admin password; Settings → General URLs; Settings → Reading → allow search engines (`blog_public=1`).
3. Configure SMTP; send a test enquiry.
4. Review `plugin/hotel-central-core/data/redirects.json` against `docs/audit/legacy-urls.csv` (rows marked TBD need hotel decisions: news posts, FAQ, COVID page…).
5. Replace the placeholder fonts note: display face is Gilda Display (OFL) as on the Next.js site; Balkind needs a licence.
6. Submit `/wp-sitemap.xml` in Search Console; check hreflang and the redirects on the real domain.
