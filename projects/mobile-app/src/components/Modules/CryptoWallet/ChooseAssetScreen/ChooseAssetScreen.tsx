import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchInput } from "components/SearchInput/SearchInput";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { useLocation, useHistory } from "react-router";
import { CloseIcon } from "assets/svgs/CloseIcon";
import { KeyboardAwareView } from "components/common";
import { IonIcon, IonPage } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { SendUserIcon } from "pages/CryptoWallet/SendFlow/SendUserIcon/SendUserIcon";
import { CryptoCurrencyItemProps, CryptoCurrencyList } from "../CryptoCurrencyList";
import { useSearchCryptoCurrencies } from "./useSearchCryptoCurrencies";
import { SwapAssetCoinIcon } from "pages/CryptoWallet/SwapFlow/SwapAssetCoinIcon/SwapAssetCoinIcon";
import Banner, { BannerSize } from "components/Banner/Banner";
import { AdvertisementItemProps } from "../Portfolio/AdvertisementList/AdvertisementItem";

export interface ChooseAssetScreenProps {
  title?: string;
  onChooseAsset: (asset: CryptoCurrencyItemProps, assetInterestRateObject?: AdvertisementItemProps) => void;
  onClickBack?: () => void;
  cryptoCurrencyItems: CryptoCurrencyItemProps[];
  loading?: boolean;
  displayName?: string;
  image?: string;
  onRightClick?: () => void;
  ariaLabel?: string;
  swapLeftText?: string;
  leftCoinImage?: string;
  tickerCode?: string;
  showBanner?: boolean;
  bannerText?: string | JSX.Element;
  bannerLeftIcon?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  bannerRightIcon?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  onBannerClick?: () => void;
  bannerSize?: BannerSize;
  assetInterestRatesData?: AdvertisementItemProps[];
}

export const ChooseAssetScreen: React.FC<ChooseAssetScreenProps> = ({
  title = "",
  onChooseAsset,
  onClickBack,
  loading = false,
  cryptoCurrencyItems,
  image = "",
  displayName = "",
  onRightClick,
  ariaLabel,
  swapLeftText,
  leftCoinImage,
  tickerCode,
  showBanner,
  bannerText,
  bannerLeftIcon,
  bannerRightIcon,
  onBannerClick,
  bannerSize,
  assetInterestRatesData,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const { results } = useSearchCryptoCurrencies(search, cryptoCurrencyItems);
  const location = useLocation();

  const onClose = () => {
    if (onClickBack) {
      return onClickBack();
    }

    if (history.length >= 1) {
      history.goBack();
      return null;
    }
    history.push("/home");
    return null;
  };

  useEffect(() => {
    trackEvent(EVENTS.SCREEN_VIEW, {
      screenName: "Choose Asset",
      pathName: location.pathname,
    });
  }, [location.pathname]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handleClear = () => {
    setSearch("");
  };

  return (
    <IonPage className="safe-area-top bg-lines">
      <KeyboardAwareView>
        <div className="flex flex-col h-full">
          <div className="flex flex-col px-6">
            <div className="flex flex-wrap items-center w-full py-5">
              <button
                aria-label={ariaLabel && `${ariaLabel}_BACK_BUTTON`}
                className="justify-center inline-flex text-white"
                type="button"
                onClick={onClose}
                title="Go back">
                <IonIcon icon={chevronBackOutline} className="text-3xl" />
              </button>

              <div className="w-max flex-1">
                <h1
                  aria-label={ariaLabel && `${ariaLabel}_TITLE_LABEL`}
                  className="text-xl capitalize border-white font-medium text-center text-white m-auto">
                  {title}
                </h1>
              </div>
              <div className="w-7">
                {typeof onRightClick === "function" && (
                  <button
                    type="button"
                    className="justify-center text-white"
                    onClick={onRightClick}
                    title="Close"
                    aria-label="CHOOSEASSET_CLOSE_BUTTON">
                    <div className="m-2 mt-3">
                      <CloseIcon />
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className="w-full my-3">
              <SearchInput
                ariaLabel={ariaLabel}
                onChange={handleChange}
                onClear={handleClear}
                placeholder={t("component-footer.label.search")}
              />
            </div>
          </div>
          {image && displayName && (
            <div className="flex items-center justify-center w-full bg-white h-14">
              <SendUserIcon ariaLabel={ariaLabel} image={image} displayName={displayName} size="sm" fullText row />
            </div>
          )}
          {leftCoinImage && (
            <div className="flex items-center justify-center w-full bg-white h-14">
              <SwapAssetCoinIcon leftText={swapLeftText} tickerCode={tickerCode} leftCoinImage={leftCoinImage} />
            </div>
          )}
          {showBanner && bannerText && (
            <Banner
              text={bannerText}
              size={bannerSize}
              fontSize="regular"
              bgColor="white"
              leftIcon={bannerLeftIcon}
              rightIcon={bannerRightIcon}
              onClick={onBannerClick}
            />
          )}
          <CryptoCurrencyList
            assetInterestRatesData={assetInterestRatesData}
            ariaLabel={ariaLabel}
            items={results}
            loading={loading}
            onClickItem={onChooseAsset}
          />
        </div>
      </KeyboardAwareView>
    </IonPage>
  );
};
