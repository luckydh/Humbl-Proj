import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useGetCryptoMarketListQuery } from "generated/graphql";
import { ChooseAssetScreen } from "components/Modules/CryptoWallet/ChooseAssetScreen";
import { CryptoCurrencyItemProps } from "components/Modules/CryptoWallet/CryptoCurrencyList";

export const ChooseAssetReceive: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { data, loading } = useGetCryptoMarketListQuery({
    variables: {
      type: "RECEIVE",
    },
  });

  const handleChooseAsset = (asset: CryptoCurrencyItemProps) => {
    history.push(`/crypto-wallet/receive/${asset.tickerCode}`);
  };

  const cryptoAssets = data?.getMarketList?.assets?.map((item) => ({
    name: item?.name,
    image: item?.logoImage,
    tickerCode: item?.code,
  }));

  return (
    <ChooseAssetScreen
      title={t("crypto-wallet.receive.title.choose-asset")}
      cryptoCurrencyItems={cryptoAssets as CryptoCurrencyItemProps[]}
      loading={loading}
      onChooseAsset={handleChooseAsset}
      ariaLabel="CHOOSEASSET"
    />
  );
};
