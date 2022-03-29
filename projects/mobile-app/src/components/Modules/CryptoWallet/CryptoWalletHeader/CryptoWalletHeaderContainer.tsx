import React from "react";
import { CryptoWalletHeader } from "./CryptoWalletHeader";
import { MarketPeriodInput, useGetWalletBalanceHistoryQuery } from "generated/graphql";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";

interface Props {
  ariaLabel?: string;
}

export const CryptoWalletHeaderContainer: React.FC<Props> = ({ ariaLabel }) => {
  const currencyCode = useGetCurrentAccountCurrency();
  const { data } = useGetWalletBalanceHistoryQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      period: MarketPeriodInput.Hour_24,
    },
  });

  const balance: number = data?.getWalletBalanceHistory?.totalFiatBalance ?? 0;

  return <CryptoWalletHeader arialabel={ariaLabel} currencyCode={currencyCode} balance={balance} />;
};
