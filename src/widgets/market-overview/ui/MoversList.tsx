import Link from "next/link";
import { Card } from "@/shared/ui/Card";
import { TokenIcon, type Token } from "@/entities/token";
import { formatPercent, formatUsd } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";
import styles from "./MoversList.module.css";

interface MoversListProps {
  title: string;
  tokens: Token[];
  tone: "positive" | "negative";
}

export function MoversList({ title, tokens, tone }: MoversListProps) {
  return (
    <Card className={styles.card}>
      <h3 className={styles.title}>{title}</h3>

      {tokens.length === 0 ? (
        <p className={styles.empty}>No {tone === "positive" ? "gainers" : "losers"} right now.</p>
      ) : (
        <div className={styles.list}>
          {tokens.map((token) => (
            <Link key={token.symbol} href={`/market/${token.symbol.toLowerCase()}`} className={styles.row}>
              <span className={styles.tokenCell}>
                <TokenIcon token={token} size={26} />
                <span className={styles.symbol}>{token.symbol}</span>
              </span>
              <span className={styles.priceCell}>
                <span className={styles.price}>{formatUsd(token.price)}</span>
                <span className={cn(styles.change, tone === "positive" ? styles.up : styles.down)}>
                  {formatPercent(token.change24h)}
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </Card>
  );
}
