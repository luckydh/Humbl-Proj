import React, { RefObject, useState } from "react";
import { Steps } from "../../../Step/Step";
import {
  AccountType,
  StripePersonInput,
  useCreateCompanyStripeAccountMutation,
  useUpdateStripeBankingMutation,
} from "generated/graphql";
import { useHistory } from "react-router";
import { useGetCurrentAccount } from "../../../../hooks/useGetCurrentAccount";
import { captureException } from "ErrorLogger";
import { MerchantOnboardingStep, useOnboardingState } from "pages/MerchantOnboarding/useOnboardingState";
import { Countries } from "utils/Countries";
import { OnboardingErrorModal, OnboardingModalState } from "pages/MerchantOnboarding/OnboardingErrorModal";
import { MerchantBusinessDetails } from "pages/MerchantOnboarding/Business/BusinessDetails/MerchantBusinessDetails";
import { BusinessRepresentatveInformation } from "pages/MerchantOnboarding/Business/BusinessRepresentative/BusinessRepresentativeInformation";
import { BusinessOwnerInformation } from "pages/MerchantOnboarding/Business/BusinessOwner/BusinessOwnerInformation";
import MerchantPayoutDetails from "pages/MerchantOnboarding/Business/BusinessPayoutDetails/MerchantPayoutDetails";
import { extractDateFromField } from "pages/MerchantOnboarding/utils/extractDateFromField";
import { mapToRouting } from "pages/MerchantOnboarding/utils/mapToRouting";

const getDefaultCity = (selectedCountry: Countries) => {
  if (selectedCountry === Countries.SG) {
    return "Singapore";
  }

  return "";
};

