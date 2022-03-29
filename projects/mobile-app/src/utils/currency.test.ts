import { formatPartialFiatAmount, formatUsingIntl, displaySignificantFigures } from "./currency";

// Special Empty string literal which shows up in certain locales.
const EMPTY_STRING_CODE = String.fromCharCode(160);

describe("formatUsingIntl()", () => {
  it("Format Decimals", () => {
    expect(formatUsingIntl(0.123459, "compact", "USD")).toBe("$0.12");
    expect(formatUsingIntl(0.999999, "compact", "USD")).toBe("$0.99");
    expect(formatUsingIntl(0.12345809, "compact", "MXN")).toBe("MX$0.12");
  });
  it("Format Currency Large (compact)", () => {
    expect(formatUsingIntl(5.0, "compact", "USD")).toBe("$5.00");
    expect(formatUsingIntl(103.0, "compact", "USD")).toBe("$103.00");
    expect(formatUsingIntl(999.0, "compact", "USD")).toBe("$999.00");
    expect(formatUsingIntl(999.5, "compact", "USD")).toBe("$999.50");
    expect(formatUsingIntl(999.05, "compact", "USD")).toBe("$999.05");
    expect(formatUsingIntl(1000.0, "compact", "USD")).toBe("$1K");
    expect(formatUsingIntl(1000.05, "compact", "USD")).toBe("$1K");
    expect(formatUsingIntl(1000.5, "compact", "USD")).toBe("$1K");
    expect(formatUsingIntl(5.0099, "compact", "USD")).toBe("$5.00");
    expect(formatUsingIntl(1.1234, "compact", "USD")).toBe("$1.12");
    expect(formatUsingIntl(15.1299, "compact", "USD")).toBe("$15.12");
    expect(formatUsingIntl(159.1234, "compact", "USD")).toBe("$159.12");
    expect(formatUsingIntl(159.999, "compact", "USD")).toBe("$159.99");
    expect(formatUsingIntl(199.9999, "compact", "USD")).toBe("$199.99");
    expect(formatUsingIntl(1099.99, "compact", "USD")).toBe("$1.09K");
    expect(formatUsingIntl(1909.99, "compact", "USD")).toBe("$1.9K");
    expect(formatUsingIntl(1999.99, "compact", "USD")).toBe("$1.99K");
    expect(formatUsingIntl(19999.99, "compact", "USD")).toBe("$19.99K");
    expect(formatUsingIntl(199.9999, "compact", "USD")).toBe("$199.99");
    expect(formatUsingIntl(199.9099, "compact", "USD")).toBe("$199.90");
    expect(formatUsingIntl(1999.9999, "compact", "USD")).toBe("$1.99K");
    expect(formatUsingIntl(1900.0, "compact", "USD")).toBe("$1.9K");
    expect(formatUsingIntl(19999.9999, "compact", "USD")).toBe("$19.99K");
    expect(formatUsingIntl(199999.9999, "compact", "USD")).toBe("$199.99K");
    expect(formatUsingIntl(1999999.9999, "compact", "USD")).toBe("$1.99M");
    expect(formatUsingIntl(19999999.9999, "compact", "USD")).toBe("$19.99M");
    expect(formatUsingIntl(199999999.9999, "compact", "USD")).toBe("$199.99M");
    expect(formatUsingIntl(199999999.9999, "compact", "EUR")).toBe("€199.99M");
    expect(formatUsingIntl(199999999.9999, "compact", "MXN")).toBe("MX$199.99M");
    expect(formatUsingIntl(199999999.9999, "compact", "EUR")).toBe("€199.99M");
  });
  it("Format Currency (standard)", () => {
    expect(formatUsingIntl(2000, "standard", "USD")).toBe("$2,000.00");
    expect(formatUsingIntl(199999999.9999, "standard", "USD")).toBe("$199,999,999.99");
    expect(formatUsingIntl(199999999.9999, "standard", "MXN")).toBe("MX$199,999,999.99");
    expect(formatUsingIntl(199999999.9999, "standard", "EUR")).toBe("€199,999,999.99");
  });

  it("Format Currency using different currencies", () => {
    expect(formatUsingIntl(2000.39, "standard", "AUD")).toBe("A$2,000.39");
    expect(formatUsingIntl(2000.39, "standard", "CAD")).toBe("CA$2,000.39");
    expect(formatUsingIntl(2000.39, "standard", "MXN")).toBe("MX$2,000.39");
    expect(formatUsingIntl(2000.39, "standard", "NZD")).toBe("NZ$2,000.39");
    expect(formatUsingIntl(2000.39, "standard", "SGD")).toBe(`SGD${EMPTY_STRING_CODE}2,000.39`);
    expect(formatUsingIntl(2000.39, "standard", "USD")).toBe("$2,000.39");
  });

  it("should format 0 amount correctly", () => {
    expect(formatUsingIntl(0, "standard", "USD")).toBe("$0.00");
    expect(formatUsingIntl(0.0, "standard", "USD")).toBe("$0.00");
    expect(formatUsingIntl(0, "standard", "MXN")).toBe("MX$0.00");
    // make sure compact notation works the same
    expect(formatUsingIntl(0, "compact", "USD")).toBe("$0.00");
    expect(formatUsingIntl(0.0, "compact", "USD")).toBe("$0.00");
    expect(formatUsingIntl(0, "compact", "MXN")).toBe("MX$0.00");
  });

  it("should format amounts less than 1 cent with < symbol", () => {
    expect(formatUsingIntl(0.001, "standard", "USD")).toBe("< $0.01");
    expect(formatUsingIntl(0.00000001, "standard", "MXN")).toBe("< MX$0.01");
    // make sure compact notation works the same
    expect(formatUsingIntl(0.001, "compact", "USD")).toBe("< $0.01");
    expect(formatUsingIntl(0.00000001, "compact", "MXN")).toBe("< MX$0.01");
  });

  it("should format 1 cent amount correctly", () => {
    expect(formatUsingIntl(0.01, "standard", "USD")).toBe("$0.01");
    expect(formatUsingIntl(0.01, "standard", "MXN")).toBe("MX$0.01");
    // make sure compact notation works the same
    expect(formatUsingIntl(0.01, "compact", "USD")).toBe("$0.01");
    expect(formatUsingIntl(0.01, "compact", "MXN")).toBe("MX$0.01");
  });
});

