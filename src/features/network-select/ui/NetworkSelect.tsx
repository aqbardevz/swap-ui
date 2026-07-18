"use client";

import { useState } from "react";
import { NETWORKS, NetworkIcon, type Network } from "@/entities/network";
import { ChevronDownIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";
import { useClickOutside } from "@/shared/lib/useClickOutside";
import styles from "./NetworkSelect.module.css";

interface NetworkSelectProps {
  selected: Network;
  onChange: (network: Network) => void;
}

export function NetworkSelect({ selected, onChange }: NetworkSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <NetworkIcon network={selected} size={24} />
        <span className={styles.name}>{selected.name}</span>
        <ChevronDownIcon size={16} className={cn(styles.chevron, open && styles.chevronOpen)} />
      </button>

      {open && (
        <div className={styles.panel} role="listbox">
          {NETWORKS.map((network) => (
            <button
              key={network.id}
              type="button"
              role="option"
              aria-selected={network.id === selected.id}
              className={cn(styles.option, network.id === selected.id && styles.optionActive)}
              onClick={() => {
                onChange(network);
                setOpen(false);
              }}
            >
              <NetworkIcon network={network} size={24} />
              <span>{network.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
