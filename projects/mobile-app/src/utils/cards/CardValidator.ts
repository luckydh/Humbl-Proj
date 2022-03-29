import { cvv, number, cardholderName, expirationDate } from "card-validator";

export class CardValidator {
  public static cvv(value: string, maxLength?: number) {
    return cvv(value, maxLength).isValid;
  }

  public static cardNumber(value: string) {
    return number(value).isValid;
  }

  public static cardholderName(value: string) {
    return cardholderName(value).isValid;
  }

  public static expirationDate(value: string) {
    return expirationDate(value).isValid;
  }
}
