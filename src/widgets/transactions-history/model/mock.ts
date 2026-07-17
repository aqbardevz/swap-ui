import { findToken, type Token } from "@/entities/token";
import { getDayLabel } from "@/shared/lib/format";

export interface Transaction {
  id: string;
  fromToken: Token;
  toToken: Token;
  fromAmount: number;
  toAmount: number;
  account: string;
  timestamp: string;
  status: "success" | "pending";
  txHash: string;
}

export interface TransactionGroup {
  label: string;
  transactions: Transaction[];
}

interface TransactionSeed {
  id: string;
  fromSymbol: string;
  toSymbol: string;
  fromAmount: number;
  toAmount: number;
  account: string;
  minutesAgo: number;
  status: "success" | "pending";
  txHash: string;
}

const TRANSACTION_SEEDS: TransactionSeed[] = [
  {
    id: "1",
    fromSymbol: "ETH",
    toSymbol: "USDC",
    fromAmount: 0.5,
    toAmount: 1710.92,
    account: "0x7a3fD9e2B4c1A8f6D3e5C9b2A4f7D1e8C6b3A9F2",
    minutesAgo: 2,
    status: "success",
    txHash: "0xa1c3",
  },
  {
    id: "2",
    fromSymbol: "WBTC",
    toSymbol: "ETH",
    fromAmount: 0.021,
    toAmount: 0.395,
    account: "0x4c9bE81a2F6d3C8e1B5a7F9D2c4E6b8A1D3f5C7E",
    minutesAgo: 14,
    status: "success",
    txHash: "0x92fe",
  },
  {
    id: "3",
    fromSymbol: "ARB",
    toSymbol: "USDT",
    fromAmount: 420,
    toAmount: 470.4,
    account: "0x1eB6c3a9F2d8B4e6A1c5D9f3E7b2A8c4F6d1E9B3",
    minutesAgo: 47,
    status: "pending",
    txHash: "0x77bd",
  },
  {
    id: "4",
    fromSymbol: "LINK",
    toSymbol: "UNI",
    fromAmount: 18.5,
    toAmount: 32.9,
    account: "0x9dF4a6C1e8B3d5A7f2C9e4B6d1A8f3C5e7B2D4A6",
    minutesAgo: 180,
    status: "success",
    txHash: "0xd410",
  },
  {
    id: "5",
    fromSymbol: "OP",
    toSymbol: "USDC",
    fromAmount: 260,
    toAmount: 600.6,
    account: "0x2fC8b5A3e9D1c7B4a6F2e8D5c3A9b1F7d4E6C2A8",
    minutesAgo: 540,
    status: "success",
    txHash: "0x5c2a",
  },
  {
    id: "6",
    fromSymbol: "UNI",
    toSymbol: "ETH",
    fromAmount: 45,
    toAmount: 0.09,
    account: "0x8b1Ac2f4D6e9B3c7A5d1F8e2C4b6A9d3F7e1C5B8",
    minutesAgo: 1920,
    status: "success",
    txHash: "0x3e7f",
  },
  {
    id: "7",
    fromSymbol: "USDC",
    toSymbol: "WBTC",
    fromAmount: 3200,
    toAmount: 0.0512,
    account: "0x6dA3f1B8c2E5a7D4f9B1c6E3a8D5f2B7c4A1E9D6",
    minutesAgo: 2100,
    status: "pending",
    txHash: "0x1b9c",
  },
  {
    id: "8",
    fromSymbol: "ETH",
    toSymbol: "ARB",
    fromAmount: 1.2,
    toAmount: 13480,
    account: "0x2fC8b5A3e9D1c7B4a6F2e8D5c3A9b1F7d4E6C2A8",
    minutesAgo: 4300,
    status: "success",
    txHash: "0x9a04",
  },
];

/**
 * Recent activity is fabricated — no wallet is actually connected on-chain,
 * so there is no real transaction feed to pull. Token icons/symbols are
 * still resolved from the live token list so they match the rest of the UI.
 */
export function buildTransactions(tokens: Token[]): Transaction[] {
  const now = Date.now();

  return TRANSACTION_SEEDS.map((seed) => ({
    id: seed.id,
    fromToken: findToken(tokens, seed.fromSymbol),
    toToken: findToken(tokens, seed.toSymbol),
    fromAmount: seed.fromAmount,
    toAmount: seed.toAmount,
    account: seed.account,
    timestamp: new Date(now - seed.minutesAgo * 60_000).toISOString(),
    status: seed.status,
    txHash: seed.txHash,
  }));
}

/** Groups already time-sorted transactions into Today / Yesterday / dated buckets. */
export function groupByDay(transactions: Transaction[]): TransactionGroup[] {
  const groups: TransactionGroup[] = [];

  for (const tx of transactions) {
    const label = getDayLabel(tx.timestamp);
    const current = groups[groups.length - 1];
    if (current && current.label === label) {
      current.transactions.push(tx);
    } else {
      groups.push({ label, transactions: [tx] });
    }
  }

  return groups;
}
