import { Card } from "@/shared/ui/Card";
import type { Token } from "@/entities/token";
import type { GlobalStats } from "@/entities/market";
import { WatchlistProvider } from "@/features/watchlist";
import { formatCompactUsd, formatShare } from "@/shared/lib/format";
import { MetricsBar, type MetricSegment } from "@/shared/ui/MetricsBar";
import { MoversList } from "./MoversList";
import { WatchlistPanel } from "./WatchlistPanel";
import { TokenTable } from "./TokenTable";
import styles from "./MarketOverview.module.css";

interface MarketOverviewProps {
  tokens: Token[];
  global: GlobalStats;
}

export function MarketOverview({ tokens, global }: MarketOverviewProps) {
  const segments: MetricSegment[] = [
    {
      label: "Total Market Cap",
      value: formatCompactUsd(global.totalMarketCap),
      delta: global.marketCapChange24h,
    },
    { label: "24h Volume", value: formatCompactUsd(global.totalVolume) },
    { label: "BTC Dominance", value: formatShare(global.btcDominance) },
    { label: "Tracked Assets", value: String(tokens.length) },
  ];

  const gainers = [...tokens]
    .filter((token) => token.change24h > 0)
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 3);

  const losers = [...tokens]
    .filter((token) => token.change24h < 0)
    .sort((a, b) => a.change24h - b.change24h)
    .slice(0, 3);

  return (
    <WatchlistProvider>
      <div className={styles.stack}>
        <MetricsBar segments={segments} />

        <WatchlistPanel tokens={tokens} />

        <div className={styles.moversGrid}>
          <MoversList title="Top Gainers · 24h" tokens={gainers} tone="positive" />
          <MoversList title="Top Losers · 24h" tokens={losers} tone="negative" />
        </div>

        <Card className={styles.tableCard}>
          <h2 className={styles.tableTitle}>All Tokens</h2>
          <TokenTable tokens={tokens} />
        </Card>
      </div>
    </WatchlistProvider>
  );
}
