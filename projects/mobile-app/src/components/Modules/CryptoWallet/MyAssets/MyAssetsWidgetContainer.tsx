import React, { useEffect } from "react";

import { useGetMyAssetInterestRatesQuery, useMyAssetsQuery } from "generated/graphql";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import { AssetItemProps } from "./MyAssetItem";
import { MyAssetsList } from "./MyAssetsList";
import useRefreshFetch from "utils/hooks/useRefreshFetch";
import { useLayerManager } from "components/Layers/hooks";
import { useHistory } from "react-router";
import { buildPath } from "utils/routes";
import { mapAssetsToAdvertisementItems } from "utils/hooks/useAssetInterestRates";

interface MyAssetsWidgetContainerProps {
  checkAssets?: (type: boolean) => void;
  isRefreshing?: boolean;
  ariaLabel?: string;
}

/**
 * Calls market list query and Renders cryptocurrency list. The tab container
 * takes care of apollo calls, and only renders a single thin component. No rendering
 * logic should live inside these 'containers'
 * @returns <CryptoCurrencyList/>
 */
export const MyAssetsWidgetContainer: React.FC<MyAssetsWidgetContainerProps> = ({
  checkAssets,
  isRefreshing = false,
  ariaLabel,
}) => {
  const account = useGetCurrentAccount();
  const history = useHistory();
  const layerManager = useLayerManager();

  const { data, loading, error, refetch } = useMyAssetsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      currency: account.currentAccount?.country?.currencyCode || "USD",
    },
  });

  const { data: assetInterestRatesData } = useGetMyAssetInterestRatesQuery({
    fetchPolicy: "cache-and-network",
  });

  const assetInterestData = mapAssetsToAdvertisementItems(assetInterestRatesData?.myAssetInterestRates);

  useRefreshFetch(isRefreshing, refetch);

  useEffect(() => {
    if (!loading) {
      checkAssets?.(!!data?.myAssets?.length);
    }
  }, [data, loading, checkAssets]);

  const onClickAsset = (assetItem: AssetItemProps) => {
    history.push(buildPath("cryptoWalletCoinInfo_Coin_", { coinId: assetItem.coin }));
  };

  const onClickBuy = () => {
    layerManager.open("cryptoWalletBuyingFlow", {});
  };

  const items: AssetItemProps[] =
    data?.myAssets?.map((coin) =>
      // We map returned value to the format needed for our CryptoCurrencyItemProps
       ({
        logo: coin.logoImage!,
        currency: "USD",
        price: coin.fiatAmount?.major || 0,
        amount: coin.amount!,
        coinName: coin.name!,
        coin: coin.code!,
      })
    ) || [];
  // We pass loading state to the list item so it maintains all rendering control.
  return (
    <MyAssetsList
      shouldRefresh={isRefreshing}
      items={items}
      error={error}
      loading={loading}
      assetInterestData={assetInterestData}
      onClickItem={onClickAsset}
      onClickBuy={onClickBuy}
      ariaLabel={ariaLabel}
    />
  );
};
