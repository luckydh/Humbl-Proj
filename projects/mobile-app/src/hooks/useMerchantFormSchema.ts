import Joi from "joi";
import { UsernameSchema } from "components/UsernameInput/UsernameInput";
import { postalCodeRegEx, StringWithoutEmojiSchema } from "utils/validations";
import { PhoneNumberSchema } from "components/PhoneInput/PhoneInput";
import { IMerchantFormInputs } from "components/CreateMerchantForm/CreateMerchantForm";
import { useTranslation } from "react-i18next";
import { poBoxRegex } from "utils/regexPatterns";

export interface IFormInputs extends IMerchantFormInputs {
  base64Images?: string;
}

export function useMerchantFormSchema(newMerchant = false) {
  const { t } = useTranslation();

  const AddressSchema = Joi.object({
    country: Joi.string()
      .required()
      .messages({
        "string.empty": t("merchant-create-page.message.country-is-required"),
        "any.required": t("merchant-create-page.message.country-is-required"),
      }),
    street: StringWithoutEmojiSchema.required()
      .pattern(poBoxRegex, { invert: true })
      .messages({
        "string.empty": t("merchant-create-page.message.address-is-required"),
        "any.required": t("merchant-create-page.message.address-is-required"),
        "string.pattern.invert.base": t("merchant-create-page.message.po-box-invalid"),
      }),
    additional: StringWithoutEmojiSchema.allow("")
      .pattern(poBoxRegex, { invert: true })
      .messages({
        "string.pattern.invert.base": t("merchant-create-page.message.po-box-invalid"),
      }),
    city: Joi.when("country", {
      is: "sg",
      then: Joi.not().required(),
      otherwise: StringWithoutEmojiSchema.required().messages({
        "string.empty": t("merchant-create-page.message.city-is-required"),
        "any.required": t("merchant-create-page.message.city-is-required"),
        "string.pattern.invert.base": t("merchant-create-page.message.city-is-invalid"),
      }),
    }),
    region: Joi.when("country", {
      is: "sg",
      then: Joi.not().required(),
      otherwise: StringWithoutEmojiSchema.required().messages({
        "string.empty": t("merchant-create-page.message.state-is-required"),
        "any.required": t("merchant-create-page.message.state-is-required"),
        "string.pattern.invert.base": t("merchant-create-page.message.state-is-invalid"),
      }),
    }),
    postal: Joi.string()
      .required()
      // matches letters, numbers, dashes and spaces
      .pattern(postalCodeRegEx)
      .messages({
        "string.empty": t("merchant-create-page.message.postal-code-is-required"),
        "any.required": t("merchant-create-page.message.postal-code-is-required"),
        "string.pattern.base": t("merchant-create-page.message.postal-code-is-invalid"),
      }),
  });

  const userNameSchema = Joi.object<IFormInputs>({
    userName: UsernameSchema.messages({
      "string.empty": t("merchant-create-page.message.user-name-is-required"),
      "string.min": t("merchant-create-page.message.username-less-than-6-characters"),
      "string.max": t("merchant-create-page.message.username-more-than-24-characters"),
      "string.pattern.base": t("merchant-create-page.message.this-is-not-a-valid-user-name"),
    }),
  });

  let merchantFormSchema = Joi.object<IFormInputs>({
    displayName: StringWithoutEmojiSchema.required()
      .max(40)
      .messages({
        "string.empty": t("merchant-create-page.message.merchant-name-is-required"),
        "any.required": t("merchant-create-page.message.merchant-name-is-required"),
        "string.max": t("merchant-create-page.message.merchant-name-max-length"),
        "string.pattern.invert.base": t("merchant-create-page.message.merchant-name-is-invalid"),
      }),
    merchantType: Joi.string()
      .required()
      .messages({
        "string.empty": t("merchant-create-page.message.merchant-type-is-required"),
        "any.required": t("merchant-create-page.message.merchant-type-is-required"),
      }),
    phoneNumber: PhoneNumberSchema.required().messages({
      "phone.invalid": t("phone-number.error.invalid"),
      "string.empty": t("merchant-create-page.message.phone-number-is-required"),
      "any.required": t("merchant-create-page.message.phone-number-is-required"),
    }),
    currency: Joi.string()
      .required()
      .messages({
        "string.empty": t("merchant-create-page.message.currency-is-required"),
        "any.required": t("merchant-create-page.message.currency-is-required"),
      }),
    hasAddress: Joi.boolean(),
    location: Joi.when("hasAddress", {
      is: true,
      then: AddressSchema,
      otherwise: Joi.object({
        country: Joi.string()
          .required()
          .messages({
            "string.empty": t("merchant-create-page.message.country-is-required"),
            "any.required": t("merchant-create-page.message.country-is-required"),
          }),
      }),
    }),
  });
  if (newMerchant) {
    merchantFormSchema = merchantFormSchema.concat(userNameSchema);
  }
  return merchantFormSchema;
}
