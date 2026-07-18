import type { Token } from "@/entities/token";
import { SwapWidget } from "@/widgets/swap-widget";
import styles from "./Hero.module.css";

interface HeroProps {
  tokens: Token[];
  initialSellSymbol?: string;
}

export function Hero({ tokens, initialSellSymbol }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <SwapWidget tokens={tokens} initialSellSymbol={initialSellSymbol} />
      </div>
    </section>
  );
}
