import React, { FC } from "react";
import CoinAssetImage from "../CoinAssetImage/CoinAssetImage";
import { MultipleCoinsLogo } from "components/AssetGraph/AssetGraph";

export interface MultipleCoinAssetImageProps {
  multipleCoinsLogo: Array<MultipleCoinsLogo>;
  multipleCoinsContent?: string;
}

export const MultipleCoinAssetImage: FC<MultipleCoinAssetImageProps> = ({
  multipleCoinsLogo,
  multipleCoinsContent,
}) => (
  <span className="flex flex-row items-center">
    {multipleCoinsLogo.map((coinLogo: MultipleCoinsLogo) => (
      <span className="-mr-1" key={coinLogo.currencyCode}>
        <CoinAssetImage
          coinImage={coinLogo.image}
          coinName={coinLogo.currencyCode}
          size="x-small"
          bgType="bg-solid"
          imageClass="p-[3px]"
        />
      </span>
    ))}
    <span className="ml-2 text-white">{multipleCoinsContent}</span>
  </span>
);
export default MultipleCoinAssetImage;
