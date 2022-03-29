export enum InvestFlowStep {
  ChooseAmount = "choose_amount",
  PaymentMethod = "payment_method",
  OrderPreview = "order_preview",
  Success = "success",
}

export interface InvestFlowStepProps<T = never> {
  onAbort?: () => void;
  onGoBack?: () => void;
  onError?: () => void;
  onComplete: (payload?: T) => void;
}
