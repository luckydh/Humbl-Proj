import Joi from "joi";
import { useTranslation } from "react-i18next";
import { useGenericErrorMessages } from "../../utils/errorObject";
import { poBoxRegex } from "../../../../utils/regexPatterns";
import { Countries } from "../../../../utils/Countries";
import { FieldDefinitions } from "../../utils/getSchema";
import { injectDefaultValueInSchema } from "../../utils/injectDefaultValueInSchema";

export const useIndividualBusinessDetailsSchema = (
  defaultValues?: Record<string, any>
) => {
  const { t } = useTranslation();
  const errorMessages = useGenericErrorMessages();
  const fieldList: FieldDefinitions[] = [
    {
      country: [
        Countries.US,
        Countries.MX,
        Countries.EU,
        Countries.AU,
        Countries.NZ,
        Countries.SG,
        Countries.CA,
      ],
      name: "individualAddressLine1",
      label: t("onboarding.individual.business.address1"),
      schema: Joi.string()
        .pattern(poBoxRegex, { invert: true })
        .messages({
          ...errorMessages,
          "string.pattern.invert.base": t("merchant-create-page.message.po-box-invalid"),
        }),
    },
    {
      country: [
        Countries.US,
        Countries.MX,
        Countries.EU,
        Countries.AU,
        Countries.NZ,
        Countries.SG,
        Countries.CA,
      ],
      name: "individualAddressLine2",
      label: t("individual.business.address2"),
      schema: Joi.string()
        .allow("")
        .optional()
        .pattern(poBoxRegex, { invert: true })
        .messages({
          ...errorMessages,
          "string.pattern.invert.base": t("merchant-create-page.message.po-box-invalid"),
        }),
    },
    {
      country: [
        Countries.US,
        Countries.MX,
        Countries.EU,
        Countries.AU,
        Countries.NZ,
        Countries.CA,
      ],
      name: "individualAddressCity",
      label: t("onboarding.individual.business.city"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.EU, Countries.AU],
      name: "individualAddressState",
      label: t("onboarding.inividual.business.region"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.CA],
      name: "individualAddressState",
      label: t("onboarding.individual.business.province"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.US, Countries.MX],
      name: "individualAddressState",
      label: t("onboarding.individual.business.state"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [
        Countries.US,
        Countries.MX,
        Countries.EU,
        Countries.AU,
        Countries.NZ,
        Countries.SG,
        Countries.CA,
      ],
      name: "individualAddressPostalCode",
      label: t("onboarding.individual.business.postal-code"),
      schema: Joi.string().required().messages(errorMessages),
    },
  ];

  return injectDefaultValueInSchema({ fieldList, defaultValues });
};
