"use client";

import { useState } from "react";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import type { Token } from "@/entities/token";
import { SwapForm, useSwapForm } from "@/features/swap-form";
import { useWallet } from "@/features/wallet-connect";
import { formatAmount, formatUsd } from "@/shared/lib/format";
import { ChevronDownIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";
import styles from "./SwapWidget.module.css";

interface SwapWidgetProps {
  tokens: Token[];
  initialSellSymbol?: string;
}

export function SwapWidget({ tokens, initialSellSymbol }: SwapWidgetProps) {
  const form = useSwapForm(tokens, initialSellSymbol);
  const { isConnected, connect } = useWallet();
  const { sellToken, buyToken, sellAmount, rate, slippage } = form;
  const [detailsOpen, setDetailsOpen] = useState(false);

  const hasAmount = Number(sellAmount) > 0;
  const hasQuote = hasAmount && buyToken !== null;
  const minimumReceived = (Number(sellAmount || 0) * rate * (1 - slippage / 100)).toFixed(6);
  const priceImpact = 0.04;

  const buttonLabel = !buyToken
    ? "Select a token"
    : !hasAmount
      ? "Enter an amount"
      : `Swap ${sellToken.symbol} for ${buyToken.symbol}`;

  return (
    <Card className={styles.card}>
      <SwapForm form={form} />

      {hasQuote && buyToken && (
        <div className={styles.details}>
          <button
            type="button"
            className={styles.detailsToggle}
            onClick={() => setDetailsOpen((value) => !value)}
            aria-expanded={detailsOpen}
          >
            <span className={styles.detailRow}>
              <span>Price impact</span>
              <span className={styles.detailPositive}>{priceImpact.toFixed(2)}%</span>
            </span>
            <ChevronDownIcon
              size={16}
              className={cn(styles.chevron, detailsOpen && styles.chevronOpen)}
            />
          </button>

          {detailsOpen && (
            <div className={styles.detailsBody}>
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
          )}
        </div>
      )}

      {isConnected ? (
        <Button size="lg" fullWidth disabled={!hasQuote}>
          {buttonLabel}
        </Button>
      ) : (
        <Button size="lg" fullWidth onClick={connect}>
          Connect Wallet
        </Button>
      )}
    </Card>
  );
}
