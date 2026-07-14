import type { Metadata } from "next";
import { getLiveTokens } from "@/entities/token/api/coingecko";
import { SwapWidget } from "@/widgets/swap-widget";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Swap — Nova Swap",
};

interface SwapPageProps {
  searchParams: Promise<{ sell?: string }>;
}

export default async function SwapPage({ searchParams }: SwapPageProps) {
  const [tokens, { sell }] = await Promise.all([getLiveTokens(), searchParams]);

  return (
    <main className={`container ${styles.wrap}`}>
      <div className={styles.col}>
        <SwapWidget tokens={tokens} initialSellSymbol={sell} />
      </div>
    </main>
  );
}
