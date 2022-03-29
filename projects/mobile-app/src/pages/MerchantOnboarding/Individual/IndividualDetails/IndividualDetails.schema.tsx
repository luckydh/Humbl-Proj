import { useTranslation } from "react-i18next";
import { FieldDefinitions } from "../../utils/getSchema";
import { useGenericErrorMessages } from "../../utils/errorObject";
import { MaskedDateInput } from "../../../../components/MaskedInput/MaskedDateInput";
import { useExtendedJoiInstance } from "../../../../hooks/useExtendedJoi";
import { Countries } from "../../../../utils/Countries";
import { injectDefaultValueInSchema } from "../../utils/injectDefaultValueInSchema";
import moment from "moment";

export const useIndividualDetailsSchema = (
  defaultValues?: Record<string, any>
): FieldDefinitions[] => {
  const { t } = useTranslation();
  const Joi = useExtendedJoiInstance();
  const errorMessages = useGenericErrorMessages();
  const fieldList: FieldDefinitions[] = [
    {
      country: [
        Countries.US,
        Countries.EU,
        Countries.AU,
        Countries.NZ,
        Countries.MX,
        Countries.SG,
        Countries.CA,
      ],
      name: "firstName",
      label: t("onboarding.input.label.legal-first-name"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.CA],
      name: "lastName",
      label: t("onboarding.input.label.legal-last-name"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [
        Countries.US,
        Countries.EU,
        Countries.AU,
        Countries.NZ,
        Countries.MX,
        Countries.SG,
      ],
      name: "lastName",
      label: t("onboarding.input.label.legal-last-name"),
      schema: Joi.string().required().messages(errorMessages),
      infoText: t("onboarding.info.must-match-tax-document"),
    },
    {
      country: [Countries.US],
      component: MaskedDateInput,
      name: "dob",
      label: t("onboarding.input.label.date-of-birth"),
      componentProps: {
        placeholder: "MM/DD/YYYY",
        defaultValue: "MM/DD/YYYY",
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
      name: "dob",
      componentProps: {
        placeholder: "DD/MM/YYYY",
      },
      schema: Joi.date().format("DD/MM/YYYY").raw().required()
        .max(moment().subtract(18, "y"))
        .min(moment().subtract(100, "y"))
        .messages(errorMessages),
    },
    {
      country: [Countries.US],
      name: "govId",
      label: t("individual.ssn"),
      schema: Joi.string().required().messages(errorMessages),
      isSecure: true,
    },
    {
      country: [Countries.MX],
      name: "govId",
      label: t("individual.rfc"),
      schema: Joi.string().required().messages(errorMessages),
      isSecure: true,
    },
    {
      country: [Countries.SG],
      name: "govId",
      label: t("individual.nric"),
      schema: Joi.string().required().messages(errorMessages),
      isSecure: true,
    },
  ];
  return injectDefaultValueInSchema({ fieldList, defaultValues });
};
