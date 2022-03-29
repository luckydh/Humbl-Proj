import { useTranslation } from "react-i18next";
import { FieldDefinitions } from "../../utils/getSchema";
import { useGenericErrorMessages } from "../../utils/errorObject";
import { MaskedDateInput } from "../../../../components/MaskedInput/MaskedDateInput";
import { useExtendedJoiInstance } from "../../../../hooks/useExtendedJoi";
import { Countries, getAllCountries } from "../../../../utils/Countries";
import { injectDefaultValueInSchema } from "../../utils/injectDefaultValueInSchema";
import moment from "moment";

export const useBusinessOwnerSchema = (
  defaultValues: Record<string, any> | undefined
): FieldDefinitions[] => {
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
      },
      schema: Joi.date().format("MM/DD/YYYY").raw().required()
        .max(moment().subtract(18, "y"))
        .min(moment().subtract(100, "y"))
        .messages(errorMessages),
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
      },
      schema: Joi.date().format("DD/MM/YYYY").raw().required()
        .max(moment().subtract(18, "y"))
        .min(moment().subtract(100, "y"))
        .messages(errorMessages),
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
      isSecure: true,
    },
    {
      country: [Countries.MX],
      name: "owner_0_govId",
      label: t("individual.rfc"),
      schema: Joi.string().required().messages(errorMessages),
      isSecure: true,
    },
    {
      country: [Countries.SG],
      name: "owner_0_govId",
      label: t("individual.nric"),
      schema: Joi.string().required().messages(errorMessages),
      isSecure: true,
    },
  ];
  return injectDefaultValueInSchema({ fieldList, defaultValues });
};
