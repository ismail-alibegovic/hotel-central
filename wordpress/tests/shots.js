// Screenshots every page at 390 / 768 / 1440 px (full page, reduced motion so reveals are in their final state).
// Usage: node tests/shots.js [outDir] [baseUrl] [pageFilter] [widthFilter]
const { chromium } = require('playwright');
const out = process.argv[2] || 'tests/shots', base = process.argv[3] || 'http://localhost:8080', filt = process.argv[4], wf = process.argv[5];
const pages = ['en/', 'en/about/', 'en/rooms/', 'en/rooms/standard-twin-double/', 'en/spa/', 'en/restaurant/', 'en/meetings-events/', 'en/location/', 'en/contact/', 'bs/', 'bs/rooms/superior-double-room/', 'bs/contact/'];
const widths = [[1440, 900], [768, 1024], [390, 844]];
(async () => {
  const b = await chromium.launch();
  require('fs').mkdirSync(out, { recursive: true });
  for (const [w, h] of widths) {
    if (wf && +wf !== w) continue;
    const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
    const pg = await ctx.newPage();
    const errs = []; pg.on('pageerror', (e) => errs.push(e.message)); pg.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    for (const p of pages) {
      if (filt && !p.includes(filt)) continue;
      await pg.goto(`${base}/${p}`, { waitUntil: 'load' });
      await pg.waitForTimeout(400);
      await pg.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } scrollTo(0, 0); });
      await pg.waitForTimeout(400);
      await pg.screenshot({ path: `${out}/${p.replace(/\//g, '_')}${w}.png`, fullPage: true });
      const overflow = await pg.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      console.log(`${w} ${p} overflow=${overflow}`, errs.splice(0).filter((e) => !/Failed to load resource.*(google|gstatic)/i.test(e)).join(' | '));
    }
    await ctx.close();
  }
  await b.close();
})();
