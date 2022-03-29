import { ReducerDefaultAction } from "../../../types/ReducerDefaultAction";

export enum AddNewBankAccountReducerActionTypes {
  SET_CURRENT_STEP = "SET_CURRENT_STEP",
  SET_FORM_STATE = "SET_FORM_STATE",
  SET_SHOW_EXIT_MODAL = "SET_SHOW_EXIT_MODAL",
  SET_CURRENT_TITLE = "SET_CURRENT_TITLE",
  SET_SHOW_SUCCESS_MODAL = "SET_SHOW_SUCCESS_MODAL",
}

export enum AddNewBankAccountReducerSteps {
  BANK_ACCOUNT_DETAILS,
  PERSONAL_DETAILS,
}

export interface AddNewBankAccountReducerProps {
  currentStep: AddNewBankAccountReducerSteps;
  formState: AddBankForm;
  showExitModal: boolean;
  title: string;
  showSuccessModal: boolean;
}

export interface AddBankForm {
  accountNumber: string;
  accountType: string;
  addressLine1: string;
  addressLine2: string;
  bankName: string;
  birthDate: string;
  city: string;
  consent: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  postalCode: string;
  routingNumber: string | undefined;
  routingNumber2: string | undefined;
  bsbNumber: string | undefined;
  clabe: string | undefined;
  state: string | undefined;
}

export const AddNewBankAccountReducerDefaultState = {
  currentStep: AddNewBankAccountReducerSteps.BANK_ACCOUNT_DETAILS,
  formState: {},
  showExitModal: false,
  title: "",
  showSuccessModal: false,
};
export const AddNewBankAccountReducer = (state: AddNewBankAccountReducerProps, action: ReducerDefaultAction) => {
  switch (action.type) {
    case AddNewBankAccountReducerActionTypes.SET_CURRENT_STEP:
      return { ...state, currentStep: action.payload };
    case AddNewBankAccountReducerActionTypes.SET_FORM_STATE:
      return { ...state, formState: action.payload };
    case AddNewBankAccountReducerActionTypes.SET_SHOW_EXIT_MODAL:
      return { ...state, showExitModal: action.payload };
    case AddNewBankAccountReducerActionTypes.SET_CURRENT_TITLE:
      return { ...state, title: action.payload };
    case AddNewBankAccountReducerActionTypes.SET_SHOW_SUCCESS_MODAL:
      return { ...state, showSuccessModal: action.payload };
    default:
      return { ...state };
  }
};
