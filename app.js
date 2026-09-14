(() => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("nc-theme");
  root.setAttribute("data-theme", savedTheme === "dark" ? "dark" : "light");

  document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("nc-theme", next);
  });

  const nav = document.querySelector("[data-nav]");
  const menu = document.querySelector("[data-menu]");
  menu?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });
  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menu?.setAttribute("aria-expanded", "false");
    });
  });

  const { detectLang, applyLang } = window.NextCoreI18n;
  const select = document.querySelector("[data-lang-select]");
  const lang = detectLang();
  if (select) select.value = lang;
  applyLang(lang);
  select?.addEventListener("change", (event) => applyLang(event.target.value));
})();
