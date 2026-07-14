"use client";

import { useState, type FocusEvent } from "react";
import { IconButton } from "@/shared/ui/IconButton";
import { SettingsIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";
import styles from "./SlippageSettings.module.css";

const PRESETS = [0.1, 0.5, 1];

interface SlippageSettingsProps {
  slippage: number;
  onChange: (value: number) => void;
}

export function SlippageSettings({ slippage, onChange }: SlippageSettingsProps) {
  const [open, setOpen] = useState(false);
  const isCustom = !PRESETS.includes(slippage);

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setOpen(false);
    }
  }

  return (
    <div className={styles.wrapper} onBlur={handleBlur}>
      <IconButton aria-label="Swap settings" onClick={() => setOpen((value) => !value)}>
        <SettingsIcon size={17} />
      </IconButton>

      {open && (
        <div className={styles.panel}>
          <p className={styles.label}>Slippage tolerance</p>
          <div className={styles.presets}>
            {PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                className={cn(styles.preset, preset === slippage && styles.presetActive)}
                onClick={() => onChange(preset)}
              >
                {preset}%
              </button>
            ))}
            <div className={cn(styles.customField, isCustom && styles.presetActive)}>
              <input
                type="number"
                min={0}
                max={50}
                step={0.1}
                placeholder="Custom"
                className={styles.customInput}
                value={isCustom ? slippage : ""}
                onChange={(event) => onChange(Number(event.target.value) || 0)}
              />
              <span>%</span>
            </div>
          </div>

          <p className={styles.label}>Transaction deadline</p>
          <div className={styles.deadline}>
            <input type="number" min={1} defaultValue={30} className={styles.deadlineInput} />
            <span>minutes</span>
          </div>
        </div>
      )}
    </div>
  );
}
