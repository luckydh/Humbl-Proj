import React, { FC, useCallback, useEffect, useState, useMemo } from "react";
import cx from "classnames";
import {
  ChartCard,
  Price,
  PercentageWithArrow,
  InfoPill,
  FormattedDate,
  TimeIntervals,
} from "components/ChartCard/ChartCard";
import { ChartTabs } from "components/ChartCard/ChartTabs";
import { formatUsingIntl } from "utils/currency";
import { useTranslation } from "react-i18next";
import { GraphData, Point } from "components/common/types";
import { MarketPeriodInput } from "generated/graphql";
import { ApolloError } from "@apollo/client";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";
import ContentLoader from "react-content-loader";
import skeletonStyles from "utils/SkeletonStyles";
import { useMeasure } from "react-use";
import { LineGraph } from "../LineGraph/LineGraph";

const GRAPH_HEIGHT = 180;
const ACTIVE_GRAPH_INTERVALS = 5;
const DEFAULT_GRAPH_INTERVALS = 3;

const PriceLine: FC = ({ children }) => (
  <div className="flex items-center w-full text-xs opacity-80 z-10">
    <span className="ml-2 mr-2">{children}</span>
    <div className="w-full h-px bg-white opacity-25" style={{ marginTop: -2 }} />
  </div>
);

interface ExpandedDataProps {
  start: number;
  value: number;
  date: number;
  // Whether the ExpandedDataProps should be shown and active
  isActive: boolean;
}

const ExpandedData: FC<ExpandedDataProps> = ({ start, value, date, isActive = true }) => {
  const classes = cx("transition-all duration-200 flex flex-col items-center space-y-2", {
    "max-h-0 opacity-0": !isActive,
    "max-h-screen opacity-100": isActive,
  });
  return (
    <div className={classes}>
      <InfoPill>
        <FormattedDate date={date} />
      </InfoPill>
      <PercentageWithArrow start={start} value={value} />
    </div>
  );
};

interface PortfolioGraphHeaderProps {
  value: number;
}

const PortfolioGraphHeader: FC<PortfolioGraphHeaderProps> = ({ value }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="relative flex items-center justify-center space-x-2" aria-label="PORTFOLIO_WALLETBALANCE_LABEL">
        <Price value={value} />
      </div>
      <p className="text-sm font-medium opacity-80 font-hando" aria-label="PORTFOLIO_TOTALBALANCE_LABEL">
        {t("component-portfolio-graph.text.heading")}
      </p>
    </>
  );
};

const PortfolioGraphZeroBalance: FC = () => (
  <div className="mb-8 w-full h-28" data-testid="total-balance">
    <ChartCard height="fill" width="fill">
      <div className="flex flex-col justify-center text-center h-full">
        <PortfolioGraphHeader value={0} />
      </div>
    </ChartCard>
  </div>
);

const PortfolioGraphSkeleton: FC<{ minHeight?: number }> = ({ minHeight }) => (
  <ChartCard height="auto">
    <ContentLoader
      className="rounded-md"
      width="100%"
      height={minHeight ?? 336}
      viewBox="0 0 375 384"
      uniqueKey="portfolio-graph-skeleton"
      {...skeletonStyles}>
      <rect x="75" y="46" width="226" height="30" rx="4" fill="#80DAFE" />
      <rect x="75" y="84" width="226" height="16" rx="4" fill="#80DAFE" />
      <rect x="32" y="120" width="311" height="16" rx="4" fill="#80DAFE" />
      <rect x="32" y="281" width="311" height="16" rx="4" fill="#80DAFE" />
      <rect x="32" y="320" width="26" height="26" rx="4" fill="#80DAFE" />
      <rect x="89" y="320" width="26" height="26" rx="4" fill="#80DAFE" />
      <rect x="146" y="320" width="26" height="26" rx="4" fill="#80DAFE" />
      <rect x="203" y="320" width="26" height="26" rx="4" fill="#80DAFE" />
      <rect x="260" y="320" width="26" height="26" rx="4" fill="#80DAFE" />
      <rect x="317" y="320" width="26" height="26" rx="4" fill="#80DAFE" />
    </ContentLoader>
  </ChartCard>
);

interface GraphProps {
  data: GraphData;
  activeTab: MarketPeriodInput;
  isGraphActive: boolean;
  onTabChange: (activeTab: MarketPeriodInput) => void;
  setMinHeight?: (minHeight: number) => void;
  setGraphActive: (graphActive: boolean) => void;
}

