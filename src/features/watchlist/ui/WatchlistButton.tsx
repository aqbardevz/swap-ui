"use client";

import type { MouseEvent } from "react";
import { useWatchlist } from "../model/watchlist-context";
import { StarIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";
import styles from "./WatchlistButton.module.css";

export function WatchlistButton({ symbol }: { symbol: string }) {
  const { isFavorite, toggle } = useWatchlist();
  const active = isFavorite(symbol);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    toggle(symbol);
  }

  return (
    <button
      type="button"
      className={cn(styles.button, active && styles.active)}
      aria-label={active ? `Remove ${symbol} from watchlist` : `Add ${symbol} to watchlist`}
      aria-pressed={active}
      onClick={handleClick}
    >
      <StarIcon size={15} className={styles.icon} />
    </button>
  );
}
