import React from "react";
import Button from "components/Button/Button";
import { Icon } from "components/Icon/Icon";
import { useTranslation } from "react-i18next";

type ButtonVariant = "secure" | "normal";

interface ContinueButtonProps {
  type?: "submit" | "button";
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({
  type = "button",
  onClick: handleOnClick,
  disabled,
  variant = "secure",
  ariaLabel,
}) => (
  <div className="mt-3 px-6 pb-6 fixed right-0 left-0 bottom-0 bg-blue">
    <Button
      size="small"
      type={type}
      onClick={handleOnClick}
      isDisabled={disabled}
      ariaLabel={ariaLabel ? `${ariaLabel}_CONTINUE_BUTTON` : "KYC_CONTINUE_BUTTON"}>
      <ContinueTextElement variant={variant} />
    </Button>
  </div>
);

interface ContinueTextElementProps {
  variant?: ButtonVariant;
}

export const ContinueTextElement: React.FC<ContinueTextElementProps> = ({ variant = "secure" }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row items-center">
      {variant === "secure" && (
        <span className="pr-1">
          <Icon name="bold_lock" size="xs" />
        </span>
      )}

      <span className="text-lg">{t("global.continue")}</span>
    </div>
  );
};
