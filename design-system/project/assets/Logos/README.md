# Logos

Copied from the code. The website has no image logo: its wordmark is live type (see the README).

- `hc-favicon.svg`: `public/icon.svg`. Square deep tile with "HC" in Georgia, ivory.
- `hc-icon.svg`: the admin's collapsed-sidebar icon (`src/cms/admin/Icon.tsx`). Same mark with a 10px corner radius, set in Gilda Display.
- `hc-wordmark-manager.svg`: the admin login/sidebar lockup (`src/cms/admin/Logo.tsx`). In code it draws in `currentColor`: ink `deep` (#363a2a) on light, `ivory` (#f4f0ec) on dark. This file is fixed to `deep`.

The text in these SVGs needs Gilda Display or Georgia installed. Outline the text before using them in print.
