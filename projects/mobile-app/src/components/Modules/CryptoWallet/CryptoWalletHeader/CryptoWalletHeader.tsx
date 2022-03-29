import React from "react";
import { useTranslation } from "react-i18next";

import { formatUsingIntl } from "utils/currency";

export interface CryptoWalletHeaderProps {
  currencyCode: string;
  balance: number;
  arialabel?: string;
}

export const CryptoWalletHeader: React.FC<CryptoWalletHeaderProps> = ({ balance, currencyCode, arialabel }) => {
  const { t } = useTranslation();

  return (
    <header
      aria-label={arialabel && `${arialabel}_STICKYHEADER_COMPONENT`}
      className="fixed bg-blue text-white shadow-md safe-area-top left-0 right-0 top-0 flex flex-col justify-end">
      <div className="flex flex-row justify-end w-6/12 md:w-4/12 m-auto px-2.5 sm:px-5 py-5">
        <div className="flex flex-col w-full text-center">
          <span
            aria-label={arialabel && `${arialabel}_STICKYHEADERWALLETBALANCE_LABEL`}
            className="text-base font-light">
            {t("crypto-wallet.home.top-header.title")}
          </span>
          <span aria-label={arialabel && `${arialabel}_STICKYHEADERUSERBALANCE_LABEL`} className="text-2xl">
            {formatUsingIntl(balance, "standard", currencyCode)}
          </span>
        </div>
      </div>
    </header>
  );
};
