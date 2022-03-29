import WarningIcon from "assets/svgs/WarningIcon";
import Alert from "components/Alert/Alert";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  onCtaClick?: () => void;
  ctaText?: string;
  status: "restricted" | "restrictedSoon";
  dueDate?: Date;
}

export const ReviewDetailsCard = ({
  onCtaClick,
  ctaText,
  status,
  dueDate,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <Alert>
      <WarningIcon className="w-7 h-7 mb-4" />
      <p className="text-lg mb-2 text-white">
        {status === "restricted"
          ? t("review-details-card.payouts-on-hold")
          : t("review-details-card.review-details")}
      </p>
      <p className="text-base mb-4 text-white">
        {status === "restricted"
          ? t("review-details-card.payouts-on-hold-description")
          : t("review-details-card.review-details-description", {
              dueDate: dueDate ? moment(dueDate).format("MMMM D, YYYY") : "",
            })}
      </p>
      <button className="text-base text-blue-dark" onClick={onCtaClick}>
        {ctaText || t("Review Details")}
      </button>
    </Alert>
  );
};
