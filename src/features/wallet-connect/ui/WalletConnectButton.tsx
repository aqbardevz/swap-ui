"use client";

import { useWallet } from "../model/wallet-context";
import { Button } from "@/shared/ui/Button";
import { WalletIcon } from "@/shared/ui/icons";
import { formatAddress } from "@/shared/lib/format";
import styles from "./WalletConnectButton.module.css";

export function WalletConnectButton() {
  const { isConnected, address, connect, disconnect } = useWallet();

  if (isConnected && address) {
    return (
      <button type="button" className={styles.connected} onClick={disconnect}>
        <span className={styles.dot} />
        {formatAddress(address)}
      </button>
    );
  }

  return (
    <Button variant="primary" icon={<WalletIcon size={16} />} onClick={connect}>
      Connect Wallet
    </Button>
  );
}
