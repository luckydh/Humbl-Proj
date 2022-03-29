import EmptyFolderGraphic from "assets/svgs/EmptyFolderGraphic";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  isRecentTransactions?: boolean;
  ariaLabel?: string;
}

export const NoCryptoTransactions = ({ isRecentTransactions, ariaLabel }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col items-center px-10 pb-10 bg-blue-lightest">
      <EmptyFolderGraphic />
      <h2
        aria-label={ariaLabel && `${ariaLabel}_TRANSACTIONSTITLE_LABE`}
        className="text-blue-dark font-bold -mt-4 mb-4 text-xl text-center">
        {t("crypto-transactions.no-transactions")}
      </h2>
      <p aria-label={ariaLabel && `${ariaLabel}_TRANSACTIONSBODY_LABEL`} className="text-blue-dark text-center">
        {isRecentTransactions
          ? t("crypto-transactions.no-recent-transactions-description")
          : t("crypto-transactions.no-all-transactions-description")}
      </p>
    </div>
  );
};
