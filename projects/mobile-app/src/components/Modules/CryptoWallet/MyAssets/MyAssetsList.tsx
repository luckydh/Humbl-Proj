import React from "react";
import { ApolloError } from "@apollo/client";
import { useTranslation } from "react-i18next";
import ContentLoader from "react-content-loader";

import { AssetItem, AssetItemProps } from "./MyAssetItem";
import { MarketingCallOutIcon } from "assets/icons";
import skeletonStyles from "utils/SkeletonStyles";
import { WidgetContainer } from "components/Modules/Widgets/WidgetContainer";
import { AdvertisementItemProps } from "../Portfolio/AdvertisementList/AdvertisementItem";
import { getAssetInterestRateObject } from "utils/cryptoWallet";

export interface EmptyStateAssetItems {
  title: string;
  image: string;
  description: string;
  ariaLabel?: string;
}

export const EmptyStateSkeleton: React.FC = () => (
  <ContentLoader
    {...skeletonStyles}
    className="text-center rounded-lg w-52 h-52"
    width={208}
    height={208}
    viewBox="0 0 224 192"
  >
    <rect x="72" y="20" rx="2" ry="2" width="76" height="76" color="#ffcc00" />
    <rect x="56" y="112" rx="2" ry="2" width="112" height="16" />
    <rect x="31" y="140" rx="2" ry="2" width="161" height="46" />
  </ContentLoader>
);
export const EmptyStateAsset: React.FC<EmptyStateAssetItems> = ({ title, image, description, ariaLabel }) => (
  <div className="text-center bg-blue-lightest rounded-lg flex-none w-52 h-52">
    <div className="p-[19px]">
      <img src={image} alt={title} className="inline" style={{ width: "80%" }} />
      <div
        aria-label={ariaLabel && `${ariaLabel}_CRYPTOCARDSTITLE_LABEL`}
        className="text-blue-dark truncate font-bold text-[15px]"
      >
        {title}
      </div>
      <div
        aria-label={ariaLabel && `${ariaLabel}_CRYPTOCARDSBODY_LABEL`}
        className="text-blue-dark font-medium text-[13px] line-clamp-2"
      >
        {description}
      </div>
    </div>
  </div>
);

export interface CryptoCurrencyListProps {
  loading: boolean;
  items: AssetItemProps[];
  error?: ApolloError;
  onClickItem: (asset: AssetItemProps) => void;
  onClickBuy: () => void;
  shouldRefresh: boolean;
  assetInterestData?: AdvertisementItemProps[];
  ariaLabel?: string;
}

interface BuyCardProps {
  onClick: () => void;
  ariaLabel?: string;
}
const BuyCard: React.FC<BuyCardProps> = ({ onClick: handleOnClick, ariaLabel }) => (
  <button aria-label={ariaLabel && `${ariaLabel}_PLUS_BUTTON`} onClick={handleOnClick}>
    <div
      key="buyMore"
      style={{
        background: "#283F562a",
        boxShadow: "2px 6px 20px rgba(0, 0, 0, 0.08)",
      }}
      className="flex-none w-52 h-52 flex align-middle items-center text-center text-4xl bg-blue-dark rounded-lg font-hando border-2 border-white"
    >
      <div className="w-full">+</div>
    </div>
  </button>
);

export const MyAssetsList: React.FC<CryptoCurrencyListProps> = ({
  loading,
  items,
  error,
  onClickItem,
  onClickBuy,
  shouldRefresh = false,
  assetInterestData,
  ariaLabel,
}) => {
  const { t } = useTranslation();
  const initialLoad = loading && !items;
  const isRefreshing = shouldRefresh && loading;

  const emptyStateData = {
    title: t("crypto-wallet.home-screen.assets-you-own.empty-state.title"),
    description: t("crypto-wallet.home-screen.assets-you-own.empty-state.description"),
    image: MarketingCallOutIcon,
  };

  if (error) {
    return (
      <WidgetContainer ariaLabel="MY_ASSETS_LIST_WIDGET_CONTAINER">
        <div className="mx-6 my-10 text-sm text-black">{t("widget.error.generic-loading-error")}</div>
      </WidgetContainer>
    );
  }

  if (isRefreshing || initialLoad) {
    return (
      <div className="w-full my-4 h-auto overflow-x-auto flex px-5">
        <div className="first:ml-0 mx-1 flex-none h-auto">
          <EmptyStateSkeleton />
        </div>
        <BuyCard onClick={onClickBuy} />
      </div>
    );
  }

  return (
    <div
      aria-label={ariaLabel && `${ariaLabel}_WALLET_MYASSETSCRYPTOCARDS_SECTION`}
      className="w-full my-4 h-auto overflow-x-auto flex"
    >
      <div className="flex pl-5 pr-5">
        {items.length > 0 ? (
          items.map((crypto) => {
            const assetInterestRateObject = getAssetInterestRateObject(crypto, assetInterestData);
            return (
              <div className="first:ml-0 mx-1 last:mr-0 flex-none w-52 h-52" key={crypto.coin}>
                <AssetItem
                  onClick={() => onClickItem && onClickItem(crypto)}
                  logo={crypto.logo}
                  price={crypto.price}
                  coin={crypto.coin}
                  assetInterestRate={assetInterestRateObject?.valueInPercent}
                  coinName={crypto.coinName}
                  ariaLabel={ariaLabel}
                  amount={crypto.amount} // Trims to max decimals. toFixed converts to string so we + in front to cast back to number
                />
              </div>
            );
          })
        ) : (
          <EmptyStateAsset ariaLabel={ariaLabel} {...emptyStateData} />
        )}
        <div className="mx-1">
          <BuyCard ariaLabel={ariaLabel} onClick={onClickBuy} />
        </div>
      </div>
    </div>
  );
};
