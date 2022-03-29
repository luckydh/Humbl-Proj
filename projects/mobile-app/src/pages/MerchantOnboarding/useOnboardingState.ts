import { useReducer } from "react";
import { BusinessType } from "../../utils/BusinessType";

export enum IndividualOnboardingStep {
  AccountTypeSelect,
  IndividualBillingAddress,
  IndividualInformation,
  PayoutDetails,
}

export enum MerchantOnboardingStep {
  AccountTypeSelect,
  BusinessDetails,
  RepresentativeInformation,
  OwnerInformation,
  PayoutDetails,
}

export interface MerchantOnboardingReducerDefaultStateType {
  businessType: BusinessType;
  formFields: Record<string, any>;
}

const MerchantOnboardingReducerDefaultState = {
  businessType: BusinessType.Individual,
  formFields: {},
};

const ADD_FIELDS_TO_FORM = "ADD_FIELDS_TO_FORM";

const addFieldsToFormAction = (payload: Record<string, any>) => ({
  type: ADD_FIELDS_TO_FORM,
  payload,
});
const MerchantOnboardingReducer = (
  state: MerchantOnboardingReducerDefaultStateType,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case ADD_FIELDS_TO_FORM:
      return {
        ...state,
        formFields: { ...state.formFields, ...action.payload },
      };

    default:
      return state;
  }
};

export const useOnboardingState = (defaultValues?: Record<string, any>) => {
  const [state, dispatch] = useReducer(MerchantOnboardingReducer, {
    ...MerchantOnboardingReducerDefaultState,
    ...defaultValues,
  });

  const addFieldsToForm = (fields: Record<string, any>) => {
    dispatch(addFieldsToFormAction(fields));
  };

  return [state, { addFieldsToForm }];
};
