import { useReducer } from "react";
import { useHistory } from "react-router";
import { BusinessType } from "../../utils/BusinessType";
import { Countries } from "../../utils/Countries";
import { OnboardingModalState } from "./OnboardingErrorModal";
import { MerchantOnboardingStep, IndividualOnboardingStep } from "./useOnboardingState";

enum OnboardingContainerReducerActions {
  SET_BUSINESS_TYPE,
  SET_COUNTRY_SELECTED,
  SET_USER_DETAILS,
  ON_BACK_BUTTON_CLICKED,
  SET_CURRENT_STEP,
  SET_ONBOARDING_MODAL_STATE,
  SET_TOTAL_STEPS,
  SET_FORM_STATE,
}

export interface OnboardingContainerReducerStateProps {
  currentStep: number;
  businessType: BusinessType | null;
  selectedCountry: Countries;
  userDetails: any;
  backButtonClicked: number;
  onboardingModalState: OnboardingModalState;
  totalSteps: number;
  formState: Record<string, any>;
}

const OnboardingContainerReducerDefaultState: OnboardingContainerReducerStateProps = {
  currentStep: 0,
  businessType: null,
  selectedCountry: Countries.US,
  userDetails: null,
  backButtonClicked: 0,
  onboardingModalState: OnboardingModalState.CLOSED,
  totalSteps: 4,
  formState: {},
};

interface OnboardingContainerReducerAction {
  type: OnboardingContainerReducerActions;
  payload: any;
}

const OnboardingContainerReducer = (
  state: OnboardingContainerReducerStateProps,
  action: OnboardingContainerReducerAction
): OnboardingContainerReducerStateProps => {
  switch (action.type) {
    case OnboardingContainerReducerActions.SET_BUSINESS_TYPE:
      return { ...state, businessType: action.payload };
    case OnboardingContainerReducerActions.SET_COUNTRY_SELECTED:
      return { ...state, selectedCountry: action.payload };
    case OnboardingContainerReducerActions.SET_USER_DETAILS:
      return { ...state, userDetails: action.payload };
    case OnboardingContainerReducerActions.ON_BACK_BUTTON_CLICKED:
      return { ...state, backButtonClicked: state.backButtonClicked + 1 };
    case OnboardingContainerReducerActions.SET_CURRENT_STEP:
      return { ...state, currentStep: action.payload };
    case OnboardingContainerReducerActions.SET_ONBOARDING_MODAL_STATE:
      return { ...state, onboardingModalState: action.payload };
    case OnboardingContainerReducerActions.SET_TOTAL_STEPS:
      return { ...state, totalSteps: action.payload };
    case OnboardingContainerReducerActions.SET_FORM_STATE:
      return { ...state, formState: action.payload };
    default:
      return state;
  }
};

// TODO: fix Function types here. Make typing stricter.
export interface UseOnboardingContainerReducerActionsProps {
  setBusinessType: Function;
  setCountrySelected: Function;
  setUserDetails: Function;
  setCurrentStep: Function;
  setOnboardingModalState: Function;
  setTotalSteps: Function;
  setFormState: Function;
  goToNextStep: Function;
  goToPreviousStep: Function;
}

export const useOnboardingContainerReducer = (): [
  OnboardingContainerReducerStateProps,
  UseOnboardingContainerReducerActionsProps
] => {
  const [state, dispatch] = useReducer(OnboardingContainerReducer, OnboardingContainerReducerDefaultState);

  const history = useHistory();

  const goToNextStep = (repIsOwner?: boolean) => {
    if (state.businessType === BusinessType.Merchant) {
      if (state.currentStep === MerchantOnboardingStep.BusinessDetails) {
        setCurrentStep(MerchantOnboardingStep.RepresentativeInformation);
      }
      if (state.currentStep === MerchantOnboardingStep.RepresentativeInformation) {
        if (typeof repIsOwner === "undefined" || repIsOwner) {
          setTotalSteps(4);
          setCurrentStep(MerchantOnboardingStep.PayoutDetails);
        } else {
          setTotalSteps(5);
          setCurrentStep(MerchantOnboardingStep.OwnerInformation);
        }
      }
      if (state.currentStep === MerchantOnboardingStep.OwnerInformation) {
        setCurrentStep(MerchantOnboardingStep.PayoutDetails);
      }
      // state.currentStep === MerchantOnboardingStep.PayoutDetails is the final step. No more advancing needed.
    } else if (state.businessType === BusinessType.Individual) {
      if (state.currentStep === IndividualOnboardingStep.IndividualBillingAddress) {
        setCurrentStep(IndividualOnboardingStep.IndividualInformation);
      }
      if (state.currentStep === IndividualOnboardingStep.IndividualInformation) {
        setCurrentStep(IndividualOnboardingStep.PayoutDetails);
      }
      // state.currentStep === IndividualOnboardingStep.PayoutDetails is the last step. No more advancing needed
    }
  };

  const goToPreviousStep = () => {
    if (state.currentStep === 0) {
      history.replace("/profile");
    }
    if (
      state.businessType === BusinessType.Merchant &&
      (state.formState.representative_0_representativeIsOwner === undefined ||
        state.formState.representative_0_representativeIsOwner) &&
      state.currentStep === MerchantOnboardingStep.PayoutDetails
    ) {
      setCurrentStep(MerchantOnboardingStep.RepresentativeInformation);
    } else {
      setCurrentStep(state.currentStep - 1);
    }
  };

  const setBusinessType = (payload: BusinessType) => {
    dispatch({ type: OnboardingContainerReducerActions.SET_BUSINESS_TYPE, payload });
  };

  const setCountrySelected = (payload: Countries) => {
    dispatch({ type: OnboardingContainerReducerActions.SET_COUNTRY_SELECTED, payload });
  };

  const setUserDetails = (payload: any) => {
    dispatch({ type: OnboardingContainerReducerActions.SET_USER_DETAILS, payload });
  };

  const setCurrentStep = (payload: number) => {
    dispatch({ type: OnboardingContainerReducerActions.SET_CURRENT_STEP, payload });
  };

  const setTotalSteps = (payload: number) => {
    dispatch({ type: OnboardingContainerReducerActions.SET_TOTAL_STEPS, payload });
  };

  const setOnboardingModalState = (payload: OnboardingModalState) => {
    dispatch({
      type: OnboardingContainerReducerActions.SET_ONBOARDING_MODAL_STATE,
      payload,
    });
  };

  const setFormState = (payload: Record<string, any>) => {
    dispatch({
      type: OnboardingContainerReducerActions.SET_FORM_STATE,
      payload,
    });
  };

  return [
    state,
    {
      setBusinessType,
      setCountrySelected,
      setUserDetails,
      setCurrentStep,
      setOnboardingModalState,
      setTotalSteps,
      setFormState,
      goToNextStep,
      goToPreviousStep,
    },
  ];
};
