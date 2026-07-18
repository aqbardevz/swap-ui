import type { Token } from "@/entities/token";
import { Beams } from "@/shared/ui/Beams";
import { SwapWidget } from "@/widgets/swap-widget";
import styles from "./Hero.module.css";

interface HeroProps {
  tokens: Token[];
  initialSellSymbol?: string;
}

export function Hero({ tokens, initialSellSymbol }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>
      <div className={styles.inner}>
        <SwapWidget tokens={tokens} initialSellSymbol={initialSellSymbol} />
      </div>
    </section>
  );
}
