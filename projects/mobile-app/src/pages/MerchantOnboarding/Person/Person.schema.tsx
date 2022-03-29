import { Countries } from "utils/Countries";
import { FieldDefinitions } from "../utils/getSchema";
import { makeGenericErrorMessages } from "../utils/errorObject";
import { MaskedDateInput } from "components/MaskedInput/MaskedDateInput";
import { getExtendedJoiInstance } from "hooks/useExtendedJoi";
import moment from "moment";
import { TFnType } from "i18n";

export function makePersonSchema(personId = "", isOwner = false, t: TFnType) {
  const Joi = getExtendedJoiInstance();
  const errorMessages = makeGenericErrorMessages(t);
  const fieldList: FieldDefinitions[] = [
    {
      country: [Countries.US, Countries.EU, Countries.AU, Countries.NZ, Countries.MX, Countries.SG, Countries.CA],
      name: `person_${personId}_firstName`,
      label: t("onboarding.input.label.legal-first-name"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.EU, Countries.AU, Countries.NZ, Countries.CA],
      name: `person_${personId}_lastName`,
      label: t("onboarding.input.label.legal-last-name"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.US, Countries.MX, Countries.SG],
      name: `person_${personId}_lastName`,
      label: t("onboarding.input.label.legal-last-name"),
      schema: Joi.string().required().messages(errorMessages),
      infoText: t("onboarding.info.must-match-tax-document"),
    },
    {
      country: [Countries.US],
      component: MaskedDateInput,
      name: `person_${personId}_dob`,
      label: t("onboarding.input.label.date-of-birth"),
      componentProps: {
        placeholder: "MM/DD/YYYY",
      },
      schema: Joi.date()
        .format("MM/DD/YYYY")
        .raw()
        .required()
        .max(moment().subtract(18, "y"))
        .min(moment().subtract(100, "y"))
        .messages(errorMessages),
    },
    {
      country: [Countries.EU, Countries.AU, Countries.SG, Countries.MX, Countries.NZ, Countries.CA],
      component: MaskedDateInput,
      label: t("onboarding.input.label.date-of-birth"),
      name: `person_${personId}_dob`,
      componentProps: {
        placeholder: "DD/MM/YYYY",
      },
      schema: Joi.date()
        .format("DD/MM/YYYY")
        .raw()
        .required()
        .max(moment().subtract(18, "y"))
        .min(moment().subtract(100, "y"))
        .messages(errorMessages),
    },
    {
      country: [Countries.US, Countries.AU, Countries.NZ, Countries.MX],
      name: `person_${personId}_email`,
      label: t("onboarding.input.label.email"),
      schema: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages(errorMessages),
    },
    {
      country: [Countries.US],
      name: `person_${personId}_govId`,
      label: isOwner ? t("individual.ssn-last4") : t("individual.ssn"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.MX],
      name: `person_${personId}_govId`,
      label: t("individual.rfc"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.SG],
      name: `person_${personId}_govId`,
      label: t("individual.nric"),
      schema: Joi.string().required().messages(errorMessages),
    },
  ];

  return fieldList;
}
