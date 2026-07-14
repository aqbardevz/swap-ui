"use client";

import { useState } from "react";
import styles from "./AboutSection.module.css";

const TRUNCATE_AT = 260;

export function AboutSection({ name, description }: { name: string; description: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = description.length > TRUNCATE_AT;
  const shown = expanded || !isLong ? description : `${description.slice(0, TRUNCATE_AT).trim()}…`;

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>About {name}</h2>
      <p className={styles.text}>{shown}</p>
      {isLong && (
        <button type="button" className={styles.toggle} onClick={() => setExpanded((value) => !value)}>
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}
