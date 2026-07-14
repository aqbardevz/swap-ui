import type { Token } from "./model/types";

export type { Token, TokenDetail, PricePoint, TokenLinks } from "./model/types";
export { TOKEN_SEEDS, type TokenSeed } from "./model/seed";
export { TokenIcon } from "./ui/TokenIcon";

export function findToken(tokens: Token[], symbol: string): Token {
  const token = tokens.find((item) => item.symbol === symbol);
  if (!token) throw new Error(`Unknown token: ${symbol}`);
  return token;
}
