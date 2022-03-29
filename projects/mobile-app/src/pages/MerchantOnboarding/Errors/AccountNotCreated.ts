export class AccountNotCreatedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AccountNotCreatedError";
  }
}
