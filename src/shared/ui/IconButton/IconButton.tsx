import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./IconButton.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "surface" | "ghost" | "accent";
}

export function IconButton({
  size = "md",
  variant = "surface",
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      className={cn(styles.iconButton, styles[size], styles[variant], className)}
      {...rest}
    />
  );
}
