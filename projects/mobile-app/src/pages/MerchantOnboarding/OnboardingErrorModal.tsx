import { IonIcon, IonModal } from "@ionic/react";
import { bankIcon } from "assets/icons";
import WarningIcon from "assets/svgs/WarningIcon";
import { ModalContent } from "pages/Ticketing/Checkout/ModalContent";
import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button";

export interface OnboardingErrorModalProps {
  onClose: any;
  state: OnboardingModalState;
}

export enum OnboardingModalState {
  CLOSED = "CLOSED",
  ACCOUNT_ERROR = "ACCOUNT_ERROR",
  BANK_ERROR = "BANK_ERROR",
  ERROR = "ERROR",
}

export const OnboardingErrorModal = ({ onClose, state }: OnboardingErrorModalProps) => {
  const { t } = useTranslation();

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <IonModal
      isOpen={state !== OnboardingModalState.CLOSED}
      cssClass="warning-modal"
      onDidDismiss={handleCloseModal}
    >
      <div className="flex items-center justify-center h-full bg-transparent">
        {state === OnboardingModalState.ACCOUNT_ERROR && (
          <ModalContent
            title={t("onboarding.error.accountError.title.oops")}
            icon={<WarningIcon width={35} />}
            message={t("onboarding.error.accountError.message")}
          >
            <Button onClick={handleCloseModal}>
              {t("onboarding.error.accountError.button.backHome")}
            </Button>
          </ModalContent>
        )}
        {state === OnboardingModalState.BANK_ERROR && (
          <ModalContent
            title={t("onboarding.error.bankError.title.oops")}
            icon={<IonIcon icon={bankIcon} style={{ width: 50, height: 50 }} />}
            message={t("onboarding.error.bankError.message")}
          >
            <Button onClick={handleCloseModal}>
              {t("onboarding.error.bankError.button.action")}
            </Button>
          </ModalContent>
        )}
        {state === OnboardingModalState.ERROR && (
          <ModalContent
            title={t("onboarding.error.genericError.title.oops")}
            icon={<WarningIcon width={35} />}
            message={t("onboarding.error.genericError.message")}
          >
            <Button onClick={handleCloseModal}>
              {t("onboarding.error.genericError.button.backHome")}
            </Button>
          </ModalContent>
        )}
      </div>
    </IonModal>
  );
};
