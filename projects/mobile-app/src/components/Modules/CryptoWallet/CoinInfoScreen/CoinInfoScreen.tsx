import "./styles.css";
import React, { useEffect, useState } from "react";
import { IonCard } from "@ionic/react";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { ApolloError } from "@apollo/client";
import { useParams } from "react-router-dom";
import { sortBy } from "lodash";

import { LayoutModal } from "components/PageTemplates/LayoutModal";
import Tabs from "components/Modules/CryptoWallet/Tabs/Tabs";
import Tab from "components/Modules/CryptoWallet/Tabs/Tab";
import { ChartCard, Price } from "components/ChartCard/ChartCard";
import {
  AssetBalanceType,
  MarketPeriodInput,
  useGetassethistoryLazyQuery,
  useGetassetmetricLazyQuery,
  useMyAssetsQuery,
  AssetHistoryType,
  useGetRecentCryptoTransactionsQuery,
} from "generated/graphql";
import { CoinInfoGraph } from "components/CoinInfo/CoinInfoGraph";
import { GraphData } from "components/common/types";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";
import { Routes } from "utils/routes";
import { formatUsingIntl } from "utils/currency";
import { GraphSkeleton } from "components/CoinInfo/GraphSkeleton";
import { useLayerManager } from "components/Layers/hooks";
import { ActionBuyButtons } from "../ActionBuyButtons/ActionBuyButtons";
import CoinAssetImage from "../CoinAssetImage/CoinAssetImage";
import { DISABLED_TABS_SET, Disabled, NO_ASSETS_DISABLED_TABS } from "../ActionModalAndTabs";
import NewsFeed from "../NewsFeed";
import { CryptoRecentTransactions } from "../CryptoRecentTransactions/CryptoRecentTransactions";

interface GraphErrorProps {
  coinName?: string;
  coinImage?: string;
}

const GraphError: React.FC<GraphErrorProps> = ({ coinImage, coinName }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-8 mx-5">
      <ChartCard height="auto" isRounded>
        <div className="flex self-start w-full mt-5 text-center">
          <div className="flex flex-col items-center justify-center w-28 px-6">
            <span className="flex mb-1">
              <img src={coinImage} alt={coinName} />
            </span>
            <span className="text-sm">{coinName}</span>
          </div>
          <div className="flex flex-col justify-start text-left pl-6 space-y-2 border-l border-white">
            <p className="text-sm font-medium text-left opacity-80 font-hando">{t("coin-info.graph.current-price")}</p>

            <Price fontSize={20} value={0} />
          </div>
        </div>
        <div className="w-full h-px bg-white opacity-25 mt-4" />
        <div className="p-10">
          <p className="text-base text-center text-gray-200">{t("coin-info.graph.error-message")}</p>
        </div>
      </ChartCard>
    </div>
  );
};

interface GraphProps {
  isGraphActive: boolean;
  isLoading?: boolean;
  data?: GraphData;
  currentGraphPeriod: MarketPeriodInput;
  onPeriodChange: (period: MarketPeriodInput) => void;
  setGraphActive: (graphActive: boolean) => void;
  error?: ApolloError;
  coinData: {
    name?: string;
    image?: string;
  };
}

const Graph: React.FC<GraphProps> = ({
  data,
  currentGraphPeriod,
  onPeriodChange,
  error,
  coinData,
  isGraphActive,
  isLoading,
  setGraphActive,
}) => {
  const coinName: string = coinData?.name ?? "";
  const coinImage: string = coinData?.image ?? "";

  if (
    error ||
    // These graphs should always have data. Therefore if no data, then something is wrong.
    (!isLoading && !data)
  ) {
    return <GraphError coinName={coinName} coinImage={coinImage} />;
  }

  if (!data || !coinData) {
    return (
      <div className="mb-8">
        <GraphSkeleton />
      </div>
    );
  }

  return (
    <CoinInfoGraph
      coinName={coinName}
      coinImage={coinImage}
      setGraphActive={setGraphActive}
      isGraphActive={isGraphActive}
      data={data}
      onActiveTabChange={onPeriodChange}
      currentGraphPeriod={currentGraphPeriod}
    />
  );
};

