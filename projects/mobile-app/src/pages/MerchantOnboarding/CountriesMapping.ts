import { Countries } from "../../utils/Countries";

const CountriesMapping: Record<string, Countries> = {
  AU: Countries.AU,
  BE: Countries.EU,
  BG: Countries.EU,
  CH: Countries.EU,
  CY: Countries.EU,
  CZ: Countries.EU,
  DE: Countries.EU,
  DK: Countries.EU,
  EE: Countries.EU,
  ES: Countries.EU,
  FI: Countries.EU,
  FR: Countries.EU,
  GB: Countries.EU,
  GR: Countries.EU,
  HU: Countries.EU,
  IE: Countries.EU,
  LT: Countries.EU,
  LU: Countries.EU,
  LV: Countries.EU,
  MT: Countries.EU,
  NL: Countries.EU,
  NO: Countries.EU,
  NZ: Countries.NZ,
  PL: Countries.EU,
  PT: Countries.EU,
  RO: Countries.EU,
  SE: Countries.EU,
  SK: Countries.EU,
  US: Countries.US,
  MX: Countries.MX,
  SG: Countries.SG,
  CA: Countries.CA,
};
export const GetCountryByString = (countryCode: string) => {
  const country = CountriesMapping[countryCode.toUpperCase()] || Countries.US;
  return country;
};
