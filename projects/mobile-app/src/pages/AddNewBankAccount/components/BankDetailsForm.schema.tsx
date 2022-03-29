import Joi from "joi";
import { useTranslation } from "react-i18next";
import { useGenericErrorMessages } from "../../MerchantOnboarding/utils/errorObject";
import { FieldDefinitions } from "../../MerchantOnboarding/utils/getSchema";
import { Countries, getAllCountries } from "../../../utils/Countries";
import { injectDefaultValueInSchema } from "../../MerchantOnboarding/utils/injectDefaultValueInSchema";
import { AddBankForm } from "../AddNewBankAccount.reducer";

export const BankDetailsFormSchema = (defaultValues?: AddBankForm | undefined): FieldDefinitions[] => {
  const { t } = useTranslation();
  const errorMessages = useGenericErrorMessages();

  const fieldList: FieldDefinitions[] = [
    {
      country: [Countries.US],
      name: "accountNumber",
      ariaLabel: "ADDBANKDETAILS_ACCOUNTNUMBER",
      label: t("bank-details-page.label.account-number"),
      schema: Joi.string()
        .required()
        .min(6)
        .max(19)
        .messages({
          ...errorMessages,
          "string.min": t("bank-details-page.input.label.payout.account-number-must-be-6-to-19"),
          "string.max": t("bank-details-page.input.label.payout.account-number-must-be-6-to-19"),
        }),
    },
    {
      country: [Countries.AU],
      name: "accountNumber",
      ariaLabel: "ADDBANKDETAILS_ACCOUNTNUMBERAUSTRALIA",
      label: "Account Number",
      schema: Joi.string().required().min(5).max(9)
        .messages(errorMessages),
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
      country: [Countries.EU],
      name: "accountNumber",
      label: t("onboarding.input.label.payout.iban-number"),
      schema: Joi.string().required().min(10).messages(errorMessages),
    },
    {
      country: [Countries.MX],
      name: "accountNumber",
      ariaLabel: "ADDBANKDETAILS_NUMEROCLABE",
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
      ariaLabel: "ADDBANKDETAILS_ROUTINGNUMBER",
      label: t("bank-details-page.label.routing-number"),
      schema: Joi.string()
        .required()
        .length(9)
        .messages({
          ...errorMessages,
          "string.length": t("bank-details-page.input.label.payout.routing-number-must-be-9"),
        }),
    },
    {
      country: [Countries.CA],
      name: "routingNumber",
      ariaLabel: "ADDBANKDETAILS_ROUTINGNUMBER",
      label: t("onboarding.input.label.payout.transit-number"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.CA],
      name: "routingNumber2",
      ariaLabel: "ADDBANKDETAILS_ROUTINGNUMBER",
      label: t("onboarding.input.label.payout.institution-number"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.SG],
      name: "routingNumber2",
      ariaLabel: "ADDBANKDETAILS_ROUTINGNUMBER",
      label: t("onboarding.input.label.payout.branch-code"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.SG],
      name: "routingNumber",
      ariaLabel: "ADDBANKDETAILS_ROUTINGNUMBER",
      label: t("onboarding.input.label.payout.bank-code"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: [Countries.AU],
      name: "bsbNumber",
      ariaLabel: "ADDBANKDETAILS_BSB",
      label: "BSB",
      schema: Joi.string().required().min(6).max(6)
        .messages(errorMessages)
        .label("BSB"),
    },
    {
      country: getAllCountries(),
      name: "bankName",
      ariaLabel: "ADDBANKDETAILS_NAMEOFBANK",
      label: t("bank-details-page.label.name-of-bank"),
      schema: Joi.string().required().messages(errorMessages),
    },
    {
      country: getAllCountries(),
      name: "accountType",
      label: t("bank-details-page.label.type-of-account"),
      placeholder: t("bank-details-page.placeholder.select-type"),
      ariaLabel: "ADDBANKDETAILS_TYPEOFACCOUNT",
      //WIP: Random Array used for dropdown options
      options: [
        {
          value: "CHECKING",
          label: t("bank-account-options-checking"),
        },
        {
          value: "SAVINGS",
          label: t("bank-account-options-savings"),
        },
      ],
      schema: Joi.string().required().messages(errorMessages),
    },
  ];
  return injectDefaultValueInSchema({ fieldList, defaultValues });
};
