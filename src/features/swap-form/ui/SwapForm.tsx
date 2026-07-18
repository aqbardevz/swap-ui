"use client";

import { TokenSelect } from "@/features/token-select";
import { NetworkSelect } from "@/features/network-select";
import { IconButton } from "@/shared/ui/IconButton";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { formatAmount, formatUsd, splitAmountParts } from "@/shared/lib/format";
import { useWallet } from "@/features/wallet-connect";
import { useSwapForm } from "../model/useSwapForm";
import styles from "./SwapForm.module.css";

export function SwapForm({ form }: { form: ReturnType<typeof useSwapForm> }) {
  const {
    tokens,
    sellToken,
    buyToken,
    sellAmount,
    buyAmount,
    rate,
    sellNetwork,
    buyNetwork,
    setSellToken,
    setBuyToken,
    setSellAmount,
    setSellNetwork,
    setBuyNetwork,
    flip,
    setMax,
  } = form;
  const { isConnected } = useWallet();

  const buyAmountParts = splitAmountParts(
    buyAmount ? formatAmount(Number(buyAmount), 6) : "",
  );

  return (
    <div className={styles.grid}>
      <div className={`${styles.pickerCard} ${styles.pickerSell}`}>
        <div className={styles.pickerLabels}>
          <span>Token</span>
          <span>Network</span>
        </div>
        <div className={styles.pickerRow}>
          <TokenSelect
            tokens={tokens}
            selected={sellToken}
            onChange={setSellToken}
          />
          <span className={styles.slash}>/</span>
          <NetworkSelect selected={sellNetwork} onChange={setSellNetwork} />
        </div>
      </div>

      <div className={`${styles.pickerCard} ${styles.pickerBuy}`}>
        <div className={styles.pickerLabels}>
          <span>Token</span>
          <span>Network</span>
        </div>
        <div className={styles.pickerRow}>
          <TokenSelect
            tokens={tokens}
            selected={buyToken}
            onChange={setBuyToken}
          />
          <span className={styles.slash}>/</span>
          <NetworkSelect selected={buyNetwork} onChange={setBuyNetwork} />
        </div>
      </div>

      <div className={styles.flipRow}>
        <IconButton
          variant="accent"
          className={styles.flipButton}
          aria-label="Flip tokens"
          onClick={flip}
        >
          <CgArrowsExchangeAlt size={18} />
        </IconButton>
      </div>

      <div className={`${styles.amountCard} ${styles.amountSell}`}>
        <div className={styles.amountHeader}>
          <span>You send:</span>
          {isConnected && (
            <span className={styles.balance}>
              Available: {formatAmount(sellToken.balance, 4)}
              <button
                type="button"
                className={styles.maxButton}
                onClick={setMax}
              >
                MAX
              </button>
            </span>
          )}
        </div>
        <input
          className={styles.input}
          value={sellAmount}
          onChange={(event) => setSellAmount(event.target.value)}
          placeholder="0"
          inputMode="decimal"
          autoComplete="off"
        />
        <div className={styles.usdValue}>
          ≈ {formatUsd(Number(sellAmount || 0) * sellToken.price)}
        </div>
      </div>

      <div className={`${styles.amountCard} ${styles.amountBuy}`}>
        <div className={styles.amountHeader}>
          <span>You receive:</span>
          {isConnected && buyToken && (
            <span className={styles.balance}>
              Balance: {formatAmount(buyToken.balance, 4)}
            </span>
          )}
        </div>
        <div className={styles.amountDisplay} data-placeholder={!buyAmount}>
          {buyAmount ? (
            <>
              <span>{buyAmountParts.integer}</span>
              <span className={styles.amountDecimal}>
                {buyAmountParts.decimal}
              </span>
            </>
          ) : (
            "0"
          )}
        </div>
        <div className={styles.usdValue}>
          ≈ {formatUsd(Number(buyAmount || 0) * (buyToken?.price ?? 0))}
        </div>
      </div>

      {buyToken && (
        <div className={styles.rateRow}>
          <span>
            1 {sellToken.symbol} = {formatAmount(rate, 6)} {buyToken.symbol}
          </span>
        </div>
      )}
    </div>
  );
}
