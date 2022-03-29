import React from "react";
import { useRecoilValue } from "recoil";
import { buyingFlowOrderState } from "../atoms";
import { BuyingFlowPaymentMethodType, BuyingFlowStepProps } from "../sharedTypes";
import { BuyACHSuccessQuoteContainer, BuySuccessQuoteContainer } from "./BuySuccessQuoteContainer";
import { BuySuccessReservationContainer } from "./BuySuccessReservationContainer";
import { PaymentMethodCategory } from "generated/graphql";

export const BuySuccessContainer: React.FC<BuyingFlowStepProps> = ({ onComplete, selectedAssetInterestState }) => {
  const orderState = useRecoilValue(buyingFlowOrderState);

  if (orderState.paymentMethodType === PaymentMethodCategory.Ach) {
    return <BuyACHSuccessQuoteContainer onComplete={onComplete} />;
  }

  if (orderState.paymentMethodType === BuyingFlowPaymentMethodType.Asset) {
    return <BuySuccessQuoteContainer selectedAssetInterestState={selectedAssetInterestState} onComplete={onComplete} />;
  }

  if (orderState.paymentMethodType === PaymentMethodCategory.Card) {
    return <BuySuccessReservationContainer onComplete={onComplete} />;
  }

  return null;
};

export default BuySuccessContainer;
