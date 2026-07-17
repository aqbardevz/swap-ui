import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Skeleton.module.css";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: "sm" | "md" | "lg" | "full";
  className?: string;
}

export function Skeleton({ width, height, radius = "sm", className }: SkeletonProps) {
  const style: CSSProperties = {
    width,
    height,
  };

  return <span className={cn(styles.skeleton, styles[radius], className)} style={style} aria-hidden="true" />;
}
