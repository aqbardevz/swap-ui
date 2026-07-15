"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/features/theme-toggle";
import { WalletConnectButton } from "@/features/wallet-connect";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { label: "Swap", href: "/" },
  { label: "Market", href: "/market" },
  { label: "Activity", href: "/transactions" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.logo}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Nova Swap
        </Link>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? styles.navItemActive : styles.navItem}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <WalletConnectButton />
        </div>
      </div>
    </header>
  );
}
