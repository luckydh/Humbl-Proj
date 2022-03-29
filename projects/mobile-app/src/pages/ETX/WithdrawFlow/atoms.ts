import { atom } from "recoil";

interface EnteredAmount {
  cryptoAmount: string;
  fiatAmount: number;
  fiatCurrencyCode: string;
}

interface SelectedAsset {
  image: string;
  name: string;
  tickerCode: string;
  valueInFiat: string;
}

interface WithdrawEtxFlowAmountState {
  selectedAsset?: SelectedAsset;
  cryptoCode?: string;
  cryptoName?: string;
  availableFiatAmount?: number;
  enteredAmount?: EnteredAmount;
  maxOption?: boolean;
}

interface WithdrawEtxFlowOrderState {
  uuId?: string;
  exchangeRate?: number;
  transactionId?: string;
  sourceAmount?: string;
  sourceCurrencyCode?: string;
}

export const withdrawEtxFlowAmountState = atom<WithdrawEtxFlowAmountState>({
  key: "withdrawEtxFlowAmountState",
  default: {},
});

export const withdrawEtxFlowOrderState = atom<WithdrawEtxFlowOrderState>({
  key: "withdrawEtxFlowOrderState",
  default: {},
});
