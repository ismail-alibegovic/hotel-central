/* Hotel Central theme: header state on scroll, the menu (open/close, Escape, focus), nothing else. */
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
