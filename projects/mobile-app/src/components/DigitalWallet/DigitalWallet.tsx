import React, { FC, useMemo } from "react";
import ContentLoader from "react-content-loader";
import { useTranslation } from "react-i18next";

import { ChartCard, Price, Heading, UpDownArrow, TimeIntervals, ChartCardEmpty } from "components/ChartCard/ChartCard";
import { GraphData } from "components/common/types";
import skeletonStyles from "utils/SkeletonStyles";
import { AssetLineGraph } from "components/AssetGraph/AssetLineGraph";
import { useMeasure } from "react-use";

const DEFAULT_GRAPH_INTERVALS = 3;

interface Last24HourProps {
  value: number;
  start: number;
  showLabel?: boolean;
  ariaLabel?: string;
}

const Last24Hour: FC<Last24HourProps> = ({ start, value, showLabel = true, ariaLabel }) => {
  const { t } = useTranslation();
  // need both values to avoid infinity result
  let percent = "";
  if (value && start) {
    percent = (((value - start) / start) * 100).toFixed(2);
  }

  return (
    <div className="flex flex-col text-right top-4 right-5 font-hando">
      {showLabel && (
        <p aria-label={ariaLabel && `${ariaLabel}_LAST24H_LABEL`} className="text-sm opacity-70">
          {t("crypto-wallet.digital-wallet.last-24")}:
        </p>
      )}
      <p
        aria-label={ariaLabel && `${ariaLabel}_PERCENTAGEVARIATION_LABEL`}
        className="flex items-center justify-end space-x-2 text-sm">
        {value !== start && <UpDownArrow isPositive={+percent > 0} />}
        <span className="tabular-nums">{percent}%</span>
      </p>
    </div>
  );
};

export interface DigitalWalletProps {
  data: GraphData;
  ariaLabel?: string;
}

export const DigitalWallet: FC<DigitalWalletProps> = ({
  data: { points, firstValidPointIndex, start, end },
  ariaLabel,
}) => {
  const initialValue = points[points.length - 1]?.y ?? 0;

  const { t } = useTranslation();
  const [ref, bounds] = useMeasure<HTMLDivElement>();

  const { size, margin } = useMemo(() => ({
      size: { height: 100, width: bounds.width },
      margin: { bottom: 22 },
    }), [bounds.width]);

  return (
    /* z-0 needed to avoid the graph showing above the sticky header. */
    <div className="select-none relative z-0">
      <ChartCard height="auto" ref={ref} isRounded>
        <div className="flex flex-row mt-5 h-5 px-6 pointer-events-none z-10">
          <div className="-mt-1 mr-auto flex-shrink-0">
            <Heading ariaLabel={ariaLabel && `${ariaLabel}_WALLETBALANCE_LABEL`}>
              {t("crypto-wallet.digital-wallet.text.heading")}
            </Heading>
          </div>
          <div className="ml-auto flex-shrink-0 relative">
            <Last24Hour ariaLabel={ariaLabel} value={initialValue} start={points[firstValidPointIndex].y!} />
          </div>
        </div>
        <div className="flex flex-col px-6 pointer-events-none z-10">
          <Price ariaLabel={ariaLabel && `${ariaLabel}_USERBALANCE_LABEL`} value={initialValue} notation="compact" />
        </div>

        <div className="relative z-0" style={{ height: 100 }}>
          <AssetLineGraph points={points} size={size} margin={margin} fill={false} id="wallet-balance-graph" />
        </div>

        <div className="px-3 my-1 pointer-events-auto">
          <TimeIntervals timeRange={[start, end]} intervals={DEFAULT_GRAPH_INTERVALS} />
        </div>
      </ChartCard>
    </div>
  );
};

interface DigitalWalletSkeletonProps {
  height?: number;
}

export const DigitalWalletSkeleton: FC<DigitalWalletSkeletonProps> = ({ height = 224 }) => (
  <ContentLoader
    className="rounded-md"
    width="100%"
    viewBox={`0 0 335 ${height}`}
    uniqueKey="digital-wallet-graph-skeleton"
    {...skeletonStyles}>
    <rect x="20" y="20" rx="4" ry="4" width="112" height="16" />
    <rect x="20" y="48" rx="4" ry="4" width="112" height="32" />
    <rect x="20" y="92" rx="4" ry="4" width="42" height="13" />
    <rect x="246" y="20" rx="4" ry="4" width="64" height="16" />
    <rect x="246" y="48" rx="4" ry="4" width="64" height="16" />
    <rect x="20" y="181" rx="4" ry="4" width="42" height="13" />
    <rect x="143" y="181" rx="4" ry="4" width="42" height="13" />
    <rect x="265" y="181" rx="4" ry="4" width="42" height="13" />
  </ContentLoader>
);

interface Props {
  ariaLabel?: string;
}

export const EmptyDigitalWallet: FC<Props> = ({ ariaLabel }) => {
  const { t } = useTranslation();

  return (
    <ChartCardEmpty>
      <Heading ariaLabel={ariaLabel && `${ariaLabel}_WALLETBALANCE_LABEL`}>
        {t("crypto-wallet.digital-wallet.text.heading")}
      </Heading>
      <Price value={0} />
    </ChartCardEmpty>
  );
};

export default DigitalWallet;
