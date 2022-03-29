import React, { FC } from "react";
import cx from "classnames";
import { InterestColorMap } from "components/Modules/CryptoWallet/Portfolio/InterestGain";

type ProgressItemData = {
  interestGained?: number;
  tickerCode?: keyof typeof InterestColorMap;
};

export interface ProgressBarProps {
  data: ProgressItemData[];
  total: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ data, total }) => (
  <div className="h-6 mx-2 mt-8 overflow-hidden rounded-lg flex flex-row">
    {data.map((item, index) => {
      const percentageValue = item.interestGained ? (item.interestGained / total) * 100 : 0;
      return (
        <div
          key={item.tickerCode}
          style={{
            width: `${percentageValue}%`,
            backgroundColor: InterestColorMap[item.tickerCode ?? ""],
          }}
          className={cx(
            "border-t-4 border-b-4 border-opacity-25",
            `${index === 0 && "border-l-4 rounded-l-lg"}`,
            `${index === data.length - 1 && "border-r-4 rounded-r-lg"}`
          )}
        />
      );
    })}
  </div>
);
