import React from "react";
import { useTranslation } from "react-i18next";
import { MarketPeriodInput, useGetWalletBalanceHistoryQuery } from "generated/graphql";

import DigitalWallet, { DigitalWalletSkeleton, EmptyDigitalWallet } from "components/DigitalWallet/DigitalWallet";
import { parseChartData } from "../CoinInfoScreen/CoinInfoScreen";
import { GraphData } from "components/common/types";
import { ApolloError } from "@apollo/client";
import { ChartCard, Heading } from "components/ChartCard/ChartCard";
import { useHistory } from "react-router";
import { buildPath } from "utils/routes";
import useRefreshFetch from "utils/hooks/useRefreshFetch";

interface WalletBalanceHistoryGraphContainerProps {
  isRefreshing?: boolean;
  ariaLabel?: string;
}

export const WalletBalanceHistoryGraphContainer: React.FC<WalletBalanceHistoryGraphContainerProps> = ({
  isRefreshing = false,
  ariaLabel,
}) => {
  const { data, loading, error, refetch } = useGetWalletBalanceHistoryQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      period: MarketPeriodInput.Hour_24,
    },
  });

  useRefreshFetch(isRefreshing, refetch);

  const chartData = data?.getWalletBalanceHistory && parseChartData(data.getWalletBalanceHistory);
  return (
    <WalletBalanceHistoryGraph
      ariaLabel={ariaLabel}
      shouldRefresh={isRefreshing}
      data={chartData}
      isLoading={loading}
      error={error}
    />
  );
};

export interface WalletBalanceHistoryGraphProps {
  data?: GraphData;
  isLoading?: boolean;
  error?: ApolloError;
  shouldRefresh: boolean;
  ariaLabel?: string;
}

/**
 * Calls wallet balance hisory  query and renders balance graph.
 * @returns <DigitalWallet/>
 */
export const WalletBalanceHistoryGraph: React.FC<WalletBalanceHistoryGraphProps> = ({
  data,
  error,
  isLoading,
  shouldRefresh = false,
  ariaLabel,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const initialLoad = isLoading && !data;
  const isRefreshing = shouldRefresh && isLoading;

  if (error) {
    return (
      <ChartCard height="auto" isRounded>
        <div className="pt-4 pb-6 px-6">
          <div className="mr-auto flex-shrink-0">
            <Heading>{t("crypto-wallet.digital-wallet.text.heading")}</Heading>
          </div>
          <p className="text-sm">{t("widget.error.generic-loading-error")}</p>
        </div>
      </ChartCard>
    );
  }

  if (isRefreshing || initialLoad) {
    return <DigitalWalletSkeleton />;
  }

  if (!data) {
    return (
      /* this wrapper is needed to avoid the graph showing above the sticky header. */
      <div className="relative z-0" aria-label={ariaLabel && `${ariaLabel}_WALLETBALANCE_COMPONENT`}>
        <EmptyDigitalWallet ariaLabel={ariaLabel} />
      </div>
    );
  }

  const handleGraphClick = () => {
    history.push(buildPath("portfolio"));
  };

  return (
    <div aria-label={ariaLabel && `${ariaLabel}_WALLETBALANCE_COMPONENT`} onClick={handleGraphClick}>
      <DigitalWallet ariaLabel={ariaLabel} data={data} />
    </div>
  );
};

export default WalletBalanceHistoryGraphContainer;
