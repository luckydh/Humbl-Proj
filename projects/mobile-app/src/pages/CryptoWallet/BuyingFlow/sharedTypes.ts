export enum BuyingFlowStep {
  ChooseAsset = "choose_asset",
  ChooseAmount = "choose_amount",
  PaymentMethod = "payment_method",
  OrderPreview = "order_preview",
  TwoFactorAuth = "two_factor_auth",
  Success = "success",
}

export interface BuyingFlowStepProps<T = never> {
  onAbort?: () => void;
  onGoBack?: () => void;
  onComplete: (payload?: T) => void;
  selectedAssetInterestState?: { tickerCode?: string; valueInPercent?: number };
}

export enum BuyingFlowPaymentMethodType {
  Asset = "asset",
}

export type BuyOrderPreviewContainerProps = BuyingFlowStepProps<{ show2fa?: boolean }>;
