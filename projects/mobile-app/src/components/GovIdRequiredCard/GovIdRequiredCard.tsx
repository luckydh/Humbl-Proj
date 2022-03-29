import WarningIcon from "assets/svgs/WarningIcon";
import Alert from "components/Alert/Alert";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  onCtaClick?: () => void;
  status: "documentVerificationRequired" | "documentVerificationRequiredSoon";
  dueDate?: Date;
}

export const GovIdRequiredCard: React.FC<IProps> = ({ onCtaClick, status, dueDate }) => {
  const { t } = useTranslation();

  return (
    <Alert>
      <WarningIcon className="w-7 h-7 mb-4" />
      <p className="text-lg mb-2 text-white">
        {t("document-verification-required-card.document-verification-required")}
      </p>
      <p className="text-base mb-4 text-white">
        {status === "documentVerificationRequired"
          ? t("document-verification-required-card.document-verification-required-description")
          : t("document-verification-required-card.document-verification-required-soon-description", {
              dueDate: dueDate ? moment(dueDate).format("MMMM D, YYYY") : "",
            })}
      </p>
      <button className="text-base text-blue-dark" onClick={onCtaClick}>
        {t("document-verification-required-card.contact-customer-service")}
      </button>
    </Alert>
  );
};
