import Link from "next/link";
import { Card } from "@/shared/ui/Card";
import { TokenIcon, type TokenDetail } from "@/entities/token";
import {
  formatCompactNumber,
  formatCompactUsd,
  formatDate,
  formatPercent,
  formatUsd,
} from "@/shared/lib/format";
import { SwapIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";
import { PriceChart } from "./PriceChart";
import { ChangeChips } from "./ChangeChips";
import { RangeBar } from "./RangeBar";
import { SentimentBar } from "./SentimentBar";
import { AboutSection } from "./AboutSection";
import { LinksRow } from "./LinksRow";
import { ContractAddress } from "./ContractAddress";
import styles from "./TokenDetailView.module.css";

export function TokenDetailView({ detail }: { detail: TokenDetail }) {
  const positive = detail.change24h >= 0;
  const hasSupplyCap = detail.maxSupply !== null || detail.totalSupply !== null;
  const hasSentiment = detail.sentimentUp !== null && detail.sentimentDown !== null;
  const hasContract = detail.contractAddress !== null && detail.contractPlatform !== null;
  const hasLinks = Object.values(detail.links).some(Boolean);
  const hasCommunityCard = hasSentiment || hasContract || hasLinks;

  return (
    <div>
      <Link href="/market" className={styles.back}>
        ← Market
      </Link>

      <div className={styles.layout}>
        <Card className={styles.main}>
          <div className={styles.header}>
            <TokenIcon token={detail} size={52} />
            <div className={styles.headerText}>
              <div className={styles.titleRow}>
                <h1 className={styles.name}>{detail.name}</h1>
                <span className={styles.symbol}>{detail.symbol}</span>
                {detail.marketCapRank && <span className={styles.rankBadge}>Rank #{detail.marketCapRank}</span>}
              </div>
              <div className={styles.priceRow}>
                <span className={styles.price}>{formatUsd(detail.price)}</span>
                <span className={cn(styles.change, positive ? styles.up : styles.down)}>
                  {formatPercent(detail.change24h)}
                </span>
              </div>
              <ChangeChips
                changes={[
                  { label: "1H", value: detail.priceChange1h },
                  { label: "7D", value: detail.priceChange7d },
                  { label: "14D", value: detail.priceChange14d },
                  { label: "30D", value: detail.priceChange30d },
                  { label: "1Y", value: detail.priceChange1y },
                ]}
              />
            </div>
            <Link href={`/?sell=${detail.symbol}`} className={styles.swapButton}>
              <SwapIcon size={15} />
              Swap {detail.symbol}
            </Link>
          </div>

          <PriceChart
            chart1d={detail.chart1d}
            chart7d={detail.chart7d}
            chart30d={detail.chart30d}
            chart1y={detail.chart1y}
            positive={positive}
          />

          {detail.high24h > 0 && detail.low24h > 0 && (
            <RangeBar low={detail.low24h} high={detail.high24h} price={detail.price} />
          )}

          {detail.description && <AboutSection name={detail.name} description={detail.description} />}
        </Card>

        <div className={styles.sidebar}>
          <Card className={styles.sidebarCard}>
            <h2 className={styles.sidebarTitle}>Stats</h2>
            <div className={styles.statList}>
              <div className={styles.statRow}>
                <span className={styles.statRowLabel}>Market Cap</span>
                <span className={styles.statRowValue}>{formatCompactUsd(detail.marketCap)}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statRowLabel}>24h Volume</span>
                <span className={styles.statRowValue}>{formatCompactUsd(detail.volume24h)}</span>
              </div>
              {detail.fdv && (
                <div className={styles.statRow}>
                  <span className={styles.statRowLabel}>Fully Diluted Valuation</span>
                  <span className={styles.statRowValue}>{formatCompactUsd(detail.fdv)}</span>
                </div>
              )}
              <div className={styles.statRow}>
                <span className={styles.statRowLabel}>Circulating Supply</span>
                <span className={styles.statRowValue}>
                  {formatCompactNumber(detail.circulatingSupply)} {detail.symbol}
                </span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statRowLabel}>{detail.maxSupply ? "Max Supply" : "Total Supply"}</span>
                <span className={styles.statRowValue}>
                  {hasSupplyCap
                    ? `${formatCompactNumber(detail.maxSupply ?? detail.totalSupply ?? 0)} ${detail.symbol}`
                    : "—"}
                </span>
              </div>
              {detail.genesisDate && (
                <div className={styles.statRow}>
                  <span className={styles.statRowLabel}>Genesis Date</span>
                  <span className={styles.statRowValue}>{formatDate(detail.genesisDate)}</span>
                </div>
              )}
              <div className={styles.statRow}>
                <span className={styles.statRowLabel}>All-Time High</span>
                <span className={styles.statRowValueGroup}>
                  <span className={styles.statRowValue}>{formatUsd(detail.ath)}</span>
                  <span className={styles.statRowMeta}>
                    {formatPercent(detail.athChangePercentage)} ·{" "}
                    {detail.athDate ? formatDate(detail.athDate) : "—"}
                  </span>
                </span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statRowLabel}>All-Time Low</span>
                <span className={styles.statRowValueGroup}>
                  <span className={styles.statRowValue}>{formatUsd(detail.atl)}</span>
                  <span className={styles.statRowMeta}>{detail.atlDate ? formatDate(detail.atlDate) : "—"}</span>
                </span>
              </div>
            </div>
          </Card>

          {hasCommunityCard && (
            <Card className={styles.sidebarCard}>
              <h2 className={styles.sidebarTitle}>Community</h2>
              <div className={styles.sidebarStack}>
                {hasSentiment && <SentimentBar up={detail.sentimentUp as number} down={detail.sentimentDown as number} />}
                {hasContract && (
                  <ContractAddress address={detail.contractAddress as string} platform={detail.contractPlatform as string} />
                )}
                {hasLinks && <LinksRow links={detail.links} />}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
