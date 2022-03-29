import Button from "../../components/Button/Button";
import React from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

export const TransactionsEmptyState = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const handleClick = () => {
    history.push("/discovery-map");
  };
  return (
    <div className="h-full flex flex-col justify-evenly items-center">
      <div className="text-white text-3xl text-center">
        <span>{t("transactions-page.text.no-transactions")}</span>
        <div className="flex mt-12 mb-20 justify-center">
          <Button onClick={handleClick} size="small">
            {t("transactions-page.button.text.find-merchants")}
          </Button>
        </div>
      </div>
    </div>
  );
};
