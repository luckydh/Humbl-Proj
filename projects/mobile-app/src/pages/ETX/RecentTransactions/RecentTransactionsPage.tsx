import React from "react";
import { useGetRecentCryptoTransactionsQuery } from "generated/graphql";
import { CryptoAllTransactions } from "components/Modules/CryptoWallet/CryptoAllTransactions/CryptoAllTransactions";
import CryptoCurrencyListSkeleton from "components/Modules/CryptoWallet/CryptoCurrencyList/CryptoCurrencyListSkeleton";

export const RecentTransactionsPage = () => {
  const { data, loading } = useGetRecentCryptoTransactionsQuery({
    fetchPolicy: "network-only",
    variables: {
      seeAll: true,
      transactionCategory: "etx",
    },
  });

  if (loading) {
    return <CryptoCurrencyListSkeleton rows={10} />;
  }

  return <CryptoAllTransactions transactions={data?.getRecentTransactions ?? []} />;
};
