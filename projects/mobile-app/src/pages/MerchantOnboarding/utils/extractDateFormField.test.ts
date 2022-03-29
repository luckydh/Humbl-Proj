import { Countries } from "utils/Countries";
import { extractDateFromField } from "./extractDateFromField";

describe("extractDate Function", () => {
  it("should return an object with values", () => {
    const input = "01/01/1901";
    const country = Countries.US;

    const dateObj = extractDateFromField(input, country);
    expect.objectContaining(dateObj);
  });
  describe("Day should extract properly", () => {
    it("should return a day ie 1", () => {
      const input = "01/01/1901";
      const country = Countries.US;

      const dateObj = extractDateFromField(input, country);
      expect(dateObj.day.toString()).toEqual("1");
    });

    it("should return a day for end of month ie 31", () => {
      const input = "01/31/1901";
      const country = Countries.US;

      const dateObj = extractDateFromField(input, country);
      expect(dateObj.day.toString()).toEqual("31");
    });

    it("should return a day for end of february ie 28", () => {
      const input = "02/28/1901";
      const country = Countries.US;

      const dateObj = extractDateFromField(input, country);
      expect(dateObj.day.toString()).toEqual("28");
    });

    it("should return a NaN if after end of month", () => {
      const input = "01/32/1901";
      const country = Countries.US;

      const dateObj = extractDateFromField(input, country);
      expect(dateObj.day.toString()).toEqual("NaN");
    });

    it("should return a NaN if less than 1", () => {
      const input = "01/00/1901";
      const country = Countries.US;

      const dateObj = extractDateFromField(input, country);
      expect(dateObj.day.toString()).toEqual("NaN");
    });
  });

  describe("Month should Extract Properly", () => {
    it("should return a month ie 1", () => {
      const input = "01/01/1901";
      const country = Countries.US;

      const dateObj = extractDateFromField(input, country);
      expect(dateObj.month.toString()).toEqual("1");
    });

    it("should return December ie 12", () => {
      const input = "12/01/1901";
      const country = Countries.US;

      const dateObj = extractDateFromField(input, country);
      expect(dateObj.month.toString()).toEqual("12");
    });

    it("should return NaN if month is larger than 12", () => {
      const input = "13/01/1901";
      const country = Countries.US;

      const dateObj = extractDateFromField(input, country);
      expect(dateObj.month.toString()).toEqual("NaN");
    });

    it("should return NaN if month is smaller than 1", () => {
      const input = "00/01/1901";
      const country = Countries.US;

      const dateObj = extractDateFromField(input, country);
      expect(dateObj.month.toString()).toEqual("NaN");
    });
  });

  it("should return a year ie 1901", () => {
    const input = "01/01/1901";
    const country = Countries.US;

    const dateObj = extractDateFromField(input, country);
    expect(dateObj.year.toString()).toEqual("1901");
  });
});
