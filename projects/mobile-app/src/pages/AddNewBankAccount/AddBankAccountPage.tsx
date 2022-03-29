import React, { useEffect } from "react";
import { useAddNewBankAccountReducer } from "./useAddNewBankAccountReducer";
import { AddBankForm, AddNewBankAccountReducerSteps } from "./AddNewBankAccount.reducer";
import { PersonalDetailsForm } from "./components/PersonalDetailsForm";
import { ConfirmationModal } from "../../components/ConfirmationModal/ConfirmationModal";
import { useTranslation } from "react-i18next";
import { BankDetailsForm } from "./components/BankDetailsForm";
import { useGetCurrentAccount } from "../../hooks/useGetCurrentAccount";
import { GetCountryByString } from "../MerchantOnboarding/CountriesMapping";
import { LayoutModal } from "../../components/PageTemplates/LayoutModal";
import { useHistory, useLocation } from "react-router";
import CheckMark from "../../components/CheckMark";
import { extractDateFromField } from "../MerchantOnboarding/utils/extractDateFromField";
import { CloseIcon } from "../../assets/svgs/CloseIcon";
import { useAddBankingInfoMutationWithCacheUpdate } from "hooks/useCustomAddBankingInfoMutation";
import { useHardwareBackButton } from "hooks/useHardwareBackButton";
import { mapToRouting } from "pages/MerchantOnboarding/utils/mapToRouting";
import { ErrorModal } from "components/ErrorHandling/ErrorModal";
import { WarningIcon } from "assets/icons/index";

export const AddBankAccountPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  // TODO: This location value will likely be set by something else,
  // lets add this type there when it's used and import it here.
  const location = useLocation<{ exitLocation?: string }>();
  const { currentAccount } = useGetCurrentAccount();
  const {
    currentStep,
    formState,
    setCurrentStep,
    setCurrentTitle,
    setFormState,
    setShowExitModal,
    setShowSuccessModal,
    showExitModal,
    showSuccessModal,
    title,
  } = useAddNewBankAccountReducer();

  const { mutate: addNewBankMutation } = useAddBankingInfoMutationWithCacheUpdate();

  useEffect(() => {
    if (
      currentStep === AddNewBankAccountReducerSteps.BANK_ACCOUNT_DETAILS &&
      title !== t("add-bank-account-page.bank-details-form.title")
    ) {
      setCurrentTitle(t("add-bank-account-page.bank-details-form.title"));
    } else if (
      currentStep === AddNewBankAccountReducerSteps.PERSONAL_DETAILS &&
      title !== t("add-bank-account-page.personal-details-form.title")
    ) {
      setCurrentTitle(t("add-bank-account-page.personal-details-form.title"));
    }
  }, [currentStep, setCurrentTitle, t, title]);

  const countryCode = GetCountryByString(currentAccount?.country?.alpha2 || "");

  const onClickBack = () => {
    if (currentStep === AddNewBankAccountReducerSteps.BANK_ACCOUNT_DETAILS) {
      history.goBack();
    } else {
      setCurrentStep(AddNewBankAccountReducerSteps.BANK_ACCOUNT_DETAILS);
    }
  };

  useHardwareBackButton(onClickBack, 1000);

  const onClickClose = () => {
    setShowExitModal(true);
  };

  const onExitPage = () => {
    if (location.state?.exitLocation) {
      history.push(location.state.exitLocation);
    } else {
      history.goBack();
    }
  };

  const sendFormToAddBankMutation = async (newFormState: AddBankForm) => {
    const formToSend = {
      accountType: newFormState.accountType,
      bankAccountNickname: newFormState.bankName,
      bsbNumber: newFormState.bsbNumber,
      clabe: newFormState.clabe,
      accountNumber: newFormState.accountNumber,
      routingNumber: mapToRouting(countryCode, newFormState.routingNumber, newFormState.routingNumber2),
      bankName: newFormState.bankName,
      firstName: newFormState.firstName,
      lastName: newFormState.lastName,
      dob: extractDateFromField(newFormState.birthDate, countryCode),
      phoneNumber: newFormState.phone,
      address: {
        country: countryCode,
        street: newFormState.addressLine1,
        additional: newFormState.addressLine2,
        city: newFormState.city,
        region: newFormState.state,
        postal: newFormState.postalCode,
      },
    };

    const result = await addNewBankMutation({
      variables: formToSend,
      context: {
        uri: process.env.REACT_APP_SECURE_HUMBL_DATA_URL,
      },
    });

    if (!result.errors) {
      setShowSuccessModal(true);
    }
  };

  return (
    <LayoutModal
      title={title}
      onClickBack={onClickBack}
      onRightClick={onClickClose}
      rightClickIcon={<CloseIcon />}
      ariaLabel={
        title === t("add-bank-account-page.personal-details-form.title") ? "ADDBANKDETAILSFORM" : "ADDBANKDETAILS"
      }>
      {currentStep === AddNewBankAccountReducerSteps.BANK_ACCOUNT_DETAILS && (
        <BankDetailsForm
          onSubmitSuccess={(data) => {
            setFormState({ ...formState, ...data });
            setCurrentStep(AddNewBankAccountReducerSteps.PERSONAL_DETAILS);
          }}
          formState={formState}
          countryCode={countryCode}
        />
      )}
      {currentStep === AddNewBankAccountReducerSteps.PERSONAL_DETAILS && (
        <PersonalDetailsForm
          onSubmitSuccess={(data) => {
            const newFormState = { ...formState, ...data };
            setFormState(newFormState);
            sendFormToAddBankMutation(newFormState);
          }}
          formState={formState}
          countryCode={countryCode}
        />
      )}
      {showExitModal && (
        <ErrorModal
          ariaLabel="CANCELCONFIRMATION"
          isOpen={showExitModal}
          IconComponent={<img src={WarningIcon} alt="warning icon" />}
          title={t("crypto-wallet.buy.order-preview.exit-modal.title")}
          subTitle={t("crypto-wallet.buy.order-preview.exit-modal.subtitle")}
          secondaryAction={{
            text: t("crypto-wallet.buy.order-preview.exit-modal.cancel-action"),
            action: () => {
              setShowExitModal(false);
            },
          }}
          primaryAction={{
            text: t("crypto-wallet.buy.order-preview.exit-modal.confirm-action"),
            action: () => {
              setShowExitModal(false);
              onExitPage();
            },
          }}
        />
      )}
      {showSuccessModal && (
        <ConfirmationModal
          ariaLabel="BANKADDED"
          isOpen={showSuccessModal}
          IconComponent={<CheckMark noBackground size="sm" />}
          title={t("add-bank.message.title")}
          subTitle={t("add-bank.message.subtitle")}
          confirmationButtonText={t("add-bank.action.make-deposit")}
          cancelButtonText={t("add-bank.action.go-back")}
          onCancel={() => {
            setShowSuccessModal(false);
            history.push("/crypto-wallet");
          }}
          onConfirm={() => {
            setShowSuccessModal(false);
            history.push("/crypto-wallet/withdraw");
          }}
        />
      )}
    </LayoutModal>
  );
};
