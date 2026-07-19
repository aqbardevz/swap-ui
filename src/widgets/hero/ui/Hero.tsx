import { SiDiscord, SiTelegram, SiX } from "react-icons/si";
import type { Token } from "@/entities/token";
import { Beams } from "@/shared/ui/Beams";
import { SwapIcon } from "@/shared/ui/icons";
import { SwapWidget } from "@/widgets/swap-widget";
import styles from "./Hero.module.css";

const SOCIAL_LINKS = [
  { label: "X (Twitter)", href: "#", Icon: SiX },
  { label: "Discord", href: "#", Icon: SiDiscord },
  { label: "Telegram", href: "#", Icon: SiTelegram },
];

const LEGAL_LINKS = [
  { label: "Legal", href: "/legal" },
  { label: "Terms of use", href: "/terms" },
  { label: "Privacy policy", href: "/policy" },
];

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
        <h1 className={styles.title}>
          <span className={styles.titleText}>Swap</span>
          <span className={styles.titleIcon}>
            <SwapIcon size={20} />
          </span>
          <span className={styles.titleText}>tokens instantly</span>
        </h1>
        <SwapWidget tokens={tokens} initialSellSymbol={initialSellSymbol} />
      </div>

      <footer className={`container ${styles.footer}`}>
        <span className={styles.footerCopy}>© 2026 Swwwapz.</span>

        <div className={styles.footerSocial}>
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className={styles.footerIcon}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <nav className={styles.footerLinks}>
          {LEGAL_LINKS.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </footer>
    </section>
  );
}