interface MyCoinWalletProps {
  assetBalance?: AssetBalanceType;
  currencyCode?: string;
}

const MyCoinWalletCard: React.FC<MyCoinWalletProps> = ({ assetBalance, currencyCode }) => {
  const { t } = useTranslation();
  const { logoImage, code, fiatAmount } = assetBalance || {};

  return (
    <>
      <h4 className="text-white font-medium m-5" aria-label="COININFO_CRYPTOHEADER_LABEL">
        {t("coin-info.my-wallet", { coin: assetBalance?.code?.toUpperCase() })}
      </h4>
      <IonCard className="m-5 rounded-lg bg-blue-lightest flex flex-row p-4" aria-label="COININFO_CRYPTOCARD_SECTION">
        <div className="mr-5">
          <CoinAssetImage coinImage={logoImage} coinName={code} size="large" bgType="bg-solid" ariaLabel="COININFO" />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-row justify-between">
            <p className="text-base text-blue-dark font-semibold" aria-label="COININFO_CRYPTOABBREVIATION_LABEL">
              {assetBalance?.name}
            </p>
            <p className="text-base text-blue-dark font-semibold" aria-label="COININFO_FIATAMOUNT_LABEL">
              {formatUsingIntl(fiatAmount?.major ?? 0.0, "standard", currencyCode)}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-base text-blue-dark" aria-label="COININFO_CRYPTONAME_LABEL">
              {assetBalance?.code}
            </p>
            <p className="text-base text-blue-dark" aria-label="COININFO_CRYPTOAMOUNT_LABEL">
              {assetBalance?.amount?.toFixed(6)} {assetBalance?.code}
            </p>
          </div>
        </div>
      </IonCard>
    </>
  );
};

const AboutCard = ({ assetName }: { assetName: string }) => {
  const { t } = useTranslation();
  const { coinId } = useParams<{ coinId: string }>();

  return (
    <IonCard className="rounded-lg px-4 bg-blue-lightest p-5 m-0" aria-label="COININFO_ABOUTCONTENT_SECTION">
      <h3 className="text-blue-dark font-bold mb-2">{t("coin-info.tittle.about-coin", { coin: assetName })}</h3>
      <p className="text-blue-dark">{t(`coin-info.${coinId}.description`)}</p>
    </IonCard>
  );
};

export interface CoinInfoScreenProps {
  title?: string;
}

