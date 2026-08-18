const STORAGE_KEY = "18-browser-theme";
const root = document.documentElement;

function systemTheme() {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function storedTheme() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  const color = theme === "light" ? "#F4FAFA" : "#0E1415";
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
    meta.setAttribute("content", color);
    meta.removeAttribute("media");
  }
  const next = theme === "light" ? "dark" : "light";
  const label =
    next === "light" ? "Switch to light mode" : "Switch to dark mode";
  for (const button of document.querySelectorAll("[data-theme-toggle]")) {
    button.setAttribute("aria-label", label);
  }
}

applyTheme(storedTheme() ?? systemTheme());

window
  .matchMedia("(prefers-color-scheme: light)")
  .addEventListener("change", () => {
    if (!storedTheme()) {
      applyTheme(systemTheme());
    }
  });

for (const button of document.querySelectorAll("[data-theme-toggle]")) {
  button.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore quota / private mode */
    }
    applyTheme(next);
  });
}
