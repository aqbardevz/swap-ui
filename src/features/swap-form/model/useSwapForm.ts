"use client";

import { useCallback, useMemo, useState } from "react";
import type { Token } from "@/entities/token";
import { NETWORKS, type Network } from "@/entities/network";
import { sanitizeDecimalInput } from "@/shared/lib/decimalInput";

const SLIPPAGE = 0.5;

export function useSwapForm(tokens: Token[], initialSellSymbol?: string) {
  const defaultSell = initialSellSymbol
    ? (tokens.find((token) => token.symbol.toLowerCase() === initialSellSymbol.toLowerCase()) ?? tokens[0])
    : tokens[0];
  const defaultBuy = tokens.find((token) => token.symbol !== defaultSell.symbol) ?? null;

  const [sellToken, setSellTokenState] = useState<Token>(defaultSell);
  const [buyToken, setBuyTokenState] = useState<Token | null>(defaultBuy);
  const [sellAmount, setSellAmountState] = useState("");
  const [sellNetwork, setSellNetwork] = useState<Network>(NETWORKS[0]);
  const [buyNetwork, setBuyNetwork] = useState<Network>(NETWORKS[0]);

  const rate = buyToken && buyToken.price > 0 ? sellToken.price / buyToken.price : 0;

  const buyAmount = useMemo(() => {
    const parsed = Number(sellAmount);
    if (!sellAmount || !buyToken || Number.isNaN(parsed)) return "";
    return (parsed * rate).toFixed(6).replace(/\.?0+$/, "");
  }, [sellAmount, buyToken, rate]);

  const setSellAmount = useCallback((value: string) => {
    setSellAmountState((previous) => sanitizeDecimalInput(value, previous));
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
    setSellAmount(buyAmount || "");
    setSellNetwork(buyNetwork);
    setBuyNetwork(sellNetwork);
  }, [buyToken, sellToken, buyAmount, setSellAmount, sellNetwork, buyNetwork]);

  const setMax = useCallback(() => {
    setSellAmount(String(sellToken.balance));
  }, [sellToken, setSellAmount]);

  return {
    tokens,
    sellToken,
    buyToken,
    sellAmount,
    buyAmount,
    rate,
    slippage: SLIPPAGE,
    sellNetwork,
    buyNetwork,
    setSellToken,
    setBuyToken,
    setSellAmount,
    setSellNetwork,
    setBuyNetwork,
    flip,
    setMax,
  };
}
