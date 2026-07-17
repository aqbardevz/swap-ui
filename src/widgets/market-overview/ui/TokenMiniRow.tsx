import Link from "next/link";
import { TokenIcon, type Token } from "@/entities/token";
import { formatPercent, formatUsd } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";
import styles from "./TokenMiniRow.module.css";

export function TokenMiniRow({ token, positive }: { token: Token; positive: boolean }) {
  return (
    <Link href={`/market/${token.symbol.toLowerCase()}`} className={styles.row}>
      <span className={styles.tokenCell}>
        <TokenIcon token={token} size={26} />
        <span className={styles.symbol}>{token.symbol}</span>
      </span>
      <span className={styles.priceCell}>
        <span className={styles.price}>{formatUsd(token.price)}</span>
        <span className={cn(styles.change, positive ? styles.up : styles.down)}>
          {formatPercent(token.change24h)}
        </span>
      </span>
    </Link>
  );
}
