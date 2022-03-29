import { IonIcon } from "@ionic/react";
import { bankAddIcon } from "../../../assets/icons";
import { Button } from "../../../components/Button/Button";
import React from "react";
import { useTranslation } from "react-i18next";

export interface SelectBankEmptyStateComponentProps {
  onAddBankClicked: () => void;
  ariaLabel?: string;
}

export const EmptyBankList = ({ onAddBankClicked, ariaLabel }: SelectBankEmptyStateComponentProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-grow flex-col">
      <div className="flex text-white flex-grow items-center justify-center flex-col">
        <IonIcon className="flex w-48 h-36 justify-center items-center pb-6" icon={bankAddIcon} />
        <div aria-label={ariaLabel && `${ariaLabel}_NOBANKTITLE_LABEL`} className="text-2xl">
          {t("select-bank-page.message.title")}
        </div>
        <div
          aria-label={ariaLabel && `${ariaLabel}_NOBANKBODY_LABEL`}
          className="text-center max-w-md text-base pt-2.5">
          {t("select-bank-page.message.description")}
        </div>
      </div>
      <Button ariaLabel={ariaLabel && `${ariaLabel}_ADDABANK_BUTTON`} className="mb-6 px-6" onClick={onAddBankClicked}>
        {t("select-bank-page.button.add-a-bank")}
      </Button>
    </div>
  );
};
