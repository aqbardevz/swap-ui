import type { Metadata } from "next";
import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found — Nova Swap",
};

export default function NotFound() {
  return (
    <main className={`container ${styles.wrap}`}>
      <div className={styles.content}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.text}>The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.</p>
        <div className={styles.actions}>
          <Link href="/" className={styles.homeButton}>
            Back to Swap
          </Link>
          <Link href="/market" className={styles.secondaryLink}>
            Or view the market →
          </Link>
        </div>
      </div>
    </main>
  );
}
