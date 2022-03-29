import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useGetCryptoMarketListQuery, useGetMyAssetInterestRatesQuery } from "generated/graphql";
import { ChooseAssetScreen } from "components/Modules/CryptoWallet/ChooseAssetScreen";
import { CryptoCurrencyItemProps } from "components/Modules/CryptoWallet/CryptoCurrencyList";
import { displaySignificantFigures } from "utils/currency";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { useSetRecoilState } from "recoil";
import { BuyingFlowStepProps } from "../sharedTypes";
import { buyingFlowAmountState, selectedAssetInterestRate } from "../atoms";
import { Illustration } from "components/Illustration/Illustration";
import { Icon } from "components/Icon/Icon";
import ActionModal from "components/Modules/CryptoWallet/ActionModalAndTabs/ActionModal/ActionModal";
import { mapAssetsToAdvertisementItems } from "utils/hooks/useAssetInterestRates";
import CoinAssetImage from "components/Modules/CryptoWallet/CoinAssetImage/CoinAssetImage";
import { compactNumberFormat } from "utils/compactNumberFormat";
import { AdvertisementItemProps } from "components/Modules/CryptoWallet/Portfolio/AdvertisementList/AdvertisementItem";
import { Pill } from "components/Pill/Pill";

export const ChooseAssetContainer: React.FC<BuyingFlowStepProps> = ({ onComplete, onGoBack, onAbort }) => {
  const { t } = useTranslation();
  const setAmountState = useSetRecoilState(buyingFlowAmountState);
  const setSelectedAssetInterestRate = useSetRecoilState(selectedAssetInterestRate);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: assetInterestData } = useGetMyAssetInterestRatesQuery({
    fetchPolicy: "cache-and-network",
  });

  const items = mapAssetsToAdvertisementItems(assetInterestData?.myAssetInterestRates);
  const maxInterestRate = items ? Math.max(...items.map((item) => item.valueInPercent), 0) : 0;

  const { data, loading } = useGetCryptoMarketListQuery();

  const handleChooseAsset = (asset: CryptoCurrencyItemProps, assetInterestRateObject?: AdvertisementItemProps) => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Choose Asset",
      type: "Buy",
      screenName: "Choose Asset",
      cryptoCode: asset.tickerCode,
    });

    setAmountState((state) => ({
      ...state,
      destinationCurrencyCode: asset.tickerCode,
    }));

    if (assetInterestRateObject) {
      setSelectedAssetInterestRate({
        tickerCode: assetInterestRateObject.tickerCode,
        valueInPercent: assetInterestRateObject.valueInPercent,
      });
    }

    onComplete();
  };

  const cryptoAssets = data?.getMarketList?.assets?.map<CryptoCurrencyItemProps>((item) => ({
    name: item?.name,
    valueInFiat: displaySignificantFigures(item?.price!, "standard", item.currency),
    image: item?.logoImage,
    change: item?.percentChangeOverPeriod,
    tickerCode: item?.code!,
  }));

  const getFormattedInterestRate = (interestRate: number) => compactNumberFormat(interestRate / 100, "percent");

  return (
    <>
      <ChooseAssetScreen
        ariaLabel="CHOOSEASSET"
        onClickBack={onGoBack}
        showBanner
        bannerSize="small"
        bannerText={
          <div aria-label="CHOOSEASSET_EARNINTEREST_SECTION" className="flex flex-row items-center">
            <div aria-label="CHOOSEASSET_GRAPH_ICON">
              <Illustration name="graph_arrow_2" size="sm" />
            </div>
            <div aria-label="CHOOSEASSET_BODY_LABEL" className="pl-4">
              <Trans
                i18nKey="crypto-wallet.home.buy-banner-title"
                components={{ em: <em className="text-blue pl-1 font-semibold not-italic" /> }}
              />
            </div>
          </div>
        }
        bannerRightIcon={
          <div aria-label="CHOOSEASSET_INFO_ICON">
            <Icon color="blue-dark2" name="outline_info" size="md" />
          </div>
        }
        assetInterestRatesData={items}
        onBannerClick={() => setIsModalOpen(true)}
        onRightClick={onAbort}
        title={t("crypto-wallet.buy.title.choose-asset")}
        cryptoCurrencyItems={cryptoAssets ?? []}
        loading={loading}
        onChooseAsset={handleChooseAsset}
      />
      <ActionModal
        ariaLabel="EARNINTEREST"
        background="bg-white"
        setShowActionModal={setIsModalOpen}
        showActionModal={isModalOpen}
        showCloseButton
      >
        <div aria-label="EARNINTEREST_BODY_LABEL">
          <h1 className="text-blue-dark2 mt-2 text-lg font-bold text-center mb-1">
            {t("crypto-wallet.home.buy-banner-modal-title")}
          </h1>
          <p className="text-blue-dark text-base justify-center mb-4 flex flex-row">
            <Trans
              values={{
                interestRate: getFormattedInterestRate(maxInterestRate),
              }}
              i18nKey="crypto-wallet.home.buy-banner-modal-subtitle-earn-upto"
              components={{ text: <text className="px-1 text-green-500" /> }}
            />
          </p>
          <ul className="flex flex-col text-sm rounded-lg mt-2 mb-3 text-blue-dark2">
            <li className="mb-1 flex flex-row self-center w-9/12">
              <span className="flex-shrink-0">
                <Icon name="outline_checkmark" color="green" />
              </span>
              <span className="ml-2">{t("crypto-wallet.home.buy-banner-modal-gain-interest-from")}</span>
            </li>
            <li className="mb-1 flex flex-row self-center w-9/12">
              <span className="flex-shrink-0">
                <Icon name="outline_checkmark" color="green" />
              </span>
              <span className="ml-2">{t("crypto-wallet.home.buy-banner-modal-interest-credited")}</span>
            </li>
            <li className="flex flex-row self-center w-9/12">
              <span className="flex-shrink-0">
                <Icon name="outline_checkmark" color="green" />
              </span>
              <span className="ml-2">{t("crypto-wallet.home.buy-banner-modal-earning-paid")}</span>
            </li>
          </ul>
          <div className="flex flex-row justify-around mb-6">
            {items?.map((item) => (
              <div key={item.name} className="flex flex-col items-center">
                <CoinAssetImage coinImage={item.image} size="large" bgType="bg-solid" />
                <span className="truncate font-semibold mb-2 text-sm text-blue-dark">{item.name}</span>
                <Pill outline color="green">
                  <span className="text-xs font-normal">
                    {t("crypto-wallet.home.buy-pill.percentage.apy", {
                      interestRate: getFormattedInterestRate(item.valueInPercent),
                    })}
                  </span>
                </Pill>
              </div>
            ))}
          </div>
        </div>
      </ActionModal>
    </>
  );
};
