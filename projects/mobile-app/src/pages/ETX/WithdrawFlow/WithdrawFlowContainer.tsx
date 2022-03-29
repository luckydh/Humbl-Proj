import React, { useState } from "react";
import { useHistory } from "react-router";
import { useResetRecoilState } from "recoil";
import { WithdrawFlowStep } from "./sharedTypes";
import { ChooseAssetContainer } from "./ChooseAsset/ChooseAssetContainer";
import { ChooseAmountContainer } from "./ChooseAmount/ChooseAmountContainer";
import { OrderPreviewContainer } from "./OrderPreview/OrderPreviewContainer";
import SuccessContainer from "./Success/SuccessContainer";
import { withdrawEtxFlowAmountState, withdrawEtxFlowOrderState } from "./atoms";
import { PortfolioCompositionDataProps } from "../PortfolioComposition/PortfolioComposition";
import { buildPath } from "utils/routes";

type HistoryState = {
  portfolioCompositionArray: PortfolioCompositionDataProps[] | [];
  blockName: string;
  etxKey: string;
};
export const WithdrawFlowContainer: React.FC = () => {
  const history = useHistory<HistoryState>();

  const [step, setStep] = useState(WithdrawFlowStep.ChooseAsset);
  const [{ blockName, portfolioCompositionArray, etxKey }] = useState<HistoryState>(history.location.state);

  const resetAmountState = useResetRecoilState(withdrawEtxFlowAmountState);
  const resetOrderState = useResetRecoilState(withdrawEtxFlowOrderState);

  const resetAll = () => {
    resetAmountState();
    resetOrderState();
  };

  const resetAllAndBack = () => {
    resetAll();
    history.goBack();
  };

  if (step === WithdrawFlowStep.ChooseAsset) {
    return (
      <ChooseAssetContainer
        blockName={blockName}
        portfolioCompositionArray={portfolioCompositionArray}
        onGoBack={resetAllAndBack}
        onComplete={() => setStep(WithdrawFlowStep.ChooseAmount)}
      />
    );
  }
  if (step === WithdrawFlowStep.ChooseAmount) {
    return (
      <ChooseAmountContainer
        etxKey={etxKey}
        onAbort={resetAllAndBack}
        onGoBack={() => {
          resetAll();
          setStep(WithdrawFlowStep.ChooseAsset);
        }}
        onComplete={() => setStep(WithdrawFlowStep.OrderPreview)}
      />
    );
  }

  if (step === WithdrawFlowStep.OrderPreview) {
    return (
      <OrderPreviewContainer
        onComplete={() => {
          setStep(WithdrawFlowStep.Success);
        }}
        onAbort={() => {
          resetAll();
          history.push(buildPath("cryptoWallet"));
        }}
        onGoBack={() => {
          setStep(WithdrawFlowStep.ChooseAmount);
          resetOrderState();
        }}
        onError={() => setStep(WithdrawFlowStep.ChooseAsset)}
      />
    );
  }

  if (step === WithdrawFlowStep.Success) {
    return (
      <SuccessContainer
        onComplete={() => {
          resetAll();
          history.replace(buildPath("cryptoWallet"));
        }}
      />
    );
  }

  return null;
};
