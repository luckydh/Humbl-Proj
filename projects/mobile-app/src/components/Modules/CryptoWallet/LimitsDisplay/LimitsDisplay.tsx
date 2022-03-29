import React from "react";
import { useTranslation } from "react-i18next";
import { formatUsingIntl } from "utils/currency";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";

import "./styles.scss";

export interface LimitsType {
  weekly: number;
  monthly: number;
  yearly: number;
}

export interface LimitsDisplayProps {
  limits: LimitsType;
  ariaLabel?: string;
  isKycApproved?: boolean;
}

export const LimitsDisplay: React.FC<LimitsDisplayProps> = ({ limits, ariaLabel, isKycApproved = false }) => {
  const { t } = useTranslation();
  const currency = useGetCurrentAccountCurrency();

  const getLimits = () => {
    if (isKycApproved) {
      return (
        <>
          <div className="absolute inset-0 limits-display-animation-kyc-approved">
            {t("crypto-wallet.buy.choose-amount.upto-limit")} {formatUsingIntl(limits.weekly, "standard", currency)}{" "}
            {t("crypto-wallet.buy.choose-amount.weekly-limit")}
          </div>
          <div className="absolute inset-0 limits-display-animation-kyc-approved">
            {t("crypto-wallet.buy.choose-amount.upto-limit")} {formatUsingIntl(limits.monthly, "standard", currency)}{" "}
            {t("crypto-wallet.buy.choose-amount.monthly-limit")}
          </div>
        </>
      );
    }
    return (
      <>
        <div className="absolute inset-0 limits-display-animation">
          {formatUsingIntl(limits.weekly, "standard", currency)} {t("crypto-wallet.buy.choose-amount.weekly-limit")}
        </div>
        <div className="absolute inset-0 limits-display-animation">
          {formatUsingIntl(limits.monthly, "standard", currency)} {t("crypto-wallet.buy.choose-amount.monthly-limit")}
        </div>
        <div className="absolute inset-0 limits-display-animation">
          {formatUsingIntl(limits.yearly, "standard", currency)} {t("crypto-wallet.buy.choose-amount.yearly-limit")}
        </div>
      </>
    );
  };

  return (
    <div
      className="relative w-full font-medium text-center text-blue-dark tabular-nums"
      aria-label={ariaLabel && `${ariaLabel}_AMOUNTLIMIT_LABEL`}>
      {getLimits()}
    </div>
  );
};

export default LimitsDisplay;
