#!/usr/bin/env bash
# Regenerates the content and packages the theme and plugin as zips for WordPress (and the Playground blueprint).
set -euo pipefail
cd "$(dirname "$0")/../.."
npx tsx wordpress/build/generate.mts
mkdir -p wordpress/dist
rm -f wordpress/dist/hotel-central-theme.zip wordpress/dist/hotel-central-setup.zip
(cd wordpress/theme && zip -qr ../dist/hotel-central-theme.zip hotel-central)
(cd wordpress/plugin && zip -qr ../dist/hotel-central-setup.zip hotel-central-setup)
ls -la wordpress/dist
