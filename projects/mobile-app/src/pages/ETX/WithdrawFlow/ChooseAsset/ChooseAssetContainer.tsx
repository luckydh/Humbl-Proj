import { Icon } from "components/Icon/Icon";
import { Illustration } from "components/Illustration/Illustration";
import { ChooseAssetScreen } from "components/Modules/CryptoWallet/ChooseAssetScreen";
import { CryptoCurrencyItemProps } from "components/Modules/CryptoWallet/CryptoCurrencyList";
import { GainInterestModal } from "components/Modules/CryptoWallet/GainInterestModal/GainInterestModal";
import { PortfolioCompositionDataProps } from "pages/ETX/PortfolioComposition/PortfolioComposition";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import { formatUsingIntl } from "utils/currency";
import { withdrawEtxFlowAmountState } from "../atoms";
import { WithdrawFlowStepProps } from "../sharedTypes";

interface ChooseAssetContainerProps extends WithdrawFlowStepProps {
  portfolioCompositionArray: PortfolioCompositionDataProps[];
  blockName: string;
}

export const ChooseAssetContainer: React.FC<ChooseAssetContainerProps> = ({
  onComplete,
  onGoBack,
  portfolioCompositionArray,
  blockName,
}) => {
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState<boolean>(false);
  const modalData = [
    t("etx.withdraw.choose_asset.banner.modal.no_transfer_fee"),
    t("etx.withdraw.choose_asset.banner.modal.interest"),
    t("etx.withdraw.choose_asset.banner.modal.after_transfer"),
  ];
  const setAmountState = useSetRecoilState(withdrawEtxFlowAmountState);
  const handleChooseAsset = (asset: CryptoCurrencyItemProps) => {
    if (asset?.tickerCode && onComplete) {
      const selectedAsset = {
        image: asset.image || "",
        name: asset.name || "",
        tickerCode: asset.tickerCode,
        valueInFiat: asset.valueInFiat || "",
      };
      setAmountState({
        selectedAsset,
        availableFiatAmount: portfolioCompositionArray.find((item) => item.currency === asset.tickerCode)?.fiatAmount,
      });
      onComplete();
    }
  };

  const cryptoAssets = portfolioCompositionArray.map((item) => ({
    name: item.currencyName,
    valueInFiat: formatUsingIntl(item.fiatAmount!, "standard", item.fiatCurrency),
    image: item.logoImage,
    valueInCrypto: item.cryptoAmount,
    tickerCode: item.currency,
  }));

  return (
    <>
      <ChooseAssetScreen
        ariaLabel="CHOOSEASSET"
        title={t("etx.withdraw.choose_asset.title")}
        cryptoCurrencyItems={cryptoAssets}
        onChooseAsset={handleChooseAsset}
        showBanner
        onClickBack={onGoBack}
        bannerLeftIcon={<Illustration name="wallet_coins" size="sm" />}
        bannerRightIcon={<Icon name="outline_info" color="blue-dark" />}
        onBannerClick={() => setShowModal(true)}
        bannerText={t("etx.withdraw.choose_asset.banner", { block: blockName })}
      />
      <GainInterestModal
        isRefreshing={false}
        setShowGainInterestModal={setShowModal}
        showGainInterestModal={showModal}
        background="bg-blue-lightest"
        showCloseButton
        infoModal
        modalData={modalData}
        infoModalImage="outline_checkmark"
        infoModalTitle={t("etx.withdraw.choose_asset.banner.modal.title")}
        infoModalDescription={t("etx.withdraw.choose_asset.banner.modal.description")}
      />
    </>
  );
};
