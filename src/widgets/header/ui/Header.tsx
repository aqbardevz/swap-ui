"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PreferencesMenu } from "@/features/preferences-menu";
import { WalletConnectButton } from "@/features/wallet-connect";
import { IconButton } from "@/shared/ui/IconButton";
import { CloseIcon, MenuIcon } from "@/shared/ui/icons";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { label: "Swap", href: "/" },
  { label: "Market", href: "/market" },
  { label: "Activity", href: "/transactions" },
];

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive(pathname, item.href)
                  ? styles.navItemActive
                  : styles.navItem
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className={styles.brand}>
          Swwwapz.
        </Link>

        <div className={styles.actions}>
          <PreferencesMenu />
          <WalletConnectButton />
          <IconButton
            className={styles.menuButton}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </IconButton>
        </div>
      </div>

      {mobileOpen && (
        <nav className={styles.mobileNav}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive(pathname, item.href)
                  ? styles.mobileNavItemActive
                  : styles.mobileNavItem
              }
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
