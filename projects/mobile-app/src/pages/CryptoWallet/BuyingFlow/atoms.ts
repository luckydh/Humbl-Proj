import { atom } from "recoil";
import { BuyingFlowPaymentMethodType } from "./sharedTypes";
import { PaymentMethodCategory } from "generated/graphql";

interface BuyingFlowAmountState {
  destinationFiatAmount?: number;
  destinationCryptoAmount?: string;
  sourceCurrencyCode?: string;
  destinationCurrencyCode?: string;
}

interface BuyingFlowOrderState {
  orderId?: string;
  quoteId?: string;
  reservationId?: string;
  transactionId?: string;
  paymentMethodId?: string;
  cvvConfirmation?: string;
  paymentMethodType?: PaymentMethodCategory | BuyingFlowPaymentMethodType.Asset;
  smsNeeded?: boolean;
  card2faNeeded?: boolean;
}

interface BuyingFlowTwoFactorState {
  smsCode: string;
  card2faCode: string;
}

interface SelectedAssetInterestRateState {
  tickerCode: string | undefined;
  valueInPercent: number | undefined;
}

export const buyingFlowAmountState = atom<BuyingFlowAmountState>({
  key: "buyingFlowAmountState",
  default: {},
});

export const buyingFlowOrderState = atom<BuyingFlowOrderState>({
  key: "buyingFlowOrderState",
  default: {
    smsNeeded: false,
    card2faNeeded: false,
  },
});

export const buyingFlowTwoFactorState = atom<BuyingFlowTwoFactorState>({
  key: "buyingFlowTwoFactorState",
  default: {
    smsCode: "",
    card2faCode: "",
  },
});

export const selectedAssetInterestRate = atom<SelectedAssetInterestRateState>({
  key: "selectedAssetInterestRate",
  default: {
    tickerCode: undefined,
    valueInPercent: undefined,
  },
});