export const CoinInfoScreen: React.FC<CoinInfoScreenProps> = () => {
  const { t } = useTranslation();
  const layerManager = useLayerManager();

  const currentAccountCurrency = useGetCurrentAccountCurrency();
  const currencyCode = useGetCurrentAccountCurrency();
  const [currentGraphPeriod, setCurrentGraphPeriod] = useState(MarketPeriodInput.Hour_24);
  const [currentAssetBalance, setCurrentAssetBalance] = useState<AssetBalanceType | null>(null);

  const [getAssetHistory, { data, error, loading: dataLoading }] = useGetassethistoryLazyQuery();

  const [getAssetMetric, { data: assetMetricData, loading: assetMetricDataLoading }] = useGetassetmetricLazyQuery();
  const { coinId } = useParams<Routes["cryptoWalletCoinInfo_Coin_"]["params"]>();
  const [isGraphActive, setIsGraphActive] = useState(false);
  const [disabledTabs, setDisabledTabs] = useState(DISABLED_TABS_SET);

  const { data: transactions, loading } = useGetRecentCryptoTransactionsQuery({
    fetchPolicy: "network-only",
    variables: {
      asset: coinId,
      seeAll: false,
    },
  });

  const { data: assets } = useMyAssetsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      currency: currentAccountCurrency,
    },
  });

  useEffect(() => {
    if (assets) {
      const coinName = coinId.toLowerCase();
      const assetBalance = assets?.myAssets?.find((asset) => asset.code?.toLowerCase() === coinName);

      if (assetBalance) setCurrentAssetBalance(assetBalance);
      // Create disabled tabs set from const
      const disabledTransferTabs = DISABLED_TABS_SET;

      if (assetBalance) {
        // When we have a balance, do not disable any tabs.
        disabledTransferTabs.clear();
      } else {
        // When we don't have a balance, disable sending and withdrawing
        NO_ASSETS_DISABLED_TABS.forEach((disabledTab) => disabledTransferTabs.add(disabledTab));
      }
      // TODO: If the coin is BLOCKS, disable the withdraw and receive tabs until they are supported
      if (coinName === "blocks") {
        disabledTransferTabs.add(Disabled.withdraw);
        disabledTransferTabs.add(Disabled.receive);
      }

      setDisabledTabs(disabledTransferTabs);
    }
  }, [assets, coinId]);

  useEffect(() => {
    getAssetHistory({
      variables: {
        assetName: coinId,
        period: MarketPeriodInput.Hour_24,
      },
    });

    getAssetMetric({
      variables: {
        assetName: coinId,
      },
    });
  }, [getAssetHistory, getAssetMetric, coinId]);

  const handlePeriodChange = (period: MarketPeriodInput) => {
    setCurrentGraphPeriod(period);

    getAssetHistory({
      variables: {
        assetName: coinId,
        period,
      },
    });
  };

  const handleOnBuy = () => {
    layerManager.open("cryptoWalletBuyingFlow", {
      currency: coinId,
    });
  };

  const chartData = data?.getAssetHistory && parseChartData(data.getAssetHistory);

  return (
    <LayoutModal title={data?.getAssetHistory?.asset?.name || ""} horizontalPadding={false} ariaLabel="COININFO">
      <div className={cx("overflow-x-hidden", { "overflow-y-hidden": isGraphActive })}>
        <Graph
          data={chartData}
          isLoading={dataLoading || assetMetricDataLoading}
          isGraphActive={isGraphActive}
          setGraphActive={setIsGraphActive}
          currentGraphPeriod={currentGraphPeriod}
          onPeriodChange={handlePeriodChange}
          error={error}
          coinData={{
            name: assetMetricData?.getAssetMetrics?.name,
            image: assetMetricData?.getAssetMetrics?.logoImage,
          }}
        />
        <div className="flex flex-row px-5 mb-10">
          <ActionBuyButtons onBuy={handleOnBuy} cryptoId={coinId} disableTabs={disabledTabs} ariaLabel="COININFO" />
        </div>
        {currentAssetBalance && <MyCoinWalletCard assetBalance={currentAssetBalance} currencyCode={currencyCode} />}
        <Tabs withContainerBackground={false} ariaLabel="COININFO">
          <Tab title={t("wallet.widget.title.about")} key="about">
            <AboutCard assetName={assetMetricData?.getAssetMetrics?.name ?? ""} />
          </Tab>
          <Tab title={t("wallet.tab.title.transactions")} key="transactions">
            <CryptoRecentTransactions
              ariaLabel="COININFO"
              loading={loading && !!transactions}
              showCTA
              transactions={transactions?.getRecentTransactions ?? []}
            />
          </Tab>
          <Tab title={t("wallet.widget.title.news")} key="news">
            <div className="-mt-3">
              <NewsFeed ticker={coinId} ariaLabel="COININFO" />
            </div>
          </Tab>
        </Tabs>
      </div>
    </LayoutModal>
  );
};

export function parseChartData(assetHistory: AssetHistoryType) {
  const { history = [], start = "", end = "", minPrice = 0, maxPrice = 0, firstValidPointIndex = 0 } = assetHistory;

  if (!history.length) {
    return undefined;
  }

  const mappedPoints = history.map(({ price = 0, time }) => ({ y: price || 0, x: time || 0 }));

  return {
    points: sortBy(mappedPoints, "x"),
    minValue: minPrice,
    maxValue: maxPrice,
    start: new Date(start).getTime(),
    end: new Date(end).getTime(),
    firstValidPointIndex,
  };
}
