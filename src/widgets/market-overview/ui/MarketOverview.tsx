import { Card } from "@/shared/ui/Card";
import type { Token } from "@/entities/token";
import type { GlobalStats } from "@/entities/market";
import { StatCard, type MarketStat } from "./StatCard";
import { TokenTable } from "./TokenTable";
import styles from "./MarketOverview.module.css";

interface MarketOverviewProps {
  tokens: Token[];
  global: GlobalStats;
}

export function MarketOverview({ tokens, global }: MarketOverviewProps) {
  const stats: MarketStat[] = [
    {
      label: "Total Market Cap",
      value: global.totalMarketCap,
      delta: global.marketCapChange24h,
      format: "usd-compact",
    },
    { label: "24h Trading Volume", value: global.totalVolume, format: "usd-compact" },
    { label: "BTC Dominance", value: global.btcDominance, format: "share" },
    { label: "Active Cryptocurrencies", value: global.activeCryptocurrencies, format: "count-compact" },
  ];

  return (
    <Card className={styles.card}>
      <h2 className={styles.title}>Market overview</h2>

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <TokenTable tokens={tokens} />
    </Card>
  );
}
