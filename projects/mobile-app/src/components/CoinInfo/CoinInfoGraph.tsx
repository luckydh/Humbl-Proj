import React, { FC, useCallback, useState, useMemo } from "react";
import cx from "classnames";

import { ChartCard, Price, PercentageWithArrow, PriceLine, TimeIntervals } from "components/ChartCard/ChartCard";
import { ChartTabs } from "components/ChartCard/ChartTabs";
import { formatUsingIntl } from "utils/currency";
import { GraphData, Point } from "components/common/types";
import { MarketPeriodInput } from "generated/graphql";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";
import { useTranslation } from "react-i18next";
import { AutoScaleText } from "components/common";
import CoinAssetImage from "components/Modules/CryptoWallet/CoinAssetImage/CoinAssetImage";
import { useMeasure } from "react-use";
import { CoinInfoGraphOverlay } from "./CoinInfoGraphOverlay";
import { LineGraph } from "../LineGraph/LineGraph";

const GRAPH_HEIGHT = 180;
const ACTIVE_GRAPH_INTERVALS = 5;
const DEFAULT_GRAPH_INTERVALS = 3;

export interface CoinInfoGraphProps {
  data: GraphData;
  currentGraphPeriod: MarketPeriodInput;
  coinName?: string;
  coinImage?: string;
  isGraphActive: boolean;
  onActiveTabChange?: (activeTab: MarketPeriodInput) => void;
  setGraphActive: (graphActive: boolean) => void;
}

export const CoinInfoGraph: FC<CoinInfoGraphProps> = ({
  data: { points, firstValidPointIndex, start, end, minValue, maxValue },
  coinName,
  coinImage,
  onActiveTabChange,
  currentGraphPeriod,
  isGraphActive,
  setGraphActive,
}) => {
  const { t } = useTranslation();
  const currency = useGetCurrentAccountCurrency();
  const initialDataPoint = points[points.length - 1];
  const [value, setValue] = useState(initialDataPoint.y ?? 0);

  const [activeTab, setActiveTab] = useState(currentGraphPeriod);
  const [showInfoOverlay, setShowInfoOverlay] = useState(false);

  const handleLineGraphChange = useCallback(
    (point: Point) => {
      if (point.y === null) {
        return;
      }

      setGraphActive(true);
      setValue(point.y);
    },
    [setGraphActive]
  );

  const handleTabChange = useCallback(
    (period: MarketPeriodInput) => {
      setActiveTab(period);
      onActiveTabChange?.(period);
    },
    [onActiveTabChange]
  );

  const handleLineGraphComplete = useCallback(() => {
    setGraphActive(false);
    setValue(initialDataPoint.y!);
  }, [initialDataPoint, setGraphActive]);

  const handleOverlayClose = useCallback(() => {
    setShowInfoOverlay(false);
  }, []);

  const [ref, bounds] = useMeasure<HTMLDivElement>();

  const { size, margin } = useMemo(
    () => ({
      size: { height: GRAPH_HEIGHT, width: bounds.width },
      margin: { bottom: 20 },
    }),
    [bounds.width]
  );

  return (
    <div
      aria-label="COININFO_WALLETBALANCE_COMPONENT"
      className={cx("transition-all mb-8 mx-5 duration-200 pointer-events-none select-none", {
        "mx-0": isGraphActive,
      })}>
      <ChartCard height="auto" ref={ref} isRounded={!isGraphActive}>
        {showInfoOverlay && (
          <CoinInfoGraphOverlay
            currentGraphPeriod={currentGraphPeriod}
            start={points[firstValidPointIndex].y!}
            value={value}
            coinName={coinName}
            onClose={handleOverlayClose}
          />
        )}
        <div className="flex flex-col sm:flex-row self-start w-full mt-5 text-center items-center">
          <div className="flex flex-col items-center justify-center w-24 mx-3 mb-2 sm:mb-0">
            <CoinAssetImage coinImage={coinImage} coinName={coinName} size="large" bgType="bg-solid" />
            <span className="text-sm whitespace-nowrap sm:whitespace-normal">{coinName}</span>
          </div>
          <div className="flex flex-col justify-start sm:text-left sm:items-start items-center px-4 sm:space-y-2 sm:border-l border-white overflow-x-hidden max-w-full">
            <p className="text-sm font-medium text-left opacity-80 font-hando" aria-label="COININFO_CURRENTPRICE_LABEL">
              {t("coin-info.graph.current-price")}
            </p>
            <div className="overflow-x-hidden whitespace-nowrap max-w-full">
              <AutoScaleText>
                <Price value={value} showSigFigs ariaLabel="COININFO_WALLETBALANCE_LABEL" />
              </AutoScaleText>
            </div>
            <PercentageWithArrow
              start={points[firstValidPointIndex].y!}
              value={value}
              onInfoIconClick={() => setShowInfoOverlay(true)}
            />
          </div>
        </div>
        <div className="flex flex-col w-full mt-4">
          <PriceLine>{formatUsingIntl(Math.round(maxValue * 1.15), "standard", currency)}</PriceLine>
          <div className="relative block -my-2" style={{ height: GRAPH_HEIGHT, width: bounds.width }}>
            <LineGraph
              points={points}
              onChange={handleLineGraphChange}
              onComplete={handleLineGraphComplete}
              size={size}
              margin={margin}
            />
          </div>
          <PriceLine>{formatUsingIntl(Math.round(minValue * 0.95), "standard", currency)}</PriceLine>
        </div>
        <div>
          <TimeIntervals
            isActive={isGraphActive}
            timeRange={[start, end]}
            intervals={isGraphActive ? ACTIVE_GRAPH_INTERVALS : DEFAULT_GRAPH_INTERVALS}
          />
        </div>
        <div className="px-2 py-3 mt-2" style={{ background: isGraphActive ? "#1D3043" : "" }}>
          <ChartTabs onChange={handleTabChange} activeTab={activeTab} ariaLabel="COININFO" />
        </div>
      </ChartCard>
    </div>
  );
};
