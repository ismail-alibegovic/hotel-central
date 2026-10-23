#!/usr/bin/env bash
# Install Playwright's Chromium (and its OS packages) with a hard time limit per attempt and a clean retry.
#
# Why: on GitHub-hosted runners `npx playwright install --with-deps chromium` normally takes ~30 s, but the Ubuntu
# package mirror is occasionally so slow (single packages taking 60-100 s) that the step ran for 10+ minutes and consumed
# the whole job timeout, cancelling a job whose tests had not even started.
#
# A stalled attempt is stopped after ATTEMPT_SECONDS. Stopping `npx` alone is not enough: its child apt-get keeps running and
# holds the dpkg lock, so every retry would fail instantly ("Could not get lock"). Between attempts we therefore stop apt/dpkg,
# release the locks and repair an interrupted dpkg run. Packages that were already downloaded stay in apt's cache, so each retry
# resumes where the previous one stopped instead of starting over.
set -uo pipefail

ATTEMPTS="${ATTEMPTS:-4}"
ATTEMPT_SECONDS="${ATTEMPT_SECONDS:-300}"

cleanup_apt() {
  sudo pkill -KILL -x apt-get 2>/dev/null || true
  sudo pkill -KILL -x apt 2>/dev/null || true
  sudo pkill -KILL -x dpkg 2>/dev/null || true
  sleep 2
  sudo rm -f /var/lib/dpkg/lock /var/lib/dpkg/lock-frontend /var/lib/apt/lists/lock /var/cache/apt/archives/lock
  sudo dpkg --configure -a >/dev/null 2>&1 || true
}

for attempt in $(seq 1 "$ATTEMPTS"); do
  start=$SECONDS
  if timeout --kill-after=10 "$ATTEMPT_SECONDS" npx playwright install --with-deps chromium; then
    echo "playwright install: attempt $attempt succeeded in $((SECONDS - start)) s"
    exit 0
  fi
  echo "::warning::playwright install attempt $attempt/$ATTEMPTS failed or stalled after $((SECONDS - start)) s"
  cleanup_apt
done
echo "::error::playwright install failed after $ATTEMPTS attempts"
exit 1
