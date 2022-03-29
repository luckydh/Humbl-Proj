import React from "react";
import cx from "classnames";
import CoinAssetImage from "components/Modules/CryptoWallet/CoinAssetImage/CoinAssetImage";
import { Icon } from "components/Icon/Icon";

export interface SwapAssetCoinIconProps {
  leftCoinImage: string | undefined;
  rightCoinImage?: string | undefined;
  tickerCode?: string;
  leftText?: string;
}

export const SwapAssetCoinIcon: React.FC<SwapAssetCoinIconProps> = ({
  leftCoinImage,
  rightCoinImage,
  tickerCode,
  leftText,
}) => {
  const wrapperClasses = cx("flex w-full justify-center items-center flex-row");

  const imageClasses = cx("flex flex-row justify-center");

  const rightTextClasses = cx("text-blue-dark font-semibold");

  const leftTextClasses = cx("text-blue-dark pr-1 font-medium");

  return (
    <div aria-label="SWAPASSET_SECTION" className={wrapperClasses}>
      {leftText && (
        <span aria-label="SWAPASSET_LEFT_TEXT" className={leftTextClasses}>
          {leftText}
        </span>
      )}
      <div className={imageClasses}>
        {leftCoinImage && (
          <CoinAssetImage ariaLabel="SWAPASSET_FROM" size={leftText ? "small" : "large"} coinImage={leftCoinImage} />
        )}
        {rightCoinImage && (
          <>
            <div className="self-center">
              <Icon size="xs" color="grey-light" name="outline_arrow" />
            </div>
            <CoinAssetImage ariaLabel="SWAPASSET_TO" size="large" coinImage={rightCoinImage} />
          </>
        )}
      </div>
      {tickerCode && (
        <span aria-label="SWAPASSET_TICKER_CODE" className={rightTextClasses}>
          {tickerCode}
        </span>
      )}
    </div>
  );
};
