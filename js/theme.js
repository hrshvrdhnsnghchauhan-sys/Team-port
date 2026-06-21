/**
 * theme.js  (v2)
 * ---------------------------------------------------------
 * Manages dark / light theme with localStorage persistence.
 * ---------------------------------------------------------
 */

const Theme = (() => {
  const KEY = "portfolio-theme";
  const DARK  = "dark";
  const LIGHT = "light";

  function current() {
    return document.documentElement.getAttribute("data-theme") || DARK;
  }

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(KEY, theme);

    const btn = document.getElementById("theme-toggle");
    if (!btn) return;

    if (theme === LIGHT) {
      btn.textContent = "Dark Mode";
      btn.setAttribute("aria-pressed", "true");
      btn.setAttribute("aria-label", "Switch to dark mode");
    } else {
      btn.textContent = "Light Mode";
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", "Switch to light mode");
    }
  }

  function toggle() {
    apply(current() === DARK ? LIGHT : DARK);
  }

  function init() {
    const saved = localStorage.getItem(KEY);
    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches ? LIGHT : DARK;
    apply(saved || preferred);

    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", toggle);
    }
  }

  return { init, toggle, current };
})();

window.Theme = Theme;
