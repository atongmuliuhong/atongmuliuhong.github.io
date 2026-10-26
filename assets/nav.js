/* nav.js — 导航交互
 * 1) 汉堡按钮开合移动端抽屉
 * 2) 顶级下拉（在线查阅）点击切换展开
 * 3) 二级项（离婚红宝书）点击切换孙菜单
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

    // 2) 顶级下拉触发（在线查阅）
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

    // 3) 二级触发（离婚红宝书 → 孙菜单）
    menu.querySelectorAll("[data-sub]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var sub = link.parentElement; // .nav__subitem
        var willOpen = !sub.classList.contains("open");
        menu.querySelectorAll(".nav__subitem.has-subsub.open").forEach(function (it) {
          if (it !== sub) it.classList.remove("open");
        });
        sub.classList.toggle("open", willOpen);
        link.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });
    });

    // 4) 真实导航链接（章节 / 普通页）：移动端点击后收起抽屉
    menu.querySelectorAll("a:not([data-menu]):not([data-sub])").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // 5) 点击页面其它区域：收起所有下拉 + 抽屉
    document.addEventListener("click", function (e) {
      if (!header.contains(e.target)) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        menu.querySelectorAll(".nav__item.open, .nav__subitem.open").forEach(function (el) {
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
