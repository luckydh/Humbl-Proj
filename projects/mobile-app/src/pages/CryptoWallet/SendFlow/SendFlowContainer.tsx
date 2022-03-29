import React from "react";
import { LayerComponentProps } from "components/Layers/common";
import { Flow } from "../Flow";
import { ChooseAssetSend } from "./ChooseAsset/ChooseAssetSend";
import { ChooseAmountSend } from "./ChooseAmount/ChooseAmountSend";
import SendToRecipient from "./SendToRecipient";
import { SendOrderPreviewContainer } from "./OrderPreview";
import { Success } from "./Success";
import { useFlowCurrentStep } from "../Flow/Flow";
import { UserSearch } from "../UserSearch/UserSearch";
import { useRecoilValue } from "recoil";
import { sendFlowCurrentState } from "./sendFlowUtils";

export type FlowType = "user" | "wallet";

const walletFlowWithCryptoId = [ChooseAmountSend, SendToRecipient, SendOrderPreviewContainer, Success];
const walletFlowWithoutCryptoId = [ChooseAssetSend, ...walletFlowWithCryptoId];
const userSearchFlowWithCrypto = [UserSearch, ChooseAmountSend, SendOrderPreviewContainer, Success];
const userSearchFlowWithoutCryptoId = [
  UserSearch,
  ChooseAssetSend,
  ChooseAmountSend,
  SendOrderPreviewContainer,
  Success,
];

function useCurrentSendingFlow(flowType: FlowType) {
  const { currency } = useRecoilValue(sendFlowCurrentState);
  let currentFlow;
  if (flowType === "user") {
    if (currency) {
      currentFlow = userSearchFlowWithCrypto;
    } else {
      currentFlow = userSearchFlowWithoutCryptoId;
    }
  } else if (currency) {
    currentFlow = walletFlowWithCryptoId;
  } else {
    currentFlow = walletFlowWithoutCryptoId;
  }
  return currentFlow;
}

export const SendFlowContainer: React.FC<LayerComponentProps<"cryptoWalletSendFlow">> = ({
  flowType = "wallet",
  onClose,
}) => {
  const currentFlow = useCurrentSendingFlow(flowType);

  return (
    <Flow flow={currentFlow} onExit={onClose}>
      <SendFlowActiveStep />
    </Flow>
  );
};

const SendFlowActiveStep: React.FC = () => {
  const ActiveStep = useFlowCurrentStep();

  if (!ActiveStep) {
    return null;
  }

  return <ActiveStep />;
};
