"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { TokenIcon, type Token } from "@/entities/token";
import { formatCompactUsd, formatPercent, formatUsd } from "@/shared/lib/format";
import { ChevronDownIcon, SearchIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";
import { Sparkline } from "./Sparkline";
import styles from "./TokenTable.module.css";

type SortKey = "marketCapRank" | "price" | "change24h" | "volume24h";
type SortDirection = "asc" | "desc";

/** Scales badge intensity with move size, capped at a 10% swing. */
function getHeat(change: number): string {
  const magnitude = Math.min(Math.abs(change), 10) / 10;
  return `${8 + magnitude * 22}%`;
}

const COLUMNS: { key: SortKey; label: string; className?: string }[] = [
  { key: "marketCapRank", label: "Token" },
  { key: "price", label: "Price" },
  { key: "change24h", label: "24h" },
  { key: "volume24h", label: "Volume", className: styles.hideSmall },
];

export function TokenTable({ tokens }: { tokens: Token[] }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("marketCapRank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? tokens.filter((token) => token.symbol.toLowerCase().includes(q) || token.name.toLowerCase().includes(q))
      : tokens;

    const dir = sortDirection === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      if (sortKey === "marketCapRank") {
        return dir * ((a.marketCapRank ?? Infinity) - (b.marketCapRank ?? Infinity));
      }
      return dir * (a[sortKey] - b[sortKey]);
    });
  }, [tokens, query, sortKey, sortDirection]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDirection((direction) => (direction === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDirection(key === "marketCapRank" ? "asc" : "desc");
  }

  return (
    <div>
      <div className={styles.searchRow}>
        <SearchIcon size={16} className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          placeholder="Search token or name..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className={styles.tableWrap}>
        <div className={cn(styles.row, styles.tableHead)}>
          {COLUMNS.map((column) => (
            <button
              key={column.key}
              type="button"
              className={cn(styles.sortButton, column.className)}
              onClick={() => toggleSort(column.key)}
            >
              {column.label}
              <ChevronDownIcon
                size={12}
                className={cn(
                  styles.sortIcon,
                  sortKey === column.key && styles.sortIconActive,
                  sortKey === column.key && sortDirection === "asc" && styles.sortIconAsc
                )}
              />
            </button>
          ))}
          <span className={styles.hideSmall}>Last 7 days</span>
        </div>

        {rows.length === 0 && <p className={styles.empty}>No tokens match &ldquo;{query}&rdquo;.</p>}

        {rows.map((token) => {
          const positive = token.change24h >= 0;
          return (
            <Link key={token.symbol} href={`/market/${token.symbol.toLowerCase()}`} className={styles.row}>
              <span className={styles.tokenCell}>
                <span className={styles.rank}>{token.marketCapRank ?? "—"}</span>
                <TokenIcon token={token} size={30} />
                <span className={styles.tokenText}>
                  <span className={styles.tokenSymbol}>{token.symbol}</span>
                  <span className={styles.tokenName}>{token.name}</span>
                </span>
              </span>
              <span className={styles.price}>{formatUsd(token.price)}</span>
              <span
                className={cn(styles.change, positive ? styles.up : styles.down)}
                style={{ "--heat": getHeat(token.change24h) } as CSSProperties}
              >
                {formatPercent(token.change24h)}
              </span>
              <span className={cn(styles.volume, styles.hideSmall)}>{formatCompactUsd(token.volume24h)}</span>
              <span className={styles.hideSmall}>
                <Sparkline values={token.sparkline} positive={positive} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
