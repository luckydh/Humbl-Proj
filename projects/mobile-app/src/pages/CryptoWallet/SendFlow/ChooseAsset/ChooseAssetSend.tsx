import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMyAssetsLazyQuery } from "generated/graphql";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import { ChooseAssetScreen } from "components/Modules/CryptoWallet/ChooseAssetScreen";
import { CryptoCurrencyItemProps } from "components/Modules/CryptoWallet/CryptoCurrencyList";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { formatUsingIntl } from "utils/currency";
import { sendFlowCurrentState } from "../sendFlowUtils";
import { useFlowActions } from "pages/CryptoWallet/Flow";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const ChooseAssetSend: React.FC = () => {
  const setCurrentState = useSetRecoilState(sendFlowCurrentState);
  const { t } = useTranslation();
  const { back, forward } = useFlowActions();
  const { currentAccount, loading: accountLoading } = useGetCurrentAccount();
  const [getMyAssets, { data, loading: assetsLoading }] = useMyAssetsLazyQuery();
  const { user } = useRecoilValue(sendFlowCurrentState);

  useEffect(() => {
    if (currentAccount) {
      getMyAssets({
        variables: {
          currency: currentAccount.country?.currencyCode!,
        },
      });
    }
  }, [currentAccount, getMyAssets]);

  const handleChooseAsset = (asset: CryptoCurrencyItemProps) => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Choose Asset",
      type: "Send",
      screenName: "Choose Asset",
      cryptoCode: asset.tickerCode,
    });
    setCurrentState((state) => ({
      ...state,
      currency: asset.tickerCode,
    }));
    forward();
  };

  const cryptoAssets = data?.myAssets?.map((item) => ({
    name: item?.name,
    valueInFiat: formatUsingIntl(item?.fiatAmount?.major ?? 0.0),
    valueInCrypto: item.amount,
    image: item?.logoImage,
    tickerCode: item?.code,
  }));

  return (
    <ChooseAssetScreen
      ariaLabel="CHOOSEASSET"
      title={t("crypto-wallet.send.title.choose-asset")}
      cryptoCurrencyItems={cryptoAssets as CryptoCurrencyItemProps[]}
      loading={accountLoading || assetsLoading}
      onChooseAsset={handleChooseAsset}
      image={user?.image}
      displayName={user?.displayName}
      onClickBack={back}
    />
  );
};
