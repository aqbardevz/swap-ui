"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@/shared/ui/icons";
import styles from "./ContractAddress.module.css";

function formatPlatform(platform: string): string {
  return platform
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function shortenAddress(address: string): string {
  return `${address.slice(0, 8)}…${address.slice(-6)}`;
}

export function ContractAddress({ address, platform }: { address: string; platform: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Contract ({formatPlatform(platform)})</span>
      <button type="button" className={styles.address} onClick={handleCopy}>
        <span className={styles.addressText}>{shortenAddress(address)}</span>
        {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
      </button>
    </div>
  );
}
