import React from "react";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";
import { BusinessType } from "../../utils/BusinessType";
import HomeCircleIcon from "assets/svgs/HomeCircleIcon";
import { Link } from "react-router-dom";

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
      <div>
        <div className="mt-2 space-y-2">
          <Button onClick={() => onBusinessTypeSelected(BusinessType.Individual)}>
            {t("onboarding.options.am-individual")}
          </Button>
          <Button onClick={() => onBusinessTypeSelected(BusinessType.Merchant)}>
            {t("onboarding.options.am-business")}
          </Button>
        </div>
        <Link to="/home" className="flex justify-center absolute bottom-10 inset-x-0">
          <HomeCircleIcon className="w-12 h-12" />
        </Link>
      </div>
    </>
  );
};
