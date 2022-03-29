import { useTranslation } from "react-i18next";
import { useGenericErrorMessages } from "../../MerchantOnboarding/utils/errorObject";
import { FieldDefinitions } from "../../MerchantOnboarding/utils/getSchema";
import { Countries, getAllCountries } from "../../../utils/Countries";
import { injectDefaultValueInSchema } from "../../MerchantOnboarding/utils/injectDefaultValueInSchema";
import { PhoneNumberSchema } from "components/PhoneInput/PhoneInput";
import { MaskedDateInput } from "components/MaskedInput/MaskedDateInput";
import { AddBankForm } from "../AddNewBankAccount.reducer";
import moment from "moment";
import { useExtendedJoiInstance } from "../../../hooks/useExtendedJoi";
import { poBoxRegex } from "utils/regexPatterns";

export const usePersonalDetailsFormSchema = (defaultValues?: AddBankForm | undefined): FieldDefinitions[] => {
  const { t } = useTranslation();
  const errorMessages = useGenericErrorMessages();
  const Joi = useExtendedJoiInstance();

  const fieldList: FieldDefinitions[] = [
    {
      country: getAllCountries(),
      name: "firstName",
      ariaLabel: "ADDBANKDETAILSFORM_FIRSTNAME",
      label: t("personal-details-page.label.first-name"),
      schema: Joi.string()
        .required()
        .messages({
          ...errorMessages,
        }),
    },
    {
      country: getAllCountries(),
      name: "lastName",
      ariaLabel: "ADDBANKDETAILSFORM_LASTNAME",
      label: t("personal-details-page.label.last-name"),
      schema: Joi.string()
        .required()
        .messages({
          ...errorMessages,
        }),
    },
    {
      country: [Countries.US],
      component: MaskedDateInput,
      name: "birthDate",
      ariaLabel: "ADDBANKDETAILSFORM_BIRTHDATE",
      label: t("personal-details-page.label.birthdate"),
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
      name: "birthDate",
      ariaLabel: "ADDBANKDETAILSFORM_BIRTHDATE",
      label: t("personal-details-page.label.birthdate"),
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
      country: getAllCountries(),
      type: "phoneNumber",
      ariaLabel: "ADDBANKDETAILSFORM_PHONENUMBER",
      name: "phone",
      label: t("personal-details-page.label.phone-number"),
      schema: PhoneNumberSchema.required().messages({
        "phone.invalid": t("phone-number.error.invalid"),
        "string.empty": t("personal-details-page.input.error.message.phone-number-is-required"),
        "any.required": t("personal-details-page.input.error.message.phone-number-is-required"),
      }),
    },
    {
      country: getAllCountries(),
      name: "addressLine1",
      ariaLabel: "ADDBANKDETAILSFORM_BILLINGADDRESS",
      ariaLabelValue: "ADDBANKDETAILSFORM_ADDRESSLINE1",
      label: t("personal-details-page.label.billing-address"),
      placeholder: t("personal-details-page.placeholder.address-line-1"),
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
      ariaLabelValue: "ADDBANKDETAILSFORM_ADDRESSLINE2",
      placeholder: t("personal-details-page.placeholder.address-line-2"),
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
      country: getAllCountries(),
      name: "city",
      ariaLabel: "ADDBANKDETAILSFORM_CITY",
      label: t("personal-details-page.label.city"),
      schema: Joi.string()
        .required()
        .messages({
          ...errorMessages,
        }),
    },
    {
      country: [Countries.EU, Countries.AU],
      name: "addressState",
      ariaLabel: "ADDBANKDETAILSFORM_STATE",
      label: t("onboarding.inividual.business.region"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.CA],
      name: "addressState",
      ariaLabel: "ADDBANKDETAILSFORM_STATE",
      label: t("onboarding.individual.business.province"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.US, Countries.MX],
      name: "addressState",
      ariaLabel: "ADDBANKDETAILSFORM_STATE",
      label: t("onboarding.individual.business.state"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: getAllCountries(),
      name: "postalCode",
      ariaLabel: "ADDBANKDETAILSFORM_POSTALCODE",
      label: t("personal-details-page.label.postal-code"),
      placeholder: t("personal-details-page.placeholder.postal-code"),
      schema: Joi.string()
        .required()
        .messages({
          ...errorMessages,
        }),
    },
  ];
  return injectDefaultValueInSchema({ fieldList, defaultValues });
};
