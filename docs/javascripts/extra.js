/* Avinash Barik portfolio – interactive features (vanilla JS, no dependencies) */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Typed role in hero ---------- */
  function initTyped() {
    var el = document.querySelector(".ab-typed");
    if (!el || el.dataset.ready) return;
    el.dataset.ready = "1";
    var words = (el.dataset.words || "").split("|").filter(Boolean);
    if (words.length < 2 || reduceMotion) return;
    var w = 0, i = words[0].length, deleting = true;
    function tick() {
      var word = words[w];
      i += deleting ? -1 : 1;
      el.textContent = word.slice(0, i);
      var delay = deleting ? 35 : 70;
      if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
      else if (!deleting && i === words[w].length) { deleting = true; delay = 1800; }
      setTimeout(tick, delay);
    }
    setTimeout(tick, 2200);
  }

  /* ---------- Count-up stats ---------- */
  function initCounters() {
    var nodes = document.querySelectorAll(".ab-stat strong[data-count]");
    if (!nodes.length || reduceMotion || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target, end = +el.dataset.count, suffix = el.dataset.suffix || "", start = null;
        function step(t) {
          if (!start) start = t;
          var p = Math.min((t - start) / 900, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    var items = document.querySelectorAll(".ab-card, .ab-timeline li, .ab-lane, .ab-stat");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { el.classList.add("ab-reveal"); io.observe(el); });
  }

  /* ---------- Process map preview ---------- */
  function initMap() {
    var map = document.querySelector(".ab-map");
    if (!map) return;
    var preview = map.querySelector(".ab-map__preview");
    function show(node) {
      map.querySelectorAll(".ab-node").forEach(function (n) { n.classList.toggle("is-active", n === node); });
      preview.innerHTML = "";
      var h = document.createElement("strong"); h.textContent = node.textContent;
      var p = document.createElement("p"); p.textContent = node.dataset.desc || "";
      var s = document.createElement("span"); s.className = "ab-map__sys"; s.textContent = node.dataset.sys || "";
      var a = document.createElement("a"); a.href = node.getAttribute("href"); a.className = "md-button md-button--primary"; a.textContent = "Open " + node.textContent + " →";
      preview.append(h, p, s, a);
    }
    map.querySelectorAll(".ab-node").forEach(function (n) {
      n.addEventListener("mouseenter", function () { show(n); });
      n.addEventListener("focus", function () { show(n); });
      // On touch screens, the first tap previews and the second tap opens the page.
      n.addEventListener("click", function (e) {
        if (window.matchMedia("(hover: none)").matches && !n.classList.contains("is-active")) { e.preventDefault(); show(n); }
      });
    });
  }

  /* ---------- Work library: search + filters ---------- */
  function initLibrary() {
    var lib = document.querySelector(".ab-lib");
    if (!lib) return;
    var input = lib.querySelector(".ab-lib__search");
    var cards = Array.prototype.slice.call(lib.querySelectorAll(".ab-card"));
    var count = lib.querySelector(".ab-lib__count");
    var empty = lib.querySelector(".ab-lib__empty");
    var state = { type: "all", sys: "all", q: "" };

    function apply() {
      var q = state.q.trim().toLowerCase(), shown = 0;
      cards.forEach(function (c) {
        var types = (c.dataset.type || "").split(" ");
        var systems = (c.dataset.sys || "").split(" ");
        var text = (c.textContent + " " + (c.dataset.keywords || "") + " " + (c.dataset.sys || "")).toLowerCase();
        var ok = (state.type === "all" || types.indexOf(state.type) > -1) &&
                 (state.sys === "all" || systems.indexOf(state.sys) > -1) &&
                 (!q || q.split(/\s+/).every(function (w) { return text.indexOf(w) > -1; }));
        c.hidden = !ok;
        if (ok) { shown++; c.classList.add("is-visible"); }
      });
      count.textContent = shown + " of " + cards.length + " items";
      empty.hidden = shown > 0;
    }
    function setFilter(group, value) {
      state[group] = value;
      lib.querySelectorAll('.ab-lib__filters[data-group="' + group + '"] button').forEach(function (b) {
        b.classList.toggle("is-active", b.dataset.value === value);
        b.setAttribute("aria-pressed", b.dataset.value === value);
      });
      apply();
    }
    lib.querySelectorAll(".ab-lib__filters").forEach(function (g) {
      g.addEventListener("click", function (e) {
        var b = e.target.closest("button"); if (b) setFilter(g.dataset.group, b.dataset.value);
      });
    });
    input.addEventListener("input", function () { state.q = input.value; apply(); });
    lib.querySelector(".ab-lib__reset").addEventListener("click", function () {
      input.value = ""; state.q = ""; setFilter("type", "all"); setFilter("sys", "all");
    });

    // App chips in "What I do" jump to the library filtered by that system.
    document.querySelectorAll(".ab-chips--link button").forEach(function (b) {
      b.addEventListener("click", function () {
        setFilter("type", "all"); setFilter("sys", b.dataset.sys);
        lib.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      });
    });

    // Press "/" to focus the library search (unless typing elsewhere).
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && !/input|textarea/i.test((document.activeElement || {}).tagName || "")) {
        e.preventDefault(); e.stopPropagation(); input.focus();
      }
    }, true);

    // Support links like /?sys=Workday#work-library
    var params = new URLSearchParams(location.search);
    if (params.get("sys")) setFilter("sys", params.get("sys"));
    if (params.get("type")) setFilter("type", params.get("type"));
    apply();
  }

  /* ---------- Stage explorer on process pages ---------- */
  function slugText(h) {
    return Array.prototype.filter.call(h.childNodes, function (n) { return !(n.classList && n.classList.contains("headerlink")); })
      .map(function (n) { return n.textContent; }).join("").trim();
  }
  function initStages() {
    var content = document.querySelector(".md-content__inner");
    if (!content || content.querySelector(".ab-stages")) return;
    var h2 = Array.prototype.find.call(content.querySelectorAll("h2"), function (h) { return /^process stages/i.test(slugText(h)); });
    if (!h2) return;

    var stages = [], el = h2.nextElementSibling, current = null;
    while (el && el.tagName !== "H2") {
      if (el.tagName === "H3") { current = { heading: el, nodes: [] }; stages.push(current); }
      else if (current) current.nodes.push(el);
      el = el.nextElementSibling;
    }
    if (stages.length < 2) return;

    var box = document.createElement("div");
    box.className = "ab-stages";
    box.innerHTML = '<p class="ab-stages__title">Stage explorer <span>– click a stage to preview it, or use ← → keys</span></p>' +
      '<ol class="ab-stages__track" role="tablist"></ol><div class="ab-stages__panel" role="tabpanel"></div>';
    var track = box.querySelector(".ab-stages__track");
    var panel = box.querySelector(".ab-stages__panel");
    var active = 0;

    stages.forEach(function (s, idx) {
      var label = slugText(s.heading).replace(/^\d+\.\s*/, "");
      var li = document.createElement("li");
      var b = document.createElement("button");
      b.type = "button"; b.setAttribute("role", "tab");
      b.innerHTML = '<span class="ab-stages__num">' + (idx + 1) + "</span><span class=\"ab-stages__label\"></span>";
      b.querySelector(".ab-stages__label").textContent = label;
      b.addEventListener("click", function () { select(idx); });
      li.appendChild(b); track.appendChild(li);
      s.button = b; s.label = label;
    });

    function select(idx) {
      active = (idx + stages.length) % stages.length;
      stages.forEach(function (s, i) {
        s.button.classList.toggle("is-active", i === active);
        s.button.classList.toggle("is-done", i < active);
        s.button.setAttribute("aria-selected", i === active);
      });
      var s = stages[active];
      panel.innerHTML = "";
      var h = document.createElement("h4"); h.textContent = (active + 1) + ". " + s.label;
      panel.appendChild(h);
      s.nodes.forEach(function (n) { panel.appendChild(n.cloneNode(true)); });
      var nav = document.createElement("div"); nav.className = "ab-stages__nav";
      nav.innerHTML = '<button type="button" class="md-button" data-d="-1">← Previous</button>' +
        '<a class="ab-stages__jump" href="#' + s.heading.id + '">Go to this section</a>' +
        '<button type="button" class="md-button md-button--primary" data-d="1">Next →</button>';
      nav.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) select(active + +b.dataset.d); });
      panel.appendChild(nav);
    }
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { select(active + 1); stages[active].button.focus(); }
      if (e.key === "ArrowLeft") { select(active - 1); stages[active].button.focus(); }
    });

    // Put the explorer straight after the process-flow diagram when there is one.
    var flow = Array.prototype.find.call(content.querySelectorAll("h2"), function (h) { return /^process flow/i.test(slugText(h)); });
    var anchor = flow ? flow.nextElementSibling : h2;
    while (flow && anchor && anchor.nextElementSibling && anchor.nextElementSibling.tagName !== "H2") anchor = anchor.nextElementSibling;
    (anchor || h2).insertAdjacentElement("afterend", box);
    select(0);

    // Highlight the stage you are reading as you scroll the full write-up.
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var idx = stages.findIndex(function (s) { return s.heading === e.target; });
          stages.forEach(function (s, i) { s.button.classList.toggle("is-reading", i === idx); });
        });
      }, { rootMargin: "0px 0px -70% 0px" });
      stages.forEach(function (s) { io.observe(s.heading); });
    }
  }

  /* ---------- Reading progress bar ---------- */
  function initProgress() {
    if (document.querySelector(".ab-progress")) return;
    var bar = document.createElement("div");
    bar.className = "ab-progress";
    document.body.appendChild(bar);
    function update() {
      var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? h.scrollTop / max : 0) + ")";
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------- Live GitHub data ---------- */
  function ago(date) {
    var s = Math.max(1, (Date.now() - new Date(date)) / 1000);
    var units = [["year", 31536000], ["month", 2592000], ["day", 86400], ["hour", 3600], ["minute", 60]];
    for (var i = 0; i < units.length; i++) {
      var v = Math.floor(s / units[i][1]);
      if (v >= 1) return v + " " + units[i][0] + (v > 1 ? "s" : "");
    }
    return "moments";
  }
  function initGitHub() {
    var root = document.querySelector(".ab-gh");
    if (!root || root.dataset.ready) return;
    root.dataset.ready = "1";
    var user = root.dataset.user, repo = root.dataset.repo, api = "https://api.github.com/";
    function set(key, val) { var el = root.querySelector('[data-gh="' + key + '"]'); if (el) el.textContent = val; }
    function getJSON(url) { return fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }); }

    Promise.all([
      getJSON(api + "users/" + user),
      getJSON(api + "users/" + user + "/repos?sort=updated&per_page=12"),
      getJSON(api + "repos/" + user + "/" + repo + "/commits?per_page=8")
    ]).then(function (res) {
      var u = res[0], repos = res[1], commits = res[2];
      if (u.name) root.querySelector(".ab-gh__name").textContent = u.name;
      if (u.bio) root.querySelector(".ab-gh__bio").textContent = u.bio;
      if (u.location) set("location", u.location);
      set("joined", "· on GitHub since " + new Date(u.created_at).toLocaleDateString(undefined, { month: "long", year: "numeric" }));
      set("repos", u.public_repos);
      set("commits", commits.length + (commits.length === 8 ? "+" : ""));
      if (commits[0]) set("updated", ago(commits[0].commit.author.date));

      var grid = root.querySelector(".ab-gh__repos");
      var list = repos.filter(function (r) { return !r.fork; });
      if (list.length) {
        grid.innerHTML = "";
        list.forEach(function (r) {
          var a = document.createElement("a");
          a.className = "ab-card is-visible"; a.href = r.homepage || r.html_url; a.target = "_blank"; a.rel = "noopener";
          var name = r.name === user ? r.name + " (profile README)" : r.name;
          a.innerHTML = '<span class="ab-card__type">Repository</span><h3></h3><p></p><span class="ab-card__tags"></span>';
          a.querySelector("h3").textContent = name;
          a.querySelector("p").textContent = r.description || (r.name === user ? "The README shown on my GitHub profile." : "");
          a.querySelector(".ab-card__tags").textContent = [r.language, "updated " + ago(r.pushed_at) + " ago"].filter(Boolean).join(" · ");
          grid.appendChild(a);
        });
      }

      var ol = root.querySelector(".ab-gh__commits");
      ol.innerHTML = "";
      commits.forEach(function (c, i) {
        var li = document.createElement("li");
        if (i === 0) li.className = "is-current";
        li.innerHTML = '<span class="ab-timeline__date"></span><h3><a target="_blank" rel="noopener"></a></h3>';
        li.querySelector(".ab-timeline__date").textContent = ago(c.commit.author.date) + " ago";
        var a = li.querySelector("a"); a.href = c.html_url; a.textContent = c.commit.message.split("\n")[0];
        ol.appendChild(li);
      });
    }).catch(function () {
      root.querySelector(".ab-gh__error").hidden = false;
      var ol = root.querySelector(".ab-gh__commits"); if (ol) ol.hidden = true;
    });
  }


  /* ---------- "Last updated" line ---------- */
  function initUpdated() {
    var el = document.querySelector(".ab-updated");
    if (!el || el.dataset.ready) return;
    el.dataset.ready = "1";
    fetch("https://api.github.com/repos/" + el.dataset.repo + "/commits?per_page=1")
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (c) {
        if (!c[0]) return;
        var d = new Date(c[0].commit.author.date);
        el.textContent = "Last updated " + d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
      }).catch(function () {});
  }

  function init() {
    initTyped(); initCounters(); initMap(); initLibrary(); initStages(); initProgress(); initGitHub(); initUpdated(); initReveal();
  }

  if (window.document$ && typeof window.document$.subscribe === "function") window.document$.subscribe(init);
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
