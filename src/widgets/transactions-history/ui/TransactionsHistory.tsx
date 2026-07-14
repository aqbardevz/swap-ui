import { Card } from "@/shared/ui/Card";
import { IconButton } from "@/shared/ui/IconButton";
import { TokenIcon, type Token } from "@/entities/token";
import { ExternalLinkIcon } from "@/shared/ui/icons";
import { formatAddress, formatAmount, timeAgo } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";
import { buildTransactions } from "../model/mock";
import styles from "./TransactionsHistory.module.css";

export function TransactionsHistory({ tokens }: { tokens: Token[] }) {
  const transactions = buildTransactions(tokens);

  return (
    <Card className={styles.card}>
      <h2 className={styles.title}>Recent transactions</h2>

      <ul className={styles.list}>
        {transactions.map((tx) => (
          <li key={tx.id} className={styles.item}>
            <div className={styles.icons}>
              <TokenIcon token={tx.fromToken} size={28} />
              <TokenIcon token={tx.toToken} size={28} />
            </div>

            <div className={styles.info}>
              <span className={styles.amounts}>
                {formatAmount(tx.fromAmount, 4)} {tx.fromToken.symbol}
                <span className={styles.arrow}>→</span>
                {formatAmount(tx.toAmount, 4)} {tx.toToken.symbol}
              </span>
              <span className={styles.meta}>
                {formatAddress(tx.account)} · {timeAgo(tx.timestamp)}
              </span>
            </div>

            <span className={cn(styles.status, tx.status === "pending" && styles.statusPending)}>
              {tx.status === "pending" ? "Pending" : "Success"}
            </span>

            <IconButton
              size="sm"
              variant="ghost"
              aria-label="View on explorer"
              className={styles.link}
            >
              <ExternalLinkIcon size={14} />
            </IconButton>
          </li>
        ))}
      </ul>
    </Card>
  );
}
