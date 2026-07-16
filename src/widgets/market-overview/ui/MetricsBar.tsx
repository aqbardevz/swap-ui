import { formatPercent } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";
import styles from "./MetricsBar.module.css";

export interface MetricSegment {
  label: string;
  value: string;
  delta?: number;
}

export function MetricsBar({ segments }: { segments: MetricSegment[] }) {
  return (
    <div className={styles.bar}>
      {segments.map((segment) => (
        <div key={segment.label} className={styles.segment}>
          <span className={styles.label}>{segment.label}</span>
          <span className={styles.value}>
            {segment.value}
            {segment.delta !== undefined && (
              <span className={cn(styles.delta, segment.delta >= 0 ? styles.up : styles.down)}>
                {formatPercent(segment.delta)}
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
