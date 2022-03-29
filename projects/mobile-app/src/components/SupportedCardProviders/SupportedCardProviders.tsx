import React from "react";
import { SecureIcon } from "assets/svgs/Secure";
import { VisaIcon } from "assets/svgs/Visa";
import { MasterCardIcon } from "assets/svgs/MasterCard";
import { useTranslation } from "react-i18next";

const supportedCardProviders = [
  { key: "visa", card: <VisaIcon /> },
  { key: "mastercard", card: <MasterCardIcon /> },
];

export const SupportedCardProviders = () => {
  const { t } = useTranslation();

  return (
    <fieldset className="border border-solid text-center rounded-md h-14 flex items-center justify-center">
      <legend className="text-xs flex px-2">
        <SecureIcon />
        <span className="ml-2">{t("supported-card-providers.secure-payment")}</span>
      </legend>
      <div className="flex justify-center items-center h-10">
        {supportedCardProviders.map(({ key, card }) => (
          <div className="mx-2 mb-2" key={key}>
            {card}
          </div>
        ))}
      </div>
    </fieldset>
  );
};