export const MerchantOnboardingContainer = ({
  countrySelected,
  userDetails,
  account,
  contentElement,
}: {
  countrySelected: Countries;
  userDetails: Record<string, any>;
  account: AccountType;
  contentElement?: RefObject<HTMLIonContentElement>;
}) => {
  const history = useHistory();
  const [state, { setCurrentOnboardingStep, addFieldsToForm }]: any = useOnboardingState({
    firstStep: MerchantOnboardingStep.BusinessDetails,
  });
  const [updateStripeBankingMutation] = useUpdateStripeBankingMutation({});
  const [createCompanyStripeAccountMutation] = useCreateCompanyStripeAccountMutation({});
  const { refetch, currentAccount } = useGetCurrentAccount();
  const [totalSteps, setTotalSteps] = useState(4);
  const [errorState, setErrorState] = useState<OnboardingModalState>(OnboardingModalState.CLOSED);
  const onClose = () => {
    history.replace("/profile");
  };

  const scrollTop = () => {
    setTimeout(() => {
      contentElement?.current?.scrollToTop();
    }, 0);
  };

  return (
    <div className="pb-5">
      <Steps step={state.currentStep} totalSteps={totalSteps} />
      {state.currentStep === MerchantOnboardingStep.BusinessDetails && (
        <MerchantBusinessDetails
          selectedCountry={countrySelected}
          onNextStep={(data: Record<string, any>) => {
            addFieldsToForm(data);
            setCurrentOnboardingStep(MerchantOnboardingStep.RepresentativeInformation);
            scrollTop();
          }}
        />
      )}
      {state.currentStep === MerchantOnboardingStep.RepresentativeInformation && (
        <BusinessRepresentatveInformation
          selectedCountry={countrySelected}
          onNextStep={(data: Record<string, any>) => {
            addFieldsToForm(data);
            if (
              !!data?.representative_0_representativeIsOwner ||
              currentAccount?.country?.alpha2?.toUpperCase() === Countries.CA
            ) {
              setTotalSteps(4);
              setCurrentOnboardingStep(MerchantOnboardingStep.PayoutDetails);
            } else {
              setTotalSteps(5);
              setCurrentOnboardingStep(MerchantOnboardingStep.OwnerInformation);
            }
            scrollTop();
          }}
        />
      )}
      {state.currentStep === MerchantOnboardingStep.OwnerInformation && (
        <BusinessOwnerInformation
          selectedCountry={countrySelected}
          onNextStep={(data: Record<string, any>) => {
            addFieldsToForm(data);

            setCurrentOnboardingStep(MerchantOnboardingStep.PayoutDetails);
            scrollTop();
          }}
        />
      )}
      {state.currentStep === MerchantOnboardingStep.PayoutDetails && (
        <>
          <MerchantPayoutDetails
            selectedCountry={countrySelected}
            onNextStep={async (formData: Record<string, any>) => {
              addFieldsToForm(formData);

              const addressFields = {
                street: state.formFields.addressLine1 || "",
                additional: state.formFields.addressLine2 || "",
                city: getDefaultCity(countrySelected) || state.formFields.addressCity || "",
                region: state.formFields.addressState || "",
                postal: state.formFields.addressPostalCode,
                country: countrySelected,
              };

              //This should eventually be extracted out, but for simplicity it's
              // in here as it uses some global params from account or userDetails
              const createPersons = () => {
                const persons: StripePersonInput[] = [];
                // Allways add representative

                persons.push({
                  firstName: state.formFields.representative_0_firstName,
                  lastName: state.formFields.representative_0_lastName,
                  // DOB might be an empty object of all fields are undefined. Backend accounts for this;
                  dob: extractDateFromField(state.formFields.Representative_0_dob, countrySelected),
                  govId: state.formFields.representative_0_govId,
                  phone: account.phone,
                  email: userDetails.email,
                  address: addressFields,
                  title: "",
                  isRepresentative: true,
                  isExecutive: true,
                  isOwner: !!state.formFields.representative_0_representativeIsOwner,
                });

                const hasDifferentOwner = !state.formFields.representative_0_representativeIsOwner;
                if (hasDifferentOwner) {
                  // Owner information if different.
                  const owner: StripePersonInput = {
                    isOwner: true,
                    isDirector: true,
                    isExecutive: true,
                    firstName: state.formFields.owner_0_firstName,
                    lastName: state.formFields.owner_0_lastName,
                    // DOB might be an empty object of all fields are undefined. Backend accounts for this;
                    dob: extractDateFromField(state.formFields.owner_0_dob, countrySelected),
                    govId: state.formFields.owner_0_govId,
                    email: state.formFields.owner_0_email,
                    address: addressFields,
                  };
                  persons.push(owner);
                }
                return persons;
              };
              const parsedFormData = {
                legalName: state.formFields.businessName,
                taxId: state.formFields.businessTaxId,
                email: userDetails.email,
                address: addressFields,
                phone: account.phone,
                website: `https://www.humblpay.com/account/${account.id}`,
                businessDescription: `${account.displayName} | ${account.merchantProfileDetails?.merchantType}`,
                persons: createPersons(),
              };
              await createCompanyStripeAccountMutation({
                variables: parsedFormData,
                context: {
                  uri: process.env.REACT_APP_SECURE_HUMBL_DATA_URL,
                },
              })
                .then((res) => {
                  if (res.data?.createCompanyStripeAccount) {
                    refetch();
                    const routingNumber = mapToRouting(
                      countrySelected,
                      formData?.routingNumber,
                      formData?.routingNumber2
                    );
                    updateStripeBankingMutation({
                      variables: {
                        routingNumber,
                        accountNumber: formData.accountNumber,
                      },
                      context: {
                        uri: process.env.REACT_APP_SECURE_HUMBL_DATA_URL,
                      },
                    })
                      .then((bankResponse) => {
                        if (bankResponse.data?.updateStripeBanking) {
                          // Fetching up to date account data
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
                  captureException(err);
                  setErrorState(OnboardingModalState.ACCOUNT_ERROR);
                });
            }}
          />
          <OnboardingErrorModal state={errorState} onClose={onClose} />
        </>
      )}
    </div>
  );
};
