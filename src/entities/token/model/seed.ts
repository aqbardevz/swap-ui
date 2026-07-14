export interface TokenSeed {
  symbol: string;
  name: string;
  coingeckoId: string;
  color: string;
  /** Mock wallet balance — no wallet is actually connected on-chain. */
  balance: number;
}

export const TOKEN_SEEDS: TokenSeed[] = [
  { symbol: "ETH", name: "Ethereum", coingeckoId: "ethereum", color: "#627eea", balance: 2.4381 },
  { symbol: "USDC", name: "USD Coin", coingeckoId: "usd-coin", color: "#2775ca", balance: 5120.5 },
  { symbol: "WBTC", name: "Wrapped Bitcoin", coingeckoId: "wrapped-bitcoin", color: "#f7931a", balance: 0.0812 },
  { symbol: "USDT", name: "Tether", coingeckoId: "tether", color: "#26a17b", balance: 940.2 },
  { symbol: "ARB", name: "Arbitrum", coingeckoId: "arbitrum", color: "#28a0f0", balance: 812.4 },
  { symbol: "LINK", name: "Chainlink", coingeckoId: "chainlink", color: "#375bd2", balance: 64.9 },
  { symbol: "UNI", name: "Uniswap", coingeckoId: "uniswap", color: "#ff007a", balance: 128.0 },
  { symbol: "OP", name: "Optimism", coingeckoId: "optimism", color: "#ff0420", balance: 305.7 },
];
