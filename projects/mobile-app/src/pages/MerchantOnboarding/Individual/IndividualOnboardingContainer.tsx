import React, { RefObject } from "react";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { useHistory } from "react-router";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { IndividualOnboardingStep } from "../useOnboardingState";
import { IndividualBusinessDetails } from "./IndividualBusinessDetails/IndividualBusinessDetails";
import IndividualPayoutDetails from "./IndividualPayoutDetails/IndividualPayoutDetails";
import IndividualDetails from "./IndividualDetails/IndividualDetails";
import { OnboardingModalState } from "../OnboardingErrorModal";
import { useHandleIndividualOnboardingSubmit } from "./useHandleIndividualOnboardingSubmit";
import { useGetCurrentAccount } from "../../../hooks/useGetCurrentAccount";
import {
  OnboardingContainerReducerStateProps,
  UseOnboardingContainerReducerActionsProps,
} from "../OnboardingContainer.reducer";
import { AccountType } from "../../../generated/graphql";
import { AccountNotCreatedError } from "../Errors/AccountNotCreated";
import { BankInformationNotCreatedError } from "../Errors/BankInformationNotCreated";

export interface IndividualOnboardingContainerProps {
  contentElement?: RefObject<HTMLIonContentElement>;
  onboardingState: OnboardingContainerReducerStateProps;
  onboardingActions: UseOnboardingContainerReducerActionsProps;
  account: AccountType;
  handleGoToNext: Function;
}

export const IndividualOnboardingContainer = ({
  account,
  contentElement,
  onboardingState,
  onboardingActions,
  handleGoToNext,
}: IndividualOnboardingContainerProps) => {
  const history = useHistory();
  const { refetch } = useGetCurrentAccount();
  const { userDetails, currentStep, selectedCountry, formState } = onboardingState;
  const { setOnboardingModalState, setFormState } = onboardingActions;

  const { handleIndividualOnboardingSubmit, isSubmitting } = useHandleIndividualOnboardingSubmit();

  const scrollTop = () => {
    setTimeout(() => {
      contentElement?.current?.scrollToTop();
    }, 0);
  };
  const submitForm = (finalStepData: Record<string, unknown>) => {
    // we need to pass in the final step data to capture the data form the final form as setState does not update in time.
    const payload = {
      ...userDetails,
      ...account,
      ...formState,
      ...finalStepData,
      selectedCountry,
    };

    return handleIndividualOnboardingSubmit(payload)
      .then(() => setFormState({}))
      .then(() => refetch())
      .then(() => history.replace("/merchantpaymentaccountsuccess"))
      .catch((error) => {
        if (error instanceof AccountNotCreatedError) {
          setOnboardingModalState(OnboardingModalState.ACCOUNT_ERROR);
        } else if (error instanceof BankInformationNotCreatedError) {
          setOnboardingModalState(OnboardingModalState.BANK_ERROR);
        }
      });
  };

  return (
    <div className="flex flex-col flex-grow">
      {currentStep === IndividualOnboardingStep.IndividualBillingAddress && (
        <IndividualBusinessDetails
          formState={formState}
          selectedCountry={selectedCountry}
          onNextStep={(formData) => {
            trackEvent(EVENTS.MERCHANT_APPLICATION_STATUS, {
              type: "IndividualBillingAddress",
            });
            setFormState({ ...formState, ...formData });
            handleGoToNext();
            scrollTop();
          }}
          onFormChanged={(formNewData) => {
            setFormState({ ...formState, ...formNewData });
          }}
        />
      )}
      {currentStep === IndividualOnboardingStep.IndividualInformation && (
        <IndividualDetails
          formState={formState}
          selectedCountry={selectedCountry}
          onNextStep={(formData) => {
            trackEvent(EVENTS.MERCHANT_APPLICATION_STATUS, {
              type: "IndividualInformation",
            });
            setFormState({ ...formState, ...formData });
            handleGoToNext();
            scrollTop();
          }}
          onFormChanged={(formNewData) => {
            setFormState({ ...formState, ...formNewData });
          }}
        />
      )}
      {currentStep === IndividualOnboardingStep.PayoutDetails && (
        <>
          <IndividualPayoutDetails
            formState={formState}
            selectedCountry={selectedCountry}
            onNextStep={(formData: Record<string, unknown>) => {
              trackEvent(EVENTS.MERCHANT_APPLICATION_STATUS, {
                type: "PayoutDetails",
              });
              setFormState({ ...formState, ...formData });
              submitForm(formData);
            }}
            onFormChanged={(formNewData) => {
              setFormState({ ...formState, ...formNewData });
            }}
          />
        </>
      )}
      <OverlayLoading isOpen={isSubmitting} />
    </div>
  );
};
