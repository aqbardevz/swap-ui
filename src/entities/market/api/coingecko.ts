import type { GlobalStats } from "../model/types";

const GLOBAL_URL = "https://api.coingecko.com/api/v3/global";

interface CoinGeckoGlobal {
  data: {
    total_market_cap: { usd: number };
    total_volume: { usd: number };
    market_cap_percentage: { btc: number };
    active_cryptocurrencies: number;
    market_cap_change_percentage_24h_usd: number;
  };
}

/**
 * Whole-market snapshot (total cap, volume, BTC dominance) from CoinGecko's
 * free /global endpoint. Falls back to zeros if the request fails.
 */
export async function getGlobalStats(): Promise<GlobalStats> {
  try {
    const response = await fetch(GLOBAL_URL, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error(`CoinGecko responded with ${response.status}`);

    const { data }: CoinGeckoGlobal = await response.json();

    return {
      totalMarketCap: data.total_market_cap.usd,
      totalVolume: data.total_volume.usd,
      btcDominance: data.market_cap_percentage.btc,
      activeCryptocurrencies: data.active_cryptocurrencies,
      marketCapChange24h: data.market_cap_change_percentage_24h_usd,
    };
  } catch {
    return {
      totalMarketCap: 0,
      totalVolume: 0,
      btcDominance: 0,
      activeCryptocurrencies: 0,
      marketCapChange24h: 0,
    };
  }
}
