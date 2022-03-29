import React from "react";
import i18n from "i18next";
import { useHistory } from "react-router";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import { GetCountryByString } from "utils/CountriesMapping";
import { EditEmailForm } from "./components/EditEmail/EditEmailForm";
import { EditPasswordForm } from "./components/EditPassword/EditPasswordForm";
import SecuritySetting from "./components/SecuritySetting/SecuritySetting";
import { UpdateSecurityReducerSteps } from "./UpdateSecurity.reducer";
import { useUpdateSecurityReducer } from "./useUpdateSecurityReducer";

export enum ButtonClickType {
  EDIT_EMAIL,
  EDIT_PASSWORD,
}

const UpdateSecurity: React.FC = () => {
  const history = useHistory();
  const { currentAccount } = useGetCurrentAccount();
  const { currentStep, setCurrentStep } = useUpdateSecurityReducer();
  const TitleMap: Record<UpdateSecurityReducerSteps, string> = {
    [UpdateSecurityReducerSteps.SECURITY_AND_LOGIN]: i18n.t("pages-security.title.my-security-settings"),
    [UpdateSecurityReducerSteps.EDIT_EMAIL]: i18n.t("pages-security.title.update-email"),
    [UpdateSecurityReducerSteps.EDIT_PASSWORD]: i18n.t("pages-security.title.update-password"),
  };

  const title = TitleMap[currentStep];

  const onClickBack = () => {
    if (currentStep === UpdateSecurityReducerSteps.SECURITY_AND_LOGIN) {
      history.goBack();
    } else {
      setCurrentStep(UpdateSecurityReducerSteps.SECURITY_AND_LOGIN);
    }
  };
  const countryCode = GetCountryByString(currentAccount?.country?.alpha2 || "");

  const handleOnClick = (editType: ButtonClickType) => {
    switch (editType) {
      case ButtonClickType.EDIT_EMAIL:
        setEditEmailState();
        break;
      case ButtonClickType.EDIT_PASSWORD:
        setCurrentStep(UpdateSecurityReducerSteps.EDIT_PASSWORD);
        break;
      default:
        break;
    }
  };

  const setEditEmailState = () => {
    setCurrentStep(UpdateSecurityReducerSteps.EDIT_EMAIL);
  };

  return (
    <LayoutModal title={title} onClickBack={onClickBack}>
      {currentStep === UpdateSecurityReducerSteps.SECURITY_AND_LOGIN && (
        <SecuritySetting onButtonClick={handleOnClick} />
      )}

      {currentStep === UpdateSecurityReducerSteps.EDIT_EMAIL && (
        <EditEmailForm onBack={onClickBack} countryCode={countryCode} />
      )}

      {currentStep === UpdateSecurityReducerSteps.EDIT_PASSWORD && (
        <EditPasswordForm onBack={onClickBack} countryCode={countryCode} />
      )}
    </LayoutModal>
  );
};

export default UpdateSecurity;
