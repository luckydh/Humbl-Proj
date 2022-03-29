import { atom } from "recoil";

interface AvailableFiatAmount {
  display?: string;
  major?: number;
  value?: number;
}
interface EnteredAmount {
  cryptoAmount: string;
  fiatAmount: number;
  fiatCurrencyCode: string;
}

interface Distribution {
  currencyCode?: string;
  currencyName?: string;
  image?: string;
  percentage?: string;
}

interface InvestFlowAmountState {
  cryptoCode?: string;
  cryptoName?: string;
  availableFiatAmount?: AvailableFiatAmount;
  enteredAmount?: EnteredAmount;
  maxOption?: boolean;
}

interface InvestFlowOrderState {
  distribution?: Distribution[];
  uuId?: string;
  transactionId?: string;
  sourceAmount?: string;
  sourceCurrencyCode?: string;
}

export const investFlowAmountState = atom<InvestFlowAmountState>({
  key: "investFlowAmountState",
  default: {},
});

export const investFlowOrderState = atom<InvestFlowOrderState>({
  key: "investFlowOrderState",
  default: {},
});
