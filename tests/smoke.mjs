// Funktionaler Smoke-Test für den Español Trainer (Single-File-App).
// Läuft mit dem in der Umgebung vorinstallierten Playwright + Chromium:
//   node tests/smoke.mjs
// Prüft: Frage rendert, Antwort-Flow, Konjugationstabelle, Statistik,
// Persistenz nach Reload, Dark Mode — in hell & dunkel, ohne JS-Fehler.
// Blockierte Google-Fonts-Requests in der Sandbox sind erwartbar und kein Fehler.

import { pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexUrl = pathToFileURL(resolve(__dirname, '..', 'index.html')).href;

// Playwright ist global installiert (siehe CLAUDE.md). Absoluten Pfad nutzen,
// per PLAYWRIGHT_MODULE überschreibbar.
const PW = process.env.PLAYWRIGHT_MODULE
  || '/opt/node22/lib/node_modules/playwright/index.mjs';
const { chromium } = await import(PW);

const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); else console.log('  ✓ ' + msg); };
const isExpectedErr = e => /fonts\.(googleapis|gstatic)/.test(e) || /Failed to load resource/.test(e);

const browser = await chromium.launch();
try {
  // --- 1) Hell: rendern, antworten, Tabelle, Persistenz ---
  let ctx = await browser.newContext({ viewport: { width: 1100, height: 800 } });
  let page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !isExpectedErr(m.text())) errors.push('console: ' + m.text()); });

  await page.goto(indexUrl);
  await page.waitForFunction(() => {
    const v = document.getElementById('qVerb');
    return v && v.textContent && v.textContent !== '—';
  }, { timeout: 10000 });
  ok(true, 'Startfrage rendert ein Verb');

  await page.fill('#answerInput', 'xxxnope');
  await page.click('#checkBtn');
  await page.waitForTimeout(200);
  const fb = await page.textContent('#feedback');
  ok(/korrekt/i.test(fb), 'Falsche Antwort zeigt korrekte Lösung');
  ok((await page.textContent('#checkBtn')).trim().startsWith('Weiter'), 'Button wechselt auf „Weiter“');

  await page.click('#tableBtn');
  await page.waitForTimeout(150);
  ok(await page.isVisible('#conjTable.open'), 'Konjugationstabelle öffnet sich');

  await page.click('#checkBtn'); // nächste Frage
  await page.waitForTimeout(150);
  ok((await page.textContent('#sTotal')) === '1', 'Statistik zählt eine Antwort');

  await page.fill('#answerInput', 'hablo');
  await page.click('#checkBtn');
  await page.waitForTimeout(150);
  const totalBefore = await page.textContent('#sTotal');
  await page.reload();
  await page.waitForTimeout(300);
  ok((await page.textContent('#sTotal')) === totalBefore, 'Statistik übersteht Reload (Persistenz)');

  ok(errors.length === 0, 'Keine JS-Fehler (hell): ' + errors.join(' | '));
  await ctx.close();

  // --- 2) Dunkel: lädt ohne Fehler ---
  ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: 'dark' });
  page = await ctx.newPage();
  const darkErrors = [];
  page.on('pageerror', e => darkErrors.push(e.message));
  await page.goto(indexUrl);
  await page.waitForTimeout(400);
  ok(darkErrors.length === 0, 'Dark Mode lädt ohne JS-Fehler');
  await ctx.close();
} finally {
  await browser.close();
}

if (fails.length) {
  console.error('\n✗ SMOKE-TEST FEHLGESCHLAGEN:');
  fails.forEach(f => console.error('  - ' + f));
  process.exit(1);
}
console.log('\n✓ Smoke-Test bestanden.');
