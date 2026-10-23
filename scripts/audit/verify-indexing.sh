#!/usr/bin/env bash
# Builds the app under simulated Vercel environments and prints robots/canonical/sitemap output.
# Expected: A and B noindex; C (official production) indexable with Allow + sitemap. Needs `fuser` (psmisc).
cd "$(dirname "$0")/../.."
run() { name="$1"; shift
  echo "=== $name"
  env "$@" npx next build >/tmp/b.log 2>&1 || { echo BUILD FAIL; tail -5 /tmp/b.log; return; }
  (npx next start -p 3101 >/tmp/s.log 2>&1 & echo $! >/tmp/pid)
  sleep 5
  echo "robots.txt: $(curl -s localhost:3101/robots.txt | tr '\n' ' ')"
  echo "x-robots-tag: $(curl -sI localhost:3101/en/rooms | grep -i x-robots-tag | tr -d '\r')"
  curl -s localhost:3101/en/rooms | grep -o '<meta name="robots"[^>]*>\|<link rel="canonical"[^>]*>' | tr '\n' ' '; echo
  echo "sitemap first loc: $(curl -s localhost:3101/sitemap.xml | grep -o '<loc>[^<]*' | head -1)"
  fuser -k 3101/tcp >/dev/null 2>&1; sleep 2
}
run "A demo = Vercel production, no site URL" VERCEL_ENV=production VERCEL_PROJECT_PRODUCTION_URL=hotel-central-pi.vercel.app VERCEL_URL=hotel-central-abc.vercel.app
run "B preview, site URL set" VERCEL_ENV=preview VERCEL_URL=hotel-central-git-x.vercel.app NEXT_PUBLIC_SITE_URL=https://www.hotelcentral.ba
run "C future official production launch" VERCEL_ENV=production NEXT_PUBLIC_SITE_URL=https://www.hotelcentral.ba VERCEL_PROJECT_PRODUCTION_URL=hotel-central-pi.vercel.app
