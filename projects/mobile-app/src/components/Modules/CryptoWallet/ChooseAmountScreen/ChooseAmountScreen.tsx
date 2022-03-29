import React, { useRef, useEffect, useState } from "react";
import cx from "classnames";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { IonIcon, IonPage } from "@ionic/react";
import { getCurrencySymbol, formatPartialFiatAmount } from "utils/currency";
import { AssetBalanceType, AssetMetricType } from "generated/graphql";
import { chevronBackOutline, close } from "ionicons/icons";
import { CRYPTO_MAX_SCALE, FIAT_MAX_SCALE, cryptoToFiat, fiatToCrypto } from "utils/currencyConversion";

import Button from "components/Button/Button";
import SwitchIcon from "assets/svgs/SwitchIcon";
import ContentLoader from "react-content-loader";
import { Calculator } from "components/Calculator/Calculator";
import { IconButton } from "components/IconButton/IconButton";
import { AutoScaleText } from "components/common";
import { decimalPrecision, CALCULATOR_COIN_DECIMAL_PRECISION } from "utils/decimalPrecision";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";
import { WarningModal } from "components/WarningModal/WarningModal";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { SendUserIcon } from "pages/CryptoWallet/SendFlow/SendUserIcon/SendUserIcon";
import CoinAssetImage from "../CoinAssetImage/CoinAssetImage";
import { SuggestionButton, SuggestionType } from "../SuggestionButton";
import { LimitsType, LimitsDisplay } from "../LimitsDisplay";
import { Icon } from "components/Icon/Icon";
import { SwapAssetCoinIcon } from "pages/CryptoWallet/SwapFlow/SwapAssetCoinIcon/SwapAssetCoinIcon";

const DURATION = 2_000;

export interface SubmitPayload {
  inputMode: InputMode;
  fiatAmount: number;
  cryptoAmount: string;
  fiatCurrencyCode: string;
  maxOption: boolean;
}

export interface ChooseAmountScreenProps {
  /**
   * The asset to buy.
   */
  asset?: Omit<AssetMetricType & AssetBalanceType, "__typename">;

  /**
   * Loading indicator.
   */
  isLoading?: boolean;

  /**
   * Submitting indicator.
   */
  isSubmitting?: boolean;

  /**
   * Sets the input mode to be used initially.
   * @default "fiat"
   */
  defaultInputMode?: InputMode;

  /**
   * Array of suggestions to be displayed and clickable.
   * @see SuggestionButton
   * @example
   *  suggestions={[
   *    { type: "flat", value: 5 },
   *    { type: "flat", value: 50 },
   *    { type: "flat", value: 100 },
   *  ]}
   */
  suggestions?: SuggestionType[];

  /**
   * Available amount in fiat currency to be displayed.
   * It's also used to calculate amount suggestions of type "max".
   */
  availableAmountInFiat?: number;

  /**
   * Limits object to be displayed at the top.
   */
  limits?: LimitsType;

  userImage?: string;
  displayName?: string;

  /**
   * Function that runs on submit to validate the amount.
   * It must return null or the error message as a string.
   */
  validateAmount?: (amount: number) => string | null;

  /**
   * Handler for clicking on the back arrow.
   */
  onBack?: () => void;

  /**
   * Handler for clicking on the close icon.
   */
  onClickClose?: () => void;

  /**
   * Handler for clicking on the submit button
   */
  onSubmit?: (data: SubmitPayload) => void;

  /**
   * Handler for clicking in any of the suggestions.
   * This is useful for tracking events in the parent.
   */
  onUseSuggestion?: (value: SuggestionType) => void;

  ariaLabel?: string;

  isKycApproved?: boolean;

  leftCoinImage?: string;

  rightCoinImage?: string;

  cryptoSwapBalanceLabel?: boolean;
}

export enum InputMode {
  Fiat = "fiat",
  Crypto = "crypto",
}

