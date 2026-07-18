"use client";

import { useCallback, useMemo, useState } from "react";
import type { Token } from "@/entities/token";

export function useSwapForm(tokens: Token[], initialSellSymbol?: string) {
  const defaultSell = initialSellSymbol
    ? (tokens.find((token) => token.symbol.toLowerCase() === initialSellSymbol.toLowerCase()) ?? tokens[0])
    : tokens[0];

  const [sellToken, setSellTokenState] = useState<Token>(defaultSell);
  const [buyToken, setBuyTokenState] = useState<Token | null>(null);
  const [sellAmount, setSellAmountState] = useState("");
  const [slippage, setSlippage] = useState(0.5);

  const rate = buyToken && buyToken.price > 0 ? sellToken.price / buyToken.price : 0;

  const buyAmount = useMemo(() => {
    const parsed = Number(sellAmount);
    if (!sellAmount || !buyToken || Number.isNaN(parsed)) return "";
    return (parsed * rate).toFixed(6).replace(/\.?0+$/, "");
  }, [sellAmount, buyToken, rate]);

  const setSellAmount = useCallback((value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setSellAmountState(value);
    }
  }, []);

  const setSellToken = useCallback(
    (token: Token) => {
      if (buyToken && token.symbol === buyToken.symbol) {
        setBuyTokenState(sellToken);
      }
      setSellTokenState(token);
    },
    [buyToken, sellToken]
  );

  const setBuyToken = useCallback(
    (token: Token) => {
      if (token.symbol === sellToken.symbol) {
        setSellTokenState(buyToken ?? sellToken);
      }
      setBuyTokenState(token);
    },
    [buyToken, sellToken]
  );

  const flip = useCallback(() => {
    if (!buyToken) return;
    setSellTokenState(buyToken);
    setBuyTokenState(sellToken);
    setSellAmountState(buyAmount || "");
  }, [buyToken, sellToken, buyAmount]);

  const setMax = useCallback(() => {
    setSellAmountState(String(sellToken.balance));
  }, [sellToken]);

  return {
    tokens,
    sellToken,
    buyToken,
    sellAmount,
    buyAmount,
    rate,
    slippage,
    setSellToken,
    setBuyToken,
    setSellAmount,
    setSlippage,
    flip,
    setMax,
  };
}
