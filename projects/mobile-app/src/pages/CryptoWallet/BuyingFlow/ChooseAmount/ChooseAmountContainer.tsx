import React from "react";
import { useLocation } from "react-router-dom";
import { MembershipStatus, useGetCryptoAssetMetricsQuery } from "generated/graphql";
import { SuggestionType } from "components/Modules/CryptoWallet/SuggestionButton";
import { ChooseAmountScreen, SubmitPayload } from "components/Modules/CryptoWallet/ChooseAmountScreen";
import { useSetRecoilState } from "recoil";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import { Countries } from "utils/Countries";
import { formatUsingIntl } from "utils/currency";
import { useTranslation } from "react-i18next";
import { buyingFlowAmountState } from "../atoms";
import { BuyingFlowStepProps } from "../sharedTypes";
import { useBuyingFlowDestinationCurrency } from "../hooks";
import { useLayerProps } from "components/Layers/hooks";
import { MINIMUM_FIAT_AMOUNT_TO_BUY } from "utils/constants";

const WYRE_BUY_DAILY_LIMIT = 150_000;

const KYC_APPROVED_LIMITS = {
  weekly: 7_500,
  monthly: 7_500,
  yearly: 0,
};

const DOMESTIC_CARD_LIMITS = {
  weekly: 500,
  monthly: 2_000,
  yearly: 5_000,
};

const INTERNATIONAL_CARD_LIMITS = {
  weekly: 1_000,
  monthly: 4_000,
  yearly: 7_500,
};

const getCardLimits = (country?: string, isKycApproved = false) => {
  if (isKycApproved) {
    return KYC_APPROVED_LIMITS;
  }
  return country?.toUpperCase() === Countries.US ? DOMESTIC_CARD_LIMITS : INTERNATIONAL_CARD_LIMITS;
};

const PURCHASE_AMOUNT_SUGGESTIONS: SuggestionType[] = [
  { type: "flat", value: 5 },
  { type: "flat", value: 10 },
  { type: "flat", value: 100 },
];

export const ChooseAmountContainer: React.FC<BuyingFlowStepProps> = ({ onGoBack, onComplete, onAbort }) => {
  const { t } = useTranslation();

  const location = useLocation();
  const currency = useBuyingFlowDestinationCurrency();
  const setAmountState = useSetRecoilState(buyingFlowAmountState);

  const layerProps = useLayerProps("cryptoWalletBuyingFlow");
  const shouldShowCloseButton = !layerProps?.currency;

  const { currentAccount } = useGetCurrentAccount();
  const { data, loading } = useGetCryptoAssetMetricsQuery({
    variables: { assetName: currency ?? "" },
  });

  const isKycApproved = currentAccount?.kycStatus?.status === MembershipStatus.Approved;

  const handleSubmit = (payload: SubmitPayload) => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Choose Amount Continue",
      type: "Buy",
      screenName: "Choose Amount",
      cryptoCode: currency,
      fiatAmount: payload.fiatAmount,
      cryptoAmount: payload.cryptoAmount,
    });

    trackEvent(EVENTS.PURCHASE_CRYPTO, {
      screenName: "Choose Amount",
      assetName: currency,
      assetAmount: payload.cryptoAmount,
      pathName: location?.pathname,
    });

    setAmountState((state) => ({
      ...state,
      destinationFiatAmount: payload.fiatAmount,
      destinationCryptoAmount: payload.cryptoAmount,
      destinationCurrencyCode: currency,
    }));

    onComplete();
  };

  const onSuggestionTap = (suggestion: SuggestionType) => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Suggested Amount Tapped",
      type: suggestion.type,
      screenName: "Choose Amount Container",
      amount: suggestion.value,
    });
  };

  const validateAmount = (amount: number) => {
    const userCurrency = currentAccount?.country?.currencyCode;

    if (amount >= WYRE_BUY_DAILY_LIMIT) {
      return t("crypto-wallet.buy.choose-amount.max-limit", {
        dailyLimit: formatUsingIntl(WYRE_BUY_DAILY_LIMIT, "standard", userCurrency),
      });
    }

    if (amount < MINIMUM_FIAT_AMOUNT_TO_BUY) {
      return t("crypto-wallet.buy.choose-amount.min-limit", {
        minimumFiatAmount: formatUsingIntl(MINIMUM_FIAT_AMOUNT_TO_BUY, "standard", userCurrency),
      });
    }

    return null;
  };

  return (
    <ChooseAmountScreen
      asset={data?.getAssetMetrics}
      onBack={onGoBack}
      onSubmit={handleSubmit}
      onClickClose={shouldShowCloseButton ? onAbort : undefined}
      isLoading={loading}
      isSubmitting={false}
      isKycApproved={isKycApproved}
      limits={getCardLimits(currentAccount?.country?.alpha2, isKycApproved)}
      // TODO: The suggestions should come from the back-end
      suggestions={PURCHASE_AMOUNT_SUGGESTIONS}
      validateAmount={validateAmount}
      onUseSuggestion={onSuggestionTap}
      ariaLabel="CALCULATOR"
    />
  );
};
