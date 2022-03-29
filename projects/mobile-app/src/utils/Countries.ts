export enum Countries {
  US = "US",
  MX = "MX",
  EU = "EU",
  SG = "SG",
  CA = "CA",
  AU = "AU",
  NZ = "NZ",
}

export const getAllCountries = () => Object.values(Countries);
