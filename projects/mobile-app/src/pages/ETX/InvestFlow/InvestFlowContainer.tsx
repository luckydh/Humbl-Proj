import React, { useState } from "react";
import { useHistory } from "react-router";
import { useResetRecoilState } from "recoil";
import { InvestFlowStep } from "./sharedTypes";
import { PaymentMethodContainer } from "./PaymentMethod/PaymentMethodContainer";
import { ChooseAmountContainer } from "./ChooseAmount/ChooseAmountContainer";
import { OrderPreviewContainer } from "./OrderPreview/OrderPreviewContainer";
import SuccessContainer from "./Success/SuccessContainer";
import { investFlowAmountState, investFlowOrderState } from "./atoms";
import { buildPath } from "utils/routes";
import { DistributionCurrency } from "generated/graphql";

type HistoryState = {
  blockLogo: string;
  blockName: string;
  etxKey: string;
  distribution: DistributionCurrency[];
};
export const InvestFlowContainer: React.FC = () => {
  const history = useHistory<HistoryState>();

  const [step, setStep] = useState(InvestFlowStep.PaymentMethod);

  const resetAmountState = useResetRecoilState(investFlowAmountState);
  const resetOrderState = useResetRecoilState(investFlowOrderState);
  const [{ etxKey, blockName, blockLogo, distribution }] = useState<HistoryState>(history.location.state);

  const resetAll = () => {
    resetAmountState();
    resetOrderState();
  };

  const resetAllAndBack = () => {
    resetAll();
    history.goBack();
  };

  if (step === InvestFlowStep.PaymentMethod) {
    return (
      <PaymentMethodContainer
        onAbort={resetAllAndBack}
        onGoBack={resetAllAndBack}
        onComplete={() => setStep(InvestFlowStep.ChooseAmount)}
        distribution={distribution}
      />
    );
  }
  if (step === InvestFlowStep.ChooseAmount) {
    return (
      <ChooseAmountContainer
        etxKey={etxKey}
        onAbort={resetAllAndBack}
        onGoBack={() => {
          // TODO: ETX/Blocks should be in a handler fn
          resetAll();
          setStep(InvestFlowStep.PaymentMethod);
        }}
        onComplete={() => setStep(InvestFlowStep.OrderPreview)}
      />
    );
  }

  if (step === InvestFlowStep.OrderPreview) {
    return (
      <OrderPreviewContainer
        blockName={blockName}
        onComplete={() => setStep(InvestFlowStep.Success)}
        onAbort={() => {
          resetAll();
          history.push(buildPath("cryptoWallet"));
        }}
        onGoBack={() => {
          resetOrderState();
          setStep(InvestFlowStep.ChooseAmount);
        }}
        onError={() => setStep(InvestFlowStep.PaymentMethod)}
      />
    );
  }

  if (step === InvestFlowStep.Success) {
    return (
      <SuccessContainer
        blockName={blockName}
        blockLogo={blockLogo}
        etxKey={etxKey}
        onComplete={() => {
          resetAll();
          history.replace(buildPath("cryptoWallet"));
        }}
      />
    );
  }

  return null;
};
