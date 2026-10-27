/* Hotel Central — front-end behaviour (vanilla JS, no dependencies).
   Reveal / parallax / path-drawing animations, header + full-screen menu, mobile book bar,
   booking bar with range calendar (posts to the hotel's eZee booking engine), rooms carousel, contact form. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var editor = !!(window.elementorFrontend && window.elementorFrontend.isEditMode && window.elementorFrontend.isEditMode()) || /elementor-editor|elementor-preview/.test(doc.body.className);
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var h = function (tag, attrs, html) { var e = doc.createElement(tag); for (var k in attrs || {}) e.setAttribute(k, attrs[k]); if (html != null) e.innerHTML = html; return e; };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  /* ───────── Titles: overprint clones, fit, masked line reveal ───────── */
  function overprints() {
    $$('[class*="hc-op-"]').forEach(function (el) {
      var m = /hc-op-([\w-]+)/.exec(el.className); if (!m || el.dataset.opDone) return;
      el.dataset.opDone = '1';
      var clone = el.cloneNode(true);
      clone.className = clone.className.replace(/hc-op-[\w-]+/g, '').replace(/\bbase\b/, '').trim();
      var wrap = h('div', { 'class': 'hc-overprint hc-clip ' + m[1], 'aria-hidden': 'true' });
      wrap.appendChild(clone);
      el.parentNode.appendChild(wrap);
    });
  }
  function textTarget(el) { return el.querySelector('.elementor-heading-title, .elementor-widget-container > p, p, h1, h2, h3') || el; }
  function fit(el) {
    var m = el.getAttribute('data-fit'), c = /hc-fit-(\d+)-(\d+)/.exec(el.className);
    var measure = 90, max = 13;
    if (m) { var p = m.split(','); measure = +p[0]; max = +p[1]; } else if (c) { measure = +c[1]; max = +c[2]; } else return;
    var t = textTarget(el), lines = t.innerHTML.split(/<br\s*\/?>/i).map(function (s) { return s.replace(/<[^>]+>/g, '').trim(); });
    var longest = Math.max.apply(null, lines.map(function (l) { return l.length; }).concat(1));
    el.style.setProperty('--fs-m', Math.min(max, measure / (longest * 0.68)).toFixed(2) + 'vw');
  }
  function splitLines(el) {
    var t = textTarget(el), link = t.querySelector('a'), host = link || t;
    var parts = host.innerHTML.split(/<br\s*\/?>/i), base = parseFloat(el.getAttribute('data-delay') || getComputedStyle(el).getPropertyValue('--d')) || 0;
    host.innerHTML = '';
    parts.forEach(function (p, i) {
      var l = h('span', { 'class': 'hc-line' }), s = h('span', null, p.trim());
      s.style.setProperty('--d', (base + i * 0.12) + 's'); s.style.transitionDelay = (base + i * 0.12) + 's';
      l.appendChild(s); host.appendChild(l);
    });
    el.classList.add('is-ready');
  }

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 }) : null;
  function reveal(el, immediate) {
    if (reduce || !io || editor) { el.classList.add('is-in'); return; }
    if (immediate) setTimeout(function () { el.classList.add('is-in'); }, 60); else io.observe(el);
  }

  function initMotion() {
    overprints();
    $$('[data-fit], [class*="hc-fit-"]').forEach(fit);
    $$('.hc-lines').forEach(function (el) {
      if (el.classList.contains('is-ready')) return;
      splitLines(el); reveal(el, el.hasAttribute('data-immediate') || el.classList.contains('hc-immediate'));
    });
    $$('.hc-fade, .hc-reveal, .hc-deco').forEach(function (el) { reveal(el, el.hasAttribute('data-immediate') || el.classList.contains('hc-immediate')); });
  }

  /* Parallax: photo drifts ±amp % inside its frame (scale hides the edges) */
  var pars = [];
  function initPar() {
    pars = $$('.hc-par, [class*="hc-par-"]').map(function (el) {
      var m = /hc-par-(\d+)/.exec(el.className), amp = el.dataset.par ? +el.dataset.par : m ? +m[1] : 0, img = $('img', el);
      return amp && img ? { el: el, img: img, amp: amp } : null;
    }).filter(Boolean);
    if (reduce || !pars.length || editor) return;
    var tick = false, run = function () {
      tick = false; var vh = innerHeight;
      pars.forEach(function (p) {
        var r = p.el.getBoundingClientRect(); if (r.bottom < -50 || r.top > vh + 50) return;
        var prog = (vh - r.top) / (vh + r.height); var y = (-p.amp + 2 * p.amp * prog);
        p.img.style.transform = 'translate3d(0,' + y.toFixed(2) + '%,0) scale(' + (1 + p.amp * 2.4 / 100).toFixed(3) + ')';
      });
    };
    addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(run); } }, { passive: true });
    addEventListener('resize', run); run();
  }

  /* ───────── Header, full-screen menu, mobile book bar ───────── */
  function initChrome() {
    var header = $('#hc-header'), btn = $('[data-menu-btn]'), menu = $('[data-menu]'), label = $('[data-menu-label]'), bar = $('[data-bookbar]');
    var open = false;
    function solid() { header.classList.toggle('is-solid', scrollY > 40 && !open); }
    function set(v) {
      open = v; menu.classList.toggle('is-open', v); header.classList.toggle('menu-open', v); btn.classList.toggle('menu-open', v);
      btn.setAttribute('aria-expanded', v); label.textContent = v ? label.dataset.open : label.dataset.closed; root.classList.toggle('menu-lock', v); solid();
      if (v) setTimeout(function () { var a = $('nav a', menu); a && a.focus(); }, 450); else btn.focus();
    }
    btn.addEventListener('click', function () { set(!open); });
    $$('nav a', menu).forEach(function (a) {
      a.addEventListener('click', function () { if (open) set(false); });
      var show = function () { var f = a.dataset.preview; $$('.hc-menu__preview img', menu).forEach(function (i) { i.classList.toggle('is-on', i.dataset.img === f); }); };
      a.addEventListener('mouseenter', show); a.addEventListener('focus', show);
    });
    doc.addEventListener('keydown', function (e) {
      if (!open) return;
      if (e.key === 'Escape') set(false);
      if (e.key === 'Tab') {
        var f = $$('[data-menu-btn], .hc-menu a[href], .hc-menu button').filter(function (x) { return x.offsetParent !== null || x === btn; }); if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    addEventListener('scroll', function () {
      solid();
      if (bar) { var nearEnd = innerHeight + scrollY > root.scrollHeight - 520; bar.classList.toggle('is-on', scrollY > innerHeight * 0.85 && !nearEnd); }
    }, { passive: true });
    solid();
  }

  /* ───────── Booking bar + range calendar ───────── */
  function initBookingBar(el) {
    var cfg = JSON.parse(el.dataset.config), t = cfg.t, form = $('form', el);
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var st = { start: null, end: null, rooms: 1, adults: 2, children: 0, panel: null, hint: false, view: new Date(today.getFullYear(), today.getMonth(), 1), hover: null };
    var fmt = new Intl.DateTimeFormat(cfg.locale, { day: 'numeric', month: 'short' });
    var desktop = function () { return matchMedia('(min-width:1024px)').matches; };
    var ez = function (d) { return pad(d.getDate()) + '-' + pad(d.getMonth() + 1) + '-' + d.getFullYear(); };
    var nights = function () { return st.start && st.end ? Math.round((st.end - st.start) / 864e5) : 0; };
    var panelEl = null, scrim = null;

    function values() {
      var d = st.start && st.end ? fmt.format(st.start) + ' — ' + fmt.format(st.end) : st.start ? fmt.format(st.start) + ' — …' : t.dates;
      $('[data-v=dates]', el).textContent = d;
      $('[data-v=rooms]', el).textContent = st.rooms + ' ' + (st.rooms === 1 ? t.room : t.roomsPlural);
      $('[data-v=guests]', el).textContent = st.adults + ' / ' + st.children;
      var set = function (n, v) { form.elements[n].value = v; };
      set('eZ_chkin', st.start ? ez(st.start) : ''); set('eZ_chkout', st.end ? ez(st.end) : ''); set('eZ_Nights', nights() || '');
      set('eZ_adult', st.adults); set('eZ_child', st.children); set('eZ_room', st.rooms);
    }
    function close() {
      st.panel = null; if (panelEl) { panelEl.remove(); panelEl = null; } if (scrim) { scrim.remove(); scrim = null; }
      $$('.hc-bb__field', el).forEach(function (f) { f.setAttribute('aria-expanded', 'false'); });
    }
    function stepper(label, key, min, max, hint) {
      var row = h('div', { 'class': 'hc-step' }, '<div><p class="hc-label">' + label + '</p></div><div class="hc-step__btns"><button type="button" aria-label="' + label + ' −" data-d="-1"><span aria-hidden="true">−</span></button><output aria-live="polite">' + st[key] + '</output><button type="button" aria-label="' + label + ' +" data-d="1"><span aria-hidden="true">+</span></button></div>');
      var out = $('output', row), mn = $('[data-d="-1"]', row), mx = $('[data-d="1"]', row);
      var sync = function () { out.textContent = st[key]; mn.disabled = st[key] <= min; mx.disabled = st[key] >= max; values(); };
      mn.addEventListener('click', function () { st[key] = Math.max(min, st[key] - 1); sync(); });
      mx.addEventListener('click', function () { st[key] = Math.min(max, st[key] + 1); sync(); });
      sync(); return row;
    }
    function calendar() {
      var wrap = h('div', { 'class': 'hc-cal' }), months = desktop() ? 2 : 1;
      var minView = new Date(today.getFullYear(), today.getMonth(), 1);
      function draw() {
        var v = st.view; wrap.innerHTML = '';
        var nav = h('div', { 'class': 'hc-cal__nav' }, '<button type="button" data-p aria-label="' + t.prevMonth + '"' + (v <= minView ? ' disabled' : '') + '>' + '<svg viewBox="0 0 22 9" width="22" height="9" fill="none"><path d="M22 4.5H1.5M5 1L1.2 4.5 5 8" stroke="currentColor" stroke-width=".9"/></svg></button><button type="button" data-n aria-label="' + t.nextMonth + '"><svg viewBox="0 0 22 9" width="22" height="9" fill="none"><path d="M0 4.5h20.5M17 1l3.8 3.5L17 8" stroke="currentColor" stroke-width=".9"/></svg></button>');
        $('[data-p]', nav).addEventListener('click', function () { st.view = new Date(v.getFullYear(), v.getMonth() - 1, 1); draw(); });
        $('[data-n]', nav).addEventListener('click', function () { st.view = new Date(v.getFullYear(), v.getMonth() + 1, 1); draw(); });
        wrap.appendChild(nav);
        var grid = h('div', { 'class': 'hc-cal__months' });
        for (var m = 0; m < months; m++) {
          var d0 = new Date(v.getFullYear(), v.getMonth() + m, 1), mon = h('div'), days = h('div', { 'class': 'hc-cal__grid', role: 'grid' });
          mon.appendChild(h('p', { 'class': 'hc-label hc-cal__title', 'aria-live': 'polite' }, t.months[d0.getMonth()] + ' ' + d0.getFullYear()));
          t.weekdays.forEach(function (w) { days.appendChild(h('span', { 'class': 'wd hc-label-sm', role: 'columnheader' }, w)); });
          var lead = (d0.getDay() + 6) % 7; for (var i = 0; i < lead; i++) days.appendChild(h('span'));
          var count = new Date(d0.getFullYear(), d0.getMonth() + 1, 0).getDate();
          for (var n = 1; n <= count; n++) (function (day) {
            var dt = new Date(d0.getFullYear(), d0.getMonth(), day), btn = h('button', { type: 'button', 'class': 'hc-cal__day', 'aria-label': dt.toDateString() }, '<span>' + day + '</span>');
            var past = dt < today; if (past) btn.disabled = true;
            var isS = st.start && +dt === +st.start, isE = st.end && +dt === +st.end, endv = st.end || (st.start && st.hover && st.hover > st.start ? st.hover : null);
            if (isS || isE) btn.classList.add('is-edge');
            if (st.start && endv && dt > st.start && dt < endv) btn.classList.add('in-range');
            if (isS && endv) btn.classList.add('is-start'); if (endv && +dt === +endv) btn.classList.add('is-end');
            btn.addEventListener('click', function () {
              st.hint = false;
              if (!st.start || st.end) { st.start = dt; st.end = null; } else if (dt <= st.start) { st.start = dt; } else { st.end = dt; }
              values(); renderPanel();
            });
            btn.addEventListener('mouseenter', function () { if (st.start && !st.end) { st.hover = dt; paintHover(); } });
            days.appendChild(btn);
          })(n);
          mon.appendChild(days); grid.appendChild(mon);
        }
        wrap.appendChild(grid);
      }
      function paintHover() { draw(); }
      draw(); return wrap;
    }
    function renderPanel() {
      var p = st.panel; if (!p) return; var keepScroll = panelEl && panelEl.scrollTop;
      if (panelEl) panelEl.remove();
      panelEl = h('div', { 'class': 'hc-bb__panel', 'data-panel': p, role: 'dialog', 'aria-label': t[p === 'guests' ? 'guests' : p] });
      if (p === 'dates') {
        var n = nights();
        var head = h('div', { 'class': 'hc-bb__head' }, '<p class="hc-label ' + (st.hint ? 'hc-bb__hint' : 'op-75') + '">' + (n ? n + ' ' + (n === 1 ? t.night : t.nightsPlural) : t.selectDates) + '</p><div class="acts hc-label"><button type="button" class="hc-link-line op-75" data-clear>' + t.clear + '</button><button type="button" class="hc-link-line" data-done>' + t.done + '</button></div>');
        $('[data-clear]', head).addEventListener('click', function () { st.start = st.end = null; values(); renderPanel(); });
        $('[data-done]', head).addEventListener('click', function () { if (st.end) open('guests'); else close(); });
        panelEl.appendChild(head); panelEl.appendChild(calendar());
      } else {
        if (p === 'rooms') panelEl.appendChild(stepper(t.rooms, 'rooms', 1, cfg.maxRooms));
        else { panelEl.appendChild(stepper(t.adults, 'adults', 1, cfg.maxAdults)); panelEl.appendChild(stepper(t.children, 'children', 0, cfg.maxChildren)); }
        var foot = h('div', { 'class': 'hc-bb__foot' }, '<button type="button" class="hc-label hc-link-line">' + t.done + '</button>'); $('button', foot).addEventListener('click', close); panelEl.appendChild(foot);
      }
      el.appendChild(panelEl); if (keepScroll) panelEl.scrollTop = keepScroll;
    }
    function open(p) {
      var wasOpen = st.panel; close(); if (wasOpen === p) return;
      st.panel = p; $$('.hc-bb__field', el).forEach(function (f) { f.setAttribute('aria-expanded', f.dataset.panel === p ? 'true' : 'false'); });
      if (!desktop()) { scrim = h('div', { 'class': 'hc-bb__scrim' }); scrim.addEventListener('click', close); el.appendChild(scrim); }
      renderPanel();
    }
    $$('.hc-bb__field', el).forEach(function (f) { f.addEventListener('click', function () { open(f.dataset.panel); }); });
    $('[data-go]', el).addEventListener('click', function () {
      if (!st.start || !st.end) { st.hint = true; st.panel = null; open('dates'); return; }
      values(); form.submit();
    });
    doc.addEventListener('pointerdown', function (e) { if (st.panel && !el.contains(e.target)) close(); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && st.panel) close(); });
    values();
  }

  /* ───────── Rooms carousel ───────── */
  function initCarousel(sec) {
    var rooms = JSON.parse(sec.dataset.rooms), n = rooms.length, i = 0, busy = false;
    var frame = $('[data-frame]', sec), layers = $$('.hc-rc__layer', sec), live = $('[data-live]', sec);
    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
    var layerHTML = function (r) { return '<p class="hc-rc__feat"><span>' + esc(r.feature) + '</span></p><div class="hc-rc__name">' + r.lines.map(function (l) { return '<span class="ln"><span>' + esc(l) + '</span></span>'; }).join('') + '</div>'; };
    var amenHTML = function (r) { return '<ul class="hc-rc__list">' + r.list.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul>'; };
    function swapText(r, dir) {
      layers.forEach(function (L) { L.style.setProperty('--out', dir >= 0 ? '-110%' : '110%'); L.style.setProperty('--in', dir >= 0 ? '110%' : '-110%'); L.classList.add('is-swapping'); });
      $$('[data-meta],[data-amen],[data-mamen],[data-mmeta]', sec).forEach(function (x) { x.classList.add('hc-rc__fadeswap', 'is-out'); });
      setTimeout(function () {
        layers.forEach(function (L) {
          L.style.setProperty('--fs-d', r.fsD); L.style.setProperty('--fs-m', r.fsM); L.innerHTML = layerHTML(r);
          L.classList.remove('is-swapping'); L.classList.add('is-prep'); void L.offsetWidth; L.classList.remove('is-prep');
          $$('.ln > span, .hc-rc__feat > span', L).forEach(function (s, k) { s.style.transitionDelay = (0.35 + k * 0.09) + 's'; });
        });
        $$('[data-idx]', sec).forEach(function (x) { x.textContent = pad(i + 1); });
        $$('[data-meta]', sec).forEach(function (x) { x.innerHTML = esc(r.name) + '<br>' + esc(r.size); });
        $$('[data-mmeta]', sec).forEach(function (x) { x.textContent = r.name + ' · ' + r.size; });
        $$('[data-amen],[data-mamen]', sec).forEach(function (x) { x.innerHTML = amenHTML(r); });
        $$('[data-book]', sec).forEach(function (a) { a.href = r.book; }); $$('[data-view]', sec).forEach(function (a) { a.href = r.url; });
        $$('.hc-rc__fadeswap', sec).forEach(function (x) { x.classList.remove('is-out'); });
        live.textContent = r.name + ', ' + pad(i + 1) + ' / ' + pad(n);
      }, reduce ? 0 : 550);
    }
    function go(d) {
      if (busy) return; busy = true; i = (i + d + n) % n; var r = rooms[i];
      var s = h('div', { 'class': 'hc-rc__slide is-enter' + (d < 0 ? ' rev' : '') }, '<img src="' + esc(r.img) + '" alt="' + esc(r.alt) + '" style="object-position:' + esc(r.pos) + '">');
      var old = $$('.hc-rc__slide', frame); frame.appendChild(s);
      swapText(r, d);
      setTimeout(function () { old.forEach(function (o) { o.remove(); }); s.classList.remove('is-enter'); busy = false; }, reduce ? 50 : 1300);
    }
    $$('[data-next]', sec).forEach(function (b) { b.addEventListener('click', function () { go(1); }); });
    $$('[data-prev]', sec).forEach(function (b) { b.addEventListener('click', function () { go(-1); }); });
    var sx = null;
    frame.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') sx = { x: e.clientX, y: e.clientY }; });
    frame.addEventListener('pointerup', function (e) { if (!sx) return; var dx = e.clientX - sx.x, dy = e.clientY - sx.y; sx = null; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1); });
  }

  /* ───────── Contact form ───────── */
  function initForm(form) {
    var cfg = JSON.parse(form.dataset.config), t = cfg.t, status = $('[data-status]', form), btn = $('button[type=submit]', form);
    $$('input,textarea', form).forEach(function (f) { f.addEventListener('input', function () { f.closest('.f') && f.closest('.f').classList.toggle('has-v', !!f.value); }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form), p = { name: fd.get('name') || '', email: fd.get('email') || '', phone: fd.get('phone') || '', subject: fd.get('subject') || '', message: fd.get('message') || '', consent: fd.get('consent') === 'on', company: fd.get('company') || '', locale: cfg.lang };
      var errs = {};
      if (p.name.trim().length < 2) errs.name = 1; if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(p.email.trim())) errs.email = 1; if (p.message.trim().length < 10) errs.message = 1; if (!p.consent) errs.consent = 1;
      $$('[data-err]', form).forEach(function (x) { var k = x.dataset.err; x.hidden = !errs[k]; x.textContent = errs[k] ? t[k] : ''; });
      status.textContent = ''; status.style.color = '';
      var firstErr = Object.keys(errs)[0]; if (firstErr) { var f = form.elements[firstErr]; f && f.focus(); return; }
      btn.disabled = true; btn.firstElementChild.textContent = t.sending;
      fetch(cfg.rest, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, status: r.status, j: j }; }); }).then(function (r) {
        if (r.ok) { form.reset(); $$('.has-v', form).forEach(function (x) { x.classList.remove('has-v'); }); status.textContent = t.success; }
        else { status.style.color = '#8b2c1f'; status.textContent = r.status === 503 ? t.unavailable : t.generic; }
      }).catch(function () { status.style.color = '#8b2c1f'; status.textContent = t.generic; }).then(function () { btn.disabled = false; btn.firstElementChild.textContent = t.send; });
    });
  }

  function init() {
    initMotion(); initPar(); initChrome();
    $$('[data-hc-bb]').forEach(initBookingBar); $$('[data-hc-rc]').forEach(initCarousel); $$('[data-hc-form]').forEach(initForm);
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init); else init();
  // Elementor live preview re-renders widgets: re-run the light-weight parts
  addEventListener('elementor/frontend/init', function () { root.classList.remove('hc-js'); });
})();
