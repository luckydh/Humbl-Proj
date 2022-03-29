import { useTranslation } from "react-i18next";
import { FieldDefinitions } from "../../utils/getSchema";
import { useGenericErrorMessages } from "../../utils/errorObject";
import { MaskedDateInput } from "../../../../components/MaskedInput/MaskedDateInput";
import { useExtendedJoiInstance } from "../../../../hooks/useExtendedJoi";
import { Countries, getAllCountries } from "../../../../utils/Countries";
import { injectDefaultValueInSchema } from "../../utils/injectDefaultValueInSchema";
import moment from "moment";

export const useBusinessRepresentativeSchema = (
  defaultValues: Record<string, any> | undefined
) => {
  const { t } = useTranslation();
  const Joi = useExtendedJoiInstance();
  const errorMessages = useGenericErrorMessages();
  const fieldList: FieldDefinitions[] = [
    {
      country: getAllCountries(),
      name: "representative_0_firstName",
      label: t("onboarding.input.label.legal-first-name"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: getAllCountries(),
      name: "representative_0_lastName",
      label: t("onboarding.input.label.legal-last-name"),
      schema: Joi.string().required().messages(errorMessages),
      infoText: t("onboarding.info.must-match-tax-document"),
    },
    {
      country: [Countries.US],
      component: MaskedDateInput,
      schema: Joi.date().format("MM/DD/YYYY").raw().required()
        .max(moment().subtract(18, "y"))
        .min(moment().subtract(100, "y"))
        .messages(errorMessages),
      name: "representative_0_dob",
      label: t("onboarding.input.label.date-of-birth"),
      componentProps: {
        placeholder: "MM/DD/YYYY",
      },
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
      schema: Joi.date().format("DD/MM/YYYY").raw().required()
        .max(moment().subtract(18, "y"))
        .min(moment().subtract(100, "y"))
        .messages(errorMessages),
      label: t("onboarding.input.label.date-of-birth"),
      name: "representative_0_dob",
      componentProps: {
        placeholder: "DD/MM/YYYY",
      },
    },
    {
      country: [Countries.US],
      name: "representative_0_govId",
      label: t("individual.ssn"),
      schema: Joi.string().required().messages(errorMessages),
      isSecure: true,
    },
    {
      country: [Countries.MX],
      name: "representative_0_govId",
      label: t("individual.rfc"),
      schema: Joi.string().required().messages(errorMessages),
      isSecure: true,
    },
    {
      country: [Countries.SG],
      name: "representative_0_govId",
      label: t("individual.nric"),
      schema: Joi.string().required().messages(errorMessages),
      isSecure: true,
    },
    {
      type: "checkbox",
      country: [
        Countries.US,
        Countries.MX,
        Countries.EU,
        Countries.SG,
        Countries.AU,
        Countries.NZ,
      ],
      name: "representative_0_representativeIsOwner",
      label: t("onboarding.checkbox.label.are-you-the-owner"),
    },
  ];
  return injectDefaultValueInSchema({ fieldList, defaultValues });
};
