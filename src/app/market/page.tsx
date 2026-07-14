import type { Metadata } from "next";
import { getLiveTokens } from "@/entities/token/api/coingecko";
import { getGlobalStats } from "@/entities/market/api/coingecko";
import { MarketOverview } from "@/widgets/market-overview";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Market — Nova Swap",
};

export default async function MarketPage() {
  const [tokens, global] = await Promise.all([getLiveTokens(), getGlobalStats()]);

  return (
    <main className={`container ${styles.wrap}`}>
      <div className={styles.col}>
        <MarketOverview tokens={tokens} global={global} />
      </div>
    </main>
  );
}
