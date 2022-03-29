import { atom } from "recoil";

export enum InputMode {
  Fiat = "fiat",
  Crypto = "crypto",
}

export interface SubmitPayload {
  inputMode?: InputMode;
  fiatAmount: number;
  cryptoAmount: string;
  fiatCurrencyCode: string;
}

export type UserSelectType = {
  id: string;
  displayName: string;
  image: string;
};

export interface SendFlowCurrentState {
  currency?: string;
  user?: UserSelectType;
  quoteId?: string;
  payload: SubmitPayload;
  image?: string;
  displayName?: string;
  code?: string;
  coinImage?: string;
  email: string;
  transactionId: string;
}

export const sendFlowCurrentState = atom<SendFlowCurrentState>({
  key: "sendFlowUrlState",
  default: {
    payload: {
      fiatAmount: 0,
      cryptoAmount: "",
      fiatCurrencyCode: "",
    },
    email: "",
    transactionId: "",
  },
});
