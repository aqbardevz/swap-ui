export interface Token {
  symbol: string;
  name: string;
  coingeckoId: string;
  color: string;
  logo: string | null;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  marketCapRank: number | null;
  sparkline: number[];
  balance: number;
}

export interface PricePoint {
  time: number;
  price: number;
}

export interface TokenLinks {
  homepage: string | null;
  explorer: string | null;
  twitter: string | null;
  github: string | null;
  reddit: string | null;
}

export interface TokenDetail {
  symbol: string;
  name: string;
  coingeckoId: string;
  color: string;
  logo: string | null;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  marketCapRank: number | null;
  fdv: number | null;
  high24h: number;
  low24h: number;
  ath: number;
  athDate: string | null;
  athChangePercentage: number;
  atl: number;
  atlDate: string | null;
  circulatingSupply: number;
  totalSupply: number | null;
  maxSupply: number | null;
  genesisDate: string | null;
  priceChange1h: number | null;
  priceChange7d: number | null;
  priceChange14d: number | null;
  priceChange30d: number | null;
  priceChange1y: number | null;
  sentimentUp: number | null;
  sentimentDown: number | null;
  description: string | null;
  links: TokenLinks;
  contractAddress: string | null;
  contractPlatform: string | null;
  chart1d: PricePoint[];
  chart7d: PricePoint[];
  chart30d: PricePoint[];
  chart1y: PricePoint[];
}
