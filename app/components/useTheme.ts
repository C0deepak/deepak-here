"use client";

import { useSyncExternalStore } from "react";

export type Theme = "day" | "dusk" | "night";
export const THEMES: Theme[] = ["day", "dusk", "night"];

function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
}

const read = () => (document.documentElement.getAttribute("data-theme") as Theme) || "day";

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, read, () => "day" as Theme);

  const setTheme = (t: Theme) => {
    const root = document.documentElement;
    root.classList.add("theme-anim");
    root.setAttribute("data-theme", t);
    try {
      localStorage.setItem("theme", t);
    } catch {}
    window.setTimeout(() => root.classList.remove("theme-anim"), 900);
  };

  const cycle = () => setTheme(THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length]);

  return { theme, setTheme, cycle };
}
