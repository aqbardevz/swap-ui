import type { Metadata } from "next";
import { LegalPage } from "@/shared/ui/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy — Nova Swap",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="July 1, 2026"
      intro="This policy explains what information Nova Swap collects and how it is used. This page is provided for demonstration purposes."
      sections={[
        {
          heading: "Information we collect",
          body: [
            "We do not require an account to use Nova Swap. When you connect a wallet, we read your public wallet address and on-chain balances to display them in the interface — we never request or store your private keys or seed phrase.",
            "We may also collect standard technical data such as browser type, device information, and approximate location, typically through analytics cookies.",
          ],
        },
        {
          heading: "How we use information",
          body: [
            "Wallet and balance data is used only to render the swap interface and is not linked to any off-chain identity we hold. Technical data is used to monitor site performance and diagnose issues.",
          ],
        },
        {
          heading: "Cookies and analytics",
          body: [
            "We use a small set of cookies for theme preference and basic, privacy-respecting analytics. You can clear these at any time through your browser settings.",
          ],
        },
        {
          heading: "Data sharing",
          body: [
            "We do not sell personal data. Aggregated, non-identifying usage data may be shared with analytics providers to help us improve the product.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You may disconnect your wallet at any time to stop the site from reading your address and balances. Because swaps are executed on-chain, transaction history itself is public and cannot be deleted.",
          ],
        },
        {
          heading: "Contact",
          body: ["Questions about this policy can be sent to privacy@novaswap.example."],
        },
      ]}
    />
  );
}
