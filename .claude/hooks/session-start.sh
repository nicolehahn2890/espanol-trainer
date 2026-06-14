#!/bin/bash
# SessionStart-Hook für Claude Code on the web.
# Diese App ist abhängigkeitsfrei (Single-File, kein package.json, kein Build) —
# es gibt nichts zu installieren. Aufgabe des Hooks: die vorinstallierte
# Test-Toolchain (Node 22 + Playwright + Chromium) für die Session garantieren,
# damit `node tests/smoke.mjs` zuverlässig läuft.
set -euo pipefail

# Nur in der Remote-Umgebung (Claude Code on the web) ausführen.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Vorinstallierte Node-22-Toolchain für die ganze Session auffindbar machen.
if [ -d /opt/node22/bin ] && [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo 'export PATH="/opt/node22/bin:$PATH"' >> "$CLAUDE_ENV_FILE"
fi
# Speicherort der Playwright-Browser (im Basis-Image vorinstalliert).
if [ -d /opt/pw-browsers ] && [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo 'export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers' >> "$CLAUDE_ENV_FILE"
fi

# Sicherstellen, dass Chromium für die Funktionstests vorhanden ist
# (idempotent: No-op, wenn bereits installiert; Fallback-Download nur falls nötig).
export PLAYWRIGHT_BROWSERS_PATH="${PLAYWRIGHT_BROWSERS_PATH:-/opt/pw-browsers}"
if ! ls "$PLAYWRIGHT_BROWSERS_PATH"/chromium-*/chrome-linux/chrome >/dev/null 2>&1; then
  echo "Playwright-Chromium fehlt – installiere ..."
  /opt/node22/bin/playwright install chromium || echo "WARN: Chromium-Install fehlgeschlagen (evtl. Netzwerk-Policy)."
fi

echo "✓ Toolchain bereit: $(/opt/node22/bin/node -v), Playwright-Chromium unter $PLAYWRIGHT_BROWSERS_PATH. App ist abhängigkeitsfrei – nichts zu installieren."
