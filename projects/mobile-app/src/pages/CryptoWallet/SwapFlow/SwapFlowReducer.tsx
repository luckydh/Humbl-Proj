import { SubmitPayload } from "components/Modules/CryptoWallet/ChooseAmountScreen";
import { ReducerDefaultAction } from "../../../../types/ReducerDefaultAction";

export enum SwapFlowSteps {
  CHOOSE_ASSETS_SWAP_FROM,
  CHOOSE_ASSETS_SWAP_TO,
  CHOOSE_AMOUNT,
  ORDER_PREVIEW,
  SUCCESS,
}

export enum SwapFlowReducerActionTypes {
  SET_AVAILABLE_BALANCES = "SET_AVAILABLE_BALANCES",
  SET_BANK_ACCOUNT = "SET_BANK_ACCOUNT",
  SET_CURRENT_QUOTE = "SET_CURRENT_QUOTE",
  SET_SELECTED_AMOUNT = "SET_SELECTED_AMOUNT",
  SET_SELECTED_ASSET_SWAP_FROM = "SET_SELECTED_ASSET_FROM",
  SET_SELECTED_ASSET_SWAP_TO = "SET_SELECTED_ASSET_TO",
  SET_STEP = "SET_STEP",
  SET_CRYPTO_SUCCESS_RESPONSE = "SET_CRYPTO_SUCCESS_RESPONSE",
  SET_QUOTE_ID = "SET_QUOTE_ID",
  SET_TRANSACTION_ID = "SET_TRANSACTION_ID",
}

export interface SwapFlowReducerProps {
  currentStep: number;
  selectedAssetSwapFrom: string;
  selectedAssetSwapTo: string;
  selectedAmount: SubmitPayload | null;
  quoteId: string | undefined;
  transactionId: string | undefined;
}

export const SwapFlowReducerDefaultState: SwapFlowReducerProps = {
  currentStep: SwapFlowSteps.CHOOSE_ASSETS_SWAP_FROM,
  selectedAssetSwapFrom: "",
  selectedAssetSwapTo: "",
  selectedAmount: null,
  quoteId: undefined,
  transactionId: undefined,
};

export const SwapFlowReducer = (state: SwapFlowReducerProps, action: ReducerDefaultAction) => {
  switch (action.type) {
    case SwapFlowReducerActionTypes.SET_STEP:
      return { ...state, currentStep: action.payload };
    case SwapFlowReducerActionTypes.SET_SELECTED_ASSET_SWAP_FROM:
      return { ...state, selectedAssetSwapFrom: action.payload };
    case SwapFlowReducerActionTypes.SET_SELECTED_ASSET_SWAP_TO:
      return { ...state, selectedAssetSwapTo: action.payload };
    case SwapFlowReducerActionTypes.SET_SELECTED_AMOUNT:
      return { ...state, selectedAmount: action.payload };
    case SwapFlowReducerActionTypes.SET_CURRENT_QUOTE:
      return { ...state, currentQuote: action.payload };
    case SwapFlowReducerActionTypes.SET_CRYPTO_SUCCESS_RESPONSE:
      return { ...state, successResponse: action.payload };
    case SwapFlowReducerActionTypes.SET_QUOTE_ID:
      return { ...state, quoteId: action.payload };
    case SwapFlowReducerActionTypes.SET_TRANSACTION_ID:
      return { ...state, transactionId: action.payload };
    default:
      return state;
  }
};
