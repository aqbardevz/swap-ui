import { Skeleton } from "@/shared/ui/Skeleton";
import pageStyles from "./page.module.css";
import overviewStyles from "@/widgets/market-overview/ui/MarketOverview.module.css";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <main className={`container ${pageStyles.wrap}`}>
      <div className={pageStyles.col}>
        <div className={overviewStyles.stack}>
          <div className={styles.bar}>
            {["Total Market Cap", "24h Volume", "BTC Dominance", "Tracked Assets"].map((label) => (
              <div key={label} className={styles.segment}>
                <Skeleton width={90} height={12} />
                <Skeleton width={70} height={20} />
              </div>
            ))}
          </div>

          <div className={styles.card}>
            <Skeleton width={100} height={16} className={styles.spacer} />
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className={styles.row}>
                <span className={styles.tokenCell}>
                  <Skeleton width={26} height={26} radius="full" />
                  <Skeleton width={60} height={14} />
                </span>
                <Skeleton width={70} height={14} />
              </div>
            ))}
          </div>

          <div className={styles.moversGrid}>
            {[0, 1].map((column) => (
              <div key={column} className={styles.card}>
                <Skeleton width={120} height={16} className={styles.spacer} />
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className={styles.row}>
                    <span className={styles.tokenCell}>
                      <Skeleton width={26} height={26} radius="full" />
                      <Skeleton width={60} height={14} />
                    </span>
                    <Skeleton width={70} height={14} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.card}>
            <Skeleton width={100} height={20} className={styles.spacer} />
            <Skeleton height={40} radius="md" className={styles.spacer} />

            <div className={styles.tableHead}>
              <Skeleton width={18} height={11} />
              <Skeleton width={50} height={11} />
              <Skeleton width={40} height={11} />
            </div>

            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={styles.tableRow}>
                <span className={styles.tokenCell}>
                  <Skeleton width={30} height={30} radius="full" />
                  <Skeleton width={90} height={14} />
                </span>
                <Skeleton width={60} height={14} />
                <Skeleton width={50} height={20} radius="full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
