import currencyJS from "currency.js";
import getSymbolFromCurrency from "currency-symbol-map";

const MINIMUM_FIAT_DISPLAY_VALUE = 0.01;
const MINIMUM_VALUE_WITH_SIG_FIGS = 0.00001;

export function formatCurrency(valueInCents: number) {
  return currencyJS(valueInCents, { fromCents: true }).format({ symbol: "" });
}

export function getCurrencySymbol(currencyCode: string) {
  return getSymbolFromCurrency(currencyCode);
}

function getNumberOfDecimals(value: number): number {
  const MAX_SIGNIFICANT_FIGURES = 6;
  const MIN_NUMBER_OF_DECIMALS = 2;

  const numberOfIntegers = Math.floor(value).toString().length;

  const numberOfDecimals =
    numberOfIntegers < MAX_SIGNIFICANT_FIGURES && MAX_SIGNIFICANT_FIGURES - numberOfIntegers > 1
      ? MAX_SIGNIFICANT_FIGURES - numberOfIntegers
      : MIN_NUMBER_OF_DECIMALS;

  return numberOfDecimals;
}

export type NumberFormatOptions = Intl.NumberFormatOptions & {
  notation: "standard" | "compact";
  compactDisplay: "short" | "long";
};

export function displaySignificantFigures(
  value: number,
  notation: "standard" | "compact" = "standard",
  currency = "USD"
) {
  const formatter = new Intl.NumberFormat("en-US", {
    notation,
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 10,
    style: "currency",
    compactDisplay: "long",
  } as NumberFormatOptions);

  const numberOfDecimals = getNumberOfDecimals(value);
  return format(formatter, notation, value, numberOfDecimals, MINIMUM_VALUE_WITH_SIG_FIGS);
}

export function formatUsingIntl(value: number, notation: "standard" | "compact" = "standard", currency = "USD") {
  /** Intl will round up when using compact notation. We do not want to round up
   * so will use a reducer to split into parts, format the decimal part to 10 decimals,
   * and then slice off anything after the second decimal point.
   */
  const formatter = new Intl.NumberFormat("en-US", {
    notation,
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 10,
    style: "currency",
    compactDisplay: "long",
  } as NumberFormatOptions);

  const numberOfDecimals = 2;

  return format(formatter, notation, value, numberOfDecimals, MINIMUM_FIAT_DISPLAY_VALUE);
}

/**
 * Formats the fiat amount using Intl.NumberFormat on the integer part
 * and concatenates with the decimal part. This is useful since we want to
 * display incomplete values like "10." when the user is still typing.
 *
 * @param {string} amount The amount.
 * @returns {string} The formatted amount.
 */
export function formatPartialFiatAmount(amount: string): string {
  const [integer, decimal] = amount.split(".");

  const formatter = new Intl.NumberFormat("en-US", {
    notation: "standard",
  } as NumberFormatOptions);

  const integerPart = formatter.format(parseInt(integer, 10));
  const decimalPart = typeof decimal !== "undefined" ? `.${decimal}` : "";

  return integerPart + decimalPart;
}

function format(
  formatter: Intl.NumberFormat,
  notation: string,
  value: number,
  numberOfDecimals: number,
  minimumValue: number
) {
  const isLessThanMinimum = Math.abs(value) < minimumValue && Math.abs(value) > 0;
  const valueToFormat = isLessThanMinimum ? minimumValue : value;
  const initialFormattedValue = isLessThanMinimum ? "< " : "";

  const maxDecimals = isLessThanMinimum ? undefined : numberOfDecimals;

  return formatter.formatToParts(valueToFormat).reduce((result: string, part: Intl.NumberFormatPart) => {
    if (part.type !== "fraction") {
      // Not the fraction part of formatToParts, just concatenate and move on.
      return result + part.value;
    }
    if (notation === "compact" && value >= 1000) {
      // Is fraction, and for anything greater than a thousand, remove extra .00  or .X0 fractional units.
      return part.value.slice(1, 2) === "0" // if second character is zero
        ? part.value.slice(0, 2) === "00" // if both characters are zero
          ? result.slice(0, -1) // removed the decimal from result (backtrack to remove from result string), don't add fractional parts
          : result + part.value.slice(0, 1) // append first digit, ignore second digit at (1,2) which we know is a zero
        : result + part.value.slice(0, 2); // concatenate the (not 'single zero' or 'double zero') fractional
    }
    return result + part.value.slice(0, maxDecimals);
  }, initialFormattedValue);
}
