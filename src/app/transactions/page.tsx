import type { Metadata } from "next";
import { getLiveTokens } from "@/entities/token/api/coingecko";
import { TransactionsHistory } from "@/widgets/transactions-history";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Activity — Nova Swap",
};

export default async function TransactionsPage() {
  const tokens = await getLiveTokens();

  return (
    <main className={`container ${styles.wrap}`}>
      <div className={styles.col}>
        <TransactionsHistory tokens={tokens} />
      </div>
    </main>
  );
}