export const ChooseAmountScreen: React.FC<ChooseAmountScreenProps> = ({
  asset,
  suggestions = [],
  isLoading,
  isSubmitting,
  defaultInputMode = InputMode.Fiat,
  limits,
  availableAmountInFiat,
  userImage,
  displayName,
  validateAmount,
  onBack,
  onClickClose,
  onSubmit,
  onUseSuggestion,
  ariaLabel,
  isKycApproved = false,
  leftCoinImage,
  rightCoinImage,
  cryptoSwapBalanceLabel = false,
}) => {
  const { t } = useTranslation();
  const resetRef = useRef<(value: string) => void>(() => {});
  const userCurrency = useGetCurrentAccountCurrency();

  const [fiatAmount, setFiatAmount] = useState("0");
  const [cryptoAmount, setCryptoAmount] = useState("0");
  const [inputMode, setInputMode] = useState(defaultInputMode);
  const [maxOption, setMaxOption] = useState(false);
  const [amountError, setAmountError] = useState<string | null>(null);

  const currencySymbol = getCurrencySymbol(userCurrency);

  const isFiatMode = inputMode === InputMode.Fiat;
  const isCryptoMode = inputMode === InputMode.Crypto;
  const location = useLocation();

  useEffect(() => {
    trackEvent(EVENTS.SCREEN_VIEW, {
      screenName: "Choose Amount",
      pathName: location.pathname,
    });
  }, [location.pathname]);

  // Sync crypto amount when asset is loaded if the user already typed a value.
  useEffect(() => {
    if (asset && fiatAmount !== "0") {
      const cryptoValue = decimalPrecision(fiatToCrypto(fiatAmount, asset?.price!), CALCULATOR_COIN_DECIMAL_PRECISION);
      setCryptoAmount(cryptoValue);
    }
    // TODO: Figure out a better way to handle dependencies instead of disabling exhaustive-deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asset]); // we don't pass fiatAmount here to avoid running every time.

  const handleChange = (value: string) => {
    if (value !== "") {
      setAmounts(value);
    } else {
      setFiatAmount("0");
      setCryptoAmount("0");
    }
  };

  const setAmounts = (value: string) => {
    const maxAmount = availableAmountInFiat && availableAmountInFiat.toFixed(FIAT_MAX_SCALE);
    if (isCryptoMode) {
      setCryptoAmount(value);
      const fiatValue = cryptoToFiat(value, asset?.price!).toFixed(FIAT_MAX_SCALE);
      setFiatAmount(fiatValue);
      setMaxOption(fiatValue === maxAmount);
    }

    if (isFiatMode) {
      setFiatAmount(value);
      const cryptoValue = decimalPrecision(fiatToCrypto(value, asset?.price!), CALCULATOR_COIN_DECIMAL_PRECISION);
      setCryptoAmount(cryptoValue);
      setMaxOption(value === maxAmount);
    }
  };

  const resetCalculatorValue = (value: string) => {
    resetRef?.current?.(value);
  };

  const handleClickSwitch = () => {
    if (isCryptoMode) {
      setInputMode(InputMode.Fiat);
      resetCalculatorValue(fiatAmount);
    } else {
      setInputMode(InputMode.Crypto);
      resetCalculatorValue(cryptoAmount);
    }
  };

  const handleSelectSuggestion = (suggestion: SuggestionType) => {
    onUseSuggestion?.(suggestion);

    let amount: number | undefined;

    if (suggestion.type === "flat") {
      amount = suggestion.value!;
    }

    if (typeof availableAmountInFiat !== "undefined") {
      if (suggestion.type === "max") {
        const maxAmount = availableAmountInFiat.toFixed(FIAT_MAX_SCALE);
        const cryptoValue =
          isCryptoMode && decimalPrecision(fiatToCrypto(maxAmount, asset?.price!), CALCULATOR_COIN_DECIMAL_PRECISION);
        amount = cryptoValue ? parseFloat(cryptoValue) : availableAmountInFiat;
      }
    }

    if (amount) {
      // suggestions are only available in fiat mode already,
      // so we just need to sum current fiat amount + suggestion value.
      let addedAmount;
      if (suggestion.type === "max") {
        addedAmount = !isCryptoMode ? amount.toFixed(FIAT_MAX_SCALE) : amount.toFixed(CRYPTO_MAX_SCALE);
        setMaxOption(true);
      } else {
        const floatFiatAmount = parseFloat(fiatAmount);
        addedAmount = (floatFiatAmount + amount).toFixed(FIAT_MAX_SCALE);
      }
      setAmounts(addedAmount);
      resetCalculatorValue(addedAmount);
    }
  };

  const handleOnDismiss = () => {
    setAmountError(null);
  };

  const handleClickContinue = () => {
    const fiat = parseFloat(fiatAmount);
    // This will avoid insufficient funds validation running into rounding issues when using max option.
    const amountToValidate = maxOption && availableAmountInFiat ? availableAmountInFiat : fiat;
    const error = validateAmount?.(amountToValidate);

    if (error) {
      setAmountError(error);
      return;
    }

    onSubmit?.({
      inputMode,
      maxOption,
      fiatAmount: fiat,
      cryptoAmount,
      fiatCurrencyCode: userCurrency ?? "",
    });
  };

  return (
    <IonPage
      className={cx("bg-lines overscroll-none", {
        "overflow-hidden": amountError, // To lock scroll when the Toast shows up
        "overflow-y-scroll": !amountError,
      })}>
      <div className="bg-white safe-area-top" />
      <div className="flex flex-col h-full">
        <div className="flex flex-col flex-1 bg-white">
          <div className="relative flex flex-col items-center justify-center p-6">
            {isLoading ? (
              <ContentLoader
                className="mb-2"
                width="100%"
                height="43"
                style={{ background: "#fff" }}
                uniqueKey="asset-logo-skeleton">
                <circle cx="50%" cy="21.5" r="21.5" />
              </ContentLoader>
            ) : leftCoinImage ? (
              <SwapAssetCoinIcon leftCoinImage={leftCoinImage} rightCoinImage={rightCoinImage} />
            ) : (
              <div className="mb-2">
                {userImage && displayName ? (
                  <div className="flex flex-col">
                    <SendUserIcon
                      ariaLabel={ariaLabel}
                      image={userImage}
                      displayName={displayName}
                      size="md"
                      coinImage={asset?.logoImage}
                    />
                  </div>
                ) : (
                  <CoinAssetImage ariaLabel={ariaLabel} coinImage={asset?.logoImage} size="x-large" bgType="bg-solid" />
                )}
              </div>
            )}
            {limits && <LimitsDisplay isKycApproved={isKycApproved} limits={limits} ariaLabel={ariaLabel} />}
            {cryptoSwapBalanceLabel && availableAmountInFiat && (
              <div className="flex flex-row mt-2 tracking-wide">
                <p className="font-semibold text-blue-dark">
                  {t("crypto-wallet.swap.balance-title", { asset: asset?.code })}&nbsp;
                </p>
                <p className="font-semibold text-blue-dark">
                  {currencySymbol}
                  {availableAmountInFiat?.toFixed(FIAT_MAX_SCALE)}
                </p>
              </div>
            )}
            {typeof availableAmountInFiat !== "undefined" && !cryptoSwapBalanceLabel && (
              <p className="font-medium text-blue-dark" aria-label={ariaLabel && `${ariaLabel}_AVAILABLEAMOUNT_LABEL`}>
                {currencySymbol}
                {availableAmountInFiat?.toFixed(FIAT_MAX_SCALE)} {t("crypto-wallet.buy.choose-amount.available")}
              </p>
            )}
            <button
              aria-label={ariaLabel && `${ariaLabel}_BACK_BUTTON`}
              type="button"
              onClick={onBack}
              className="absolute justify-center text-blue-dark top-6 left-3">
              <IonIcon icon={chevronBackOutline} className="text-4xl" />
            </button>
            {onClickClose && (
              <button
                aria-label={ariaLabel && `${ariaLabel}_CLOSE_BUTTON`}
                type="button"
                className="absolute justify-center text-blue-dark w-7 top-6 right-8"
                onClick={onClickClose}>
                <IonIcon icon={close} className="text-4xl" />
              </button>
            )}
          </div>
          <div className="flex flex-col items-center justify-center flex-1 w-full mb-10">
            <div className="flex items-center justify-center w-full">
              <span className="flex-1 w-10 text-2xl font-medium text-right uppercase text-blue-dark">
                {isFiatMode && currencySymbol}
              </span>
              <span
                data-testid="primary-amount"
                className={cx(
                  "max-w-[50%] text-5xl text-blue-dark font-medium self-center tracking-tight mx-2 text-right",
                  {
                    "opacity-50": fiatAmount === "0",
                  }
                )}>
                <AutoScaleText>
                  {isFiatMode && (
                    <span className="tabular-nums" aria-label={ariaLabel && `${ariaLabel}_AMOUNTFIAT_LABEL`}>
                      {formatPartialFiatAmount(fiatAmount)}
                    </span>
                  )}
                  {isCryptoMode && (
                    <span className="tabular-nums" aria-label={ariaLabel && `${ariaLabel}_AMOUNTCRYPTO_LABEL`}>
                      {cryptoAmount}
                    </span>
                  )}
                </AutoScaleText>
              </span>
              <span className="flex-1 w-10 text-lg text-left uppercase text-blue-dark opacity-80">
                {isFiatMode && <span aria-label={ariaLabel && `${ariaLabel}_CURRENCYFIAT_LABEL`}>{userCurrency}</span>}
                {isCryptoMode && <span aria-label={ariaLabel && `${ariaLabel}_CURRENCYCRYPTO_LABEL`}>{asset?.code}</span>}
              </span>
            </div>
            {isLoading ? (
              <ContentLoader
                width="100%"
                height="28"
                className="mt-4"
                style={{ background: "#fff" }}
                uniqueKey="cryto-amount-skeleton">
                <rect x="30%" y="4" width="40%" height="20" rx="8" ry="8" />
              </ContentLoader>
            ) : (
              <div className="flex items-center justify-center w-full mt-4 text-xl font-medium uppercase text-blue-dark">
                <span>{isCryptoMode && currencySymbol}</span>
                <span className="max-w-[50%] mx-2" data-testid="secondary-amount">
                  <AutoScaleText>
                    {isCryptoMode && (
                      <span className="tabular-nums" aria-label={ariaLabel && `${ariaLabel}_AMOUNTFIAT_LABEL`}>
                        {formatPartialFiatAmount(fiatAmount)}
                      </span>
                    )}
                    {isFiatMode && (
                      <span className="tabular-nums" aria-label={ariaLabel && `${ariaLabel}_AMOUNTCRYPTO_LABEL`}>
                        {cryptoAmount}
                      </span>
                    )}
                  </AutoScaleText>
                </span>
                <span>
                  {isCryptoMode && (
                    <span aria-label={ariaLabel && `${ariaLabel}_CURRENCYFIAT_LABEL`}>{userCurrency}</span>
                  )}
                  {isFiatMode && <span aria-label={ariaLabel && `${ariaLabel}_CURRENCYCRYPTO_LABEL`}>{asset?.code}</span>}
                </span>
              </div>
            )}
            <div className={cx({ "mt-6 h-12": suggestions.length })}>
              {suggestions.map((item) => (
                <SuggestionButton
                  key={`${item.type}${item.value ?? ""}`}
                  suggestion={item}
                  currencySymbol={currencySymbol}
                  onSelect={handleSelectSuggestion}
                  ariaLabel="CALCULATOR"
                  isMaxOption={maxOption}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between px-6">
          <IconButton
            ariaLabel={ariaLabel && `${ariaLabel}_SWAP_BUTTON`}
            size={67}
            variant="solid"
            onClick={handleClickSwitch}
            data-testid="switch-input-mode"
            disabled={isLoading}
            className="self-center transform -translate-y-1/2">
            <SwitchIcon />
          </IconButton>
          <div aria-label={ariaLabel && `${ariaLabel}_CALCULATOR_COMPONENT`} className="transform -translate-y-4">
            <Calculator
              resetRef={resetRef}
              onChange={handleChange}
              variant="decimal"
              ariaLabel="CALCULATOR"
              maxDecimalScale={isFiatMode ? FIAT_MAX_SCALE : CRYPTO_MAX_SCALE}
            />
            <Button
              ariaLabel={ariaLabel && `${ariaLabel}_CONTINUE_BUTTON`}
              className="mt-6 mb-8"
              isDisabled={isSubmitting || isLoading}
              onClick={handleClickContinue}>
              {t("global.continue")}
            </Button>
          </div>
        </div>
      </div>
      <WarningModal
        show={!!amountError}
        duration={DURATION}
        title={<Icon name="bold_danger" color="red" size="md" />}
        onDismiss={handleOnDismiss}
        message={amountError}
        ariaLabel={ariaLabel && `${ariaLabel}_AMOUNT_PROMPT`}
      />
    </IonPage>
  );
};
