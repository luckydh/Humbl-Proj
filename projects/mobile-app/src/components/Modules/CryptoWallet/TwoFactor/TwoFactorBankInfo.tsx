import React from "react";
import cx from "classnames";
import Button from "components/Button/Button";
import { useTranslation } from "react-i18next";

export interface TwoFactorBankInfoProps {
  className?: string;
  onClose: () => void;
}

export const TwoFactorBankInfo: React.FC<TwoFactorBankInfoProps> = ({ className, onClose }) => {
  const classes = cx("flex items-center flex-1", className);
  const { t } = useTranslation();
  return (
    <div className={classes}>
      <div className="h-screen w-screen absolute inset-0" style={{ backgroundColor: "##283f56", opacity: "0.5" }} />
      <div className="bg-white flex h-64 w-full p-2 absolute inset-x-0 bottom-0 rounded-t-lg text-blue-dark">
        <div className="flex flex-col items-center w-full h-full">
          <div className="w-full">
            <Button
              onClick={onClose}
              variant="text"
              size="xsmall"
              className="text-blue-light p-2"
              style={{ justifyContent: "flex-end" }}>
              close
            </Button>
          </div>
          <div className="mt-5">
            <div className="border rounded-lg border-blue-light text-center w-40 text-sm p-2">WYRE-BUY-999121</div>
          </div>
          <section className="flex flex-col items-center mt-7 justify-center">
            <h4 className="text-xl font-semibold text-center">{t("wyre-2fa-bankinfo-question-msg")}</h4>
            <p className="text-sm text-center mt-2">{t("wyre-2fa-bankinfo-explaination-msg")}</p>
          </section>
        </div>
      </div>
    </div>
  );
};
