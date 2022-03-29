import React, { RefObject, useState } from "react";
import { Steps } from "../../../Step/Step";
import {
  AccountType,
  useCreateIndividualStripeAccountMutation,
  useUpdateStripeBankingMutation,
} from "generated/graphql";
import { useHistory } from "react-router";
import { useGetCurrentAccount } from "../../../../hooks/useGetCurrentAccount";
import { captureException } from "ErrorLogger";
import { Countries } from "utils/Countries";
import { IndividualOnboardingStep, useOnboardingState } from "pages/MerchantOnboarding/useOnboardingState";
import { IndividualBusinessDetails } from "pages/MerchantOnboarding/Individual/IndividualBusinessDetails/IndividualBusinessDetails";
import IndividualDetails from "pages/MerchantOnboarding/Individual/IndividualDetails/IndividualDetails";
import { mapToRouting } from "pages/MerchantOnboarding/utils/mapToRouting";
import { OnboardingErrorModal, OnboardingModalState } from "pages/MerchantOnboarding/OnboardingErrorModal";
import { extractDateFromField } from "pages/MerchantOnboarding/utils/extractDateFromField";
import IndividualPayoutDetails from "pages/MerchantOnboarding/Individual/IndividualPayoutDetails/IndividualPayoutDetails";

const getDefaultCity = (selectedCountry: Countries) => {
  if (selectedCountry === Countries.SG) {
    return "Singapore";
  }

  return "";
};

export const IndividualOnboardingContainer = ({
  selectedCountry,
  userDetails,
  account,
  contentElement,
}: {
  selectedCountry: Countries;
  userDetails: Record<string, any>;
  account: AccountType;
  contentElement?: RefObject<HTMLIonContentElement>;
}) => {
  const history = useHistory();
  const [state, { setCurrentOnboardingStep, addFieldsToForm }]: any = useOnboardingState({
    firstStep: IndividualOnboardingStep.IndividualBillingAddress,
  });

  const { refetch } = useGetCurrentAccount();

  const [errorState, setErrorState] = useState<OnboardingModalState>(OnboardingModalState.CLOSED);
  const onClose = () => {
    history.replace("/profile");
  };

  const scrollTop = () => {
    setTimeout(() => {
      contentElement?.current?.scrollToTop();
    }, 0);
  };

  const [createIndividualStripeAccountMutation] = useCreateIndividualStripeAccountMutation({});
  const [updateStripeBankingMutation] = useUpdateStripeBankingMutation({});
  return (
    <div className="pb-5 flex flex-col flex-grow">
      <Steps step={state.currentStep} totalSteps={4} />
      {state.currentStep === IndividualOnboardingStep.IndividualBillingAddress && (
        <IndividualBusinessDetails
          selectedCountry={selectedCountry}
          onNextStep={(formData) => {
            addFieldsToForm(formData);
            setCurrentOnboardingStep(IndividualOnboardingStep.IndividualInformation);
            scrollTop();
          }}
        />
      )}
      {state.currentStep === IndividualOnboardingStep.IndividualInformation && (
        <IndividualDetails
          selectedCountry={selectedCountry}
          onNextStep={(formData) => {
            addFieldsToForm(formData);
            setCurrentOnboardingStep(IndividualOnboardingStep.PayoutDetails);
            scrollTop();
          }}
        />
      )}
      {state.currentStep === IndividualOnboardingStep.PayoutDetails && (
        <>
          <IndividualPayoutDetails
            selectedCountry={selectedCountry}
            onNextStep={async (formData: Record<string, any>) => {
              addFieldsToForm(formData);
              const parsedFormData = {
                firstName: state.formFields.firstName,
                lastName: state.formFields.lastName,
                phone: account.phone,
                dob: extractDateFromField(state.formFields.dob, selectedCountry),
                email: userDetails.email,
                govId: state.formFields.govId,
                businessDescription: `${account.displayName} | ${account.merchantProfileDetails?.merchantType}`,
                address: {
                  street: state.formFields.individualAddressLine1,
                  additional: state.formFields.individualAddressLine2,
                  city: getDefaultCity(selectedCountry) || state.formFields.individualAddressCity,
                  region: state.formFields.individualAddressState,
                  postal: state.formFields.individualAddressPostalCode,
                  country: selectedCountry,
                },
                website: `https://www.humblpay.com/account/${account.id}`,
              };

              await createIndividualStripeAccountMutation({
                variables: parsedFormData,
                context: {
                  uri: process.env.REACT_APP_SECURE_HUMBL_DATA_URL,
                },
              })
                .then(async (res) => {
                  if (res.data?.createIndividualStripeAccount) {
                    refetch();
                    const routingNumber = mapToRouting(
                      selectedCountry,
                      formData?.routingNumber,
                      formData?.routingNumber2
                    );
                    await updateStripeBankingMutation({
                      variables: {
                        routingNumber,
                        accountNumber: formData.accountNumber,
                      },
                      context: {
                        uri: process.env.REACT_APP_SECURE_HUMBL_DATA_URL,
                      },
                    })
                      .then((res) => {
                        if (res.data?.updateStripeBanking) {
                          refetch();
                          history.replace("/merchantpaymentaccountsuccess");
                        }
                      })
                      .catch((error) => {
                        //Need better error handling here. Modal?
                        setErrorState(OnboardingModalState.BANK_ERROR);
                        captureException(error);
                      });
                  }
                })
                .catch((err) => {
                  //Need better error handling here. Modal?
                  setErrorState(OnboardingModalState.ACCOUNT_ERROR);
                  captureException(err);
                });
            }}
          />
          <OnboardingErrorModal state={errorState} onClose={onClose} />
        </>
      )}
    </div>
  );
};
