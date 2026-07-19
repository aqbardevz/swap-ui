import type { Metadata } from "next";
import { LegalPage } from "@/shared/ui/LegalPage";

export const metadata: Metadata = {
  title: "Legal — Nova Swap",
};

export default function LegalNoticePage() {
  return (
    <LegalPage
      title="Legal notices"
      updated="July 1, 2026"
      intro="This page contains general legal information about Nova Swap. It is provided for demonstration purposes and does not constitute legal or financial advice."
      sections={[
        {
          heading: "No investment advice",
          body: [
            "Nothing on this site constitutes investment, financial, legal, or tax advice. Digital assets are volatile and you should independently evaluate any decision to acquire, hold, or dispose of them.",
          ],
        },
        {
          heading: "Non-custodial service",
          body: [
            "Nova Swap does not hold, control, or have access to your funds at any point. All swaps are executed directly from your connected wallet, and you remain solely responsible for its security.",
          ],
        },
        {
          heading: "Third-party content",
          body: [
            "Token prices, balances, and market data displayed on this site are sourced from third-party providers and may be inaccurate, delayed, or unavailable. We make no warranty as to their accuracy.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "To the maximum extent permitted by law, Nova Swap and its contributors are not liable for any losses arising from the use of this site, including losses caused by smart contract failures, network congestion, or user error.",
          ],
        },
        {
          heading: "Contact",
          body: ["Questions about these notices can be sent to legal@novaswap.example."],
        },
      ]}
    />
  );
}
