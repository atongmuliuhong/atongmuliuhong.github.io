/* nav.js — 导航交互
 * 1) 汉堡按钮开合移动端抽屉
 * 2) 顶级下拉（在线查阅）点击切换展开；子菜单默认隐藏，仅点击在线查阅才显示
 * 3) 真实导航链接（红宝书 / 普通页）：移动端点击后收起抽屉
 * 4) 点击页面其它区域收起所有下拉 + 抽屉
 */
(function () {
  "use strict";

  function init() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var toggle = header.querySelector(".nav__toggle");
    var menu = header.querySelector(".nav__menu");
    if (!toggle || !menu) return;

    // 1) 汉堡按钮：切换抽屉
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // 2) 顶级下拉触发（在线查阅）：点击切换展开，关闭其它同级下拉
    menu.querySelectorAll("[data-menu]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var item = link.parentElement; // .nav__item
        var willOpen = !item.classList.contains("open");
        menu.querySelectorAll(".nav__item.has-dropdown.open").forEach(function (it) {
          if (it !== item) it.classList.remove("open");
        });
        item.classList.toggle("open", willOpen);
        link.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });
    });

    // 3) 真实导航链接（红宝书 / 普通页）：移动端点击后收起抽屉（桌面端照常跳转）
    menu.querySelectorAll("a:not([data-menu])").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // 4) 点击页面其它区域：收起所有下拉 + 抽屉
    document.addEventListener("click", function (e) {
      if (!header.contains(e.target)) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        menu.querySelectorAll(".nav__item.open").forEach(function (el) {
          el.classList.remove("open");
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
