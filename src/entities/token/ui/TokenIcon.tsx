"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./TokenIcon.module.css";

interface TokenIconProps {
  token: { symbol: string; logo: string | null; color: string };
  size?: number;
}

export function TokenIcon({ token, size = 32 }: TokenIconProps) {
  const [failed, setFailed] = useState(false);

  if (token.logo && !failed) {
    return (
      <Image
        src={token.logo}
        alt={token.symbol}
        width={size}
        height={size}
        className={styles.image}
        style={{ width: size, height: size }}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span
      className={styles.icon}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        background: `linear-gradient(145deg, ${token.color}, ${token.color}99)`,
      }}
    >
      {token.symbol.slice(0, 1)}
    </span>
  );
}
