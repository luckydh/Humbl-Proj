import Joi from "joi";
import { useTranslation } from "react-i18next";
import { useGenericErrorMessages } from "../utils/errorObject";
import { FieldDefinitions } from "../utils/getSchema";
import { Countries } from "../../../utils/Countries";
import { injectDefaultValueInSchema } from "../utils/injectDefaultValueInSchema";

export const useGetFieldList = (defaultValues?: Record<string, any> | undefined): FieldDefinitions[] => {
  const { t } = useTranslation();
  const errorMessages = useGenericErrorMessages();

  const fieldList = [
    {
      country: [Countries.US],
      name: "accountNumber",
      label: t("onboarding.input.label.payout.account-number"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.NZ],
      name: "accountNumber",
      label: t("onboarding.input.label.payout.account-number"),
      schema: Joi.string()
        .required()
        .min(15)
        .max(16)
        .messages({
          ...errorMessages,
          "string.min": t("onboarding.input.label.payout.account-number-min-length-15"),
          "string.max": t("onboarding.input.label.payout.account-number-max-length-16"),
        }),
    },
    {
      country: [Countries.MX],
      name: "accountNumber",
      label: t("onboarding.input.label.payout.clabe-number"),
      schema: Joi.string()
        .required()
        .min(18)
        .max(18)
        .label(t("onboarding.input.label.payout.clabe-number"))
        .messages({
          ...errorMessages,
          "string.length": t("onboarding.input.label.payout.clabe-number-must-be-18"),
        }),
    },
    {
      country: [Countries.EU],
      name: "accountNumber",
      label: t("onboarding.input.label.payout.iban-number"),
      schema: Joi.string().required().min(10).messages(errorMessages),
    },
    {
      country: [Countries.AU],
      name: "accountNumber",
      label: "Account Number",
      schema: Joi.string().required().min(5).max(9)
        .messages(errorMessages),
    },
    {
      country: [Countries.CA],
      name: "accountNumber",
      label: "Account Number",
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.SG],
      name: "accountNumber",
      label: "Account Number",
      schema: Joi.string()
        .required()
        .min(6)
        .max(19)
        .messages({
          ...errorMessages,
          "string.min": t("onboarding.input.label.payout.account-number-must-be-6-to-19"),
          "string.max": t("onboarding.input.label.payout.account-number-must-be-6-to-19"),
        }),
    },
    {
      country: [Countries.US],
      name: "routingNumber",
      label: t("onboarding.input.label.payout.routing-number"),
      schema: Joi.string()
        .required()
        .length(9)
        .messages({
          ...errorMessages,
          "string.length": t("onboarding.input.label.payout.routing-number-must-be-9"),
        }),
    },
    {
      country: [Countries.CA],
      name: "routingNumber",
      label: t("onboarding.input.label.payout.transit-number"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.CA],
      name: "routingNumber2",
      label: t("onboarding.input.label.payout.institution-number"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.SG],
      name: "routingNumber2",
      label: t("onboarding.input.label.payout.branch-code"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.SG],
      name: "routingNumber",
      label: t("onboarding.input.label.payout.bank-code"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.AU],
      name: "routingNumber",
      label: "BSB",
      schema: Joi.string().required().min(6).max(6)
        .messages(errorMessages)
        .label("BSB"),
    },
  ];
  return injectDefaultValueInSchema({ fieldList, defaultValues });
};
