import { formatCompactNumber, formatCompactUsd, formatPercent, formatShare } from "@/shared/lib/format";
import { TrendDownIcon, TrendUpIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";
import styles from "./StatCard.module.css";

export interface MarketStat {
  label: string;
  value: number;
  format: "usd-compact" | "count-compact" | "share";
  delta?: number;
}

function formatValue(stat: MarketStat): string {
  if (stat.format === "usd-compact") return formatCompactUsd(stat.value);
  if (stat.format === "share") return formatShare(stat.value);
  return formatCompactNumber(stat.value);
}

export function StatCard({ stat }: { stat: MarketStat }) {
  const hasDelta = stat.delta !== undefined;
  const isPositive = (stat.delta ?? 0) >= 0;

  return (
    <div className={styles.stat}>
      <span className={styles.label}>{stat.label}</span>
      <span className={styles.value}>{formatValue(stat)}</span>
      {hasDelta && (
        <span className={cn(styles.delta, isPositive ? styles.deltaUp : styles.deltaDown)}>
          {isPositive ? <TrendUpIcon size={13} /> : <TrendDownIcon size={13} />}
          {formatPercent(stat.delta as number)}
        </span>
      )}
    </div>
  );
}
