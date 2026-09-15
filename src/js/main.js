(function () {
  "use strict";

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---------- Mobile navigation ----------
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  document.querySelectorAll(".sub-toggle").forEach(function (button) {
    var menu = button.nextElementSibling;
    button.addEventListener("click", function () {
      var open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open", !open);
    });
  });

  // ---------- Quote form: opens a pre-filled SMS ----------
  var form = document.getElementById("quote-form");
  if (!form) return;

  var status = document.getElementById("form-status");
  var required = form.querySelectorAll("[required]");

  function setStatus(message, type) {
    status.textContent = message;
    status.className = "form-status" + (type ? " is-" + type : "");
  }

  required.forEach(function (field) {
    field.addEventListener("input", function () {
      if (field.value.trim()) field.removeAttribute("aria-invalid");
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var firstInvalid = null;

    required.forEach(function (field) {
      var empty = !field.value.trim();
      field.toggleAttribute("aria-invalid", empty);
      if (empty && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      setStatus("Please add your name and phone number so we can reach you.", "error");
      firstInvalid.focus();
      return;
    }

    var data = new FormData(form);
    var lines = ["Free quote request — O.L Services website"];
    [["Name", "name"], ["Phone", "phone"], ["City", "city"], ["Service", "service"], ["Details", "message"]]
      .forEach(function (pair) {
        var value = String(data.get(pair[1]) || "").trim();
        if (value) lines.push(pair[0] + ": " + value);
      });

    // "?&body=" works on both iOS and Android messaging apps.
    window.location.href = "sms:" + form.dataset.sms + "?&body=" + encodeURIComponent(lines.join("\n"));
    setStatus("Your messaging app should open with the details filled in. Just hit send. If nothing opened, call " + form.dataset.phone + ".", "success");
  });
})();
