import { Card } from "@/shared/ui/Card";
import type { Token } from "@/entities/token";
import { TokenMiniRow } from "./TokenMiniRow";
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
            <TokenMiniRow key={token.symbol} token={token} positive={tone === "positive"} />
          ))}
        </div>
      )}
    </Card>
  );
}
