import { formatPercent } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";
import styles from "./ChangeChips.module.css";

interface Change {
  label: string;
  value: number | null;
}

export function ChangeChips({ changes }: { changes: Change[] }) {
  const available = changes.filter((change): change is Change & { value: number } => change.value !== null);
  if (available.length === 0) return null;

  return (
    <div className={styles.row}>
      {available.map(({ label, value }) => {
        const positive = value >= 0;
        return (
          <span key={label} className={cn(styles.chip, positive ? styles.up : styles.down)}>
            <span className={styles.chipLabel}>{label}</span>
            {formatPercent(value)}
          </span>
        );
      })}
    </div>
  );
}
