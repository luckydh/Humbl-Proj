import { PostalCode } from "./PostalCode";

const selectedCountry = [
  {
    country: "Australia",
    countryCode: "AU",
    postalCode: "1234",
  },
  {
    country: "Canada",
    countryCode: "CA",
    postalCode: "a1b 2c3",
  },
  {
    country: "Mexico",
    countryCode: "MX",
    postalCode: "12345",
  },

  {
    country: "New Zealand",
    countryCode: "NZ",
    postalCode: "1234",
  },
  {
    country: "Singapore",
    countryCode: "SG",
    postalCode: "123456",
  },
  {
    country: "United States",
    countryCode: "US",
    postalCode: "12345",
  },
];

describe("RegExp: URI", () => {
  selectedCountry.forEach((testValue) => {
    it(`Postal code should be detected for ${testValue.country}`, () => {
      const postalCodeObject = PostalCode[testValue.countryCode];
      expect(postalCodeObject.Regex.test(testValue.postalCode)).toBe(true);
    });
  });
});
