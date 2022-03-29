import React, { useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { Loading } from "components/Loading";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { OnboardingUpdateScreen } from "./OnboardingUpdateScreen";
import { Countries } from "utils/Countries";
import { GetCountryByString } from "utils/CountriesMapping";
import { useGetMissingStripeRequirementsQuery } from "generated/graphql";
import { useHandleOnboardingUpdateSubmit } from "./utils/useHandleOnboardingUpdateSubmit";
import { AccountNotCreatedError } from "pages/MerchantOnboarding/Errors/AccountNotCreated";
import { BankInformationNotCreatedError } from "pages/MerchantOnboarding/Errors/BankInformationNotCreated";
import { OnboardingModalState, OnboardingErrorModal } from "pages/MerchantOnboarding/OnboardingErrorModal";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";

interface LocationState {
  requireBanking?: boolean;
}

export const OnboardingUpdate: React.FC = () => {
  const { state } = useLocation<LocationState>();
  const { refetch } = useGetCurrentAccount();
  const { data, loading } = useGetMissingStripeRequirementsQuery({
    fetchPolicy: "network-only",
  });

  const { handleOnboardingUpdateSubmit, isSubmitting } = useHandleOnboardingUpdateSubmit(state?.requireBanking);

  const history = useHistory();
  const [modalState, setModalState] = useState(OnboardingModalState.CLOSED);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loading loading={true} />
      </div>
    );
  }

  if (data?.missingStripeRequirements) {
    const { business, persons } = data.missingStripeRequirements;

    const hasMissingFields =
      business?.missingFields?.length! > 0 || persons?.some((person) => person.missingFields?.length! > 0);

    if (!hasMissingFields) {
      return <Redirect to="/profile" />;
    }
  }

  const selectedCountry = GetCountryByString(data?.me?.merchantProfileDetails?.countryCode ?? Countries.US);

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      await handleOnboardingUpdateSubmit({
        formData,
        selectedCountry,
        stripeData: data?.missingStripeRequirements,
      });

      refetch();
      history.replace("/merchant-onboarding-update-success");
    } catch (error) {
      if (error instanceof AccountNotCreatedError) {
        setModalState(OnboardingModalState.ACCOUNT_ERROR);
      } else if (error instanceof BankInformationNotCreatedError) {
        setModalState(OnboardingModalState.BANK_ERROR);
      } else {
        setModalState(OnboardingModalState.ERROR);
      }
    }
  };

  const handleCloseModal = () => {
    setModalState(OnboardingModalState.CLOSED);
    history.replace("/profile");
  };

  return (
    <>
      <OnboardingUpdateScreen
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        selectedCountry={selectedCountry}
        data={data?.missingStripeRequirements}
        requireBankingFields={state?.requireBanking}
      />
      <OverlayLoading isOpen={isSubmitting} />
      <OnboardingErrorModal state={modalState} onClose={handleCloseModal} />
    </>
  );
};
