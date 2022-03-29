import React, { useEffect, useRef, useState } from "react";
import { Steps } from "components/Step/Step";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { IndividualOnboardingContainer } from "./Individual/IndividualOnboardingContainer";
import { BusinessTypeSelector } from "./BusinessTypeSelector";
import { AccountType, useMyUserProfileQuery } from "../../generated/graphql";
import firebase from "../../Firebase";
import { LayoutModal } from "../../components/PageTemplates/LayoutModal";
import { HumblLogo } from "../../assets/svgs/HumblLogo";
import { CloseIcon } from "../../assets/svgs/CloseIcon";
import { useOnboardingContainerReducer } from "./OnboardingContainer.reducer";
import { BusinessType } from "../../utils/BusinessType";
import { OnboardingErrorModal } from "./OnboardingErrorModal";
import { MerchantOnboardingContainer } from "./Business/MerchantOnboardingContainer";
import { ConfirmationModal } from "../../components/ConfirmationModal/ConfirmationModal";
import { useHardwareBackButton } from "../../hooks/useHardwareBackButton";

export const OnboardingContainer = () => {
  const { currentAccount } = useGetCurrentAccount();

  const account = currentAccount as AccountType;
  const contentElementRef = useRef<HTMLIonContentElement>(null);
  const history = useHistory();
  const [onboardingContainerState, onboardingContainerActions] = useOnboardingContainerReducer();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const { selectedCountry, userDetails, currentStep, businessType, totalSteps, onboardingModalState } =
    onboardingContainerState;

  const {
    setBusinessType,
    setCountrySelected,
    setUserDetails,
    setCurrentStep,
    setFormState,
    goToNextStep,
    goToPreviousStep,
  } = onboardingContainerActions;

  useMyUserProfileQuery({
    onCompleted: (myUserProfileQuery) => {
      setUserDetails({
        ...userDetails,
        email: firebase.auth().currentUser?.email,
        firstName: myUserProfileQuery.myUserProfile?.firstName,
        lastName: myUserProfileQuery.myUserProfile?.lastName,
      });
    },
  });

  useEffect(() => {
    if (currentAccount?.country?.alpha2?.toUpperCase() !== selectedCountry) {
      setCountrySelected(currentAccount?.country?.alpha2?.toUpperCase());
    }
  }, [currentAccount?.country, setCountrySelected, selectedCountry]);

  const selectBusinessType = (selectedBusinessType: BusinessType) => {
    trackEvent(EVENTS.MERCHANT_APPLICATION_STATUS, {
      type: "BusinessDetail",
      businessType: selectedBusinessType,
    });
    setBusinessType(selectedBusinessType);
  };

  const onClose = () => {
    history.replace("/profile");
  };

  useHardwareBackButton(() => {
    goToPreviousStep();
  });

  return (
    <LayoutModal
      title={<HumblLogo />}
      onRightClick={() => setIsOpen(true)}
      rightClickIcon={currentStep !== 0 ? <CloseIcon /> : <></>}
      onClickBack={() => goToPreviousStep()}>
      <div className="flex flex-col">
        <div className="mb-6">
          <Steps step={currentStep} totalSteps={totalSteps} />
        </div>
        {currentStep === 0 && (
          <>
            <BusinessTypeSelector
              onBusinessTypeSelected={(newBusinessType) => {
                setCurrentStep(1);
                selectBusinessType(newBusinessType);
                if (businessType !== newBusinessType) {
                  setFormState({});
                }
              }}
            />
          </>
        )}
        {currentStep > 0 && businessType === BusinessType.Individual && (
          <IndividualOnboardingContainer
            onboardingState={onboardingContainerState}
            onboardingActions={onboardingContainerActions}
            account={account}
            contentElement={contentElementRef}
            handleGoToNext={goToNextStep}
          />
        )}
        {currentStep > 0 && businessType === BusinessType.Merchant && (
          <MerchantOnboardingContainer
            onboardingState={onboardingContainerState}
            onboardingActions={onboardingContainerActions}
            account={account}
            contentElement={contentElementRef}
            handleGoToNext={goToNextStep}
          />
        )}
      </div>
      <OnboardingErrorModal state={onboardingModalState} onClose={onClose} />
      <ConfirmationModal
        isOpen={isOpen}
        title={t("modal.confirmation.title")}
        subTitle={t("modal.confirmation.subTitle")}
        confirmationButtonText={t("modal.confirmation.confirm-button-exit")}
        cancelButtonText={t("modal.confirmation.cancel-button-exit")}
        onCancel={() => {
          setIsOpen(false);
        }}
        onConfirm={() => {
          onClose();
        }}
      />
    </LayoutModal>
  );
};
