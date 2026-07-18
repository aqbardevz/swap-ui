"use client";

import { TokenSelect } from "@/features/token-select";
import { IconButton } from "@/shared/ui/IconButton";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { formatAmount, formatUsd } from "@/shared/lib/format";
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
    setSellToken,
    setBuyToken,
    setSellAmount,
    flip,
    setMax,
  } = form;
  const { isConnected } = useWallet();

  return (
    <div className={styles.stack}>
      <div className={`${styles.panel} ${styles.panelTop}`}>
        <div className={styles.panelHeader}>
          <span>Sell</span>
          {isConnected && (
            <span className={styles.balance}>
              Balance: {formatAmount(sellToken.balance, 4)}
              <button type="button" className={styles.maxButton} onClick={setMax}>
                MAX
              </button>
            </span>
          )}
        </div>
        <div className={styles.panelBody}>
          <input
            className={styles.input}
            value={sellAmount}
            onChange={(event) => setSellAmount(event.target.value)}
            placeholder="0"
            inputMode="decimal"
            autoComplete="off"
          />
          <TokenSelect
            tokens={tokens}
            selected={sellToken}
            onChange={setSellToken}
          />
        </div>
        <div className={styles.usdValue}>
          {formatUsd(Number(sellAmount || 0) * sellToken.price)}
        </div>
      </div>

      <div className={styles.flipRow}>
        <IconButton
          variant="accent"
          className={styles.flipButton}
          aria-label="Flip tokens"
          onClick={flip}
        >
          <CgArrowsExchangeAltV size={18} />
        </IconButton>
      </div>

      <div className={`${styles.panel} ${styles.panelBottom}`}>
        <div className={styles.panelHeader}>
          <span>Buy</span>
          {isConnected && buyToken && (
            <span className={styles.balance}>Balance: {formatAmount(buyToken.balance, 4)}</span>
          )}
        </div>
        <div className={styles.panelBody}>
          <input
            className={styles.input}
            value={buyAmount}
            readOnly
            placeholder="0"
            tabIndex={-1}
          />
          <TokenSelect
            tokens={tokens}
            selected={buyToken}
            onChange={setBuyToken}
          />
        </div>
        <div className={styles.usdValue}>
          {formatUsd(Number(buyAmount || 0) * (buyToken?.price ?? 0))}
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
