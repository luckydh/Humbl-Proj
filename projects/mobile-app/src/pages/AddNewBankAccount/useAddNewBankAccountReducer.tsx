import { useReducer } from "react";
import {
  AddBankForm,
  AddNewBankAccountReducer,
  AddNewBankAccountReducerActionTypes,
  AddNewBankAccountReducerDefaultState,
  AddNewBankAccountReducerSteps,
} from "./AddNewBankAccount.reducer";

export const useAddNewBankAccountReducer = () => {
  const [state, dispatch] = useReducer(AddNewBankAccountReducer, AddNewBankAccountReducerDefaultState);

  const setCurrentStep = (step: AddNewBankAccountReducerSteps) => {
    dispatch({
      type: AddNewBankAccountReducerActionTypes.SET_CURRENT_STEP,
      payload: step,
    });
  };
  const setFormState = (formState: AddBankForm) => {
    dispatch({
      type: AddNewBankAccountReducerActionTypes.SET_FORM_STATE,
      payload: formState,
    });
  };

  const setShowExitModal = (isOpen: boolean) => {
    dispatch({
      type: AddNewBankAccountReducerActionTypes.SET_SHOW_EXIT_MODAL,
      payload: isOpen,
    });
  };

  const setShowSuccessModal = (isOpen: boolean) => {
    dispatch({
      type: AddNewBankAccountReducerActionTypes.SET_SHOW_SUCCESS_MODAL,
      payload: isOpen,
    });
  };

  const setCurrentTitle = (title: string) => {
    dispatch({
      type: AddNewBankAccountReducerActionTypes.SET_CURRENT_TITLE,
      payload: title,
    });
  };

  return {
    ...state,
    setCurrentStep,
    setFormState,
    setCurrentTitle,
    setShowExitModal,
    setShowSuccessModal,
  };
};
