import React from "react";
import { useTranslation } from "react-i18next";

export const SalesEmptyState = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-grow items-center text-center">
        <div className="flex-1 leading-snug text-white text-3xl">
          {t("sales-page.text.no-sales")}
        </div>
      </div>
    </div>
  );
};
