import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PhoneInput, PhoneNumberSchema } from "components/PhoneInput/PhoneInput";
import UsernameInput, { UsernameSchema } from "components/UsernameInput/UsernameInput";
import { CountrySelect } from "components/CountrySelect/CountrySelect";
import "./styles.scss";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { StringWithoutEmojiSchema } from "utils/validations";
import { clearAccountPersistentFlags } from "state/cache";
import { MutationCreateNewUserArgs } from "../../generated/graphql";
import { Message } from "../../components/Message/Message";
import Input from "../../components/Input/Input";
import Button from "components/LoaderButton/LoaderButton";

interface IFormInputs {
  firstName: string;
  lastName: string;
  userName: string;
  phone: string;
  city: string;
  country: string;
}

const initialValues = {
  firstName: "",
  lastName: "",
  userName: "",
  phone: "",
  city: "",
  country: "",
};

interface IProps {
  email: string;
  password: string;
  createNewUser: (variables: MutationCreateNewUserArgs) => Promise<void>;
  isLoading?: boolean;
}

type TriggerCallback = (payload?: string | string[]) => Promise<boolean>;

const UserNameCreate: React.FC<IProps> = ({ createNewUser, email, password, isLoading }) => {
  const { t } = useTranslation();

  const schema = Joi.object<IFormInputs>({
    firstName: StringWithoutEmojiSchema.max(40)
      .required()
      .messages({
        "any.required": t("username.error.first-name-is-required"),
        "string.empty": t("username.error.first-name-is-required"),
        "string.max": t("input.error.first-name-is-too-long"),
        "string.pattern.invert.base": t("input.error.first-name-is-invalid"),
      }),
    lastName: StringWithoutEmojiSchema.max(40)
      .required()
      .messages({
        "any.required": t("username.error.last-name-is-required"),
        "string.empty": t("username.error.last-name-is-required"),
        "string.max": t("input.error.last-name-is-too-long"),
        "string.pattern.invert.base": t("input.error.last-name-is-invalid"),
      }),
    userName: UsernameSchema.messages({
      "string.empty": t("merchant-create-page.message.user-name-is-required"),
      "string.min": t("merchant-create-page.message.username-less-than-6-characters"),
      "string.max": t("merchant-create-page.message.username-more-than-24-characters"),
      "string.pattern.base": t("merchant-create-page.message.this-is-not-a-valid-user-name"),
    }),
    city: Joi.when("country", {
      is: "sg",
      then: Joi.not().required(),
      otherwise: StringWithoutEmojiSchema.required().messages({
        "any.required": t("signup-page.input.error.city-is-required"),
        "string.empty": t("signup-page.input.error.city-is-required"),
        "string.pattern.invert.base": t("input.error.city-name-is-invalid"),
      }),
    }),
    country: Joi.string()
      .required()
      .messages({
        "any.required": t("signup-page.input.error.country-is-required"),
        "string.empty": t("signup-page.input.error.country-is-required"),
      }),
    phone: PhoneNumberSchema.required().messages({
      "phone.invalid": t("phone-number.error.invalid"),
      "string.empty": t("signup-page.input.error.message.phone-number-is-required"),
      "any.required": t("signup-page.input.error.message.phone-number-is-required"),
    }),
  });
  const { handleSubmit, formState, register, errors, control, trigger } = useForm<IFormInputs>({
    defaultValues: initialValues,
    mode: "onSubmit",
    resolver: joiResolver(schema, {
      abortEarly: false,
    }),
  });

  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const submitNewUser = async (data: IFormInputs) => {
    if (!usernameAvailable) {
      return;
    }

    await clearAccountPersistentFlags();

    const variables: MutationCreateNewUserArgs = {
      email,
      password,

      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      country: data.country,
      city: data.city,
      phone: data.phone,
    };

    createNewUser(variables);
  };

  const handleValidateUsername = (isValid: boolean) => {
    setUsernameAvailable(isValid);
  };

  return (
    <div className="flex flex-grow flex-col h-full flex-shrink-0">
      <form
        action=""
        className="flex flex-col flex-1 flex-shrink-0 justify-start"
        onSubmit={handleSubmit(submitNewUser)}
      >
        <Input
          ariaLabel="SIGNUPFORM_FIRSTNAME"
          label={t("username.first-name.input.placeholder")}
          placeholder={t("username.first-name.input.placeholder")}
          name="firstName"
          type="text"
          register={register}
        />
        {errors.firstName?.message && (
          <div className="my-2">
            <Message ariaLabel="SIGNUPFORM_FIRSTNAMEALERT_LABEL" variant="error">
              {errors.firstName.message}
            </Message>
          </div>
        )}

        <Input
          ariaLabel="SIGNUPFORM_LASTNAME"
          label={t("username.input.placeholder.last-name")}
          placeholder={t("username.input.placeholder.last-name")}
          name="lastName"
          type="text"
          register={register}
        />
        {errors.lastName?.message && (
          <div className="my-2">
            <Message ariaLabel="SIGNUPFORM_LASTNAMEALERT_LABEL" variant="error">
              {errors.lastName.message}
            </Message>
          </div>
        )}

        <UsernameInput
          trigger={trigger as TriggerCallback}
          register={register}
          errors={errors}
          ariaLabel="SIGNUPFORM_USERNAME"
          onValidate={handleValidateUsername}
        />

        <div>
          <CountrySelect
            ariaLabel="SIGNUPFORM_COUNTRY"
            label={t("profile-edit-page.input.country.label")}
            name="country"
            register={register}
          />
          {errors.country?.message && (
            <div className="t-2">
              <Message ariaLabel="SIGNUPFORM_COUNTRYALERT_LABEL" variant="error">
                {errors.country?.message}
              </Message>
            </div>
          )}
        </div>

        <Input
          placeholder={t("signup-page.input.placeholder.city")}
          label={t("merchant-create-page.label.city")}
          name="city"
          ariaLabel="SIGNUPFORM_CITY"
          type="text"
          minLength={2}
          maxLength={40}
          register={register}
        />
        {errors.city?.message && (
          <div className="my-2">
            <Message ariaLabel="SIGNUPFORM_CITYALERT_LABEL" variant="error">
              {errors.city.message}
            </Message>
          </div>
        )}

        <Controller
          control={control}
          defaultValue=""
          name="phone"
          render={({ onChange, onBlur, value }) => (
            <PhoneInput
              label={t("merchant-create-page.label.phone-number")}
              onBlur={onBlur}
              onChange={onChange}
              ariaLabel="SIGNUPFORM_PHONENUMBER"
              value={value}
              defaultCountry="US"
              onCountryChange={() => {}}
              name="phone"
              placeholder={t("signup-page.placeholder.phone-number")}
            />
          )}
        />
        {formState.isSubmitted && errors.phone?.message && (
          <div className="my-2">
            <Message ariaLabel="SIGNUPFORM_PHONENUMBERALERT_LABEL" variant="error">
              {errors.phone.message}
            </Message>
          </div>
        )}
        <div className="flex justify-center">
          <Button
            className="text-md"
            ariaLabel="SIGNUPFORM_CONTINUE_BUTTON"
            loading={isLoading}
            text={t("global.continue")}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default UserNameCreate;
