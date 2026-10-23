#!/usr/bin/env bash
# Install Playwright's Chromium (and its OS packages) with a hard time limit per attempt and a retry.
#
# Why: on GitHub-hosted runners `npx playwright install --with-deps chromium` normally takes ~30 s but occasionally
# stalls for 10+ minutes (apt mirror or browser CDN), which used to consume the whole job timeout and cancel a job
# whose tests had not even started (seen on the visual-regression job). A stalled attempt is killed after
# ATTEMPT_SECONDS and retried instead of waiting it out.
set -uo pipefail

ATTEMPTS="${ATTEMPTS:-3}"
ATTEMPT_SECONDS="${ATTEMPT_SECONDS:-240}"

for attempt in $(seq 1 "$ATTEMPTS"); do
  start=$SECONDS
  if timeout "$ATTEMPT_SECONDS" npx playwright install --with-deps chromium; then
    echo "playwright install: attempt $attempt succeeded in $((SECONDS - start)) s"
    exit 0
  fi
  echo "::warning::playwright install attempt $attempt/$ATTEMPTS failed or stalled after $((SECONDS - start)) s"
  sleep 5
done
echo "::error::playwright install failed after $ATTEMPTS attempts"
exit 1
