import CurrencyValue from "./CurrencyValue/CurrencyValue";

export const ASSET_GRAPH_DECIMAL_PRECISION = 9;
export const ORDER_PREVIEW_DECIMAL_PRECISION = 9;
export const CALCULATOR_COIN_DECIMAL_PRECISION = 8;
export const ETX_INVEST_PAYMENT_SCREEN = 6;

/**
 * returns the default value respecting the expected length
 * @param length the expected length of zeros
 * @returns string formatted with leading zeros
 */
const getDefaultValue = (length: number) => `0.${"0".repeat(length - 1)}1`;

export const decimalPrecision = (value?: number | string, length?: number) => {
  if (value) {
    const currencyValue = new CurrencyValue(`${value}`);
    if (length) {
      const formattedValue = currencyValue.format(length);
      // CurrencyValue.format returns "0" if the `value` decimal places
      // has more leading zeroes than the provided `length`. So we need to
      // provide a default value for the expected length.
      return formattedValue === "0" ? getDefaultValue(length) : formattedValue;
    }
    return value < 1 ? currencyValue.format(4) : currencyValue.format(2);
  }

  return "0";
};
