import { number } from "card-validator";
import { cardBrandLogos } from "./cardBrandLogos";

// brand codes from the back-end
export type BrandId =
  | "default"
  | "visa"
  | "mastercard"
  | "discover"
  | "jcb"
  | "unionpay"
  | "maestro"
  | "elo"
  | "amex"
  | "dinersclub";

// brand codes from the card-validator lib that are different from back-end
const brandTypeMap: Record<string, BrandId> = {
  "american-express": "amex",
  "diners-club": "dinersclub",
};

export function getCardBrand(cardNumber: string) {
  const brandType = number(cardNumber).card?.type;
  return transformBrandType(brandType ?? "");
}

export function transformBrandType(brandType: string) {
  return brandTypeMap[brandType] ?? brandType;
}

export function getCardBrandLogo(brand?: BrandId) {
  return brand ? cardBrandLogos[brand] : cardBrandLogos.default;
}
