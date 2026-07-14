import { downsample } from "@/shared/lib/sparkline";
import { TOKEN_SEEDS, type TokenSeed } from "../model/seed";
import type { PricePoint, Token, TokenDetail, TokenLinks } from "../model/types";

const MARKETS_URL = "https://api.coingecko.com/api/v3/coins/markets";
const COINS_URL = "https://api.coingecko.com/api/v3/coins";

interface CoinGeckoMarket {
  id: string;
  current_price: number;
  price_change_percentage_24h: number | null;
  total_volume: number;
  market_cap: number;
  market_cap_rank: number | null;
  image: string;
  sparkline_in_7d?: { price: number[] };
}

interface CoinGeckoCoin {
  name: string;
  market_cap_rank: number | null;
  genesis_date: string | null;
  sentiment_votes_up_percentage: number | null;
  sentiment_votes_down_percentage: number | null;
  description?: { en?: string };
  links?: {
    homepage?: string[];
    blockchain_site?: string[];
    twitter_screen_name?: string;
    subreddit_url?: string;
    repos_url?: { github?: string[] };
  };
  platforms?: Record<string, string>;
  image?: { large?: string };
  market_data?: {
    current_price?: { usd?: number };
    price_change_percentage_24h?: number;
    total_volume?: { usd?: number };
    market_cap?: { usd?: number };
    fully_diluted_valuation?: { usd?: number };
    high_24h?: { usd?: number };
    low_24h?: { usd?: number };
    ath?: { usd?: number };
    ath_date?: { usd?: string };
    ath_change_percentage?: { usd?: number };
    atl?: { usd?: number };
    atl_date?: { usd?: string };
    circulating_supply?: number;
    total_supply?: number | null;
    max_supply?: number | null;
    price_change_percentage_1h_in_currency?: { usd?: number };
    price_change_percentage_7d_in_currency?: { usd?: number };
    price_change_percentage_14d_in_currency?: { usd?: number };
    price_change_percentage_30d_in_currency?: { usd?: number };
    price_change_percentage_1y_in_currency?: { usd?: number };
  };
}

interface CoinGeckoMarketChart {
  prices: [number, number][];
}

/**
 * Fetches live prices, 24h change, volume and logos from CoinGecko's public
 * markets endpoint (no API key required). Falls back to zeroed-out data
 * with no logo if the request fails, so the dashboard degrades gracefully
 * instead of crashing when the free tier rate-limits us.
 */
