import { useTranslation } from "react-i18next";
import { FieldDefinitions } from "../../utils/getSchema";
// import { poBoxRegex } from "../../../../../utils/regexPatterns";
import { MaskedDateInput } from "../../../../MaskedInput/MaskedDateInput";
import { useExtendedJoiInstance } from "../../../../../hooks/useExtendedJoi";
import { Countries, getAllCountries } from "utils/Countries";
import { useGenericErrorMessages } from "pages/MerchantOnboarding/utils/errorObject";

export const useBusinessOwnerSchema = () => {
  const { t } = useTranslation();
  const Joi = useExtendedJoiInstance();
  const errorMessages = useGenericErrorMessages();

  const fieldList: FieldDefinitions[] = [
    {
      country: getAllCountries(),
      name: "owner_0_firstName",
      label: t("onboarding.input.label.legal-first-name"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: getAllCountries(),
      name: "owner_0_lastName",
      label: t("onboarding.input.label.legal-last-name"),
      schema: Joi.string().required().messages(errorMessages),
      infoText: t("onboarding.info.must-match-tax-document"),
    },
    {
      country: [Countries.US],
      component: MaskedDateInput,
      name: "owner_0_dob",
      label: t("onboarding.input.label.date-of-birth"),
      componentProps: {
        placeholder: "MM/DD/YYYY",
        maskOptions: {
          isRevealingMask: false,
          pattern: "11/11/1111",
        },
      },
      schema: Joi.date().format("MM/DD/YYYY").required(),
    },
    {
      country: [
        Countries.EU,
        Countries.AU,
        Countries.SG,
        Countries.MX,
        Countries.NZ,
        Countries.CA,
      ],
      component: MaskedDateInput,
      label: t("onboarding.input.label.date-of-birth"),
      name: "owner_0_dob",
      componentProps: {
        placeholder: "DD/MM/YYYY",
        maskOptions: {
          isRevealingMask: false,
          pattern: "11/11/1111",
        },
      },
      schema: Joi.date().format("DD/MM/YYYY").required(),
    },
    {
      country: [Countries.US, Countries.AU, Countries.NZ, Countries.MX],
      name: "owner_0_email",
      label: t("onboarding.input.label.email"),
      schema: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages(errorMessages),
    },
    {
      country: [Countries.US],
      name: "owner_0_govId",
      label: t("individual.ssn-last4"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.MX],
      name: "owner_0_govId",
      label: t("individual.rfc"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.SG],
      name: "owner_0_govId",
      label: t("individual.nric"),
      schema: Joi.string().required().messages(errorMessages),
    },

    // {
    //   country: [Countries.MX, Countries.SG, Countries.US],
    //   name: "owner_0_addressLine1",
    //   label: t("individual.business.address1"),
    //   schema: Joi.string()
    //     .allow("")
    //     .optional()
    //     .pattern(poBoxRegex, { invert: true })
    //     .messages({
    //       ...errorMessages,
    //       "string.pattern.invert.base": t("merchant-create-page.message.po-box-invalid"),
    //     }),
    // },
    // {
    //   country: [Countries.MX, Countries.SG, Countries.US],
    //   name: "owner_0_addressLine2",
    //   label: t("individual.business.address2"),
    //   schema: Joi.string()
    //     .allow("")
    //     .optional()
    //     .pattern(poBoxRegex, { invert: true })
    //     .messages({
    //       ...errorMessages,
    //       "string.pattern.invert.base": t("merchant-create-page.message.po-box-invalid"),
    //     }),
    // },
    // {
    //   country: [Countries.MX, Countries.SG, Countries.US],
    //   name: "owner_0_addressCity",
    //   label: t("individual.business.city"),
    //   schema: Joi.string().required().messages(errorMessages),
    // },
    // {
    //   country: [Countries.MX, Countries.SG, Countries.US],
    //   name: "owner_0_addressState",
    //   label: t("individual.business.state"),
    //   schema: Joi.string().required().messages(errorMessages),
    // },
    // {
    //   country: [Countries.MX, Countries.SG, Countries.US],
    //   name: "owner_0_addressPostalCode",
    //   label: t("individual.business.postal-code"),
    //   schema: Joi.string().required().messages(errorMessages),
    // },
  ];
  return fieldList;
};
