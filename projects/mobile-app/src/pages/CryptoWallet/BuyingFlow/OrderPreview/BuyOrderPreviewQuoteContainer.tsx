import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { captureException } from "ErrorLogger";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";
import {
  useConfirmAchQuoteMutation,
  useConfirmQuoteMutation,
  useGetAchQuoteQuery,
  useGetCoinSwapAssetsQuery,
} from "generated/graphql";
import { formatUsingIntl } from "utils/currency";
import { decimalPrecision, ORDER_PREVIEW_DECIMAL_PRECISION } from "utils/decimalPrecision";
import { cryptoToFiat } from "utils/currencyConversion";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { BuyOrderPreviewContainerProps } from "../sharedTypes";
import { BuyOrderPreviewScreen } from "./BuyOrderPreviewScreen";
import { buyingFlowAmountState, buyingFlowOrderState } from "../atoms";
import { getPotentialHumblError } from "graphql/humblGraphqlError";

export const BuyOrderPreviewQuoteContainer: React.FC<BuyOrderPreviewContainerProps> = ({
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
      pathName: location.pathname,
    });
  }, [location.pathname]);

  const {
    data,
    loading: quoteLoading,
    error: quoteError,
  } = useGetCoinSwapAssetsQuery({
    variables: {
      quoteId: orderState.quoteId,
      sourceAssetCode: amountState.sourceCurrencyCode,
      destinationAssetCode: amountState.destinationCurrencyCode,
    },
  });

  const [confirmQuote, { error, loading: isSubmitting }] = useConfirmQuoteMutation({
    onError: (confirmQuoteError) => {
      captureException(confirmQuoteError);
      trackEvent(EVENTS.PURCHASE_CRYPTO, {
        screenName: "Order Fail",
        assetName: currency,
        assetAmount: amountState.destinationCryptoAmount,
        pathName: location.pathname,
        paymentMethod: "Crypto",
      });
    },
    onCompleted: ({ confirmQuote: completedQuote }) => {
      setOrderState({
        ...orderState,
        transactionId: completedQuote?.transactionId,
      });
      onComplete();
    },
  });

  const quote = data?.quote;
  const sourceAssetPrice = data?.sourceAsset?.price ?? 0;
  const destinationAsset = data?.destinationAsset;
  const quoteSourceFee = quote?.sourceFee ?? 0;
  const quoteSourceAmount = quote?.sourceAmount ?? "0";

  // TODO: Use CurrencyValue for calculations here
  const sourceAmountWithoutFees = parseFloat(quoteSourceAmount) - quoteSourceFee;

  const formatInUserCurrency = (value: number) => formatUsingIntl(value, "standard", userCurrency);

  const formatCryptoToUserFiatCurrency = (value?: number | string): string => {
    let val = "0";
    if (value) {
      val = typeof value === "string" ? value : String(value);
    }

    const fiat: number = cryptoToFiat(val, sourceAssetPrice);

    return formatInUserCurrency(fiat);
  };

  const fiatFeesAmount = formatCryptoToUserFiatCurrency(quoteSourceFee);
  const fiatTotalAmount = formatCryptoToUserFiatCurrency(quoteSourceAmount);
  const fiatSourceAmount = formatCryptoToUserFiatCurrency(sourceAmountWithoutFees);

  const handleConfirm = () => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Confirm",
      type: "Buy",
      screenName: "Order Preview",
      cryptoCode: currency,
      orderId: orderState?.orderId,
      paymentMethodType: "Wallet Asset",
    });

    trackEvent(EVENTS.PURCHASE_CRYPTO, {
      screenName: "Order Preview",
      assetName: currency,
      assetAmount: amountState.destinationCryptoAmount,
      pathName: location.pathname,
      paidUsing: data?.quote?.sourceCurrencyCode,
      paymentMethod: "Crypto",
    });

    confirmQuote({
      variables: {
        quoteId: orderState.quoteId,
      },
    });
  };

  const handleCancelOrder = () => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Cancel Order",
      type: "Buy",
      screenName: "Order Preview",
      cryptoCode: currency,
      paymentMethodType: "Wallet Asset",
    });

    onAbort?.();
  };

  const possibleHumblError = quoteError?.graphQLErrors
    ? getPotentialHumblError(quoteError?.graphQLErrors)
    : error?.graphQLErrors && getPotentialHumblError(error?.graphQLErrors);

  return (
    <BuyOrderPreviewScreen
      isLoading={quoteLoading}
      feesAmount={fiatFeesAmount}
      total={fiatTotalAmount}
      sourceAmount={fiatSourceAmount}
      exchangeRate={formatInUserCurrency(destinationAsset?.price ?? 0)}
      paymentMethodName={quote?.sourceCurrency}
      sourceCurrency={quote?.fiatCurrencyCode}
      destinationAmount={decimalPrecision(quote?.destinationAmount, ORDER_PREVIEW_DECIMAL_PRECISION)}
      destinationCurrency={quote?.destinationCurrencyCode}
      onBack={onGoBack}
      onConfirm={handleConfirm}
      onCancelOrder={handleCancelOrder}
      isSubmitting={isSubmitting}
      ariaLabel="ORDERPREVIEW"
      error={possibleHumblError}
    />
  );
};

