import { Card } from "@/shared/ui/Card";
import { IconButton } from "@/shared/ui/IconButton";
import { MetricsBar, type MetricSegment } from "@/shared/ui/MetricsBar";
import { TokenIcon, type Token } from "@/entities/token";
import { ExternalLinkIcon } from "@/shared/ui/icons";
import { formatAddress, formatAmount, formatCompactUsd, timeAgo } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";
import { buildTransactions, groupByDay } from "../model/mock";
import styles from "./TransactionsHistory.module.css";

export function TransactionsHistory({ tokens }: { tokens: Token[] }) {
  const transactions = buildTransactions(tokens);
  const groups = groupByDay(transactions);

  const successCount = transactions.filter((tx) => tx.status === "success").length;
  const pendingCount = transactions.length - successCount;
  const totalVolume = transactions.reduce((sum, tx) => sum + tx.fromAmount * tx.fromToken.price, 0);
  const successRate = transactions.length > 0 ? Math.round((successCount / transactions.length) * 100) : 0;

  const segments: MetricSegment[] = [
    { label: "Total Swaps", value: String(transactions.length) },
    { label: "Total Volume", value: formatCompactUsd(totalVolume) },
    { label: "Success Rate", value: `${successRate}%` },
    { label: "Pending", value: String(pendingCount) },
  ];

  return (
    <div className={styles.stack}>
      <MetricsBar segments={segments} />

      <Card className={styles.card}>
        <h2 className={styles.title}>Recent transactions</h2>

        {groups.map((group) => (
          <div key={group.label} className={styles.group}>
            <span className={styles.groupLabel}>{group.label}</span>

            <ul className={styles.list}>
              {group.transactions.map((tx) => (
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

                  <IconButton size="sm" variant="ghost" aria-label="View on explorer" className={styles.link}>
                    <ExternalLinkIcon size={14} />
                  </IconButton>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Card>
    </div>
  );
}
