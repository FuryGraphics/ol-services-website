(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

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
    var firstInvalid = null;

    required.forEach(function (field) {
      var empty = !field.value.trim();
      field.toggleAttribute("aria-invalid", empty);
      if (empty && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      event.preventDefault();
      setStatus("Please add your name and phone number so we can reach you.", "error");
      firstInvalid.focus();
      return;
    }

    event.preventDefault();

    var data = new FormData(form);
    var lines = ["Free quote request — O.L Services website"];
    [["Name", "name"], ["Phone", "phone"], ["City", "city"], ["Service", "service"], ["Details", "message"]]
      .forEach(function (pair) {
        var value = String(data.get(pair[1]) || "").trim();
        if (value) lines.push(pair[0] + ": " + value);
      });

    // "?&body=" works on both iOS and Android messaging apps.
    window.location.href = "sms:+19169409693?&body=" + encodeURIComponent(lines.join("\n"));
    setStatus("Your messaging app should open with the details filled in. Just hit send. If nothing opened, call (916) 940-9693.", "success");
  });
})();
