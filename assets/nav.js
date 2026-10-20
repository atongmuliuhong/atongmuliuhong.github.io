/* nav.js — 菜单按钮交互（汉堡开关 + 点击收起）
 * 用法：<script src="assets/nav.js"></script> 放在 </body> 前
 * 依赖：.nav__toggle 按钮 + .nav__menu 导航，CSS 已处理移动端抽屉动画
 */
(function () {
  "use strict";

  function init() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var toggle = header.querySelector(".nav__toggle");
    var menu = header.querySelector(".nav__menu");
    if (!toggle || !menu) return;

    // 点击汉堡按钮：切换菜单 + 更新 aria-expanded
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // 点击菜单项：自动收起抽屉
    var links = menu.querySelectorAll(".nav__link");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // 点击页面任意其他位置：收起抽屉
    document.addEventListener("click", function (e) {
      if (!header.contains(e.target)) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // DOM 就绪后执行
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();