import { useReducer } from "react";
import {
  CryptoWithdrawReducer,
  CryptoWithdrawReducerActionTypes,
  CryptoWithdrawReducerDefaultState,
  CryptoWithdrawSteps,
} from "./CryptoWithdrawReducer";
import { AssetBalanceType, BankType, ConfirmQuoteMutation, StartPayoutQuoteMutation } from "../../generated/graphql";
import { SubmitPayload } from "../../components/Modules/CryptoWallet/ChooseAmountScreen";
import type { AssetBalanceTypeWithPrice } from "./CryptoWithdrawScreen";

export const useCryptoWithdrawScreenReducer = () => {
  const [state, dispatch] = useReducer(CryptoWithdrawReducer, CryptoWithdrawReducerDefaultState);
  const { currentStep } = state;
  const goToNextStep = () => {
    if (currentStep < CryptoWithdrawSteps.SUCCESS) {
      dispatch({
        type: CryptoWithdrawReducerActionTypes.SET_STEP,
        payload: currentStep + 1,
      });
    }
  };
  const goToPreviousStep = () => {
    if (currentStep > CryptoWithdrawSteps.SELECT_BANK_ACCOUNT) {
      dispatch({
        type: CryptoWithdrawReducerActionTypes.SET_STEP,
        payload: currentStep - 1,
      });
    }
  };
  const goToStep = (step: CryptoWithdrawSteps) => {
    dispatch({
      type: CryptoWithdrawReducerActionTypes.SET_STEP,
      payload: step,
    });
  };
  const goToFirstStep = () => {
    dispatch({
      type: CryptoWithdrawReducerActionTypes.SET_STEP,
      payload: CryptoWithdrawSteps.SELECT_BANK_ACCOUNT,
    });
  };
  const setBankAccount = (bankAccount: BankType) => {
    dispatch({
      type: CryptoWithdrawReducerActionTypes.SET_BANK_ACCOUNT,
      payload: bankAccount,
    });
  };

  const setAvailableBalances = (availableBalances: AssetBalanceType[]) => {
    dispatch({
      type: CryptoWithdrawReducerActionTypes.SET_AVAILABLE_BALANCES,
      payload: availableBalances,
    });
  };

  const setSelectedAmount = (amount: SubmitPayload | null) => {
    dispatch({
      type: CryptoWithdrawReducerActionTypes.SET_SELECTED_AMOUNT,
      payload: amount,
    });
  };

  const setCurrentQuote = (quote: StartPayoutQuoteMutation["startPayoutQuote"]) => {
    dispatch({
      type: CryptoWithdrawReducerActionTypes.SET_CURRENT_QUOTE,
      payload: quote,
    });
  };

  const setSuccessResponse = (quote: ConfirmQuoteMutation["confirmQuote"] | "ERROR") => {
    dispatch({
      type: CryptoWithdrawReducerActionTypes.SET_CRYPTO_SUCCESS_RESPONSE,
      payload: quote,
    });
  };

  const setSelectedTicker = (code: string) => {
    dispatch({
      type: CryptoWithdrawReducerActionTypes.SET_SELECTED_TICKER,
      payload: code,
    });
  };

  const setSelectedAsset = (asset: AssetBalanceTypeWithPrice) => {
    dispatch({
      type: CryptoWithdrawReducerActionTypes.SET_SELECTED_ASSET,
      payload: asset,
    });
  };

  return {
    ...state,
    goToNextStep,
    goToPreviousStep,
    setAvailableBalances,
    setBankAccount,
    setCurrentQuote,
    setSelectedAmount,
    setSelectedTicker,
    setSelectedAsset,
    goToFirstStep,
    goToStep,
    setSuccessResponse,
  };
};