export const BuyOrderACHPreviewQuoteContainer: React.FC<BuyOrderPreviewContainerProps> = ({
  onAbort,
  onGoBack,
  onComplete,
}) => {
  const amountState = useRecoilValue(buyingFlowAmountState);
  const [orderState, setOrderState] = useRecoilState(buyingFlowOrderState);
  const currency = amountState.destinationCurrencyCode;
  const location = useLocation();

  useEffect(() => {
    trackEvent(EVENTS.SCREEN_VIEW, {
      screenName: "Order Preview",
      pathName: location.pathname,
    });
  }, [location.pathname]);

  const { data, error, loading } = useGetAchQuoteQuery({
    variables: {
      quoteId: orderState.quoteId,
      destinationAssetCode: amountState.destinationCurrencyCode,
    },
  });

  const [confirmQuote, { loading: confirmQuoteLoading, error: confirmQuoteError }] = useConfirmAchQuoteMutation({
    onError: (quoteError) => {
      captureException(quoteError);
      trackEvent(EVENTS.PURCHASE_CRYPTO, {
        screenName: "Order Fail",
        assetName: currency,
        assetAmount: amountState.destinationCryptoAmount,
        pathName: location.pathname,
        paymentMethod: "ACH",
      });
    },

    onCompleted: ({ confirmACHQuote }) => {
      setOrderState({
        ...orderState,
        transactionId: confirmACHQuote?.transactionId,
      });

      onComplete();
    },
  });

  const handleConfirm = () => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Confirm",
      type: "Buy",
      screenName: "Order Preview",
      cryptoCode: currency,
      orderId: orderState?.orderId,
      paymentMethodType: "ACH",
    });

    trackEvent(EVENTS.PURCHASE_CRYPTO, {
      screenName: "Order Preview",
      assetName: currency,
      assetAmount: amountState.destinationCryptoAmount,
      pathName: location.pathname,
      paidUsing: data?.quote?.sourceCurrencyCode,
      paymentMethod: "ACH",
    });

    confirmQuote({
      variables: {
        quoteId: orderState.quoteId,
      },
    });
  };

  const handleCancelOrder = () => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Cancel Order",
      type: "Buy",
      screenName: "Order Preview",
      cryptoCode: currency,
      paymentMethodType: "ACH",
    });

    onAbort?.();
  };

  const possibleHumblError = confirmQuoteError?.graphQLErrors
    ? getPotentialHumblError(confirmQuoteError?.graphQLErrors)
    : error?.graphQLErrors && getPotentialHumblError(error?.graphQLErrors);

  const quote = data?.quote;
  const quoteSourceFee = quote?.sourceFee ?? 0;
  const sourceAmount = parseFloat(quote?.sourceAmount ?? "0");
  const fiatSourceAmount = sourceAmount - quoteSourceFee;
  const formatter = (amount: number) => formatUsingIntl(amount, "standard", quote?.fiatCurrencyCode);

  return (
    <BuyOrderPreviewScreen
      isLoading={loading}
      feesAmount={formatter(quoteSourceFee)}
      total={formatter(sourceAmount)}
      sourceAmount={formatter(fiatSourceAmount)}
      exchangeRate={`${quote?.exchangeRate}`}
      paymentMethodName={quote?.paymentName}
      sourceCurrency={quote?.fiatCurrencyCode}
      destinationAmount={decimalPrecision(quote?.destinationAmount, ORDER_PREVIEW_DECIMAL_PRECISION)}
      destinationCurrency={quote?.destinationCurrencyCode}
      onBack={onGoBack}
      onConfirm={handleConfirm}
      onCancelOrder={handleCancelOrder}
      isSubmitting={confirmQuoteLoading}
      ariaLabel="ORDERPREVIEW"
      error={possibleHumblError}
    />
  );
};

export default BuyOrderPreviewQuoteContainer;
