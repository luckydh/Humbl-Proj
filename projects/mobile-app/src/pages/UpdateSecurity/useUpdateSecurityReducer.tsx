import { useReducer } from "react";
import {
  UpdateSecurityReducer,
  UpdateSecurityReducerActionTypes,
  UpdateSecurityReducerDefaultState,
  UpdateSecurityReducerSteps,
} from "./UpdateSecurity.reducer";

export const useUpdateSecurityReducer = () => {
  const [state, dispatch] = useReducer(UpdateSecurityReducer, UpdateSecurityReducerDefaultState);

  const setCurrentStep = (step: UpdateSecurityReducerSteps) => {
    dispatch({
      type: UpdateSecurityReducerActionTypes.SET_CURRENT_STEP,
      payload: step,
    });
  };

  return {
    ...state,
    setCurrentStep,
  };
};
