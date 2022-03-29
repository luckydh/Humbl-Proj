import React from "react";
import { AssetGraphStatic } from "components/AssetGraph/AssetGraph";

export type CryptoCurrencyItemVariant = "compact" | "default";

export interface AssetItemProps {
  price: number;
  amount: number;
  coin: string;
  coinName: string;
  logo: string;
  /**
   * Item component click handler.
   */
  onClick?: () => void;
  ariaLabel?: string;
  assetInterestRate?: number;
}

export const AssetItem: React.FC<AssetItemProps> = ({
  price,
  amount,
  coin,
  coinName,
  logo,
  onClick,
  ariaLabel,
  assetInterestRate,
}) => (
  <button className="w-full h-full" onClick={onClick}>
    <div className="text-left h-full flex flex-col">
      <AssetGraphStatic
        logo={logo}
        price={price}
        coin={coin}
        ariaLabel={ariaLabel}
        coinName={coinName}
        amount={amount}
        assetInterestRate={assetInterestRate}
      />
    </div>
  </button>
);

export default AssetItem;
