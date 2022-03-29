import React from "react";
import { useTranslation } from "react-i18next";
import Button from "components/Button/Button";

const ProcessorDashboard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col mx-6 flex-grow h-full text-white">
        <div className="text-center pb-12">
          <p>{t("pages-processor-dashboard.text.manage-processor-description")}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="my-4 text-lg">{t("pages-processor-dashboard.text.connected-to")}: Stripe</div>
          <div>
            <Button
              onClick={() => {
                window.location.href = "https://dashboard.stripe.com/login";
              }}>
              {t("pages-processor-dashboard.button.visit-dashboard")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessorDashboard;
