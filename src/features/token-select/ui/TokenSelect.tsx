"use client";

import { useState, type FocusEvent } from "react";
import type { Token } from "@/entities/token";
import { TokenIcon } from "@/entities/token";
import { formatAmount } from "@/shared/lib/format";
import { ChevronDownIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";
import styles from "./TokenSelect.module.css";

interface TokenSelectProps {
  tokens: Token[];
  selected: Token;
  onChange: (token: Token) => void;
}

export function TokenSelect({ tokens, selected, onChange }: TokenSelectProps) {
  const [open, setOpen] = useState(false);

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setOpen(false);
    }
  }

  return (
    <div className={styles.wrapper} onBlur={handleBlur}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <TokenIcon token={selected} size={24} />
        <span className={styles.symbol}>{selected.symbol}</span>
        <ChevronDownIcon size={16} className={cn(styles.chevron, open && styles.chevronOpen)} />
      </button>

      {open && (
        <div className={styles.panel} role="listbox">
          {tokens.map((token) => (
            <button
              key={token.symbol}
              type="button"
              role="option"
              aria-selected={token.symbol === selected.symbol}
              className={cn(styles.option, token.symbol === selected.symbol && styles.optionActive)}
              onClick={() => {
                onChange(token);
                setOpen(false);
              }}
            >
              <TokenIcon token={token} size={28} />
              <span className={styles.optionText}>
                <span className={styles.optionSymbol}>{token.symbol}</span>
                <span className={styles.optionName}>{token.name}</span>
              </span>
              <span className={styles.optionBalance}>{formatAmount(token.balance, 4)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
