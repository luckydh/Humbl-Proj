import React from "react";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import "./styles.scss";

export interface BottomActionProps {
  children?: React.ReactNode;
  platformLogo?: React.ReactNode;
  backgroundColor?: "bg-blue" | "bg-white";
}

export const BottomAction: React.FC<BottomActionProps> = ({ children, platformLogo, backgroundColor = "bg-blue" }) => {
  const { t } = useTranslation();
  const classes = cx("fixed bottom-0 left-0 right-0 px-6 pt-3 pb-2 bottom-action-shadow", backgroundColor);
  return (
    <div className="h-28">
      <div className={classes}>
        {children}
        {platformLogo && (
          <p className="text-xs text-white flex items-center justify-center mt-2">
            {t("ticketing.component.bottom-action.powered-by")}
            <span className="ml-1">{platformLogo}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default BottomAction;
