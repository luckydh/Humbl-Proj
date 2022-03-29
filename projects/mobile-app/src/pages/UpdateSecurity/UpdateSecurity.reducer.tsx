export enum UpdateSecurityReducerActionTypes {
  SET_CURRENT_STEP = "SET_CURRENT_STEP",
}

export enum UpdateSecurityReducerSteps {
  SECURITY_AND_LOGIN,
  EDIT_EMAIL,
  EDIT_PASSWORD,
}

export interface UpdateSecurityReducerProps {
  currentStep: UpdateSecurityReducerSteps;
}

export interface EditEmailForm {
  accountNumber: string;
}

export const UpdateSecurityReducerDefaultState = {
  currentStep: UpdateSecurityReducerSteps.SECURITY_AND_LOGIN,
  formState: {},
};

type Action = {
  type: UpdateSecurityReducerActionTypes.SET_CURRENT_STEP;
  payload: UpdateSecurityReducerSteps;
};

export const UpdateSecurityReducer = (state: UpdateSecurityReducerProps, action: Action) => {
  switch (action.type) {
    case UpdateSecurityReducerActionTypes.SET_CURRENT_STEP:
      return { ...state, currentStep: action.payload };
    default:
      return { ...state };
  }
};
