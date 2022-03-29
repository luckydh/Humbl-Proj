import React, { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { LayerComponentProps } from "components/Layers/common";
import { ChooseAssetContainer } from "./ChooseAsset/ChooseAssetContainer";
import { ChooseAmountContainer } from "./ChooseAmount/ChooseAmountContainer";
import { PaymentMethodContainer } from "./PaymentMethod/PaymentMethodContainer";
import { BuyOrderPreviewContainer } from "./OrderPreview/BuyOrderPreviewContainer";
import { TwoFactorAuthContainer } from "./TwoFactorAuth/TwoFactorAuthContainer";
import { BuySuccessContainer } from "./Success/BuySuccessContainer";
import { BuyingFlowStep } from "./sharedTypes";
import {
  buyingFlowOrderState,
  buyingFlowAmountState,
  buyingFlowTwoFactorState,
  selectedAssetInterestRate,
} from "./atoms";
import { useLayerBackButton } from "components/Layers/hooks";

export const BuyingFlowContainer: React.FC<LayerComponentProps<"cryptoWalletBuyingFlow">> = ({
  currency,
  onComplete,
  onClose,
}) => {
  const [step, setStep] = useState(!currency ? BuyingFlowStep.ChooseAsset : BuyingFlowStep.ChooseAmount);

  useLayerBackButton("cryptoWalletBuyingFlow", navigateBack);

  const resetOrderState = useResetRecoilState(buyingFlowOrderState);
  const resetAmountState = useResetRecoilState(buyingFlowAmountState);
  const resetTwoFactorState = useResetRecoilState(buyingFlowTwoFactorState);
  const resetSelectedAssetInterestState = useResetRecoilState(selectedAssetInterestRate);

  const [selectedAssetInterestState] = useRecoilState(selectedAssetInterestRate);

  const handleOnAbort = () => {
    resetAll();
    onClose?.();
  };

  const resetAll = () => {
    resetOrderState();
    resetAmountState();
    resetTwoFactorState();
    resetSelectedAssetInterestState();
  };

  // TODO: Improve this. We could have numeric steps and say
  // "go to n+1" to navigate forward and "go to n-1" to navigate back.
  function navigateBack() {
    switch (step) {
      case BuyingFlowStep.ChooseAsset:
        resetAll();
        onClose();
        break;
      case BuyingFlowStep.ChooseAmount:
        if (currency) {
          onClose();
        } else {
          setStep(BuyingFlowStep.ChooseAsset);
        }
        break;
      case BuyingFlowStep.PaymentMethod:
        setStep(BuyingFlowStep.ChooseAmount);
        break;
      case BuyingFlowStep.OrderPreview:
        setStep(BuyingFlowStep.PaymentMethod);
        break;
      case BuyingFlowStep.Success:
      case BuyingFlowStep.TwoFactorAuth:
      default:
        break;
    }
  }

  if (step === BuyingFlowStep.ChooseAsset) {
    return (
      <ChooseAssetContainer
        onAbort={onClose}
        onGoBack={navigateBack}
        onComplete={() => setStep(BuyingFlowStep.ChooseAmount)}
      />
    );
  }

  if (step === BuyingFlowStep.ChooseAmount) {
    return (
      <ChooseAmountContainer
        onAbort={onClose}
        onGoBack={navigateBack}
        onComplete={() => setStep(BuyingFlowStep.PaymentMethod)}
      />
    );
  }

  if (step === BuyingFlowStep.PaymentMethod) {
    return (
      <PaymentMethodContainer
        onAbort={onClose}
        onGoBack={navigateBack}
        onComplete={() => setStep(BuyingFlowStep.OrderPreview)}
      />
    );
  }

  if (step === BuyingFlowStep.OrderPreview) {
    return (
      <BuyOrderPreviewContainer
        onGoBack={navigateBack}
        onAbort={handleOnAbort}
        onComplete={(payload) => {
          if (payload?.show2fa) {
            setStep(BuyingFlowStep.TwoFactorAuth);
          } else {
            setStep(BuyingFlowStep.Success);
          }
        }}
      />
    );
  }

  if (step === BuyingFlowStep.TwoFactorAuth) {
    return (
      <TwoFactorAuthContainer
        onGoBack={navigateBack}
        onComplete={() => setStep(BuyingFlowStep.Success)}
        onAbort={handleOnAbort}
      />
    );
  }

  if (step === BuyingFlowStep.Success) {
    return (
      <BuySuccessContainer
        selectedAssetInterestState={selectedAssetInterestState}
        onComplete={(payload) => {
          resetAll();
          onClose?.();
          onComplete?.(payload);
        }}
      />
    );
  }

  return null;
};
