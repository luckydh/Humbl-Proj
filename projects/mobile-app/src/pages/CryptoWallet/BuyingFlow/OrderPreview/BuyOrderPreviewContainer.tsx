import React from "react";
import { useRecoilValue } from "recoil";
import { buyingFlowOrderState } from "../atoms";
import { BuyingFlowPaymentMethodType, BuyOrderPreviewContainerProps } from "../sharedTypes";
import { BuyOrderACHPreviewQuoteContainer, BuyOrderPreviewQuoteContainer } from "./BuyOrderPreviewQuoteContainer";
import { BuyOrderPreviewReservationContainer } from "./BuyOrderPreviewReservationContainer";
import { PaymentMethodCategory } from "generated/graphql";

export const BuyOrderPreviewContainer: React.FC<BuyOrderPreviewContainerProps> = ({
  onAbort,
  onGoBack,
  onComplete,
}) => {
  const orderState = useRecoilValue(buyingFlowOrderState);

  if (orderState.paymentMethodType === BuyingFlowPaymentMethodType.Asset) {
    return <BuyOrderPreviewQuoteContainer onAbort={onAbort} onGoBack={onGoBack} onComplete={onComplete} />;
  }

  if (orderState.paymentMethodType === PaymentMethodCategory.Ach) {
    return <BuyOrderACHPreviewQuoteContainer onAbort={onAbort} onGoBack={onGoBack} onComplete={onComplete} />;
  }

  if (orderState.paymentMethodType === PaymentMethodCategory.Card) {
    return <BuyOrderPreviewReservationContainer onAbort={onAbort} onGoBack={onGoBack} onComplete={onComplete} />;
  }

  return null;
};

export default BuyOrderPreviewContainer;
