/* NextCore documentation portal: dependency-free, accessible progressive enhancement. */
(() => {
  "use strict";
  const script = document.querySelector('script[src*="assets/javascripts/portal.js"]');
  const base = new URL("../../", script ? script.src : location.href);
  const el = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== undefined && text !== null) node.textContent = String(text);
    if (className) node.className = className;
    return node;
  };
  const link = (label, value) => {
    const node = el("a", label);
    if (typeof value !== "string" || !value) return el("span", label);
    try {
      const url = new URL(value, base);
      if (["http:", "https:"].includes(url.protocol)) node.href = url.href;
    } catch (_) { /* Malformed source links remain plain text. */ }
    return node;
  };
  const getJSON = async (path) => {
    const response = await fetch(new URL(path, base));
    if (!response.ok) throw new Error("Catalog unavailable");
    return response.json();
  };
  const searchText = value => String(value || "").toLocaleLowerCase().normalize("NFKD");
  const termsMatch = (haystack, query) => searchText(query).trim().split(/\s+/).every(term => haystack.includes(term));
  const badge = text => el("span", text, "portal-badge");
  const empty = (target, title, text) => {
    target.replaceChildren();
    const panel = el("div", undefined, "portal-empty");
    panel.append(el("h3", title), el("p", text));
    target.append(panel);
  };
  const writeURL = (form, extra = {}) => {
    const url = new URL(location.href);
    for (const control of form.elements) {
      if (!control.name) continue;
      if (control.value) url.searchParams.set(control.name, control.value);
      else url.searchParams.delete(control.name);
    }
    for (const [key, value] of Object.entries(extra)) {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    history.replaceState(null, "", url);
  };
  const readURL = (form) => {
    const params = new URLSearchParams(location.search);
    for (const control of form.elements) {
      if (control.name) control.value = params.get(control.name) || "";
    }
  };
  const wireFilters = (root, form, render) => {
    form.hidden = false;
    readURL(form);
    form.addEventListener("submit", event => event.preventDefault());
    form.addEventListener("input", () => { writeURL(form); render(); });
    form.addEventListener("reset", () => {
      // The reset event occurs before the browser resets native controls.
      queueMicrotask(() => { writeURL(form); render(); });
    });
    const onPop = () => {
      if (!root.isConnected) { window.removeEventListener("popstate", onPop); return; }
      readURL(form); render();
    };
    window.addEventListener("popstate", onPop);
    render();
  };

  async function library(root) {
    const status = root.querySelector("[data-library-status]");
    const results = root.querySelector("[data-library-results]");
    const form = root.querySelector("[data-library-filters]");
    try {
      const index = await getJSON("search/search_index.json");
      const pages = new Map();
      for (const doc of index.docs) {
        const location = doc.location.split("#")[0];
        if (!pages.has(location)) pages.set(location, {location, title: doc.title, text: ""});
        const page = pages.get(location);
        page.text += " " + doc.title + " " + doc.text;
        if (!doc.location.includes("#")) page.title = doc.title;
      }
      const rows = [...pages.values()].map(page => ({
        ...page,
        category: /^(downloads|compatibility)\//.test(page.location) ? "release" : "portal"
      })).sort((a, b) => a.title.localeCompare(b.title));
      const categoryLabels = {release: "Downloads & qualification", portal: "Project & progress"};
      const render = () => {
        const query = form.elements.q.value;
        const category = form.elements.category.value;
        const filtered = rows.filter(row => (!category || row.category === category) && termsMatch(searchText(row.title + " " + row.text), query));
        status.textContent = filtered.length + " of " + rows.length + " published documents";
        results.replaceChildren();
        if (!filtered.length) empty(results, "No documents found.", "Try a broader term or choose all collections.");
        for (const row of filtered) {
          const card = el("article", undefined, "portal-library-card");
          card.append(el("span", categoryLabels[row.category], "portal-eyebrow"));
          const heading = el("h3"); heading.append(link(row.title, row.location || "./"));
          card.append(heading);
          // Search content is plain text; never inject indexed HTML.
          const text = row.text.replace(/\s+/g, " ").trim();
          card.append(el("p", text.length > 170 ? text.slice(0, 167) + "…" : text));
          results.append(card);
        }
      };
      wireFilters(root, form, render);
    } catch (_) {
      status.textContent = "The search index could not be loaded. Browse the collections below or use the site navigation.";
    }
  }

  async function progress(root) {
    try {
      const data = await getJSON("data/progress.json?v=20260919-1");
      if (data.schema !== "nextcore.public-progress.v1") throw new Error("Invalid progress data");
      const boundary = root.querySelector("[data-progress-boundary]");
      if (boundary && data.boundary?.label && data.boundary?.detail) {
        boundary.replaceChildren(badge("Current execution boundary"), el("h2", data.boundary.label), el("p", data.boundary.detail));
        if (data.boundary.evidence_url) boundary.append(link("Read the acceptance status →", data.boundary.evidence_url));
        if (data.updated_at) boundary.append(el("p", "Reviewed " + data.updated_at, "portal-small"));
      }
      const metrics = root.querySelector("[data-progress-metrics]");
      if (metrics && Array.isArray(data.metrics)) {
        metrics.replaceChildren();
        for (const item of data.metrics) {
          const metric = el("div", undefined, "portal-metric");
          metric.append(el("strong", item.value), el("span", item.label), el("p", item.detail));
          metrics.append(metric);
        }
      }
    } catch (_) { /* Reviewed static evidence remains available when offline. */ }
  }

  function init() {
    const root = document.querySelector("[data-portal-page]");
    if (!root || root.dataset.portalReady) return;
    root.dataset.portalReady = "true";
    if (root.dataset.portalPage === "library") library(root);
    if (["home", "progress"].includes(root.dataset.portalPage)) progress(root);
  }
  if (typeof document$ !== "undefined") document$.subscribe(init);
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
