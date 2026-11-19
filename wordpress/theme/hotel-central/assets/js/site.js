/* Hotel Central theme: header state on scroll, the menu (open/close, Escape, focus), the spa price list on phones. */
(function () {
  // Day Spa price list: on phones each category folds open on tap (the first one starts open), so the
  // page is not 60 rows long. Not in the Elementor editor, where every row must stay editable.
  if (document.body.classList.contains("elementor-editor-active")) return;
  if (!window.matchMedia("(max-width: 767px)").matches) return;
  document.querySelectorAll(".ds-pricecat").forEach(function (cat, i) {
    var title = cat.querySelector(".ds-pricecat__title .elementor-heading-title");
    if (!title) return;
    var set = function (open) {
      cat.classList.toggle("is-collapsed", !open);
      title.setAttribute("aria-expanded", String(open));
    };
    title.setAttribute("role", "button");
    title.setAttribute("tabindex", "0");
    set(i === 0);
    var toggle = function () { set(cat.classList.contains("is-collapsed")); };
    title.addEventListener("click", toggle);
    title.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
  });
})();

(function () {
  var header = document.querySelector("[data-hc-header]");
  if (!header) return;
  // Pages that do not open with a dark photo hero (privacy policy, a new page) get the solid header from the start.
  var first = document.querySelector(".elementor > .e-con");
  var solid = !first || !first.matches(".hc-hero, .ds-hero, .cfc-hero");
  var onScroll = function () {
    header.classList.toggle("is-scrolled", solid || window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var toggle = header.querySelector("[data-hc-menu-toggle]");
  var menu = header.querySelector("[data-hc-menu]");
  if (!toggle || !menu) return;
  var label = toggle.querySelector("[data-open]");
  var set = function (open) {
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    header.classList.toggle("is-open", open);
    document.documentElement.classList.toggle("hc-no-scroll", open);
    if (label) label.textContent = open ? label.dataset.close : label.dataset.open;
    if (open) {
      var first = menu.querySelector("a");
      if (first) first.focus();
    }
  };
  toggle.addEventListener("click", function () {
    set(menu.hidden);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !menu.hidden) {
      set(false);
      toggle.focus();
    }
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) set(false);
  });
})();
