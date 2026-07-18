import { Skeleton } from "@/shared/ui/Skeleton";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <main className={styles.wrap}>
      <div className={styles.col}>
        <div className={styles.card}>
          <div className={styles.header}>
            <Skeleton width={64} height={24} />
            <Skeleton width={36} height={36} radius="md" />
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <Skeleton width={32} height={13} />
              <Skeleton width={100} height={13} />
            </div>
            <div className={styles.panelBody}>
              <Skeleton width={110} height={32} />
              <Skeleton width={100} height={40} radius="full" />
            </div>
            <Skeleton width={80} height={13} />
          </div>

          <div className={styles.flipRow}>
            <Skeleton width={40} height={40} radius="full" />
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <Skeleton width={32} height={13} />
              <Skeleton width={100} height={13} />
            </div>
            <div className={styles.panelBody}>
              <Skeleton width={110} height={32} />
              <Skeleton width={100} height={40} radius="full" />
            </div>
            <Skeleton width={80} height={13} />
          </div>

          <Skeleton width="55%" height={14} />

          <div className={styles.details}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className={styles.detailRow}>
                <Skeleton width={110} height={13} />
                <Skeleton width={70} height={13} />
              </div>
            ))}
          </div>

          <Skeleton height={48} radius="md" />
        </div>
      </div>
    </main>
  );
}
