# 🦖 Español Trainer C1

Eine kleine Web-App zum Üben spanischer **Verbkonjugationen** auf C1-Niveau — als Single-File-App gebaut und optimiert für die Nutzung als Home-Bildschirm-App auf dem iPhone.

👉 **Live: https://nicolehahn2890.github.io/espanol-trainer/**

![App-Icon](apple-touch-icon.png)

## Was die App kann

- **~294 Verben** in **9 Zeitformen / Modi**: Presente, Pretérito Indefinido, Imperfecto, Futuro Simple, Condicional, Subjuntivo Presente, Subjuntivo Imperfecto, Imperativo und Pretérito Perfecto
- **🎯 Adaptiver Lernmodus**: Verb-/Zeitform-Kombinationen, die du oft falsch beantwortest, kommen gezielt häufiger dran; Gemeistertes seltener. Alternativ ein rein zufälliger Modus.
- **Akzent-Tasten** (á é í ó ú ñ) direkt unter dem Eingabefeld — kein Gefummel mit der Handytastatur
- **💡 Tipp-Funktion**, die die Lösung Buchstabe für Buchstabe aufdeckt
- **Akzent-Coaching**: Antworten ohne Akzent zählen als richtig, zeigen aber die korrekte Schreibweise
- **Vollständige Konjugationstabelle** zu jedem Verb über alle Zeitformen
- **Fortschritt & Motivation**: XP-/Level-System, Trefferquoten-Ring, Statistik pro Zeitform, Tages-Streak sowie Konfetti & Glückwunsch-Toasts bei Meilensteinen
- **Filter** nach Verbtyp (alle / nur regelmäßige / nur unregelmäßige) und nach Zeitform
- **Dark Mode** (folgt automatisch der Systemeinstellung)
- **Persistenz**: Statistik, Level und Einstellungen werden lokal im Browser gespeichert (`localStorage`) und überstehen Neustarts

## Auf dem iPhone installieren

1. Den Link in **Safari** öffnen: https://nicolehahn2890.github.io/espanol-trainer/
2. Auf das **Teilen**-Symbol tippen → **„Zum Home-Bildschirm"**
3. Rex erscheint als App-Icon und öffnet sich im Vollbild

> Hinweis: iOS speichert das Icon zwischen. Nach einem Icon-Update die App vom Home-Bildschirm löschen und neu hinzufügen.

## Technik

- Eine einzige Datei: [`index.html`](index.html) enthält das komplette HTML, CSS und JavaScript
- **Kein Build, keine Dependencies, kein Framework** — reines Vanilla-JS
- Regelmäßige Verben werden zur Laufzeit konjugiert (inkl. Orthografie-Regeln wie *busqué*, *pagué*, *alcancé*), unregelmäßige Verben sind mit vollständigen Formen hinterlegt
- Gehostet über **GitHub Pages**

## Mitwirken

Die App ist eine private Lern-App. Korrekturen an Konjugationsformen sind besonders willkommen — sprachliche Genauigkeit (inklusive Akzente) hat hier oberste Priorität.

---

*Hecho con cariño para aprender español.* 🇪🇸
