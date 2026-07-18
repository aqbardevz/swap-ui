"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

export type ThemePreference = "light" | "dark" | "auto";
type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme";

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(preference: ThemePreference) {
  const resolved = preference === "auto" ? getSystemTheme() : preference;
  document.documentElement.setAttribute("data-theme", resolved);
}

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getResolvedTheme(): ResolvedTheme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function getServerResolvedTheme(): ResolvedTheme {
  return "light";
}

function getStoredPreference(): ThemePreference {
  if (typeof window === "undefined") return "auto";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : "auto";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getResolvedTheme, getServerResolvedTheme);
  const [preference, setPreference] = useState<ThemePreference>(getStoredPreference);

  useEffect(() => {
    if (preference !== "auto") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme("auto");
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [preference]);

  const setTheme = useCallback((next: ThemePreference) => {
    if (next === "auto") {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
    setPreference(next);
    applyTheme(next);
  }, []);

  return { theme, preference, setTheme };
}
