interface CountryCodeType {
  Country: string;
  Format: string;
  Regex: RegExp;
}

export const PostalCode: Record<string, CountryCodeType> = {
  AU: {
    Country: "Australia",
    Format: "NNNN",
    Regex: /^\d{4}$/,
  },
  AT: {
    Country: "Austria",
    Format: "NNNN",
    Regex: /^\d{4}$/,
  },
  BE: {
    Country: "Belgium",
    Format: "NNNN",
    Regex: /^\d{4}$/,
  },
  BR: {
    Country: "Bulgaria",
    Format: "NNNNNNNN",
    Regex: /^\d{8}$/,
  },
  CA: {
    Country: "Canada",
    Format: "ANA NAN",
    Regex: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]\d[ABCEGHJ-NPRSTV-Z]\d$/i,
  },
  CN: {
    Country: "China",
    Format: "NNNNNN",
    Regex: /^\d{6}$/,
  },
  DK: {
    Country: "Denmark",
    Format: "NNNN",
    Regex: /^\d{4}$/,
  },
  FI: {
    Country: "Finland",
    Format: "NNNNN",
    Regex: /^\d{5}$/,
  },
  FR: {
    Country: "France",
    Format: "NNNNN",
    Regex: /^\d{5}$/,
  },
  DE: {
    Country: "Germany",
    Format: "NNNNN",
    Regex: /^\d{5}$/,
  },
  GR: {
    Country: "Greece",
    Format: "NNNNN",
    Regex: /^\d{5}$/,
  },
  IN: {
    Country: "India",
    Format: "NNNNNN",
    Regex: /^\d{6}$/,
  },
  ID: {
    Country: "Indonesia",
    Format: "NNNNN",
    Regex: /^\d{5}$/,
  },
  IT: {
    Country: "Italy",
    Format: "NNNNN",
    Regex: /^\d{5}$/,
  },
  JP: {
    Country: "Japan",
    Format: "NNNNNNN",
    Regex: /^\d{7}$/,
  },
  LU: {
    Country: "Luxembourg",
    Format: "NNNN",
    Regex: /^\d{4}$/,
  },
  MY: {
    Country: "Malaysia",
    Format: "NNNNN",
    Regex: /^\d{5}$/,
  },
  MX: {
    Country: "Mexico",
    Format: "NNNNN",
    Regex: /^\d{5}$/,
  },
  NL: {
    Country: "Netherlands",
    Format: "NNNN",
    Regex: /^\d{4}$/,
  },
  NO: {
    Country: "Norway",
    Format: "NNNN",
    Regex: /^\d{4}$/,
  },
  PH: {
    Country: "Philippines",
    Format: "NNNN",
    Regex: /^\d{4}$/,
  },
  PT: {
    Country: "Portugal",
    Format: "NNNN or NNNN-nnn or NNNNnnn",
    Regex: /\d{4}$|^\d{4}[- ]{0,1}\d{3}$/,
  },
  PR: {
    Country: "Puerto Rico",
    Format: "NNNNN",
    Regex: /^\d{5}$/,
  },
  SG: {
    Country: "Singapore",
    Format: "NNNNNN",
    Regex: /^\d{6}$/,
  },
  ES: {
    Country: "Spain",
    Format: "NNNNN",
    Regex: /^\d{5}$/,
  },
  CH: {
    Country: "Switzerland",
    Format: "NNNN",
    Regex: /^\d{4}$/,
  },
  TH: {
    Country: "Thailand",
    Format: "NNNNN",
    Regex: /^\d{5}$/,
  },
  GB: {
    Country: "United Kingdom",
    Format: "A(A)N(A/N)NAA (A[A]N[A/N] NAA)",
    Regex: /^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]? ?[0-9][a-zA-Z]{2}$/,
  },
  US: {
    Country: "United States",
    Format: "NNNNN",
    Regex: /^\d{5}$/,
  },
  NZ: {
    Country: "New Zealand",
    Format: "NNNN",
    Regex: /^\d{4}$/,
  },
};

export const GetRegexByPostalCode = (countryCode: string) => {
  const postalCodeObject = PostalCode[countryCode.toUpperCase()];
  return postalCodeObject || "NA";
};
