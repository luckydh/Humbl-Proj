import EmptyFolderGraphic from "assets/svgs/EmptyFolderGraphic";
import React from "react";
import { useTranslation } from "react-i18next";
import cx from "classnames";

type VariantTypes = "lightTheme" | "darkTheme";
interface Props {
  isRecentTransactions?: boolean;
  variant?: VariantTypes;
  ariaLabel?: string;
}

const VARIANTS: Record<VariantTypes, string> = {
  lightTheme: "bg-blue-lightest",
  darkTheme: "",
};

const TEXT_COLOR: Record<VariantTypes, string> = {
  lightTheme: "text-blue-dark",
  darkTheme: "text-white",
};

export const NoTransactions: React.FC<Props> = ({ isRecentTransactions, variant = "lightTheme", ariaLabel }) => {
  const { t } = useTranslation();

  return (
    <div className={cx("flex flex-1 flex-col items-center px-10 pb-10", VARIANTS[variant])}>
      <EmptyFolderGraphic />
      <h2
        aria-label={ariaLabel && `${ariaLabel}_TRANSACTIONSTITLE_LABEL`}
        className={cx("font-bold -mt-4 mb-4 text-xl text-center", TEXT_COLOR[variant])}>
        {t("crypto-transactions.no-transactions")}
      </h2>
      <p
        aria-label={ariaLabel && `${ariaLabel}_TRANSACTIONSBODY_LABEL`}
        className={cx("text-center", TEXT_COLOR[variant])}>
        {isRecentTransactions
          ? t("crypto-transactions.no-recent-transactions-description")
          : t("crypto-transactions.no-all-transactions-description")}
      </p>
    </div>
  );
};
