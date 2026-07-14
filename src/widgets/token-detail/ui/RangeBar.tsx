import { formatUsd } from "@/shared/lib/format";
import styles from "./RangeBar.module.css";

export function RangeBar({ low, high, price }: { low: number; high: number; price: number }) {
  const span = high - low || 1;
  const percent = Math.min(100, Math.max(0, ((price - low) / span) * 100));

  return (
    <div className={styles.wrap}>
      <div className={styles.labels}>
        <span>24h Low</span>
        <span>24h High</span>
      </div>
      <div className={styles.track}>
        <div className={styles.marker} style={{ left: `${percent}%` }} />
      </div>
      <div className={styles.values}>
        <span>{formatUsd(low)}</span>
        <span>{formatUsd(high)}</span>
      </div>
    </div>
  );
}
