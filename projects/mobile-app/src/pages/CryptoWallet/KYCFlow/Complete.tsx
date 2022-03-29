import React from "react";
import { useTranslation } from "react-i18next";

import { Illustration } from "components/Illustration/Illustration";
import PageHeading from "./PageHeading";
import { Notice } from "./Notice";
import Button from "components/Button/Button";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";

export const COMPLETE = "Complete";

interface CompleteProps {
  onExit: () => void;
}

export const Complete: React.FC<CompleteProps> = ({ onExit }) => {
  const { t } = useTranslation();
  // Triggered to update the kyc status and clear kyc task if possible
  useGetCurrentAccount();

  return (
    <div className="flex flex-col justify-center items-center flex-grow text-white mb-20">
      <div className="mb-3" aria-label="COMPLETE_ICON">
        <Illustration name="lock_check" size="md" />
      </div>
      <PageHeading
        ariaLabel="ACCOUNTVERIFICATION_TITLE"
        title={t("kyc.complete.page.title")}
        description={t("kyc.complete.page.description")}
      />

      <Notice
        iconName="bold_lock"
        title={t("kyc.complete.notice.title")}
        description={t("kyc.complete.notice.description")}
        ariaLabel="ACCOUNTVERIFICATION"
      />
      <div className="mt-3 px-6 pb-6 fixed right-0 left-0 bottom-0 bg-blue">
        <Button size="small" onClick={onExit} ariaLabel="ACCOUNTVERIFICATION_CONTINUE_BUTTON">
          <span className="text-lg">{t("kyc.complete.page.continue-button")}</span>
        </Button>
      </div>
    </div>
  );
};
