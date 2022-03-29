import { decimalPrecision } from "./decimalPrecision";

describe("utils/decimalPrecision", () => {
  it("should return '0' if value is 0", () => {
    expect(decimalPrecision(0)).toBe("0");
  });

  it("should return '0' if value is 0 even when length is provided", () => {
    expect(decimalPrecision(0, 0)).toBe("0");
    expect(decimalPrecision(0, 1)).toBe("0");
    expect(decimalPrecision(0, 10)).toBe("0");
  });

  it("should format value with the provided length", () => {
    expect(decimalPrecision(0.000012345, 5)).toBe("0.00001");
    expect(decimalPrecision(0.000012345, 6)).toBe("0.000012");
    expect(decimalPrecision(0.000012345, 7)).toBe("0.0000123");
    expect(decimalPrecision(0.000012345, 8)).toBe("0.00001234");
    expect(decimalPrecision(0.000012345, 9)).toBe("0.000012345");
  });

  it("should format with 2 decimal places if value is greater than 1 and length is not provided", () => {
    expect(decimalPrecision(1.012345678)).toBe("1.01");
  });

  it("should format with 4 decimal places if value is lesser than 1 and length is not provided", () => {
    expect(decimalPrecision(0.012345678)).toBe("0.0123");
  });

  it("should return default value if decimal part has more leading zeroes than the provided length", () => {
    expect(decimalPrecision(0.01, 1)).toBe("0.1");
    expect(decimalPrecision(0.001, 2)).toBe("0.01");
    expect(decimalPrecision(0.000000001, 4)).toBe("0.0001");
    expect(decimalPrecision(0.0000000012345, 8)).toBe("0.00000001");
  });
});
