"use client";

import { useTheme } from "../model/useTheme";
import { MoonIcon, SunIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle color theme"
      className={styles.track}
      onClick={toggleTheme}
    >
      <SunIcon size={13} className={cn(styles.icon, styles.sun)} />
      <MoonIcon size={13} className={cn(styles.icon, styles.moon)} />
      <span className={cn(styles.thumb, isDark && styles.thumbDark)}>
        {isDark ? <MoonIcon size={13} /> : <SunIcon size={13} />}
      </span>
    </button>
  );
}
