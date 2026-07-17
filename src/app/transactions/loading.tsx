import { Skeleton } from "@/shared/ui/Skeleton";
import pageStyles from "./page.module.css";
import barStyles from "@/shared/ui/MetricsBar/MetricsBar.module.css";
import txStyles from "@/widgets/transactions-history/ui/TransactionsHistory.module.css";
import styles from "./loading.module.css";

const GROUPS = [3, 2];

export default function Loading() {
  return (
    <main className={`container ${pageStyles.wrap}`}>
      <div className={pageStyles.col}>
        <div className={txStyles.stack}>
          <div className={barStyles.bar}>
            {["Total Swaps", "Total Volume", "Success Rate", "Pending"].map((label) => (
              <div key={label} className={barStyles.segment}>
                <Skeleton width={80} height={12} />
                <Skeleton width={50} height={20} />
              </div>
            ))}
          </div>

          <div className={txStyles.card}>
            <Skeleton width={160} height={20} className={styles.spacer} />

            {GROUPS.map((count, groupIndex) => (
              <div key={groupIndex} className={txStyles.group}>
                <Skeleton width={60} height={11} className={styles.groupSpacer} />
                <div className={txStyles.list}>
                  {Array.from({ length: count }).map((_, index) => (
                    <div key={index} className={txStyles.item}>
                      <div className={txStyles.icons}>
                        <Skeleton width={28} height={28} radius="full" />
                        <Skeleton width={28} height={28} radius="full" />
                      </div>
                      <div className={txStyles.info}>
                        <Skeleton width={160} height={14} />
                        <Skeleton width={120} height={12} />
                      </div>
                      <Skeleton width={56} height={20} radius="full" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
