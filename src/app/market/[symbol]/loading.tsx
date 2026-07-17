import { Skeleton } from "@/shared/ui/Skeleton";
import pageStyles from "./page.module.css";
import detailStyles from "@/widgets/token-detail/ui/TokenDetailView.module.css";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <main className={`container ${pageStyles.wrap}`}>
      <div className={pageStyles.col}>
        <Skeleton width={90} height={14} className={detailStyles.back} />

        <div className={detailStyles.layout}>
          <div className={detailStyles.main}>
            <div className={detailStyles.header}>
              <Skeleton width={52} height={52} radius="full" />
              <div className={detailStyles.headerText}>
                <div className={detailStyles.titleRow}>
                  <Skeleton width={120} height={20} />
                  <Skeleton width={50} height={14} />
                </div>
                <div className={detailStyles.priceRow}>
                  <Skeleton width={130} height={28} />
                  <Skeleton width={60} height={20} radius="full" />
                </div>
                <Skeleton width={220} height={13} className={styles.textLine} />
              </div>
              <Skeleton width={110} height={40} radius="md" />
            </div>

            <Skeleton height={220} radius="md" className={styles.spacer} />
            <Skeleton height={40} radius="md" className={styles.spacer} />

            <Skeleton width="90%" height={13} />
            <Skeleton width="75%" height={13} className={styles.textLine} />
            <Skeleton width="60%" height={13} className={styles.textLine} />
          </div>

          <div className={detailStyles.sidebar}>
            <div className={detailStyles.sidebarCard}>
              <Skeleton width={60} height={16} className={styles.spacer} />
              <div className={detailStyles.statList}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className={detailStyles.statRow}>
                    <Skeleton width={100} height={13} />
                    <Skeleton width={70} height={13} />
                  </div>
                ))}
              </div>
            </div>

            <div className={detailStyles.sidebarCard}>
              <Skeleton width={90} height={16} className={styles.spacer} />
              <Skeleton height={8} radius="full" className={styles.spacer} />
              <Skeleton width="100%" height={13} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
