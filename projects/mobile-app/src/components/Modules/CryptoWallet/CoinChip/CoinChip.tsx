import React from "react";
import CoinAssetImage, { CoinAssetSize, CoinAssetVariant } from "../CoinAssetImage/CoinAssetImage";
import cx from "classnames";

export interface CoinChipProp {
  coinImage?: string;
  coinName?: string;
  size?: CoinAssetSize;
  bgType?: CoinAssetVariant;
  content?: string;
  ariaLabel?: string;
}

export const CoinChip: React.FC<CoinChipProp> = ({ coinImage, coinName, size, bgType, content, ariaLabel }) => (
  <div
    className="h-6 w-24 flex items-center bg-blue-light rounded-md"
    aria-label={ariaLabel && `${ariaLabel}_CRYPTODISTRIBUTIONCARDPILL_SECTION`}>
    <div className="mx-1">
      <CoinAssetImage
        coinImage={coinImage}
        coinName={coinName}
        size={size}
        bgType={bgType}
        imageClass="p-0.5"
        ariaLabel="ORDERPREVIEW"
      />
    </div>
    <div
      aria-label={ariaLabel && `${ariaLabel}_CRYPTODISTRIBUTIONPERCENTAGE_LABEL`}
      className={cx(
        "items-center text-center h-full rounded-r-md w-full bg-blue-lightest text-blue-dark text-xs leading-6 border-l border-blue border-opacity-75 border-solid"
      )}>
      {content}
    </div>
  </div>
);
