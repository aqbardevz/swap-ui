"use client";

import { useState } from "react";
import { IconButton } from "@/shared/ui/IconButton";
import { ChevronDownIcon, MonitorIcon, MoreIcon, SunIcon, MoonIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";
import { useClickOutside } from "@/shared/lib/useClickOutside";
import { useTheme, type ThemePreference } from "@/features/theme-toggle";
import styles from "./PreferencesMenu.module.css";

const THEME_OPTIONS: { value: ThemePreference; label: string; icon: typeof SunIcon }[] = [
  { value: "auto", label: "Auto", icon: MonitorIcon },
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
];

const LANGUAGES = ["English", "Русский", "Español"];
const CURRENCIES = ["USD", "EUR", "GBP"];

function FieldPicker({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  return (
    <div className={styles.pickerWrapper} ref={ref}>
      <button
        type="button"
        className={styles.pickerRow}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.rowLabel}>{label}</span>
        <span className={styles.pickerValue}>
          {value}
          <ChevronDownIcon size={14} className={cn(styles.chevron, open && styles.chevronOpen)} />
        </span>
      </button>

      {open && (
        <div className={styles.pickerList} role="listbox">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={option === value}
              className={cn(styles.pickerOption, option === value && styles.pickerOptionActive)}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function PreferencesMenu() {
  const [open, setOpen] = useState(false);
  const { preference, setTheme } = useTheme();
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  return (
    <div className={styles.wrapper} ref={ref}>
      <IconButton
        aria-label="Preferences"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <MoreIcon size={18} />
      </IconButton>

      {open && (
        <div className={styles.panel}>
          <p className={styles.title}>Preferences</p>

          <div className={styles.rows}>
            <div className={styles.row}>
              <span className={styles.rowLabel}>Theme</span>
              <div className={styles.segmented}>
                {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    className={cn(styles.segment, preference === value && styles.segmentActive)}
                    aria-pressed={preference === value}
                    onClick={() => setTheme(value)}
                  >
                    <Icon size={14} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <FieldPicker label="Language" options={LANGUAGES} value={language} onChange={setLanguage} />
            <FieldPicker label="Currency" options={CURRENCIES} value={currency} onChange={setCurrency} />
          </div>
        </div>
      )}
    </div>
  );
}
