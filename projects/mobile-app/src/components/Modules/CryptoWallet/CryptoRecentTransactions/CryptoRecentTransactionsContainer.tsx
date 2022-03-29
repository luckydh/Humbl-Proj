import React from "react";
import { useGetRecentCryptoTransactionsQuery } from "generated/graphql";
import { CryptoRecentTransactions } from "./CryptoRecentTransactions";
import useRefreshFetch from "utils/hooks/useRefreshFetch";

interface Props {
  isRefreshing?: boolean;
  ariaLabel?: string;
}

export const CryptoRecentTransactionsContainer: React.FC<Props> = ({ isRefreshing = false, ariaLabel }) => {
  const { data, loading, refetch } = useGetRecentCryptoTransactionsQuery({
    fetchPolicy: "network-only",
    variables: {
      seeAll: false,
    },
  });

  useRefreshFetch(isRefreshing, refetch);

  return (
    <CryptoRecentTransactions
      ariaLabel={ariaLabel}
      shouldRefresh={isRefreshing}
      transactions={data?.getRecentTransactions}
      showCTA={true}
      loading={loading}
    />
  );
};
