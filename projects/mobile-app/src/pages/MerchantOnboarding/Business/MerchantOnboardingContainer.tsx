import React, { RefObject } from "react";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { AccountType } from "generated/graphql";
import { useHistory } from "react-router";
import { MerchantOnboardingStep } from "../useOnboardingState";
import MerchantPayoutDetails from "./BusinessPayoutDetails/MerchantPayoutDetails";
import { BusinessOwnerInformation } from "./BusinessOwner/BusinessOwnerInformation";
import { MerchantBusinessDetails } from "./BusinessDetails/MerchantBusinessDetails";
import { BusinessRepresentatveInformation } from "./BusinessRepresentative/BusinessRepresentativeInformation";
import {
  OnboardingContainerReducerStateProps,
  UseOnboardingContainerReducerActionsProps,
} from "../OnboardingContainer.reducer";
import { useHandleMerchantOnboardingSubmit } from "./useHandleMerchantOnboardingSubmit";
import { useGetCurrentAccount } from "../../../hooks/useGetCurrentAccount";
import { AccountNotCreatedError } from "../Errors/AccountNotCreated";
import { OnboardingModalState } from "../OnboardingErrorModal";
import { BankInformationNotCreatedError } from "../Errors/BankInformationNotCreated";

export interface MerchantOnboardingContainerProps {
  contentElement?: RefObject<HTMLIonContentElement>;
  onboardingState: OnboardingContainerReducerStateProps;
  onboardingActions: UseOnboardingContainerReducerActionsProps;
  account: AccountType;
  handleGoToNext: Function;
}

export const MerchantOnboardingContainer = ({
  contentElement,
  onboardingState,
  onboardingActions,
  account,
  handleGoToNext,
}: MerchantOnboardingContainerProps) => {
  const { userDetails, currentStep, selectedCountry, formState } = onboardingState;
  const { setOnboardingModalState, setFormState } = onboardingActions;
  const { refetch } = useGetCurrentAccount();
  const history = useHistory();

  const { handleMerchantOnboardingSubmit, isSubmitting } = useHandleMerchantOnboardingSubmit();

  const scrollTop = () => {
    setTimeout(() => {
      contentElement?.current?.scrollToTop();
    }, 0);
  };

  const submitForm = (finalStepData: Record<string, unknown>) => {
    const payload = {
      ...userDetails,
      ...account,
      ...formState,
      ...finalStepData,
      selectedCountry,
    };
    handleMerchantOnboardingSubmit(payload)
      .then(() => setFormState({}))
      .then(() => refetch())
      .then(() => history.replace("/merchantpaymentaccountsuccess"))
      .catch((error) => {
        if (error instanceof AccountNotCreatedError) {
          setOnboardingModalState(OnboardingModalState.ACCOUNT_ERROR);
        } else if (error instanceof BankInformationNotCreatedError) {
          setOnboardingModalState(OnboardingModalState.BANK_ERROR);
        } else {
          setOnboardingModalState(OnboardingModalState.ERROR);
        }
      });
  };

  return (
    <>
      {currentStep === MerchantOnboardingStep.BusinessDetails && (
        <MerchantBusinessDetails
          formState={formState}
          selectedCountry={selectedCountry}
          onNextStep={(data: Record<string, unknown>) => {
            setFormState({ ...formState, ...data });
            handleGoToNext();
            scrollTop();
          }}
          onFormChanged={(formNewData) => {
            setFormState({ ...formState, ...formNewData });
          }}
        />
      )}
      {currentStep === MerchantOnboardingStep.RepresentativeInformation && (
        <BusinessRepresentatveInformation
          formState={formState}
          selectedCountry={selectedCountry}
          onNextStep={(data: Record<string, unknown>) => {
            setFormState({ ...formState, ...data });
            // have to pass in the form value as state is not updating in time to use it.
            handleGoToNext(data?.representative_0_representativeIsOwner);
            scrollTop();
          }}
          onFormChanged={(formNewData) => {
            setFormState({ ...formState, ...formNewData });
          }}
        />
      )}
      {currentStep === MerchantOnboardingStep.OwnerInformation && (
        <BusinessOwnerInformation
          formState={formState}
          selectedCountry={selectedCountry}
          onNextStep={(data: Record<string, unknown>) => {
            setFormState({ ...formState, ...data });
            handleGoToNext();
            scrollTop();
          }}
          onFormChanged={(formNewData) => {
            setFormState({ ...formState, ...formNewData });
          }}
        />
      )}
      {currentStep === MerchantOnboardingStep.PayoutDetails && (
        <>
          <MerchantPayoutDetails
            formState={formState}
            selectedCountry={selectedCountry}
            onNextStep={async (data: Record<string, unknown>) => {
              setFormState({ ...formState, ...data });
              submitForm(data);
            }}
            onFormChanged={(formNewData) => {
              setFormState({ ...formState, ...formNewData });
            }}
          />
        </>
      )}
      <OverlayLoading isOpen={isSubmitting} />
    </>
  );
};
