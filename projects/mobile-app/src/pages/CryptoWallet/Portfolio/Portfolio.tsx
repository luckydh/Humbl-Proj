import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import cx from "classnames";
import { PortfolioGraph } from "components/PortfolioGraph/PortfolioGraph";
import { WidgetContainer } from "components/Modules/Widgets/WidgetContainer";
import { MyAssetsVerticalListWidget } from "components/Modules/CryptoWallet/MyAssets/MyAssetsVerticalListWidgetContainer";
import {
  MarketPeriodInput,
  useGetMyAssetsInterestSummaryQuery,
  useGetWalletBalanceHistoryQuery,
} from "generated/graphql";
import { AdvertisementList } from "components/Modules/CryptoWallet/Portfolio/AdvertisementList";
import { parseChartData } from "components/Modules/CryptoWallet/CoinInfoScreen/CoinInfoScreen";
import { GraphData } from "components/common/types";
import { ApolloError } from "@apollo/client";
import { useFeatureFlag } from "utils/Feature";
import { useAssetInterestRates } from "utils/hooks/useAssetInterestRates";
import { AssetDataObjectInterface } from "components/Modules/CryptoWallet/InterestGainAssets/InterestGainAssets";
import { AdvertisementItemProps } from "components/Modules/CryptoWallet/Portfolio/AdvertisementList/AdvertisementItem";

export const PortfolioContainer: React.FC = () => {
  const [currentGraphPeriod, setCurrentGraphPeriod] = useState(MarketPeriodInput.Hour_24);
  const items = useAssetInterestRates();

  const {
    data: portfolioData,
    loading: porftfolioLoading,
    error: portfolioError,
    refetch: refetchPortfolioData,
  } = useGetWalletBalanceHistoryQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      period: currentGraphPeriod,
    },
  });

  const {
    data,
    loading: assetsSummaryLoading,
    error: assetsSummaryError,
  } = useGetMyAssetsInterestSummaryQuery({
    fetchPolicy: "cache-and-network",
  });

  const myInterestAssetsData = data?.myAssetsInterestSummary || {};

  const assetDataObject: AssetDataObjectInterface = {};

  if (myInterestAssetsData?.assets && myInterestAssetsData.assets.length > 0) {
    myInterestAssetsData.assets.forEach((item) => {
      const { code } = item;
      const myAsset = items?.find((asset) => asset.tickerCode === code);

      if (code) {
        assetDataObject[code] = {
          name: item.name ?? "",
          logoImage: item.logoImage ?? "",
          interestGainedFiat: item.interestGainedFiat?.major ?? 0,
          interestGained:
            (assetDataObject[code] ? assetDataObject[code].interestGained : 0) + (item.interestGained || 0),
          interestRate: myAsset?.valueInPercent ?? 0,
        };
      }
    });
  }

  const handleActiveTabChange = useCallback(
    (period: MarketPeriodInput) => {
      refetchPortfolioData({ period });
      setCurrentGraphPeriod(period);
    },
    [refetchPortfolioData]
  );

  const assetsError = assetsSummaryError;
  const assetsLoading = assetsSummaryLoading;

  const chartData = portfolioData?.getWalletBalanceHistory && parseChartData(portfolioData.getWalletBalanceHistory);

  return (
    <Portfolio
      interestAssets={assetDataObject}
      portfolioError={portfolioError}
      porftfolioLoading={porftfolioLoading}
      handleActiveTabChange={handleActiveTabChange}
      chartData={chartData}
      assetsLoading={assetsLoading}
      assetsError={assetsError}
      items={items}
      assetsSummaryLoading={assetsSummaryLoading}
      totalInterestGained={myInterestAssetsData?.totalInterestGained}
    />
  );
};

export interface PortfolioProps {
  chartData?: GraphData;
  porftfolioLoading?: boolean;
  portfolioError?: ApolloError;
  assetsError?: ApolloError;
  assetsLoading?: boolean;
  totalInterestGained?: number;
  hasInterestGainingAssets?: boolean;
  interestAssets?: AssetDataObjectInterface;
  handleActiveTabChange: (period: MarketPeriodInput) => void;
  assetsSummaryLoading?: boolean;
  items?: AdvertisementItemProps[];
}

export const Portfolio: React.FC<PortfolioProps> = ({
  chartData,
  porftfolioLoading,
  portfolioError,
  assetsError,
  assetsLoading,
  totalInterestGained,
  interestAssets,
  handleActiveTabChange,
  assetsSummaryLoading,
  items,
}) => {
  const { t } = useTranslation();
  const [isGraphActive, setIsGraphActive] = useState(false);
  const gainInterestFeatureEnabled = useFeatureFlag("humblPay-interestgaining-temp-091221");
  const showAdvertisement = gainInterestFeatureEnabled || !chartData?.points.length;

  return (
    <div className={cx("pb-10 overflow-x-hidden", { "overflow-y-hidden": isGraphActive })}>
      <div className="mb-7 mx-6 rounded-lg">
        <PortfolioGraph
          data={chartData}
          isGraphActive={isGraphActive}
          setGraphActive={setIsGraphActive}
          isLoading={porftfolioLoading}
          error={portfolioError}
          onActiveTabChange={handleActiveTabChange}
        />
      </div>
      {showAdvertisement && (
        <div className="mt-6 mx-6">
          <span className="font-semibold text-2xl text-white">
            {t("pages.crypto-wallet.portfolio.interest.interest-earned")}
          </span>
          <div className="mt-4">
            <AdvertisementList
              ariaLabel="EARNINTEREST"
              hasGain={Boolean(totalInterestGained)}
              items={items}
              isLoading={assetsLoading}
              assetsSummaryLoading={assetsSummaryLoading}
              interestAssets={interestAssets || {}}
              totalInterestGained={totalInterestGained || 0}
            />
          </div>
        </div>
      )}
      <div className="mx-1">
        <MyAssetsVerticalListWidget />
      </div>
      {assetsError && (
        <WidgetContainer ariaLabel="PORTFOLIO_WIDGET_CONTAINER">
          <div className=" text-sm text-black">{t("widget.error.generic-loading-error")}</div>
        </WidgetContainer>
      )}
    </div>
  );
};
