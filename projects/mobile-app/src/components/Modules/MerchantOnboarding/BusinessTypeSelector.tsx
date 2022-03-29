import React from "react";
import { BusinessType } from "utils/BusinessType";
import Button from "../../Button/Button";
import { useTranslation } from "react-i18next";

interface BusinessTypeSelectorType {
  onBusinessTypeSelected: (businessType: BusinessType) => void;
}

export const BusinessTypeSelector = ({
  onBusinessTypeSelected,
}: BusinessTypeSelectorType) => {
  const { t } = useTranslation();
  return (
    <>
      <p className={"mb-10 text-white text-center"}>{t("onboarding.confirm.business")}</p>
      <div className="max-w-lg">
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <Button onClick={() => onBusinessTypeSelected(BusinessType.Individual)}>
              {t("onboarding.options.am-individual")}
            </Button>
          </div>
          <div className="flex items-center">
            <Button onClick={() => onBusinessTypeSelected(BusinessType.Merchant)}>
              {t("onboarding.options.am-business")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
