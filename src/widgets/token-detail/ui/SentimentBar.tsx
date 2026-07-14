import { ThumbsDownIcon, ThumbsUpIcon } from "@/shared/ui/icons";
import styles from "./SentimentBar.module.css";

export function SentimentBar({ up, down }: { up: number; down: number }) {
  return (
    <div>
      <span className={styles.title}>Community sentiment</span>
      <div className={styles.bar}>
        <div className={styles.up} style={{ width: `${up}%` }} />
      </div>
      <div className={styles.legend}>
        <span className={styles.upLabel}>
          <ThumbsUpIcon size={13} />
          {up.toFixed(0)}% bullish
        </span>
        <span className={styles.downLabel}>
          <ThumbsDownIcon size={13} />
          {down.toFixed(0)}% bearish
        </span>
      </div>
    </div>
  );
}
