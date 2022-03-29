import React from "react";
import { useGetRecentCryptoTransactionsQuery } from "generated/graphql";
import { CryptoAllTransactions } from "./CryptoAllTransactions";
import CryptoCurrencyListSkeleton from "../CryptoCurrencyList/CryptoCurrencyListSkeleton";

export const CryptoAllTransactionsContainer = () => {
  const { data, loading } = useGetRecentCryptoTransactionsQuery({
    fetchPolicy: "network-only",
    variables: {
      seeAll: true,
    },
  });

  if (loading) {
    return <CryptoCurrencyListSkeleton rows={10} />;
  }

  return <CryptoAllTransactions transactions={data?.getRecentTransactions || []} />;
};
