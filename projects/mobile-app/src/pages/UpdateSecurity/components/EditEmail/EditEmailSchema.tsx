import Joi from "joi";
import { useTranslation } from "react-i18next";
import { useGenericErrorMessages } from "../../../MerchantOnboarding/utils/errorObject";
import { FieldDefinitions } from "../../../MerchantOnboarding/utils/getSchema";
import { getAllCountries } from "../../../../utils/Countries";

export const EditEmailFormSchema = (): FieldDefinitions[] => {
  const { t } = useTranslation();
  const errorMessages = useGenericErrorMessages();

  const fieldList: FieldDefinitions[] = [
    {
      country: getAllCountries(),
      name: "password",
      label: t("page-update-security.placeholder.password"),
      isSecure: true,
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: getAllCountries(),
      name: "newEmail",
      label: t("page-update-security.placeholder.new-email"),
      schema: Joi.string()
        .email({ tlds: { allow: false } })
        .messages(errorMessages),
    },
  ];
  return fieldList;
};
