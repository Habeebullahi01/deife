/* ============================================================
   INTERACTIVITY — counter, petals, reveals, flip cards, surprise
   ============================================================ */

(function () {
  const content = window.CONTENT || {};
  const { names, startDate } = content;

  /* ── Fill hero ──────────────────────────────────────────── */
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el && typeof text === "string") el.textContent = text;
  };

  setText("name-one", names?.one);
  setText("name-two", names?.two);
  setText("hero-kicker", content.heroKicker);
  setText("hero-line", content.heroLine);
  setText("hero-note", content.heroNote);

  /* ── Story ──────────────────────────────────────────────── */
  setText("story-title", content.story?.title);
  setText("story-intro", content.story?.intro);

  const timeline = document.getElementById("timeline");
  if (timeline && Array.isArray(content.story?.entries)) {
    timeline.innerHTML = "";
    content.story.entries.forEach((entry) => {
      const li = document.createElement("li");
      li.className = "timeline__item reveal";

      const dot = document.createElement("div");
      dot.className = "timeline__dot";

      const card = document.createElement("article");
      card.className = "timeline__content";

      const date = document.createElement("p");
      date.className = "timeline__date";
      date.textContent = entry.date || "";

      const title = document.createElement("h3");
      title.className = "timeline__title";
      title.textContent = entry.title || "";

      const text = document.createElement("p");
      text.className = "timeline__text";
      text.textContent = entry.text || "";

      card.append(date, title, text);
      li.append(dot, card);
      timeline.appendChild(li);
    });
  }

  /* ── Stats ──────────────────────────────────────────────── */
  setText("stats-title", content.statsTitle);
  const stats = document.getElementById("stats");
  if (stats && Array.isArray(content.stats)) {
    stats.innerHTML = "";
    content.stats.forEach((stat) => {
      const li = document.createElement("li");
      li.className = "stats__item reveal";

      const value = document.createElement("div");
      value.className = "stats__value";
      if (typeof stat.value === "string" && stat.value.startsWith("auto:")) {
        value.dataset.auto = stat.value;
      } else if (stat.value !== undefined && stat.value !== null) {
        value.textContent = String(stat.value);
      }

      const label = document.createElement("div");
      label.className = "stats__label";
      label.textContent = stat.label || "";

      li.append(value, label);
      stats.appendChild(li);
    });
  }

  /* ── Letter ─────────────────────────────────────────────── */
  setText("letter-title", content.letter?.title);
  setText("letter-greeting", content.letter?.greeting);
  setText("letter-signoff", content.letter?.signoff);
  setText("letter-signature", content.letter?.signature);

  const letterBody = document.getElementById("letter-body");
  if (letterBody && Array.isArray(content.letter?.paragraphs)) {
    letterBody.innerHTML = "";
    content.letter.paragraphs.forEach((p) => {
      const para = document.createElement("p");
      para.textContent = p;
      letterBody.appendChild(para);
    });
  }

  /* ── Reasons ────────────────────────────────────────────── */
  setText("reasons-title", content.reasons?.title);
  setText("reasons-intro", content.reasons?.intro);

  const reasonsGrid = document.getElementById("reasons-grid");
  if (reasonsGrid && Array.isArray(content.reasons?.items)) {
    reasonsGrid.innerHTML = "";
    content.reasons.items.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "reason reveal";

      const inner = document.createElement("div");
      inner.className = "reason__inner";

      const front = document.createElement("div");
      front.className = "reason__face reason__face--front";

      const idx = document.createElement("p");
      idx.className = "reason__index";
      idx.textContent = `#${String(index + 1).padStart(2, "0")}`;

      const title = document.createElement("h3");
      title.className = "reason__title";
      title.textContent = item.title || "";

      front.append(idx, title);

      const back = document.createElement("div");
      back.className = "reason__face reason__face--back";

      const text = document.createElement("p");
      text.className = "reason__text";
      text.textContent = item.text || "";

      back.append(text);

      const btn = document.createElement("button");
      btn.className = "reason__btn";
      btn.type = "button";
      btn.setAttribute("aria-label", `Reveal reason ${index + 1}: ${item.title || ""}`);

      btn.addEventListener("click", () => {
        card.classList.toggle("is-flipped");
      });

      inner.append(front, back);
      card.append(inner, btn);
      reasonsGrid.appendChild(card);
    });
  }

  /* ── Gallery ────────────────────────────────────────────── */
  setText("gallery-title", content.gallery?.title);
  setText("gallery-intro", content.gallery?.intro);

  const galleryGrid = document.getElementById("gallery-grid");
  if (galleryGrid && Array.isArray(content.gallery?.items)) {
    galleryGrid.innerHTML = "";
    content.gallery.items.forEach((item) => {
      const figure = document.createElement("figure");
      figure.className = "polaroid reveal";

      const frame = document.createElement("div");
      frame.className = "polaroid__frame";

      if (item.src && item.src.trim()) {
        const img = document.createElement("img");
        img.className = "polaroid__img";
        img.src = item.src;
        img.alt = item.caption || `A memory of ${names?.two} and ${names?.one}`;
        img.loading = "lazy";
        frame.appendChild(img);
      } else {
        const placeholder = document.createElement("div");
        placeholder.className = "polaroid__placeholder";
        placeholder.innerHTML =
          '<span class="polaroid__placeholder-mark">♡</span><span class="polaroid__placeholder-text">add a photo</span>';
        frame.appendChild(placeholder);
      }

      const caption = document.createElement("figcaption");
      caption.className = "polaroid__caption";
      caption.textContent = item.caption || "";

      figure.append(frame, caption);
      galleryGrid.appendChild(figure);
    });
  }

  /* ── Surprise ──────────────────────────────────────────── */
  setText("surprise-prompt", content.surprise?.prompt);
  setText("surprise-btn-label", content.surprise?.button);
  setText("surprise-message", content.surprise?.message);
  setText("surprise-signature", content.surprise?.signature);

  const surpriseBtn = document.getElementById("surprise-btn");
  const surpriseCard = document.getElementById("surprise-card");
  if (surpriseBtn && surpriseCard) {
    surpriseBtn.addEventListener("click", () => {
      const isOpen = !surpriseCard.hasAttribute("hidden");
      if (isOpen) {
        surpriseCard.setAttribute("hidden", "");
        surpriseBtn.setAttribute("aria-expanded", "false");
        return;
      }
      surpriseCard.removeAttribute("hidden");
      surpriseBtn.setAttribute("aria-expanded", "true");
      surpriseBtn.disabled = true;
      surpriseBtn.textContent = "opened with love";

      // tiny petal burst
      const burst = document.createElement("div");
      burst.className = "petals";
      burst.style.position = "fixed";
      burst.style.inset = "0";
      burst.style.zIndex = "5";
      burst.style.pointerEvents = "none";
      document.body.appendChild(burst);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce) {
        const count = 14;
        for (let i = 0; i < count; i += 1) {
          const p = document.createElement("span");
          p.className = "petals__petal";
          p.style.left = Math.random() * 100 + "vw";
          p.style.setProperty("--x", Math.random() * 40 - 20 + "vw");
          p.style.setProperty("--x-end", Math.random() * 60 - 30 + "vw");
          p.style.setProperty("--rot", Math.random() * 360 + "deg");
          p.style.setProperty("--delay", Math.random() * 0.6 + "s");
          p.style.setProperty("--fall", Math.random() * 4 + 6 + "s");
          burst.appendChild(p);
        }
      }

      setTimeout(() => burst.remove(), 9000);
    });
  }

  /* ── Footer ─────────────────────────────────────────────── */
  setText("footer-line", content.footer?.line);
  setText("footer-names", `${names?.one || ""} and ${names?.two || ""}`);

  const footerMeta = document.getElementById("footer-meta");
  if (footerMeta && startDate) {
    const start = new Date(startDate);
    if (!Number.isNaN(start.getTime())) {
      const opts = { day: "numeric", month: "long", year: "numeric" };
      footerMeta.textContent = `since ${start.toLocaleDateString("en-GB", opts).toLowerCase()}`;
    }
  }

  const footerCount = document.getElementById("footer-count");
  if (footerCount && startDate) {
    const start = new Date(startDate);
    const now = new Date();
    if (!Number.isNaN(start.getTime())) {
      const diffMs = Math.max(0, now - start);
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      footerCount.textContent = `${days} days so far`;
    }
  }

  /* ── Counter ────────────────────────────────────────────── */
  const counter = document.getElementById("counter");
  const makeUnit = (value, label) => {
    const unit = document.createElement("div");
    unit.className = "counter__unit";

    const val = document.createElement("div");
    val.className = "counter__value";
    val.textContent = String(value).padStart(2, "0");

    const lab = document.createElement("div");
    lab.className = "counter__label";
    lab.textContent = label;

    unit.append(val, lab);
    return { unit, val };
  };

  const units = counter
    ? [
        makeUnit(0, "months"),
        makeUnit(0, "days"),
        makeUnit(0, "hours"),
        makeUnit(0, "minutes"),
        makeUnit(0, "seconds"),
      ]
    : [];

  if (counter) {
    units.forEach((u) => counter.appendChild(u.unit));
  }

  const updateCounter = () => {
    if (!startDate) return;
    const start = new Date(startDate);
    const now = new Date();
    if (Number.isNaN(start.getTime())) return;

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    let hours = now.getHours() - start.getHours();
    let minutes = now.getMinutes() - start.getMinutes();
    let seconds = now.getSeconds() - start.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes -= 1;
    }
    if (minutes < 0) {
      minutes += 60;
      hours -= 1;
    }
    if (hours < 0) {
      hours += 24;
      days -= 1;
    }
    if (days < 0) {
      const prev = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prev.getDate();
      months -= 1;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    const totalMonths = years * 12 + months;

    // Update hero counter
    if (units[0]) units[0].val.textContent = String(totalMonths).padStart(2, "0");
    if (units[1]) units[1].val.textContent = String(days).padStart(2, "0");
    if (units[2]) units[2].val.textContent = String(hours).padStart(2, "0");
    if (units[3]) units[3].val.textContent = String(minutes).padStart(2, "0");
    if (units[4]) units[4].val.textContent = String(seconds).padStart(2, "0");

    // Update auto stats
    document.querySelectorAll('.stats__value[data-auto="auto:months"]').forEach((el) => {
      el.textContent = String(totalMonths);
    });
    document.querySelectorAll('.stats__value[data-auto="auto:days"]').forEach((el) => {
      const diffMs = Math.max(0, now - start);
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      el.textContent = String(totalDays);
    });
  };

  updateCounter();
  setInterval(updateCounter, 1000);

  /* ── Petals ─────────────────────────────────────────────── */
  const petals = document.querySelector(".petals");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (petals && !reduceMotion) {
    const count = 16;
    for (let i = 0; i < count; i += 1) {
      const p = document.createElement("span");
      p.className = "petals__petal";
      p.style.left = Math.random() * 100 + "vw";
      p.style.setProperty("--x", Math.random() * 60 - 30 + "vw");
      p.style.setProperty("--x-end", Math.random() * 80 - 40 + "vw");
      p.style.setProperty("--rot", Math.random() * 360 + "deg");
      p.style.setProperty("--delay", Math.random() * 14 + "s");
      p.style.setProperty("--fall", Math.random() * 10 + 14 + "s");
      petals.appendChild(p);
    }
  }

  /* ── Scroll reveal ──────────────────────────────────────── */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => obs.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }
})();
