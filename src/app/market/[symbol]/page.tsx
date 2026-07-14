import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOKEN_SEEDS, type TokenSeed } from "@/entities/token";
import { getTokenDetail } from "@/entities/token/api/coingecko";
import { TokenDetailView } from "@/widgets/token-detail";
import styles from "./page.module.css";

interface TokenPageProps {
  params: Promise<{ symbol: string }>;
}

function findSeed(symbol: string): TokenSeed | undefined {
  return TOKEN_SEEDS.find((seed) => seed.symbol.toLowerCase() === symbol.toLowerCase());
}

export async function generateMetadata({ params }: TokenPageProps): Promise<Metadata> {
  const { symbol } = await params;
  const seed = findSeed(symbol);
  return { title: seed ? `${seed.symbol} — Nova Swap` : "Token not found — Nova Swap" };
}

export default async function TokenPage({ params }: TokenPageProps) {
  const { symbol } = await params;
  const seed = findSeed(symbol);
  if (!seed) notFound();

  const detail = await getTokenDetail(seed);

  return (
    <main className={`container ${styles.wrap}`}>
      <div className={styles.col}>
        <TokenDetailView detail={detail} />
      </div>
    </main>
  );
}
