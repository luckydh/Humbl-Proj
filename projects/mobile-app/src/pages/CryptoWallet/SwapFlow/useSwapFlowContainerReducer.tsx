import { SubmitPayload } from "components/Modules/CryptoWallet/ChooseAmountScreen";
import { AssetBalanceType, ConfirmQuoteMutation, StartPayoutQuoteMutation } from "generated/graphql";
import { useReducer } from "react";
import {
    SwapFlowReducer,
    SwapFlowReducerActionTypes,
    SwapFlowReducerDefaultState,
    SwapFlowSteps,
} from "./SwapFlowReducer";

export const useSwapFlowScreenReducer = () => {
    const [state, dispatch] = useReducer(SwapFlowReducer, SwapFlowReducerDefaultState);
    const { currentStep } = state;
    const goToNextStep = () => {
        if (currentStep < SwapFlowSteps.SUCCESS) {
            dispatch({
                type: SwapFlowReducerActionTypes.SET_STEP,
                payload: currentStep + 1,
            });
        }
    };
    const goToPreviousStep = () => {
        if (currentStep > SwapFlowSteps.CHOOSE_ASSETS_SWAP_FROM) {
            dispatch({
                type: SwapFlowReducerActionTypes.SET_STEP,
                payload: currentStep - 1,
            });
        }
    };
    const goToStep = (step: SwapFlowSteps) => {
        dispatch({
            type: SwapFlowReducerActionTypes.SET_STEP,
            payload: step,
        });
    };
    const goToFirstStep = () => {
        dispatch({
            type: SwapFlowReducerActionTypes.SET_STEP,
            payload: SwapFlowSteps.CHOOSE_ASSETS_SWAP_FROM,
        });
    };

    const setSelectedAmount = (amount: SubmitPayload | null) => {
        dispatch({
            type: SwapFlowReducerActionTypes.SET_SELECTED_AMOUNT,
            payload: amount,
        });
    };

    const setCurrentQuote = (quote: StartPayoutQuoteMutation["startPayoutQuote"]) => {
        dispatch({
            type: SwapFlowReducerActionTypes.SET_CURRENT_QUOTE,
            payload: quote,
        });
    };

    const setSuccessResponse = (quote: ConfirmQuoteMutation["confirmQuote"] | "ERROR") => {
        dispatch({
            type: SwapFlowReducerActionTypes.SET_CRYPTO_SUCCESS_RESPONSE,
            payload: quote,
        });
    };

    const setSelectedAssetSwapFrom = (asset: AssetBalanceType) => {
        dispatch({
            type: SwapFlowReducerActionTypes.SET_SELECTED_ASSET_SWAP_FROM,
            payload: asset,
        });
    };

    const setSelectedAssetSwapTo = (asset: AssetBalanceType) => {
        dispatch({
            type: SwapFlowReducerActionTypes.SET_SELECTED_ASSET_SWAP_TO,
            payload: asset,
        });
    };

    const setQuoteId = (id: string | undefined) => {
        dispatch({
            type: SwapFlowReducerActionTypes.SET_QUOTE_ID,
            payload: id
        })
    }

    const setTransactionId = (id: string | undefined) => {
        dispatch({
            type: SwapFlowReducerActionTypes.SET_TRANSACTION_ID,
            payload: id
        })
    }

    return {
        ...state,
        goToNextStep,
        goToPreviousStep,
        setCurrentQuote,
        setSelectedAmount,
        setSelectedAssetSwapFrom,
        setSelectedAssetSwapTo,
        goToFirstStep,
        goToStep,
        setSuccessResponse,
        setQuoteId,
        setTransactionId
    };
};
