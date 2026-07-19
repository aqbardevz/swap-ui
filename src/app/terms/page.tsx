import type { Metadata } from "next";
import { LegalPage } from "@/shared/ui/LegalPage";

export const metadata: Metadata = {
  title: "Terms of use — Nova Swap",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      updated="July 1, 2026"
      intro="These terms govern your use of Nova Swap. By connecting a wallet and using this site, you agree to the terms below. This page is provided for demonstration purposes."
      sections={[
        {
          heading: "Acceptance of terms",
          body: [
            "By accessing or using Nova Swap, you agree to be bound by these terms. If you do not agree, you should not use the site.",
          ],
        },
        {
          heading: "Eligibility",
          body: [
            "You must be legally permitted to use digital asset services in your jurisdiction. It is your responsibility to determine whether your use of this site is lawful where you live.",
          ],
        },
        {
          heading: "Wallet connection",
          body: [
            "Connecting a wallet does not transfer custody of your assets to Nova Swap. You are responsible for the security of your wallet, private keys, and seed phrase.",
          ],
        },
        {
          heading: "Prohibited use",
          body: [
            "You may not use this site to violate any applicable law, to launder funds, or to interact with contracts or tokens you know to be fraudulent.",
          ],
        },
        {
          heading: "Changes to these terms",
          body: [
            "We may update these terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.",
          ],
        },
        {
          heading: "Contact",
          body: ["Questions about these terms can be sent to legal@novaswap.example."],
        },
      ]}
    />
  );
}
