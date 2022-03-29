import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { useGetAchQuoteQuery, useGetQuoteAndAssetQuery } from "generated/graphql";
import { PurchaseSuccessScreen } from "components/Modules/CryptoWallet/PurchaseSuccessScreen/PurchaseSuccessScreen";
import { cryptoToFiat } from "utils/currencyConversion";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { BuyingFlowStepProps } from "../sharedTypes";
import { buyingFlowAmountState, buyingFlowOrderState } from "../atoms";
import { getCurrentUser } from "../../../../Firebase";

export const BuySuccessQuoteContainer: React.FC<BuyingFlowStepProps> = ({ onComplete, selectedAssetInterestState }) => {
  const { t } = useTranslation();
  const { transactionId, quoteId } = useRecoilValue(buyingFlowOrderState);
  const { destinationCurrencyCode: currency } = useRecoilValue(buyingFlowAmountState);

  const { data, loading } = useGetQuoteAndAssetQuery({
    variables: {
      quoteId,
      assetCode: currency,
    },
  });

  const user = getCurrentUser();
  const amountState = useRecoilValue(buyingFlowAmountState);
  const quote = data?.quote;
  const asset = data?.asset;
  const location = useLocation();

  const destinationValue = cryptoToFiat(String(quote?.destinationAmount), asset?.price!);

  useEffect(() => {
    trackEvent(EVENTS.SCREEN_VIEW, {
      screenName: "Order Successful",
      pathName: location?.pathname,
    });

    trackEvent(EVENTS.PURCHASE_CRYPTO, {
      screenName: "Order Successful",
      assetName: currency,
      assetAmount: amountState.destinationCryptoAmount,
      pathName: location.pathname,
      paidUsing: quote?.sourceCurrencyCode,
      transactionId,
      paymentMethod: "Crypto",
    });
  }, [amountState.destinationCryptoAmount, currency, location.pathname, quote?.sourceCurrencyCode, transactionId]);

  return (
    <PurchaseSuccessScreen
      coin={quote?.destinationCurrencyCode!}
      coinName={quote?.destinationCurrency!}
      logo={asset?.logoImage!}
      price={destinationValue}
      selectedAssetInterestState={selectedAssetInterestState}
      amount={quote?.destinationAmount!}
      transactionId={transactionId!}
      title={t("crypto-wallet.buy.order-success.title.order-confirmed")}
      isLoading={loading}
      subTitle={t("crypto-wallet.buy.order-success.message.confirmation-email", { email: user?.email })}
      onClickCta={onComplete}
    />
  );
};

export const BuyACHSuccessQuoteContainer: React.FC<BuyingFlowStepProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const amountState = useRecoilValue(buyingFlowAmountState);
  const { transactionId, quoteId } = useRecoilValue(buyingFlowOrderState);

  const { data, loading } = useGetAchQuoteQuery({
    variables: {
      quoteId,
      destinationAssetCode: amountState.destinationCurrencyCode,
    },
  });

  const user = getCurrentUser();
  const quote = data?.quote;
  const destinationPrice = data?.destinationAsset?.price ?? 0;
  const location = useLocation();

  const destinationValue = cryptoToFiat(String(quote?.destinationAmount), destinationPrice);

  useEffect(() => {
    trackEvent(EVENTS.SCREEN_VIEW, {
      screenName: "Order Successful",
      pathName: location?.pathname,
    });

    trackEvent(EVENTS.PURCHASE_CRYPTO, {
      screenName: "Order Successful",
      assetName: amountState.destinationCurrencyCode,
      assetAmount: amountState.destinationCryptoAmount,
      pathName: location.pathname,
      paidUsing: quote?.sourceCurrencyCode,
      transactionId,
      paymentMethod: "ACH",
    });
  }, [
    amountState.destinationCryptoAmount,
    amountState.destinationCurrencyCode,
    location.pathname,
    quote?.sourceCurrencyCode,
    transactionId,
  ]);

  return (
    <PurchaseSuccessScreen
      coin={quote?.destinationCurrencyCode!}
      coinName={quote?.destinationCurrency!}
      logo={quote?.logoImage ?? ""}
      price={destinationValue}
      amount={quote?.destinationAmount!}
      transactionId={transactionId!}
      title={t("crypto-wallet.buy.order-success.title.order-confirmed")}
      isLoading={loading}
      subTitle={t("crypto-wallet.buy.ach-order-success.message.confirmation-email", { email: user?.email })}
      onClickCta={onComplete}
    />
  );
};

export default BuySuccessQuoteContainer;