describe("formatPartialFiatAmount()", () => {
  it("should format integer only amount correctly", () => {
    expect(formatPartialFiatAmount("10")).toBe("10");
    expect(formatPartialFiatAmount("1000")).toBe("1,000");
    expect(formatPartialFiatAmount("1000000")).toBe("1,000,000");
  });

  it("should format integer + decimal amount correctly", () => {
    expect(formatPartialFiatAmount("10.99")).toBe("10.99");
    expect(formatPartialFiatAmount("1000.99")).toBe("1,000.99");
    expect(formatPartialFiatAmount("1000000.99")).toBe("1,000,000.99");
  });

  it("should format incomplete amount correctly", () => {
    expect(formatPartialFiatAmount("1000.")).toBe("1,000.");
    expect(formatPartialFiatAmount("1000.9")).toBe("1,000.9");
  });
});

describe("displaySignificantFigures()", () => {
  it("should format integer + decimal amount correctly with standard option", () => {
    expect(displaySignificantFigures(10, "standard")).toBe("$10.00");
    expect(displaySignificantFigures(1234567.891011, "standard")).toBe("$1,234,567.89");
    expect(displaySignificantFigures(123456.789101, "standard")).toBe("$123,456.78");
    expect(displaySignificantFigures(12345.6789, "standard")).toBe("$12,345.67");
    expect(displaySignificantFigures(1234.56789, "standard")).toBe("$1,234.56");
    expect(displaySignificantFigures(123.456789, "standard")).toBe("$123.456");
    expect(displaySignificantFigures(12.3456789, "standard")).toBe("$12.3456");
    expect(displaySignificantFigures(1.23456789, "standard")).toBe("$1.23456");
    expect(displaySignificantFigures(0.123456789, "standard")).toBe("$0.12345");
  });

  it("should format integer + decimal amount correctly with compact", () => {
    expect(displaySignificantFigures(10, "compact")).toBe("$10.00");
    expect(displaySignificantFigures(1234567.891011, "compact")).toBe("$1.23M");
    expect(displaySignificantFigures(123456.789101, "compact")).toBe("$123.45K");
    expect(displaySignificantFigures(12345.6789, "compact")).toBe("$12.34K");
    expect(displaySignificantFigures(1234.56789, "compact")).toBe("$1.23K");
    expect(displaySignificantFigures(123.456789, "compact")).toBe("$123.456");
    expect(displaySignificantFigures(12.3456789, "compact")).toBe("$12.3456");
    expect(displaySignificantFigures(1.23456789, "compact")).toBe("$1.23456");
    expect(displaySignificantFigures(0.123456789, "compact")).toBe("$0.12345");
    expect(displaySignificantFigures(0.0123456789, "compact")).toBe("$0.01234");
    expect(displaySignificantFigures(0.00123456789, "compact")).toBe("$0.00123");
    expect(displaySignificantFigures(0.000123456789, "compact")).toBe("$0.00012");
    expect(displaySignificantFigures(0.00000123456789, "compact")).toBe("< $0.00001");
    expect(displaySignificantFigures(-0.123456789, "compact")).toBe("-$0.1234");
    expect(displaySignificantFigures(-0.0123456789, "compact")).toBe("-$0.0123");
    expect(displaySignificantFigures(-0.00000123456, "compact")).toBe("< $0.00001");
  });
});
