import { ReducerDefaultAction } from "../../../types/ReducerDefaultAction";
import { SubmitPayload } from "../../components/Modules/CryptoWallet/ChooseAmountScreen";
import { AssetBalanceType, AssetMetricType, BankType, ConfirmQuoteMutation, QuoteType } from "../../generated/graphql";

export enum CryptoWithdrawSteps {
  SELECT_BANK_ACCOUNT,
  CHOOSE_ASSETS,
  CHOOSE_AMOUNT,
  ORDER_PREVIEW,
  SUCCESS,
}

export enum CryptoWithdrawReducerActionTypes {
  SET_AVAILABLE_BALANCES = "SET_AVAILABLE_BALANCES",
  SET_BANK_ACCOUNT = "SET_BANK_ACCOUNT",
  SET_CURRENT_QUOTE = "SET_CURRENT_QUOTE",
  SET_SELECTED_AMOUNT = "SET_SELECTED_AMOUNT",
  SET_SELECTED_ASSET = "SET_SELECTED_ASSET",
  SET_STEP = "SET_STEP",
  SET_SELECTED_TICKER = "SET_SELECTED_TICKER",
  SET_CRYPTO_SUCCESS_RESPONSE = "SET_CRYPTO_SUCCESS_RESPONSE",
}

export interface CryptoWithdrawReducerProps {
  currentStep: number;
  selectedBankAccount: BankType;
  selectedAmount: SubmitPayload | null;
  availableBalances: AssetBalanceType[];
  selectedTicker: string;
  currentQuote: QuoteType;
  successResponse: ConfirmQuoteMutation["confirmQuote"] | "ERROR";
  selectedAsset: AssetMetricType;
}

export const CryptoWithdrawReducerDefaultState: CryptoWithdrawReducerProps = {
  currentStep: CryptoWithdrawSteps.SELECT_BANK_ACCOUNT,
  selectedBankAccount: {},
  selectedAmount: null,
  availableBalances: [],
  selectedTicker: "",
  currentQuote: {} as QuoteType,
  selectedAsset: {},
  successResponse: {},
};
export const CryptoWithdrawReducer = (state: CryptoWithdrawReducerProps, action: ReducerDefaultAction) => {
  switch (action.type) {
    case CryptoWithdrawReducerActionTypes.SET_STEP:
      return { ...state, currentStep: action.payload };
    case CryptoWithdrawReducerActionTypes.SET_BANK_ACCOUNT:
      return { ...state, selectedBankAccount: action.payload };
    case CryptoWithdrawReducerActionTypes.SET_SELECTED_ASSET:
      return { ...state, selectedAsset: action.payload };
    case CryptoWithdrawReducerActionTypes.SET_SELECTED_AMOUNT:
      return { ...state, selectedAmount: action.payload };
    case CryptoWithdrawReducerActionTypes.SET_AVAILABLE_BALANCES:
      return { ...state, availableBalances: action.payload };
    case CryptoWithdrawReducerActionTypes.SET_CURRENT_QUOTE:
      return { ...state, currentQuote: action.payload };
    case CryptoWithdrawReducerActionTypes.SET_SELECTED_TICKER:
      return { ...state, selectedTicker: action.payload };
    case CryptoWithdrawReducerActionTypes.SET_CRYPTO_SUCCESS_RESPONSE:
      return { ...state, successResponse: action.payload };
    default:
      return state;
  }
};
