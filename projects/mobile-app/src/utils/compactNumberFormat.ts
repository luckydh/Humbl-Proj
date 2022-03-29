// TODO: we should collect all number functionality.
// this would group this function, decimalPrecision and other currency utils.

import { NumberFormatOptions } from "./currency";

/**
 *
 * @param value
 * @param style Supports formatting as decimal or percentages if passed decimal value of percentage.
 * @returns
 */
export function compactNumberFormat(value: number, style: "decimal" | "percent" = "decimal") {
  const formatOptions: NumberFormatOptions = {
    style,
    notation: "compact",
    compactDisplay: "short",
  };
  if (value < 10 && style === "percent") {
    formatOptions.minimumFractionDigits = 1;
    formatOptions.maximumFractionDigits = 2;
  } else if (value < 1000 && style !== "percent") {
    formatOptions.maximumSignificantDigits = 4;
  }

  return new Intl.NumberFormat("en-US", formatOptions).format(value);
}
