import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  fullWidth?: boolean;
  icon?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  icon,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        className
      )}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
