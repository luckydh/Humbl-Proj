import { CryptoCurrencyItemProps } from "../../CryptoCurrencyList";

export const CURRENCY_LIST: CryptoCurrencyItemProps[] = [
  {
    name: "USD Coin",
    tickerCode: "USDC",
    valueInFiat: "$50.00",
    valueInCrypto: 0.000222,
    interestGained: 50,
    interestGaining: true,
  },
  {
    name: "Bitcoin",
    tickerCode: "BTC",
    valueInFiat: "$25.00",
    valueInCrypto: 0.0222,
    interestGained: 25,
    interestGaining: true,
  },
  {
    name: "Ethereum",
    tickerCode: "ETH",
    valueInFiat: "$250.38",
    valueInCrypto: 0.000127,
    color: "#F7931A",
    interestGained: 250.38,
    interestGaining: true,
  },
];
