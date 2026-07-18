import type { Network } from "../model/types";
import styles from "./NetworkIcon.module.css";

interface NetworkIconProps {
  network: Network;
  size?: number;
}

export function NetworkIcon({ network, size = 24 }: NetworkIconProps) {
  const Icon = network.icon;

  return (
    <span
      className={styles.icon}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.55,
        background: `linear-gradient(145deg, ${network.color}, ${network.color}99)`,
      }}
    >
      {Icon ? <Icon size={size * 0.6} /> : network.name.slice(0, 1)}
    </span>
  );
}
