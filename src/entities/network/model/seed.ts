import { SiEthereum, SiBnbchain, SiPolygon, SiOptimism, SiSolana } from "react-icons/si";
import type { Network } from "./types";

/** Purely decorative — no on-chain data is modeled, this app has a single mock balance per token. */
export const NETWORKS: Network[] = [
  { id: "ethereum", name: "Ethereum", color: "#627eea", icon: SiEthereum },
  { id: "bnb-chain", name: "BNB Chain", color: "#f0b90b", icon: SiBnbchain },
  { id: "polygon", name: "Polygon", color: "#8247e5", icon: SiPolygon },
  { id: "arbitrum", name: "Arbitrum", color: "#28a0f0", icon: null },
  { id: "avalanche", name: "Avalanche", color: "#e84142", icon: null },
  { id: "optimism", name: "Optimism", color: "#ff0420", icon: SiOptimism },
  { id: "solana", name: "Solana", color: "#14f195", icon: SiSolana },
];
