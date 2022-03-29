import React, { useEffect } from "react";
import { getCurrentUser } from "../../../../Firebase";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { buyingFlowAmountState, buyingFlowOrderState } from "../atoms";
import { useGetCryptoBuySuccessDataQuery } from "generated/graphql";
import { BuyingFlowStepProps } from "../sharedTypes";
import { PurchaseSuccessScreen } from "components/Modules/CryptoWallet/PurchaseSuccessScreen/PurchaseSuccessScreen";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";

export const BuySuccessReservationContainer: React.FC<BuyingFlowStepProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const { transactionId, orderId } = useRecoilValue(buyingFlowOrderState);
  const { destinationCurrencyCode: currency } = useRecoilValue(buyingFlowAmountState);

  const { data, loading } = useGetCryptoBuySuccessDataQuery({
    variables: {
      orderId,
      assetCode: currency,
    },
  });

  const user = getCurrentUser();
  const amountState = useRecoilValue(buyingFlowAmountState);
  const location = useLocation();

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
      transactionId,
      paymentMethod: "Credit Card",
    });
  }, [amountState.destinationCryptoAmount, currency, location.pathname, transactionId]);

  return (
    <PurchaseSuccessScreen
      coin={data?.asset?.name!}
      coinName={data?.asset?.name!}
      logo={data?.asset?.logoImage!}
      price={data?.order?.purchaseAmount!}
      amount={parseFloat(data?.order?.destinationAmount!)}
      transactionId={transactionId!}
      title={t("crypto-wallet.buy.order-success.title.order-confirmed")}
      isLoading={loading}
      subTitle={t("crypto-wallet.buy.order-success.message.confirmation-email", { email: user?.email })}
      onClickCta={onComplete}
    />
  );
};

export default BuySuccessReservationContainer;
