#!/usr/bin/env bash
# Installs the official MongoDB Database Tools (mongodump / mongorestore) for Ubuntu 24.04 x86_64 into
# $1 (default ./.tools/mongo) and prints the bin directory. The archive is pinned by SHA-256
# (recorded 2026-10-23 on first download; MongoDB publishes no checksum file for this URL).
set -euo pipefail
VERSION=100.14.0
SHA256=39b784a1451c9a178761d4dd3e07d55786223650aa3b3b6c189445d400046579
DEST="${1:-.tools/mongo}"
mkdir -p "$DEST"
ARCHIVE="$DEST/tools.tgz"
if [ ! -x "$DEST/bin/mongodump" ]; then
  curl -fsSL "https://fastdl.mongodb.org/tools/db/mongodb-database-tools-ubuntu2404-x86_64-${VERSION}.tgz" -o "$ARCHIVE"
  echo "${SHA256}  ${ARCHIVE}" | sha256sum -c - >&2
  tar -xzf "$ARCHIVE" -C "$DEST" --strip-components=1
  rm -f "$ARCHIVE"
fi
echo "$(cd "$DEST/bin" && pwd)"
