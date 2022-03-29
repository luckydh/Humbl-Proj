import { Countries } from "utils/Countries";

export interface SelectOption {
  label: string;
  value: string;
}

const options: {
  [key: string]: SelectOption[];
} = {
  US: [
    { label: "Alabama", value: "AL" },
    { label: "Alaska", value: "AK" },
    { label: "American Samoa", value: "AS" },
    { label: "Arizona", value: "AZ" },
    { label: "Arkansas", value: "AR" },
    { label: "California", value: "CA" },
    { label: "Colorado", value: "CO" },
    { label: "Connecticut", value: "CT" },
    { label: "Delaware", value: "DE" },
    { label: "District Of Columbia", value: "DC" },
    { label: "Florida", value: "FL" },
    { label: "Georgia", value: "GA" },
    { label: "Guam", value: "GU" },
    { label: "Hawaii", value: "HI" },
    { label: "Idaho", value: "ID" },
    { label: "Illinois", value: "IL" },
    { label: "Indiana", value: "IN" },
    { label: "Iowa", value: "IA" },
    { label: "Kansas", value: "KS" },
    { label: "Kentucky", value: "KY" },
    { label: "Louisiana", value: "LA" },
    { label: "Maine", value: "ME" },
    { label: "Maryland", value: "MD" },
    { label: "Massachusetts", value: "MA" },
    { label: "Michigan", value: "MI" },
    { label: "Minnesota", value: "MN" },
    { label: "Mississippi", value: "MS" },
    { label: "Missouri", value: "MO" },
    { label: "Montana", value: "MT" },
    { label: "Nebraska", value: "NE" },
    { label: "Nevada", value: "NV" },
    { label: "New Hampshire", value: "NH" },
    { label: "New Jersey", value: "NJ" },
    { label: "New Mexico", value: "NM" },
    { label: "New York", value: "NY" },
    { label: "North Carolina", value: "NC" },
    { label: "North Dakota", value: "ND" },
    { label: "Ohio", value: "OH" },
    { label: "Oklahoma", value: "OK" },
    { label: "Oregon", value: "OR" },
    { label: "Pennsylvania", value: "PA" },
    { label: "Puerto Rico", value: "PR" },
    { label: "Rhode Island", value: "RI" },
    { label: "South Carolina", value: "SC" },
    { label: "South Dakota", value: "SD" },
    { label: "Tennessee", value: "TN" },
    { label: "Texas", value: "TX" },
    { label: "Utah", value: "UT" },
    { label: "Vermont", value: "VT" },
    { label: "Virgin Islands", value: "VI" },
    { label: "Virginia", value: "VA" },
    { label: "Washington", value: "WA" },
    { label: "West Virginia", value: "WV" },
    { label: "Wisconsin", value: "WI" },
    { label: "Wyoming", value: "WY" },
  ],
  MX: [
    {
      label: "Distrito Federal",
      value: "DIF",
    },
    {
      label: "Aguascalientes",
      value: "AGU",
    },
    {
      label: "Baja California",
      value: "BCN",
    },
    {
      label: "Baja California Sur",
      value: "BCS",
    },
    {
      label: "Campeche",
      value: "CAM",
    },
    {
      label: "Chiapas",
      value: "CHP",
    },
    {
      label: "Chihuahua",
      value: "CHH",
    },
    {
      label: "Coahuila",
      value: "COA",
    },
    {
      label: "Colima",
      value: "COL",
    },
    {
      label: "Durango",
      value: "DUR",
    },
    {
      label: "Guanajuato",
      value: "GUA",
    },
    {
      label: "Guerrero",
      value: "GRO",
    },
    {
      label: "Hidalgo",
      value: "HID",
    },
    {
      label: "Jalisco",
      value: "JAL",
    },
    {
      label: "Michoacán",
      value: "MIC",
    },
    {
      label: "Morelos",
      value: "MOR",
    },
    {
      label: "México",
      value: "MEX",
    },
    {
      label: "Nayarit",
      value: "NAY",
    },
    {
      label: "Nuevo León",
      value: "NLE",
    },
    {
      label: "Oaxaca",
      value: "OAX",
    },
    {
      label: "Puebla",
      value: "PUE",
    },
    {
      label: "Querétaro",
      value: "QUE",
    },
    {
      label: "Quintana Roo",
      value: "ROO",
    },
    {
      label: "San Luis Potosí",
      value: "SLP",
    },
    {
      label: "Sinaloa",
      value: "SIN",
    },
    {
      label: "Sonora",
      value: "SON",
    },
    {
      label: "Tabasco",
      value: "TAB",
    },
    {
      label: "Tamaulipas",
      value: "TAM",
    },
    {
      label: "Tlaxcala",
      value: "TLA",
    },
    {
      label: "Veracruz",
      value: "VER",
    },
    {
      label: "Yucatán",
      value: "YUC",
    },
    {
      label: "Zacatecas",
      value: "ZAC",
    },
  ],
  AU: [
    {
      label: "New South Wales",
      value: "NSW",
    },
    {
      label: "Victoria",
      value: "VIC",
    },
    {
      label: "Queensland",
      value: "QLD",
    },
    {
      label: "Tasmania",
      value: "TAS",
    },
    {
      label: "South Australia",
      value: "SA",
    },
    {
      label: "Western Australia",
      value: "WA",
    },
    {
      label: "Northern Territory",
      value: "NT",
    },
    {
      label: "Australian Capital Territory",
      value: "ACT",
    },
  ],
  CA: [
    { label: "Alberta", value: "AB" },
    { label: "British Columbia", value: "BC" },
    { label: "Manitoba", value: "MB" },
    { label: "New Brunswick", value: "NB" },
    { label: "Newfoundland", value: "NF" },
    { label: "Northwest Territories", value: "NT" },
    { label: "Nova Scotia", value: "NS" },
    { label: "Nunavut", value: "NU" },
    { label: "Ontario", value: "ON" },
    { label: "Prince Edward Island", value: "PE" },
    { label: "Quebec", value: "PQ" },
    { label: "Saskatchewan", value: "SK" },
    { label: "Yukon Territory", value: "YT" },
  ],
};

const getOptions = (country: Countries) => {
  if (!options[country]) return [];
  return options[country];
};

export default getOptions;
