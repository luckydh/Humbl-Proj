import React, { FC } from "react";
import cx from "classnames";
import { PeriodMapKey } from "components/common/types";
import { MarketPeriodInput } from "generated/graphql";

export interface ChartTabsProps {
  activeTab: MarketPeriodInput;
  onChange: (value: MarketPeriodInput) => void;
  ariaLabel?: string;
}

const periodMap: Record<PeriodMapKey, MarketPeriodInput> = {
  "1h": MarketPeriodInput.Hour_1,
  "24h": MarketPeriodInput.Hour_24,
  "1w": MarketPeriodInput.Week_1,
  "1m": MarketPeriodInput.Month_1,
  "1y": MarketPeriodInput.Year_1,
  all: MarketPeriodInput.All,
};

const periodsList = Object.entries(periodMap) as [PeriodMapKey, MarketPeriodInput][];

export const ChartTabs: FC<ChartTabsProps> = ({ activeTab, onChange, ariaLabel }) => {
  const handleClick = (value: MarketPeriodInput) => {
    onChange(value);
  };

  return (
    <div className="flex justify-between pointer-events-auto">
      {periodsList.map(([periodKey, periodValue], idx) => {
        const chartTabAriaLabel = `${ariaLabel}_${periodKey.toUpperCase()}_BUTTON`;
        return (
          <button
            aria-label={chartTabAriaLabel}
            key={`chart-tab-${idx}`}
            className={cx("block text-sm font-medium uppercase rounded-md font-hando", {
              "bg-blue": periodValue === activeTab,
            })}
            style={{ padding: "3px 6px" }}
            onClick={() => handleClick(periodValue)}>
            {periodKey}
          </button>
        );
      })}
    </div>
  );
};