export async function getLiveTokens(): Promise<Token[]> {
  const ids = TOKEN_SEEDS.map((seed) => seed.coingeckoId).join(",");
  const url = `${MARKETS_URL}?vs_currency=usd&ids=${ids}&sparkline=true&price_change_percentage=24h`;

  try {
    const response = await fetch(url, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error(`CoinGecko responded with ${response.status}`);

    const markets: CoinGeckoMarket[] = await response.json();
    const byId = new Map(markets.map((market) => [market.id, market]));

    return TOKEN_SEEDS.map((seed) => {
      const market = byId.get(seed.coingeckoId);
      return {
        symbol: seed.symbol,
        name: seed.name,
        coingeckoId: seed.coingeckoId,
        color: seed.color,
        balance: seed.balance,
        price: market?.current_price ?? 0,
        change24h: market?.price_change_percentage_24h ?? 0,
        volume24h: market?.total_volume ?? 0,
        marketCap: market?.market_cap ?? 0,
        marketCapRank: market?.market_cap_rank ?? null,
        sparkline: market?.sparkline_in_7d?.price ? downsample(market.sparkline_in_7d.price, 12) : [],
        logo: market?.image ?? null,
      };
    });
  } catch {
    return TOKEN_SEEDS.map((seed) => ({
      symbol: seed.symbol,
      name: seed.name,
      coingeckoId: seed.coingeckoId,
      color: seed.color,
      balance: seed.balance,
      price: 0,
      change24h: 0,
      volume24h: 0,
      marketCap: 0,
      marketCapRank: null,
      sparkline: [],
      logo: null,
    }));
  }
}

function stripDescription(html: string | undefined): string | null {
  if (!html) return null;
  const text = html
    .split(/\r\n\r\n/)[0]
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
  return text.length > 0 ? text : null;
}

function firstNonEmpty(list: string[] | undefined): string | null {
  const match = list?.find((item) => item.trim().length > 0);
  return match ?? null;
}

function firstContract(platforms: Record<string, string> | undefined): { address: string; platform: string } | null {
  if (!platforms) return null;
  const entry = Object.entries(platforms).find(([platform, address]) => platform && address?.trim());
  return entry ? { platform: entry[0], address: entry[1] } : null;
}

function toPricePoints(chart: CoinGeckoMarketChart | undefined): PricePoint[] {
  return (chart?.prices ?? []).map(([time, price]) => ({ time, price }));
}

const EMPTY_LINKS: TokenLinks = { homepage: null, explorer: null, twitter: null, github: null, reddit: null };

/**
 * Full detail for a single token: market data, ATH/ATL, community links,
 * sentiment and price history across four ranges. Two chart requests cover
 * all of it — days=30 (hourly) is sliced for 1D/7D/1M, days=365 (daily)
 * covers 1Y — so a full page load costs three upstream calls total. Falls
 * back to zeroed-out data with no chart if CoinGecko is unreachable.
 */
export async function getTokenDetail(seed: TokenSeed): Promise<TokenDetail> {
  const fallback: TokenDetail = {
    symbol: seed.symbol,
    name: seed.name,
    coingeckoId: seed.coingeckoId,
    color: seed.color,
    logo: null,
    price: 0,
    change24h: 0,
    volume24h: 0,
    marketCap: 0,
    marketCapRank: null,
    fdv: null,
    high24h: 0,
    low24h: 0,
    ath: 0,
    athDate: null,
    athChangePercentage: 0,
    atl: 0,
    atlDate: null,
    circulatingSupply: 0,
    totalSupply: null,
    maxSupply: null,
    genesisDate: null,
    priceChange1h: null,
    priceChange7d: null,
    priceChange14d: null,
    priceChange30d: null,
    priceChange1y: null,
    sentimentUp: null,
    sentimentDown: null,
    description: null,
    links: EMPTY_LINKS,
    contractAddress: null,
    contractPlatform: null,
    chart1d: [],
    chart7d: [],
    chart30d: [],
    chart1y: [],
  };

  try {
    const [coinResponse, chart30Response, chart365Response] = await Promise.all([
      fetch(
        `${COINS_URL}/${seed.coingeckoId}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`,
        { next: { revalidate: 60 } }
      ),
      fetch(`${COINS_URL}/${seed.coingeckoId}/market_chart?vs_currency=usd&days=30`, {
        next: { revalidate: 300 },
      }),
      fetch(`${COINS_URL}/${seed.coingeckoId}/market_chart?vs_currency=usd&days=365`, {
        next: { revalidate: 900 },
      }),
    ]);

    if (!coinResponse.ok || !chart30Response.ok || !chart365Response.ok) {
      throw new Error("CoinGecko request failed");
    }

    const coin: CoinGeckoCoin = await coinResponse.json();
    const chart30: CoinGeckoMarketChart = await chart30Response.json();
    const chart365: CoinGeckoMarketChart = await chart365Response.json();

    const points30 = toPricePoints(chart30);
    const points365 = toPricePoints(chart365);

    const chart1d = downsample(points30.slice(-Math.ceil(points30.length * (1 / 30))), 36);
    const chart7d = downsample(points30.slice(-Math.ceil(points30.length * (7 / 30))), 42);
    const chart30d = downsample(points30, 60);
    const chart1y = downsample(points365, 52);

    const market = coin.market_data;
    const contract = firstContract(coin.platforms);

    return {
      symbol: seed.symbol,
      name: coin.name ?? seed.name,
      coingeckoId: seed.coingeckoId,
      color: seed.color,
      logo: coin.image?.large ?? null,
      price: market?.current_price?.usd ?? 0,
      change24h: market?.price_change_percentage_24h ?? 0,
      volume24h: market?.total_volume?.usd ?? 0,
      marketCap: market?.market_cap?.usd ?? 0,
      marketCapRank: coin.market_cap_rank ?? null,
      fdv: market?.fully_diluted_valuation?.usd ?? null,
      high24h: market?.high_24h?.usd ?? 0,
      low24h: market?.low_24h?.usd ?? 0,
      ath: market?.ath?.usd ?? 0,
      athDate: market?.ath_date?.usd ?? null,
      athChangePercentage: market?.ath_change_percentage?.usd ?? 0,
      atl: market?.atl?.usd ?? 0,
      atlDate: market?.atl_date?.usd ?? null,
      circulatingSupply: market?.circulating_supply ?? 0,
      totalSupply: market?.total_supply ?? null,
      maxSupply: market?.max_supply ?? null,
      genesisDate: coin.genesis_date ?? null,
      priceChange1h: market?.price_change_percentage_1h_in_currency?.usd ?? null,
      priceChange7d: market?.price_change_percentage_7d_in_currency?.usd ?? null,
      priceChange14d: market?.price_change_percentage_14d_in_currency?.usd ?? null,
      priceChange30d: market?.price_change_percentage_30d_in_currency?.usd ?? null,
      priceChange1y: market?.price_change_percentage_1y_in_currency?.usd ?? null,
      sentimentUp: coin.sentiment_votes_up_percentage ?? null,
      sentimentDown: coin.sentiment_votes_down_percentage ?? null,
      description: stripDescription(coin.description?.en),
      links: {
        homepage: firstNonEmpty(coin.links?.homepage),
        explorer: firstNonEmpty(coin.links?.blockchain_site),
        twitter: coin.links?.twitter_screen_name ? `https://twitter.com/${coin.links.twitter_screen_name}` : null,
        github: firstNonEmpty(coin.links?.repos_url?.github),
        reddit: coin.links?.subreddit_url?.trim() ? coin.links.subreddit_url : null,
      },
      contractAddress: contract?.address ?? null,
      contractPlatform: contract?.platform ?? null,
      chart1d,
      chart7d,
      chart30d,
      chart1y,
    };
  } catch {
    return fallback;
  }
}
