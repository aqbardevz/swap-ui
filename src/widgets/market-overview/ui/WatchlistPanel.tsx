"use client";

import { Card } from "@/shared/ui/Card";
import type { Token } from "@/entities/token";
import { useWatchlist } from "@/features/watchlist";
import { TokenMiniRow } from "./TokenMiniRow";
import styles from "./WatchlistPanel.module.css";

export function WatchlistPanel({ tokens }: { tokens: Token[] }) {
  const { favorites } = useWatchlist();
  const watched = tokens.filter((token) => favorites.includes(token.symbol));

  return (
    <Card className={styles.card}>
      <h3 className={styles.title}>Watchlist</h3>

      {watched.length === 0 ? (
        <p className={styles.empty}>Star a token in the table below to track it here.</p>
      ) : (
        <div className={styles.list}>
          {watched.map((token) => (
            <TokenMiniRow key={token.symbol} token={token} positive={token.change24h >= 0} />
          ))}
        </div>
      )}
    </Card>
  );
}
