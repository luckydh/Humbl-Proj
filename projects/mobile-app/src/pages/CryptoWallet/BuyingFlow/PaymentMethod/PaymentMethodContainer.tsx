import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useRecoilState, useResetRecoilState } from "recoil";
import { buyingFlowAmountState, buyingFlowOrderState } from "../atoms";
import { BuyingFlowStepProps, BuyingFlowPaymentMethodType } from "../sharedTypes";
import { useGetCryptoPurchaseMethodsQuery, PaymentMethodCategory } from "generated/graphql";
import { PaymentMethodScreen, PurchasePayload } from "./PaymentMethodScreen";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import { captureException } from "ErrorLogger";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { Countries } from "utils/stateOptions";
import { useBuyingFlowDestinationCurrency } from "../hooks";
import { usePaymentMethodSubmitHandler } from "./usePaymentMethodSubmitHandler";
import { useFeatureFlag } from "utils/Feature";

export const PaymentMethodContainer: React.FC<BuyingFlowStepProps> = ({ onGoBack, onComplete, onAbort }) => {
  const location = useLocation();
  const isAchEnabled = useFeatureFlag("ach-feature-redux-121521");

  const currency = useBuyingFlowDestinationCurrency();

  const resetOrderState = useResetRecoilState(buyingFlowOrderState);
  const [{ destinationCryptoAmount }, setAmountState] = useRecoilState(buyingFlowAmountState);

  const { currentAccount, loading: accountLoading } = useGetCurrentAccount();
  const {
    data,
    loading: methodsLoading,
    refetch,
  } = useGetCryptoPurchaseMethodsQuery({
    // TODO: Update cache when adding a card to avoid using "network-only" here.
    fetchPolicy: "network-only",
    variables: {
      purchaseCurrency: currency,
      purchaseAmount: destinationCryptoAmount,
    },
  });

  // TODO: filtering assets to Remove purchasing crypto (in FE for now Remove this once BE filters query results)
  // TODO: BE task ticket to track the work https://humblpay.atlassian.net/browse/HC-1581
  const filteredAssets = data?.assets?.filter((asset) => asset.code !== currency);

  // If ach is disabled we don't show any banks
  const banks = isAchEnabled && data?.banks ? data.banks : [];

  const { handlePaymentMethodSubmit, error, isSubmitting } = usePaymentMethodSubmitHandler(
    currentAccount?.country?.currencyCode!
  );

  const showBanner = currentAccount?.country?.alpha2?.toUpperCase() === Countries.US;

  useEffect(() => {
    trackEvent(EVENTS.SCREEN_VIEW, {
      screenName: "Payment Method",
      pathName: location.pathname,
    });
  }, [location.pathname]);

  const handleGoBack = () => {
    onGoBack?.();
    resetOrderState();
  };

  const handleContinue = async (payload: PurchasePayload) => {
    setAmountState((amountState) => ({
      ...amountState,
      sourceCurrencyCode: payload.assetCode,
    }));

    const analyticsObject = {} as { paymentMethod: string; cardNo?: string; paymentSource?: string };
    if (payload.type === BuyingFlowPaymentMethodType.Asset) {
      analyticsObject.paymentMethod = "Crypto";
      analyticsObject.paymentSource = payload.assetCode;
    } else {
      analyticsObject.paymentMethod = PaymentMethodCategory.Ach ? "ACH" : "Credit Card";
      analyticsObject.cardNo = payload.cardLastFour;
    }

    try {
      await handlePaymentMethodSubmit(payload);
      trackEvent(EVENTS.PURCHASE_CRYPTO, {
        screenName: "Payment Method",
        assetName: currency,
        assetAmount: destinationCryptoAmount,
        pathName: location.pathname,
        paidUsing: analyticsObject.paymentSource,
        cardNo: analyticsObject.cardNo,
        paymentMethod: analyticsObject.paymentMethod,
        status: "Success",
      });

      onComplete();
    } catch (paymentMethodError) {
      captureException(paymentMethodError);
      trackEvent(EVENTS.PURCHASE_CRYPTO, {
        screenName: "Payment Method",
        assetName: currency,
        assetAmount: destinationCryptoAmount,
        pathName: location.pathname,
        paidUsing: analyticsObject.paymentSource,
        cardNo: analyticsObject.cardNo,
        paymentMethod: analyticsObject.paymentMethod,
        status: "Fail",
      });
    }
  };

  return (
    <PaymentMethodScreen
      error={error}
      cards={data?.cards}
      banks={banks}
      paymentTypes="ALL"
      onClickClose={onAbort}
      assets={filteredAssets}
      onBack={handleGoBack}
      isLoading={methodsLoading || accountLoading}
      isSubmitting={isSubmitting}
      onContinue={handleContinue}
      refetchPaymentMethods={refetch}
      showBanner={showBanner}
      ariaLabel="PAYMENTMETHOD"
    />
  );
};

export default PaymentMethodContainer;
