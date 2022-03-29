export class BankInformationNotCreatedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BankInformationNotCreatedError";
  }
}
