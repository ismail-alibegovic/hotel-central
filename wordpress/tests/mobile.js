// Mobile (390px) navigation + booking experience. Usage: node tests/mobile.js [baseUrl] [shotDir]
const { chromium, devices } = require('playwright');
const base = process.argv[2] || 'http://localhost:8080', out = process.argv[3] || 'tests/evidence';
let fails = 0; const ok = (n, c, d = '') => { if (!c) fails++; console.log((c ? 'PASS ' : 'FAIL ') + n + (d ? ' — ' + d : '')); };
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ ...devices['iPhone 13'], viewport: { width: 390, height: 844 }, locale: 'en-GB' }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await ctx.route('**/live.ipms247.com/**', (r) => r.fulfill({ status: 200, body: 'ok' }));
  await p.goto(base + '/en/'); await p.waitForTimeout(2500);
  // menu
  await p.tap('[data-menu-btn]'); await p.waitForTimeout(1300);
  ok('menu open (aria-expanded)', await p.getAttribute('[data-menu-btn]', 'aria-expanded') === 'true');
  const links = await p.$$eval('#site-menu nav a', (a) => a.map((x) => { const r = x.getBoundingClientRect(); return [r.height, r.bottom <= innerHeight + 400]; }));
  ok('8 menu links, all ≥ 40px tall', links.length === 8 && links.every((l) => l[0] >= 40), JSON.stringify(links.map((l) => Math.round(l[0]))));
  ok('page scroll locked while menu open', await p.evaluate(() => getComputedStyle(document.documentElement).overflow === 'hidden'));
  await p.screenshot({ path: out + '/mobile-menu-390.png' });
  await p.evaluate(() => document.querySelector('#site-menu').scrollTo(0, 9999)); await p.waitForTimeout(300);
  ok('language switch + Book now reachable in menu', await p.locator('#site-menu .hc-lang a[hreflang=bs]').isVisible() && await p.locator('#site-menu a.hc-pill').isVisible());
  await p.tap('#site-menu nav a >> nth=3'); await p.waitForURL(/\/en\/spa\/$/); ok('menu link navigates (Club & Spa)', /\/en\/spa\//.test(p.url()));
  // BS from menu
  await p.tap('[data-menu-btn]'); await p.waitForTimeout(1200); await p.evaluate(() => document.querySelector('#site-menu').scrollTo(0, 9999)); await p.tap('#site-menu .hc-lang a[hreflang=bs]'); await p.waitForURL(/\/bs\/spa\/$/);
  ok('language switch from menu keeps page', /\/bs\/spa\/$/.test(p.url()));
  // booking sheet
  await p.goto(base + '/en/'); await p.waitForTimeout(2500);
  await p.tap('.hc-bb__field[data-panel=dates]'); await p.waitForSelector('.hc-bb__panel');
  const box = await p.$eval('.hc-bb__panel', (e) => { const r = e.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.right), Math.round(r.bottom), innerHeight, getComputedStyle(e).position]; });
  ok('dates panel is a full-width bottom sheet', box[0] === 0 && box[1] === 390 && box[2] >= box[3] - 2 && box[4] === 'fixed', JSON.stringify(box));
  ok('one month shown on mobile', (await p.$$('.hc-bb__panel .hc-cal__months > div')).length === 1);
  const dayH = await p.$eval('.hc-bb__panel .hc-cal__day:not(:disabled)', (e) => e.getBoundingClientRect().height); ok('calendar day tap target ≥ 40px', dayH >= 40, dayH + 'px');
  await p.screenshot({ path: out + '/mobile-booking-dates-390.png' });
  await p.locator('.hc-bb__panel .hc-cal__day:not(:disabled)').nth(0).tap(); await p.locator('.hc-bb__panel .hc-cal__day:not(:disabled)').nth(3).tap();
  ok('range selected → nights', /3 nights/.test(await p.textContent('.hc-bb__head')));
  await p.tap('.hc-bb__panel [data-done]'); await p.waitForSelector('.hc-bb__panel[data-panel=guests]');
  await p.tap('.hc-bb__panel [data-d="1"] >> nth=0'); await p.tap('.hc-bb__panel [data-d="1"] >> nth=1'); ok('guests panel opens after Done, steppers work', (await p.textContent('[data-v=guests]')) === '3 / 1');
  await p.screenshot({ path: out + '/mobile-booking-guests-390.png' });
  await p.tap('.hc-bb__scrim', { position: { x: 200, y: 200 } }); await p.waitForTimeout(300); ok('scrim tap closes sheet', (await p.$('.hc-bb__panel')) === null);
  const [pop] = await Promise.all([ctx.waitForEvent('page', { timeout: 6000 }).catch(() => null), p.tap('[data-go]')]);
  ok('Let\'s go opens eZee in a new tab', !!pop && /ipms247/.test(pop.url()), pop && pop.url());
  const f = await p.$eval('.hc-bb form', (f) => Object.fromEntries(new FormData(f))); ok('eZee fields carried', f.eZ_Nights === '3' && f.eZ_adult === '3' && f.eZ_child === '1', JSON.stringify(f));
  // go without dates → opens dates + hint
  await p.goto(base + '/en/'); await p.waitForTimeout(2000); await p.tap('[data-go]'); await p.waitForSelector('.hc-bb__panel[data-panel=dates]'); ok('Let\'s go without dates opens the calendar with a hint', await p.$('.hc-bb__hint') !== null);
  // sticky book bar
  await p.goto(base + '/en/about/'); await p.waitForTimeout(1500);
  const barOn = async () => p.$eval('[data-bookbar]', (e) => e.classList.contains('is-on'));
  ok('book bar hidden at top', !(await barOn()));
  await p.evaluate(() => scrollTo(0, 1500)); await p.waitForTimeout(700); ok('book bar appears after scrolling past the hero', await barOn());
  ok('book bar has tel: link and booking link', await p.$('[data-bookbar] a[href^="tel:"]') !== null && await p.$('[data-bookbar] a[href*="ipms247"]') !== null);
  await p.screenshot({ path: out + '/mobile-bookbar-390.png' });
  await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(700); ok('book bar hides near the footer', !(await barOn()));
  ok('no horizontal scroll', await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  ok('no JS errors', errs.length === 0, errs.join('|'));
  await b.close(); process.exit(fails ? 1 : 0);
})();
