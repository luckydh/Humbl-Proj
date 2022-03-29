import { CryptoRecentTransactions } from "components/Modules/CryptoWallet/CryptoRecentTransactions/CryptoRecentTransactions";
import React from "react";
import { useGetRecentCryptoTransactionsQuery } from "generated/graphql";

export const RecentTransactions: React.FC = () => {
  const { data, loading } = useGetRecentCryptoTransactionsQuery({
    fetchPolicy: "network-only",
    variables: {
      seeAll: false,
      transactionCategory: "etx",
    },
  });
  return (
    <CryptoRecentTransactions
      transactions={data?.getRecentTransactions}
      showCTA
      loading={loading}
      isEtx
      ariaLabel="ETX"
    />
  );
};

export default RecentTransactions;
