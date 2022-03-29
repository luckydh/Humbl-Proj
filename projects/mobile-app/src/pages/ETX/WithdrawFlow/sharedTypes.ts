export enum WithdrawFlowStep {
  ChooseAsset = "choose_asset",
  ChooseAmount = "choose_amount",
  OrderPreview = "order_preview",
  Success = "success",
}

export interface WithdrawFlowStepProps<T = never> {
  onAbort?: () => void;
  onGoBack?: () => void;
  onError?: () => void;
  onComplete?: (payload?: T) => void;
}
