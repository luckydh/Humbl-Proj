import Joi from "joi";
import { useTranslation } from "react-i18next";
import { useGenericErrorMessages } from "../../../MerchantOnboarding/utils/errorObject";
import { FieldDefinitions } from "../../../MerchantOnboarding/utils/getSchema";
import { getAllCountries } from "../../../../utils/Countries";
import { lowerCaseRegEx, numberRegEx, specialRegEx, upperCaseRegEx } from "utils/validations";

export const EditPasswordFormSchema = (): FieldDefinitions[] => {
  const { t } = useTranslation();
  const errorMessages = useGenericErrorMessages();

  const fieldList: FieldDefinitions[] = [
    {
      country: getAllCountries(),
      name: "currentPassword",
      label: t("page-update-security.placeholder.current-password"),
      isSecure: true,
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: getAllCountries(),
      name: "newPassword",
      isSecure: true,
      label: t("page-update-security.placeholder.new-password"),
      // TODO: make re-useable and apply to other password inputs
      // i.e. signup emailpwcreate so that they never go out of sync validation requirement wise.
      schema: Joi.string()
        .min(8)
        .max(40)
        .pattern(lowerCaseRegEx)
        .pattern(upperCaseRegEx)
        .pattern(numberRegEx)
        .pattern(specialRegEx)
        .messages({
          ...errorMessages,
          "string.pattern.base": t("page-update-security.message.wrong-password-pattern"),
        }),
    },
  ];
  return fieldList;
};
