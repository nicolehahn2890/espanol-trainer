# Español Trainer C1

Single-File-Web-App zum Üben spanischer Konjugationen (C1): alles lebt in `index.html` (HTML, CSS, JS). Läuft als Home-Bildschirm-App auf dem iPhone via GitHub Pages: https://nicolehahn2890.github.io/espanol-trainer/

## Git-Regeln (WICHTIG)

- **Immer direkt auf `main` arbeiten, committen und pushen.**
- **Niemals neue Branches anlegen** — keine Feature-Branches, keine `claude/*`-Branches, keine Pull Requests, außer es wird ausdrücklich verlangt.

## Architektur

- `index.html` — die komplette App:
  - `VERBS`: ~294 Verben. Regelmäßige haben nur `ar_group` ('ar'/'er'/'ir'), unregelmäßige explizite Formen-Arrays (immer 6 Einträge: yo, tú, él/ella, nosotros, vosotros, ellos/ellas). Explizite Arrays haben Vorrang vor dem Generator — so werden auch Einzelformen regelmäßiger Verben überschrieben (z.B. `leer`, `enviar`).
  - `conjugateRegular()`: Generator für regelmäßige Verben, inkl. Orthografie-Regeln (-car/-gar/-zar vor e/é → qu/gu/c) und Perfecto (haber + Partizip, Vokalstamm → -ído).
  - Statistik/Filter/XP/Lernfortschritt werden in `localStorage` persistiert (`espanolTrainerC1`, Format `v:2`; ältere Stände werden migriert — Zeitformen-Auswahl wird dabei auf den Standard „alle 9" zurückgesetzt).
  - Adaptiver Modus (`state.mode = 'smart'`, Standard): `itemStats` zählt richtig/falsch pro Verb×Zeitform; 40 % der Fragen kommen gezielt aus offenen Schwächen, der Rest gewichtet (Gemeistertes seltener). Dazu XP/Level (250 XP pro Level), Tages-Streak, Konfetti/Toast bei Meilensteinen.
  - Dark Mode via `prefers-color-scheme`, Logo ist Inline-SVG (kein Base64 mehr).
- `apple-touch-icon.png` — App-Icon (180×180): Dino in spanischen Farben (gold mit roten Zacken). Quelle ist eine SVG-Zeichnung; bei Änderungen das Sidebar-SVG in `index.html` (`.rex-icon`) synchron halten. iOS cached das Icon — zum Aktualisieren App vom Home-Bildschirm löschen und neu hinzufügen.

## Sprachliche Korrektheit

Konjugationsformen müssen exakt stimmen (inkl. Akzente) — das ist eine Lern-App. Bei Änderungen an `VERBS` oder am Generator immer per Node gegenprüfen: Script aus `index.html` extrahieren und alle Verben × Zeitformen durchrechnen (keine `null`s, 6 Formen, Stichproben bekannter Fallen: pagué, busqué, alcancé, leyó, envío, he hablado).

## Testen

Kein Build, keine Dependencies. Funktionstests mit Playwright (`/opt/node22/lib/node_modules/playwright`) gegen `file://…/index.html`: hell/dunkel/mobil (390×844), Antwort-Flow, Persistenz nach Reload. Blockierte Google-Fonts-Requests in der Sandbox sind erwartbar und kein Fehler.
