import Joi from "joi";
import { useTranslation } from "react-i18next";
import { FieldDefinitions } from "../../utils/getSchema";
import { useGenericErrorMessages } from "../../utils/errorObject";
import { poBoxRegex } from "../../../../utils/regexPatterns";
import { Countries, getAllCountries } from "../../../../utils/Countries";
import { injectDefaultValueInSchema } from "../../utils/injectDefaultValueInSchema";

export const useBusinessDetailsSchema = (
  defaultValues?: Record<string, any> | undefined
) => {
  const { t } = useTranslation();
  const errorMessages = useGenericErrorMessages();

  const fieldList: FieldDefinitions[] = [
    {
      country: getAllCountries(),
      name: "businessName",
      label: t("onboarding.business.name"),
      schema: Joi.string().required().messages(errorMessages),
      infoText: t("onboarding.info.must-match-tax-document-business-name"),
    },
    {
      country: [Countries.US, Countries.MX, Countries.EU, Countries.SG, Countries.CA],
      name: "businessTaxId",
      label: t("onboarding.business.taxid"),
      schema: Joi.string().required().messages(errorMessages),
      isSecure: true,
    },
    {
      country: [Countries.AU],
      name: "businessTaxId",
      label: "ABN",
      schema: Joi.string().required().messages(errorMessages),
      isSecure: true,
    },
    {
      country: [Countries.NZ],
      name: "businessTaxId",
      label: "NZBN",
      schema: Joi.string().required().messages(errorMessages),
      isSecure: true,
    },
    {
      country: getAllCountries(),
      name: "addressLine1",
      label: t("individual.business.address1"),
      schema: Joi.string()
        .pattern(poBoxRegex, { invert: true })
        .messages({
          ...errorMessages,
          "string.pattern.invert.base": t("merchant-create-page.message.po-box-invalid"),
        }),
    },
    {
      country: getAllCountries(),
      name: "addressLine2",
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
      name: "addressCity",
      label: t("individual.business.city"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.EU, Countries.AU],
      name: "addressState",
      label: t("inividual.business.region"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.CA],
      name: "addressState",
      label: t("individual.business.provence"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.US, Countries.MX],
      name: "addressState",
      label: t("individual.business.state"),
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
      name: "addressPostalCode",
      label: t("individual.business.postal-code"),
      schema: Joi.string().required().messages(errorMessages),
    },
  ];
  return injectDefaultValueInSchema({ fieldList, defaultValues });
};
