import React from "react";
import { Alert } from "components/Alert/Alert";
import { useTranslation } from "react-i18next";
import PendingApprovalIcon from "assets/svgs/PendingApprovalIcon.svg";

interface Props {}

const StripePendingApproval: React.FC<Props> = () => {
  const { t } = useTranslation();
  return (
    <Alert
      icon={PendingApprovalIcon}
      title={t("pending-approval-sign.title")}
      message={t("pending-approval-sign.text")}
    />
  );
};

export default StripePendingApproval;
