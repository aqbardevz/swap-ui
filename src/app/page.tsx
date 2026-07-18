import type { Metadata } from "next";
import { getLiveTokens } from "@/entities/token/api/coingecko";
import { Hero } from "@/widgets/hero";

export const metadata: Metadata = {
  title: "Swap — Nova Swap",
};

interface SwapPageProps {
  searchParams: Promise<{ sell?: string }>;
}

export default async function SwapPage({ searchParams }: SwapPageProps) {
  const [tokens, { sell }] = await Promise.all([getLiveTokens(), searchParams]);

  return <Hero tokens={tokens} initialSellSymbol={sell} />;
}