const Graph: FC<GraphProps> = ({ data, activeTab, isGraphActive, onTabChange, setMinHeight, setGraphActive }) => {
  const { points, firstValidPointIndex, maxValue, minValue, start, end } = data;
  const currency = useGetCurrentAccountCurrency();

  const initialDataPoint = points[points.length - 1];
  const [value, setValue] = useState(initialDataPoint.y ?? 0);
  const [date, setDate] = useState(initialDataPoint.x);

  const onChangeHandler = useCallback(
    (point: Point) => {
      if (point.y === null) {
        return;
      }

      setGraphActive(true);
      setValue(point.y);
      setDate(point.x);
    },
    [setGraphActive]
  );

  const onCompleteHandler = useCallback(() => {
    setValue(initialDataPoint.y!);
    setDate(initialDataPoint.x);
    setGraphActive(false);
  }, [initialDataPoint, setGraphActive]);

  const [ref, bounds] = useMeasure<HTMLDivElement>();

  useEffect(() => {
    setMinHeight?.(bounds.height);
  }, [bounds.height, setMinHeight]);

  const { size, margin } = useMemo(
    () => ({
      size: { height: GRAPH_HEIGHT, width: bounds.width },
      margin: { bottom: 20 },
    }),
    [bounds.width]
  );

  return (
    <div
      aria-label="PORTFOLIO_WALLETBALANCE_COMPONENT"
      className={cx("transition-all mx-0 pointer-events-none select-none duration-200", {
        "!-mx-6": isGraphActive,
      })}>
      <ChartCard height="auto" ref={ref} isRounded={!isGraphActive}>
        <div className="flex flex-col items-center self-start justify-center w-full mt-5 space-y-2 text-center">
          <PortfolioGraphHeader value={value} />
          <ExpandedData date={date} start={points[firstValidPointIndex].y!} value={value} isActive={isGraphActive} />
        </div>
        <div className="flex flex-col w-full mt-5">
          <PriceLine>{formatUsingIntl(maxValue, "standard", currency)}</PriceLine>
          <div className="relative block -my-2 z-0" style={{ height: GRAPH_HEIGHT, width: bounds.width }}>
            <LineGraph
              points={points}
              onChange={onChangeHandler}
              onComplete={onCompleteHandler}
              size={size}
              margin={margin}
            />
          </div>
          <PriceLine>{formatUsingIntl(minValue, "standard", currency)}</PriceLine>
        </div>
        <TimeIntervals
          isActive={isGraphActive}
          timeRange={[start, end]}
          intervals={isGraphActive ? ACTIVE_GRAPH_INTERVALS : DEFAULT_GRAPH_INTERVALS}
        />
        <div className="px-2 py-3 mt-2" style={{ background: isGraphActive ? "#1D3043" : "" }}>
          <ChartTabs onChange={onTabChange} activeTab={activeTab} ariaLabel="PORTFOLIO" />
        </div>
      </ChartCard>
    </div>
  );
};

export interface PortfolioGraphProps {
  isGraphActive: boolean;
  data?: GraphData;
  error?: ApolloError;
  isLoading?: boolean;
  onActiveTabChange: (activeTab: MarketPeriodInput) => void;
  setGraphActive: (graphActive: boolean) => void;
}

export const PortfolioGraph: FC<PortfolioGraphProps> = ({
  data,
  error,
  isLoading,
  isGraphActive,
  onActiveTabChange,
  setGraphActive,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(MarketPeriodInput.Hour_24);
  const [minHeight, setMinHeight] = useState<number | undefined>();

  const handleTabChange = useCallback(
    (value: MarketPeriodInput) => {
      setActiveTab(value);
      onActiveTabChange?.(value);
    },
    [onActiveTabChange]
  );

  if (error) {
    return (
      <ChartCard>
        <div className="pt-4 pb-6 px-6">
          <div className="text-base">{t("widget.error.generic-loading-error")}</div>
        </div>
      </ChartCard>
    );
  }

  if (isLoading && !data) {
    return <PortfolioGraphSkeleton minHeight={minHeight} />;
  }

  if (!data) {
    return <PortfolioGraphZeroBalance />;
  }

  return (
    <Graph
      data={data}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      setMinHeight={setMinHeight}
      setGraphActive={setGraphActive}
      isGraphActive={isGraphActive}
    />
  );
};
