import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { captureException } from "ErrorLogger";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";
import {
  GetCryptoBuySuccessDataDocument,
  useCreateCardAssetOrderMutation,
  useGetCryptoCardOrderReservationQuery,
} from "generated/graphql";
import { formatUsingIntl } from "utils/currency";
import { decimalPrecision, ORDER_PREVIEW_DECIMAL_PRECISION } from "utils/decimalPrecision";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { getPotentialHumblError } from "graphql/humblGraphqlError";
import { BuyOrderPreviewScreen } from "./BuyOrderPreviewScreen";
import { BuyOrderPreviewContainerProps } from "../sharedTypes";
import { buyingFlowAmountState, buyingFlowOrderState } from "../atoms";

export const BuyOrderPreviewReservationContainer: React.FC<BuyOrderPreviewContainerProps> = ({
  onAbort,
  onGoBack,
  onComplete,
}) => {
  const location = useLocation();

  const amountState = useRecoilValue(buyingFlowAmountState);
  const [orderState, setOrderState] = useRecoilState(buyingFlowOrderState);

  const currency = amountState.destinationCurrencyCode;
  const userCurrency = useGetCurrentAccountCurrency();

  useEffect(() => {
    trackEvent(EVENTS.SCREEN_VIEW, {
      screenName: "Order Preview",
      pathName: location?.pathname,
    });
  }, [location?.pathname]);

  const {
    data,
    client,
    loading: reservationLoading,
  } = useGetCryptoCardOrderReservationQuery({
    variables: {
      assetCode: currency,
      reservationId: orderState.reservationId,
      paymentMethodId: orderState.paymentMethodId,
    },
  });
  const [createCardAssetOrder, { error, loading: isSubmitting }] = useCreateCardAssetOrderMutation({
    onError: (err) => {
      trackEvent(EVENTS.SCREEN_VIEW, {
        screenName: "Order Failed",
        pathName: location.pathname,
      });

      trackEvent(EVENTS.PURCHASE_CRYPTO, {
        screenName: "Order Failed",
        assetName: currency,
        assetAmount: amountState.destinationCryptoAmount,
        pathName: location.pathname,
        cardNo: paymentMethod?.lastFour,
        paymentMethod: "Credit Card",
      });

      captureException(err);
    },
    onCompleted: ({ createCardAssetOrder: cardAssetOrder }) => {
      const orderId = cardAssetOrder?.walletOrder?.id;
      const smsNeeded = cardAssetOrder?.walletOrder?.smsNeeded;
      const card2faNeeded = cardAssetOrder?.walletOrder?.card2faNeeded;

      setOrderState({
        ...orderState,
        orderId,
        smsNeeded,
        card2faNeeded,
        transactionId: cardAssetOrder?.transaction?.id,
      });

      onComplete({ show2fa: smsNeeded || card2faNeeded });

      // prefetch the success page data to avoid loading time
      client.query({
        query: GetCryptoBuySuccessDataDocument,
        variables: { orderId, assetCode: currency },
      });
    },
  });

  const humblError = error?.graphQLErrors && getPotentialHumblError(error.graphQLErrors);

  const asset = data?.asset;
  const reservation = data?.reservation;
  const paymentMethod = data?.paymentMethod;

  const feesAmount = reservation?.fees?.reduce((acc, fee) => acc + fee.feeAmount!, 0);

  const actualSourceAmount = (reservation?.sourceAmount ?? 0) - feesAmount!;
  const paymentMethodName = `${paymentMethod?.cardBrand?.display} **** ${paymentMethod?.lastFour}`;

  const formatInUserCurrency = (value: number) => formatUsingIntl(value, "standard", userCurrency);
  const handleConfirm = () => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Confirm",
      type: "Buy",
      screenName: "Order Preview",
      cryptoCode: currency,
      orderId: orderState?.orderId,
      paymentMethodType: "Credit Card",
    });
    trackEvent(EVENTS.PURCHASE_CRYPTO, {
      screenName: "Order Preview",
      assetName: currency,
      assetAmount: amountState.destinationCryptoAmount,
      pathName: location.pathname,
      cardNo: paymentMethod?.lastFour,
      paymentMethod: "Credit Card",
    });
    if (orderState.orderId) {
      onComplete({ show2fa: orderState.smsNeeded || orderState.card2faNeeded });
    }

    createCardAssetOrder({
      context: {
        uri: process.env.REACT_APP_SECURE_HUMBL_DATA_URL,
      },
      variables: {
        destinationCurrency: currency,
        sourceAmount: String(amountState.destinationFiatAmount),
        sourceCurrency: userCurrency,
        reservationId: orderState.reservationId,
        cvvConfirmation: orderState.cvvConfirmation,
        paymentMethodId: orderState.paymentMethodId,
      },
    });
  };

  const handleCancelOrder = () => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Cancel Order",
      type: "Buy",
      screenName: "Order Preview",
      cryptoCode: currency,
      paymentMethodType: "Credit Card",
    });

    onAbort?.();
  };

  return (
    <BuyOrderPreviewScreen
      isLoading={reservationLoading}
      total={formatInUserCurrency(reservation?.sourceAmount ?? 0)}
      feesAmount={formatInUserCurrency(feesAmount!)}
      exchangeRate={formatInUserCurrency(asset?.price ?? 0)}
      paymentMethodName={paymentMethodName}
      sourceAmount={formatInUserCurrency(actualSourceAmount)}
      sourceCurrency={reservation?.sourceCurrency ?? ""}
      destinationAmount={decimalPrecision(reservation?.destinationAmount ?? 0, ORDER_PREVIEW_DECIMAL_PRECISION)}
      destinationCurrency={reservation?.destinationCurrency ?? ""}
      onBack={onGoBack}
      onConfirm={handleConfirm}
      onCancelOrder={handleCancelOrder}
      isSubmitting={isSubmitting}
      error={humblError}
      ariaLabel="ORDERPREVIEW"
    />
  );
};

export default BuyOrderPreviewReservationContainer;
