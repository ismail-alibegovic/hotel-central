// Side-by-side evidence sheets: the same element from original main, 13 Nov and WordPress, located by role/content (not by pixel offsets).
// Usage: node tests/qa-sheets.js <outDir> <mainUrl> <nov13Url> <wpUrl>   (ONLY=name1,name2 to regenerate some sheets)     (needs python3 + Pillow for the composition)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const [out, ...bases] = process.argv.slice(2); const labels = ['1-original-main', '2-nov13', '3-wordpress'];
fs.mkdirSync(out, { recursive: true });
const shots = [ // name, path, width, height, how to find it
  ['header-hero', '/en/', 1440, 900, 'viewport'],
  ['menu-open', '/en/', 1440, 900, 'menu'],
  ['rooms-carousel', '/en/', 1440, 900, (p) => p.locator('[aria-roledescription="carousel"]').first()],
  ['club-spa', '/en/', 1440, 900, (p) => p.locator('section, .e-con', { hasText: /A moment/i }).filter({ has: p.locator('img') }).first()],
  ['footer', '/en/', 1440, 900, (p) => p.locator('footer').last()],
  ['mobile-header', '/en/', 390, 844, 'viewport'],
  ['mobile-menu', '/en/', 390, 844, 'menu'],
  ['mobile-footer', '/en/', 390, 844, (p) => p.locator('footer').last()],
  ['tablet-home', '/en/', 768, 1024, 'viewport'],
  ['room-page', '/en/rooms/single-room/', 1440, 900, 'viewport'],
  ['fitness-club', '/en/centralfitnessclub/', 1440, 900, 'viewport'],
  ['day-spa', '/en/dayspa/', 1440, 900, 'viewport'],
  ['day-spa-prices', '/en/dayspa/', 1440, 900, (p) => p.locator('#treatments, section', { hasText: /Treatments/ }).filter({ hasText: /Reflexology/ }).last()],
  ['mobile-fitness-club', '/en/centralfitnessclub/', 390, 844, 'viewport'],
  ['cafe', '/en/about/cafe/', 1440, 900, 'viewport'],
  ['contact', '/en/contact/', 1440, 900, 'full'],
];
(async () => {
  const b = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
  const only = (process.env.ONLY || '').split(',').filter(Boolean);
  for (const [name, url, w, h, how] of shots) {
    if (only.length && !only.includes(name)) continue;
    const files = [];
    for (let i = 0; i < bases.length; i++) {
      const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
      const f = path.join(out, `${name}__${labels[i]}.png`);
      const r = await p.goto(bases[i] + url).catch(() => null);
      if (!r || r.status() !== 200) { console.log(`${name} ${labels[i]}: ${r ? r.status() : 'error'} (page does not exist there)`); await ctx.close(); continue; }
      await p.waitForTimeout(600);
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } scrollTo(0, 0); });
      await p.waitForTimeout(700);
      try {
        if (how === 'viewport') await p.screenshot({ path: f });
        else if (how === 'full') await p.screenshot({ path: f, fullPage: true });
        else if (how === 'menu') { await p.locator('[data-menu-btn], button[aria-label*="enu" i], button[aria-controls*="menu" i], .hc-burger, [data-menu-toggle]').filter({ visible: true }).first().click(); await p.waitForTimeout(1400); await p.screenshot({ path: f }); }
        else { const el = how(p); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(500); await p.evaluate(() => document.querySelectorAll('header, .hc-header, [data-bookbar], .hc-bookbar').forEach((e) => e.style.setProperty('visibility', 'hidden', 'important'))); await el.screenshot({ path: f }); }
        files.push(f);
      } catch (e) { console.log(`${name} ${labels[i]}: ${e.message.split('\n')[0]}`); }
      await ctx.close();
    }
    if (files.length) execFileSync('python3', ['-I', path.join(__dirname, 'qa-sheet.py'), path.join(out, `${name}.png`), ...files]);
    console.log(`${name}: ${files.length} captured`);
  }
  await b.close();
})();
