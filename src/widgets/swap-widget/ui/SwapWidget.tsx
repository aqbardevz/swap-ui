"use client";

import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import type { Token } from "@/entities/token";
import { SwapForm, useSwapForm } from "@/features/swap-form";
import { SlippageSettings } from "@/features/slippage-settings";
import { useWallet } from "@/features/wallet-connect";
import { formatAmount, formatUsd } from "@/shared/lib/format";
import styles from "./SwapWidget.module.css";

interface SwapWidgetProps {
  tokens: Token[];
  initialSellSymbol?: string;
}

export function SwapWidget({ tokens, initialSellSymbol }: SwapWidgetProps) {
  const form = useSwapForm(tokens, initialSellSymbol);
  const { isConnected, connect } = useWallet();
  const { sellToken, buyToken, sellAmount, rate, slippage, setSlippage } = form;

  const hasAmount = Number(sellAmount) > 0;
  const minimumReceived = (Number(sellAmount || 0) * rate * (1 - slippage / 100)).toFixed(6);
  const priceImpact = 0.04;

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Swap</h2>
        <SlippageSettings slippage={slippage} onChange={setSlippage} />
      </div>

      <SwapForm form={form} />

      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span>Price impact</span>
          <span className={styles.detailPositive}>{priceImpact.toFixed(2)}%</span>
        </div>
        <div className={styles.detailRow}>
          <span>Slippage tolerance</span>
          <span>{slippage}%</span>
        </div>
        <div className={styles.detailRow}>
          <span>Minimum received</span>
          <span>
            {formatAmount(Number(minimumReceived), 6)} {buyToken.symbol}
          </span>
        </div>
        <div className={styles.detailRow}>
          <span>Network fee</span>
          <span>{formatUsd(4.82)}</span>
        </div>
      </div>

      {isConnected ? (
        <Button size="lg" fullWidth disabled={!hasAmount}>
          {hasAmount ? `Swap ${sellToken.symbol} for ${buyToken.symbol}` : "Enter an amount"}
        </Button>
      ) : (
        <Button size="lg" fullWidth onClick={connect}>
          Connect Wallet
        </Button>
      )}
    </Card>
  );
}
