#!/usr/bin/env bash
# Builds dist/hotel-central-wordpress-package.zip: theme + plugin zips (upload via wp-admin), content export,
# seed/installer scripts, redirect map, media, tests and docs. Needs only zip.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=dist/pkg; rm -rf dist; mkdir -p $OUT/wp-content
( cd theme && zip -qr ../$OUT/wp-content/hotel-central-theme.zip hotel-central )
( cd plugin && zip -qr ../$OUT/wp-content/hotel-central-core-plugin.zip hotel-central-core )
cp -r scripts content docs README.md $OUT/
mkdir -p $OUT/media && cp -r ../public/images $OUT/media/images
mkdir -p $OUT/tests && cp tests/*.js tests/*.py $OUT/tests/
sed -i 's#\.\./public/images#media/images#' $OUT/scripts/seed.php
( cd dist && zip -qr hotel-central-wordpress-package.zip pkg && mv pkg ../dist/_pkg_unzipped )
rm -rf dist/_pkg_unzipped; ls -la dist
