import React from "react";
import { useTranslation } from "react-i18next";

import { Illustration } from "components/Illustration/Illustration";
import PageHeading from "./PageHeading";
import { useKYCActions } from "./KYCFlowContext";
import { Notice } from "./Notice";
import { ContinueButton } from "./ContinueButton";

export const ConfirmDetails: React.FC = () => {
  const { t } = useTranslation();
  const { next } = useKYCActions();

  return (
    <>
      <div className="mb-3" aria-label="KYC_SECURE_ICON">
        <Illustration name="lock_check" size="md" />
      </div>
      <PageHeading
        ariaLabel="KYC_CONFIRMTITLE_LABEL"
        title={t("kyc.confirm-details.page.title")}
        description={t("kyc.confirm-details.page.description")}>
        <p className="text-sm mt-5" aria-label="KYC_CONFIRMBODY_LABEL">
          {t("kyc.confirm-details.body.text")}
        </p>
      </PageHeading>
      <Notice
        iconName="bold_lock"
        title={t("kyc.confirm-details.notice.title")}
        description={t("kyc.confirm-details.notice.description")}
      />
      <ContinueButton onClick={next} variant="normal" />
    </>
  );
};
