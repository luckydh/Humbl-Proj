import React from "react";
import Button from "components/Button/Button";
import { Icon } from "components/Icon/Icon";
import { useTranslation } from "react-i18next";

export type TwoFactorErrorType = keyof typeof potentialErrors;

export interface TwoFactorErrorProps {
  type: TwoFactorErrorType;
  onClick: () => void;
}

const potentialErrors = {
  WrongCode: {
    titleText: "twofactor.error.titleText-WrongCode",
    mainText: "twofactor.error.mainText-WrongCode",
    buttonText: "twofactor.error.buttonText-WrongCode",
  },
  TooManyAttempts: {
    titleText: "twofactor.error.titleText-TooManyAttempts",
    mainText: "twofactor.error.mainText-TooManyAttempts",
    buttonText: "twofactor.error.buttonText-TooManyAttempts",
  },
  TimeOut: {
    titleText: "twofactor.error.titleText-TimeOut",
    mainText: "twofactor.error.mainText-TimeOut",
    buttonText: "twofactor.error.buttonText-TimeOut",
  },
};

export const TwoFactorError: React.FC<TwoFactorErrorProps> = ({ type, onClick }) => {
  const { t } = useTranslation();

  const { titleText: title, mainText: main, buttonText: button } = potentialErrors[type];

  const iconName = type === "TimeOut" ? "outline_timeout" : "bold_danger";

  return (
    <div className="min-h-full flex flex-1 justify-center items-center flex-col text-white text-center pb-4">
      <div className="flex flex-col flex-1 justify-center items-center">
        <Icon name={iconName} size="xl" />
        <h1 className="text-xl font-semibold pt-4 pb-1">{t(title)}</h1>
        <div className="text-sm">{t(main)}</div>
      </div>

      <div className="w-full">
        <Button onClick={onClick}>{t(button)}</Button>
      </div>
    </div>
  );
};
