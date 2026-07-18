const DEFAULT_MAX_INTEGER_DIGITS = 9;
const DEFAULT_MAX_DECIMALS = 8;

interface DecimalInputLimits {
  maxIntegerDigits?: number;
  maxDecimals?: number;
}

/**
 * Validates a decimal-amount string (e.g. a token amount field) as it changes.
 * Returns `next` if it's a well-formed decimal within the digit caps, otherwise
 * falls back to `previous` — so callers can wire this straight into an onChange
 * without the input ever holding malformed or absurdly large values.
 */
export function sanitizeDecimalInput(
  next: string,
  previous: string,
  { maxIntegerDigits = DEFAULT_MAX_INTEGER_DIGITS, maxDecimals = DEFAULT_MAX_DECIMALS }: DecimalInputLimits = {}
): string {
  if (next === "") return "";
  if (!/^\d*\.?\d*$/.test(next)) return previous;

  const [integerPart, decimalPart] = next.split(".");
  if (integerPart.length > maxIntegerDigits) return previous;
  if (decimalPart !== undefined && decimalPart.length > maxDecimals) return previous;

  return next;
}
