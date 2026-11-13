// Visual QA capture: the same pages, viewports and states from any of the three implementations
// (original Next.js `main`, the 13 Nov Round 1 Next.js build, and this WordPress site).
// Usage: node tests/qa-capture.js <outDir> <baseUrl> <label> [pageFilter] [widthFilter]
// Pages that do not exist on a given implementation (404) are skipped and reported.
const { chromium } = require('playwright');
const fs = require('fs');
const [out = 'qa', base = 'http://localhost:8080', label = 'wp', filt, wf] = process.argv.slice(2);
const pages = [
  'en/', 'en/rooms/', 'en/rooms/single-room/', 'en/rooms/presidential-suite/', 'en/about/', 'en/about/cafe/',
  'en/centralfitnessclub/', 'en/centralfitnessclub/membership/', 'en/centralfitnessclub/timetable/', 'en/dayspa/',
  'en/conference/', 'en/location/', 'en/contact/', 'bs/', 'bs/dayspa/', 'bs/centralfitnessclub/',
];
const widths = [[1440, 900], [768, 1024], [390, 844]];
const slug = (p) => p.replace(/\/$/, '').replace(/\//g, '_') || 'root';
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
  for (const [w, h] of widths) {
    if (wf && +wf !== w) continue;
    const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
    const pg = await ctx.newPage();
    const errs = []; pg.on('pageerror', (e) => errs.push(e.message));
    for (const p of pages) {
      if (filt && !p.includes(filt)) continue;
      const res = await pg.goto(`${base}/${p}`, { waitUntil: 'load' }).catch((e) => ({ status: () => 'ERR ' + e.message }));
      const st = res && res.status();
      if (st !== 200) { console.log(`${label} ${w} ${p} -> ${st} (skipped)`); continue; }
      await pg.waitForTimeout(500);
      await pg.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } scrollTo(0, 0); });
      await pg.waitForTimeout(600);
      const f = `${out}/${label}_${slug(p)}_${w}`;
      await pg.screenshot({ path: `${f}_full.png`, fullPage: true });
      await pg.screenshot({ path: `${f}_top.png` });
      // footer: last <footer> scrolled into view
      const foot = pg.locator('footer').last();
      if (await foot.count()) { await foot.scrollIntoViewIfNeeded(); await pg.waitForTimeout(300); await foot.screenshot({ path: `${f}_footer.png` }).catch(() => {}); }
      // menu open (first page of each width only)
      if (p === 'en/' || p === 'en/dayspa/' || p === 'en/centralfitnessclub/') {
        await pg.evaluate(() => scrollTo(0, 0)); await pg.waitForTimeout(300);
        const btn = pg.locator('button[aria-label*="enu" i], button[aria-controls*="menu" i], .hc-burger, [data-menu-toggle]').filter({ visible: true }).first();
        if (await btn.count()) { await btn.click(); await pg.waitForTimeout(1200); await pg.screenshot({ path: `${f}_menu.png` }); await pg.keyboard.press('Escape'); await pg.waitForTimeout(500); }
        else console.log(`${label} ${w} ${p}: no menu button found`);
      }
      const overflow = await pg.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      console.log(`${label} ${w} ${p} ok overflow=${overflow}${errs.length ? ' errors: ' + errs.splice(0).join(' | ') : ''}`);
    }
    await ctx.close();
  }
  await b.close();
})();
