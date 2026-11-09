/* Tire Zone NOLA — concept preview. No tracking, no storage, no network requests. */
(function () {
  "use strict";

  /* ---------- Open / closed status (shop runs on Central time) ---------- */
  // Day index: 0 = Sunday … 6 = Saturday. [open hour, close hour], 24h.
  var HOURS = { 0: [8, 19], 1: [8, 21], 2: [8, 21], 3: [8, 21], 4: [8, 21], 5: [8, 21], 6: [8, 21] };
  var DAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  var DAY_NAME = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function formatHour(h) {
    if (h === 0) return "12 AM";
    if (h === 12) return "12 PM";
    return h > 12 ? (h - 12) + " PM" : h + " AM";
  }

  function centralNow() {
    try {
      var parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23"
      }).formatToParts(new Date());
      var out = {};
      parts.forEach(function (p) { out[p.type] = p.value; });
      return { day: DAY_INDEX[out.weekday], minutes: parseInt(out.hour, 10) * 60 + parseInt(out.minute, 10) };
    } catch (e) {
      return null;
    }
  }

  function updateStatus() {
    var now = centralNow();
    var el = document.getElementById("open-status");
    if (!now || !el || now.day === undefined) return;
    var text = el.querySelector(".status-text");
    var today = HOURS[now.day];
    var open = today[0] * 60, close = today[1] * 60;
    var msg, state;

    if (now.minutes >= open && now.minutes < close) {
      state = "open";
      msg = "Open now until " + formatHour(today[1]);
    } else if (now.minutes < open) {
      state = "closed";
      msg = "Closed now. Opens today at " + formatHour(today[0]);
    } else {
      state = "closed";
      var next = (now.day + 1) % 7;
      msg = "Closed now. Opens tomorrow (" + DAY_NAME[next] + ") at " + formatHour(HOURS[next][0]);
    }
    el.setAttribute("data-state", state);
    text.textContent = msg;

    var rows = document.querySelectorAll("#hours tr[data-day]");
    rows.forEach(function (row) {
      var isToday = Number(row.getAttribute("data-day")) === now.day;
      row.classList.toggle("is-today", isToday);
      var tag = row.querySelector(".today-tag");
      if (isToday && !tag) {
        tag = document.createElement("span");
        tag.className = "today-tag";
        tag.textContent = "Today";
        row.querySelector("th").appendChild(tag);
      } else if (!isToday && tag) {
        tag.remove();
      }
    });
  }

  updateStatus();
  setInterval(updateStatus, 60 * 1000);

  /* ---------- Tire size explainer ---------- */
  // Load index → kg (ISO/TRA standard table, common passenger and light-truck range).
  var LOAD_KG = {
    70: 335, 71: 345, 72: 355, 73: 365, 74: 375, 75: 387, 76: 400, 77: 412, 78: 425, 79: 437,
    80: 450, 81: 462, 82: 475, 83: 487, 84: 500, 85: 515, 86: 530, 87: 545, 88: 560, 89: 580,
    90: 600, 91: 615, 92: 630, 93: 650, 94: 670, 95: 690, 96: 710, 97: 730, 98: 750, 99: 775,
    100: 800, 101: 825, 102: 850, 103: 875, 104: 900, 105: 925, 106: 950, 107: 975, 108: 1000, 109: 1030,
    110: 1060, 111: 1090, 112: 1120, 113: 1150, 114: 1180, 115: 1215, 116: 1250, 117: 1285, 118: 1320, 119: 1360,
    120: 1400, 121: 1450, 122: 1500, 123: 1550, 124: 1600, 125: 1650, 126: 1700
  };
  var SPEED_MPH = { L: 75, M: 81, N: 87, P: 93, Q: 99, R: 106, S: 112, T: 118, U: 124, H: 130, V: 149, W: 168, Y: 186 };
  var TYPE_TEXT = {
    P: ["Passenger car tire", "Made for cars, minivans and small SUVs."],
    LT: ["Light truck tire", "Built for heavier loads and towing."],
    ST: ["Special trailer tire", "For trailers only, not for cars or trucks."],
    T: ["Temporary spare", "Meant to get you to a shop, not for everyday driving."]
  };

  var SIZE_RE = /^(P|LT|ST|T)?\s*(\d{3})\s*\/\s*(\d{2})\s*(ZR|R|D|B)?\s*-?\s*(\d{2}(?:\.\d)?)\s*(?:(\d{2,3})(?:\s*\/\s*(\d{2,3}))?\s*\(?([LMNPQRSTUHVWY])\)?)?$/;

  function parseSize(raw) {
    var s = raw.toUpperCase().replace(/\s+/g, " ").trim();
    var m = s.match(SIZE_RE);
    if (!m) return null;
    return {
      type: m[1] || "", width: +m[2], aspect: +m[3], build: m[4] || "R",
      rim: m[5], load: m[6] ? +m[6] : null, load2: m[7] ? +m[7] : null, speed: m[8] || ""
    };
  }

  function normalized(t) {
    var out = t.type + t.width + "/" + t.aspect + t.build + t.rim;
    if (t.load) out += " " + t.load + (t.load2 ? "/" + t.load2 : "") + t.speed;
    return out;
  }

  function oneDecimal(n) { return (Math.round(n * 10) / 10).toFixed(1); }

  function describe(t) {
    var rows = [];
    if (t.type && TYPE_TEXT[t.type]) rows.push(["type", t.type, TYPE_TEXT[t.type][0], TYPE_TEXT[t.type][1]]);
    rows.push(["width", String(t.width), "Width: " + t.width + " mm", "About " + oneDecimal(t.width / 25.4) + " inches across the tread."]);
    var sidewall = t.width * t.aspect / 100;
    rows.push(["aspect", String(t.aspect), "Sidewall height: " + t.aspect + "% of the width",
      "About " + Math.round(sidewall) + " mm (" + oneDecimal(sidewall / 25.4) + " in) from the wheel to the tread."]);
    if (t.build === "ZR") rows.push(["build", "ZR", "Radial, rated for high speed", "Built for speeds above 149 mph."]);
    else if (t.build === "R") rows.push(["build", "R", "Radial construction", "Nearly every car tire made today is radial."]);
    else rows.push(["build", t.build, "Bias-ply construction", "Mostly found on trailers and older vehicles."]);
    var article = /^(8|11|18)(\.|$)/.test(t.rim) ? "an " : "a ";
    rows.push(["rim", t.rim, "Fits " + article + t.rim + "-inch wheel", "A new tire has to match this number."]);
    if (t.load) {
      var kg = LOAD_KG[t.load];
      var loadLabel = t.load2 ? t.load + "/" + t.load2 : String(t.load);
      var detail = kg
        ? "Each tire can carry up to " + Math.round(kg * 2.20462).toLocaleString("en-US") + " lb" + (t.load2 ? " when used as a single tire." : ".")
        : "Your new tires should match or beat this number.";
      rows.push(["load", loadLabel, "Load index " + loadLabel, detail]);
    }
    if (t.speed) {
      var mph = SPEED_MPH[t.speed];
      rows.push(["speed", t.speed, "Speed rating " + t.speed, mph ? "Built for speeds up to " + mph + " mph." : "Match the speed rating on your current tires."]);
    }
    return rows;
  }

  var sizeForm = document.getElementById("size-form");
  var sizeInput = document.getElementById("size-input");
  var sizeError = document.getElementById("size-error");
  var sizeCode = document.getElementById("size-code");
  var sizeParts = document.getElementById("size-parts");
  var sizeHeading = document.getElementById("size-heading");
  var sizeUse = document.getElementById("size-use");
  var currentSize = "";

  function showSizeError(message) {
    sizeError.textContent = message;
    sizeError.hidden = false;
    sizeInput.setAttribute("aria-invalid", "true");
    sizeInput.focus();
  }

  function clearSizeError() {
    sizeError.hidden = true;
    sizeError.textContent = "";
    sizeInput.removeAttribute("aria-invalid");
  }

  function renderSize(t) {
    var rows = describe(t);
    sizeCode.textContent = "";
    rows.forEach(function (row) {
      if (row[0] === "load") {
        var gap = document.createElement("span");
        gap.className = "gap";
        gap.textContent = " ";
        sizeCode.appendChild(gap);
      }
      var seg = document.createElement("span");
      seg.className = "seg";
      seg.textContent = row[1];
      sizeCode.appendChild(seg);
      if (row[0] === "width") {
        var slash = document.createElement("span");
        slash.className = "seg";
        slash.textContent = "/";
        sizeCode.appendChild(slash);
      }
    });

    sizeParts.textContent = "";
    rows.forEach(function (row) {
      var li = document.createElement("li");
      var part = document.createElement("span");
      part.className = "part";
      part.textContent = row[1];
      var meaning = document.createElement("p");
      meaning.className = "meaning";
      meaning.textContent = row[2];
      var sub = document.createElement("span");
      sub.textContent = row[3];
      meaning.appendChild(sub);
      li.appendChild(part);
      li.appendChild(meaning);
      sizeParts.appendChild(li);
    });

    currentSize = normalized(t);
    sizeHeading.textContent = "Showing your size " + currentSize + ".";
    sizeUse.hidden = false;
  }

  if (sizeForm) {
    sizeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = sizeInput.value.trim();
      if (!value) {
        showSizeError("Type the size from your tire's sidewall, for example 225/65R17.");
        return;
      }
      var parsed = parseSize(value);
      if (!parsed) {
        showSizeError("That doesn't look like a tire size. It usually looks like 225/65R17. You can also call (504) 264-7830 and we'll help you find it.");
        return;
      }
      clearSizeError();
      sizeInput.value = normalized(parsed);
      renderSize(parsed);
    });
    sizeInput.addEventListener("input", function () {
      if (!sizeError.hidden) clearSizeError();
    });
  }

  if (sizeUse) {
    sizeUse.addEventListener("click", function () {
      var target = document.getElementById("q-size");
      target.value = currentSize;
      document.getElementById("price").scrollIntoView();
      document.getElementById("q-phone").focus({ preventScroll: true });
    });
  }

  /* ---------- Price request (concept preview: nothing is sent) ---------- */
  var quoteForm = document.getElementById("quote-form");
  if (quoteForm) {
    var phone = document.getElementById("q-phone");
    var phoneError = document.getElementById("q-phone-error");
    var status = document.getElementById("quote-status");

    quoteForm.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";
      var digits = phone.value.replace(/\D/g, "");
      if (digits.length === 11 && digits.charAt(0) === "1") digits = digits.slice(1);
      if (digits.length !== 10) {
        phoneError.textContent = phone.value.trim()
          ? "Enter a 10-digit phone number with area code, like 504 555 0123."
          : "Enter your phone number so we can call you back.";
        phoneError.hidden = false;
        phone.setAttribute("aria-invalid", "true");
        phone.focus();
        return;
      }
      phoneError.hidden = true;
      phone.removeAttribute("aria-invalid");
      status.textContent = "Concept preview: nothing was sent. On the live site, this request goes straight to Tire Zone and they call you back.";
    });

    phone.addEventListener("input", function () {
      if (!phoneError.hidden) {
        phoneError.hidden = true;
        phone.removeAttribute("aria-invalid");
      }
    });
  }
})();
