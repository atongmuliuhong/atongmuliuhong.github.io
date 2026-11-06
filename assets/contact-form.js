// assets/contact-form.js
// 拦截咨询表单提交，POST 到 /api/contact，内联显示成功/失败状态。
// 兼容 contact.html 与 index.html 两处同结构表单（class="contact-form"）。
// A4 改进：发送失败时不清空表单，并提供「复制填写内容」按钮，避免内容丢失。
(function () {
  var form = document.querySelector("form.contact-form");
  if (!form) return;

  // 注入 honeypot 隐藏字段（机器人常会填）
  if (!form.querySelector('input[name="company"]')) {
    var hp = document.createElement("input");
    hp.type = "text";
    hp.name = "company";
    hp.tabIndex = -1;
    hp.autocomplete = "off";
    hp.setAttribute("aria-hidden", "true");
    hp.style.position = "absolute";
    hp.style.left = "-9999px";
    hp.style.width = "1px";
    hp.style.height = "1px";
    form.appendChild(hp);
  }

  // 失败时的「复制填写内容」按钮（懒创建）
  var copyBtn = null;
  function ensureCopyBtn() {
    if (copyBtn) return copyBtn;
    copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.textContent = "复制填写内容";
    copyBtn.style.cssText = "margin-top:.7rem;padding:.5em 1.1em;font-size:.9rem;border:1px solid rgba(138,165,191,.6);background:#fff;border-radius:8px;color:#475569;cursor:pointer;";
    copyBtn.addEventListener("click", function () {
      var g = function (n) {
        var el = form.querySelector('[name="' + n + '"]');
        return el ? el.value.trim() : "";
      };
      var text = "【网站咨询】\n姓名：" + g("姓名") +
        "\n联系方式：" + g("联系方式") +
        "\n咨询领域：" + g("咨询领域") +
        "\n简要描述：" + g("简要描述");
      var done = function () {
        copyBtn.textContent = "已复制 ✓";
        setTimeout(function () { copyBtn.textContent = "复制填写内容"; }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallbackCopy);
      } else {
        fallbackCopy();
      }
      function fallbackCopy() {
        var ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
    return copyBtn;
  }

  function showCopyBtn() {
    if (!copyBtn) ensureCopyBtn();
    if (copyBtn.parentNode) return;
    var actions = form.querySelector(".form-actions");
    if (actions) {
      actions.appendChild(copyBtn);
    } else if (status && status.parentNode) {
      status.parentNode.insertBefore(copyBtn, status.nextSibling);
    } else {
      form.appendChild(copyBtn);
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var actions = form.querySelector(".form-actions");
    var status = form.querySelector(".form-status");
    if (!status && actions) {
      status = document.createElement("p");
      status.className = "form-status";
      actions.appendChild(status);
    }
    if (!status) return;

    var fd = new FormData(form);
    if (btn) btn.disabled = true;
    status.textContent = "提交中…";
    status.className = "form-status form-status--loading";
    if (copyBtn && copyBtn.parentNode) copyBtn.parentNode.removeChild(copyBtn);

    fetch("/api/contact", {
      method: "POST",
      body: fd,
    })
      .then(function (res) {
        return res.json().then(function (j) {
          return { ok: res.ok, j: j };
        });
      })
      .then(function (r) {
        if (r.ok && r.j && r.j.ok) {
          status.textContent = "✓ 提交成功，刘红律师会尽快与您联系。";
          status.className = "form-status form-status--ok";
          form.reset();
        } else {
          // 失败：不清空表单，提示内容已保留，并提供复制按钮
          status.textContent =
            "✗ " + ((r.j && r.j.error) || "提交失败，请稍后重试或直接拨打电话 13813746372。") +
            "（您填写的内容已保留在下方，可复制后通过微信发送）";
          status.className = "form-status form-status--err";
          showCopyBtn();
        }
      })
      .catch(function () {
        status.textContent = "✗ 网络异常，您填写的内容已保留在下方，请直接拨打电话 13813746372。";
        status.className = "form-status form-status--err";
        showCopyBtn();
      })
      .finally(function () {
        if (btn) btn.disabled = false;
      });
  });
})();
