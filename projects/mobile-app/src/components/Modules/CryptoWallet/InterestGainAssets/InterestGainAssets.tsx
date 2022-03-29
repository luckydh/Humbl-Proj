import React, { useState } from "react";
import { Rocket } from "assets/svgs/Rocket";
import { useTranslation } from "react-i18next";
import { GainInterestModal } from "../GainInterestModal/GainInterestModal";
import { useGetMyAssetsInterestSummaryQuery } from "generated/graphql";
import { CoinsGainingInterest } from "./CoinsGainingInterest/CoinsGainingInterest";
import { WidgetContainer } from "components/Modules/Widgets/WidgetContainer";
import { DigitalWalletSkeleton } from "components/DigitalWallet/DigitalWallet";
import { useAssetInterestRates } from "utils/hooks/useAssetInterestRates";
import { useTranslatedArray } from "utils/hooks/useTranslatedArray";
import useRefreshFetch from "utils/hooks/useRefreshFetch";

const INTEREST_GAIN_CARD_STYLES =
  "bg-blue-lightest bg-interestCardBackground bg-right-bottom bg-no-repeat bg-cover shadow-md rounded-xl text-blue-dark font-medium m-5 px-3 sm:px-4 flex flex-row";

interface Props {
  isRefreshing?: boolean;
  ariaLabel?: string;
}
export interface AssetDataObjectInterface {
  [code: string]: {
    name: string;
    logoImage?: string;
    interestGained: number;
    interestGainedFiat: number;
    interestRate?: number;
  };
}

export const InterestGainAssets: React.FC<Props> = ({ isRefreshing = false, ariaLabel }) => {
  const { t } = useTranslation();

  const myAssetInterestData = useAssetInterestRates();
  const {
    data,
    loading: assetsSummaryLoading,
    error: assetsSummaryError,
    refetch: refetchAssetsSummary,
  } = useGetMyAssetsInterestSummaryQuery({
    fetchPolicy: "cache-and-network",
  });

  useRefreshFetch(isRefreshing, refetchAssetsSummary);

  const { assets: myAssets, totalInterestGainedFiat } = data?.myAssetsInterestSummary || {};

  const assetDataObject =
    myAssets?.reduce((curr, nextItem) => {
      const { code, interestGained, interestGainedFiat, name, logoImage } = nextItem;
      const myAsset = myAssetInterestData?.find((asset) => asset.tickerCode === code);
      if (code) {
        curr[code] = {
          name: name ?? "",
          logoImage,
          interestGainedFiat: interestGainedFiat?.major ?? 0,
          interestGained: interestGained ?? 0,
          interestRate: myAsset?.valueInPercent,
        };
      }

      return curr;
    }, {} as AssetDataObjectInterface) ?? {};

  const availableAssets = useTranslatedArray(Object.keys(assetDataObject));

  if (assetsSummaryLoading) {
    return (
      <div className="mt-4 mx-5">
        <DigitalWalletSkeleton height={150} />
      </div>
    );
  }

  if (!myAssets?.length) {
    return <InterestGainAssetsEmpty isRefreshing={isRefreshing} ariaLabel={ariaLabel} />;
  }

  return (
    <>
      <div className="mx-6 mt-6">
        <CoinsGainingInterest
          frontCardTitle={
            Object.keys(assetDataObject).length > 2
              ? t("crypto-wallet.home.total-interest-gained")
              : t("crypto-wallet.home.coins-gaining-interest")
          }
          frontCardSubTitle={
            totalInterestGainedFiat?.major
              ? `${t("crypto-wallet.home.you-are-currently-gaining")} ${availableAssets}`
              : t("crypto-wallet.home.amount-reflect-once-coins")
          }
          totalInterestGained={totalInterestGainedFiat?.major || 0}
          assetDataObject={assetDataObject}
        />
      </div>
      {assetsSummaryError && (
        <WidgetContainer ariaLabel="INTEREST_GAIN_WIDGET_CONTAINER">
          <div className=" text-sm text-black">{t("widget.error.generic-loading-error")}</div>
        </WidgetContainer>
      )}
    </>
  );
};

interface InterestGainAssetsEmptyProps {
  isRefreshing?: boolean;
  ariaLabel?: string;
}

const InterestGainAssetsEmpty: React.FC<InterestGainAssetsEmptyProps> = ({ ariaLabel, isRefreshing }) => {
  const { t } = useTranslation();
  const [showGainInterestModal, setShowGainInterestModal] = useState(false);

  const handleBuyInterestGainAssets = () => {
    setShowGainInterestModal(true);
  };

  return (
    <>
      <div
        aria-label={ariaLabel && `${ariaLabel}_EARNINTEREST_COMPONENT`}
        className={INTEREST_GAIN_CARD_STYLES}
        onClick={handleBuyInterestGainAssets}
      >
        <div className="w-2/3 app_md:w-3/5 flex flex-col justify-center">
          <p aria-label={ariaLabel && `${ariaLabel}_EARNINTERESTTITLE_LABEL`} className="text-base md:text-lg">
            {t("crypto-wallet.buy.interestgaining.question")}
          </p>
          <p
            aria-label={ariaLabel && `${ariaLabel}_EARNINTERESTBODY_LABEL`}
            className="text-sm md:text-base font-normal"
          >
            {t("crypto-wallet.buy.interestgaining.subheading")}
          </p>
        </div>
        <div className="w-1/3 app_md:w-2/5 flex flex-row justify-end flex-auto">
          <Rocket />
        </div>
      </div>
      <GainInterestModal
        isRefreshing={isRefreshing}
        setShowGainInterestModal={setShowGainInterestModal}
        showGainInterestModal={showGainInterestModal}
        background="bg-blue-lightest"
        showCloseButton
        infoModalTitle={t("pages.crypto-wallet.portfolio.interest.no-coin")}
        infoModalDescription={t("pages.crypto-wallet.interest-gain.description")}
      />
    </>
  );
};
