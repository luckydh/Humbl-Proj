import { joiResolver } from "@hookform/resolvers/joi";
import cx from "classnames";
import { Checkbox } from "components/Checkbox/Checkbox";
import { LanguagePicker } from "components/Language/LanguagePicker";
import { Heading } from "components/Text/Text";
import Joi from "joi";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import EVENTS from "utils/analytics/AnalyticEvents";
import { trackEvent } from "utils/analytics/Segment";
import {
  emailRegex,
  lowerCaseRegEx,
  numberRegEx,
  specialRegEx,
  StringWithoutEmojiSchema,
  upperCaseRegEx,
} from "utils/validations";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { Message } from "../../components/Message/Message";
import "./styles.scss";

type FormInput = {
  email: string;
  password: string;
  terms: boolean;
};

const initialValues: FormInput = {
  email: "",
  password: "",
  terms: false,
};

export type EmailPwTypes = {
  email: string;
  password: string;
  terms: boolean;
};

interface IProps {
  moveForward: () => void;
  handleEmail: React.Dispatch<React.SetStateAction<string>>;
  handlePassword: React.Dispatch<React.SetStateAction<string>>;
}

const EmailPwCreate: React.FC<IProps> = ({ moveForward, handleEmail, handlePassword }) => {
  const { t } = useTranslation();
  const schema = Joi.object<EmailPwTypes>({
    email: StringWithoutEmojiSchema.max(40)
      .required()
      .pattern(emailRegex)
      .messages({
        "any.required": t("signup.page.error.email-is-required"),
        "string.empty": t("signup.page.error.email-is-required"),
        "string.max": t("email-is-too-long"),
        "string.pattern.base": t("signup-page.input.email.error.invalid-email"),
        "string.pattern.invert.base": t("signup-page.input.email.error.invalid-email"),
      }),
    password: StringWithoutEmojiSchema.max(40)
      .required()
      .min(8)
      .max(40)
      .pattern(lowerCaseRegEx)
      .pattern(upperCaseRegEx)
      .pattern(numberRegEx)
      .pattern(specialRegEx)
      .messages({
        "any.required": t("signup-page.input.password.error.password-is-required"),
        "string.empty": t("signup-page.input.password.error.password-is-required"),
        "string.min": t("signup-page.incorrect-password"),
        "string.max": t("signup-page.pw-too-long"),
        "string.pattern.base": t("signup-page.incorrect-password"),
        "string.pattern.invert.base": t("signup-page.pw-no-emoji"),
      }),

    terms: Joi.boolean()
      .valid(true)
      .required()
      .messages({ "any.only": t("legal.error.must-agree-to-terms") }),
  });

  const { handleSubmit, register, errors, control } = useForm<FormInput>({
    resolver: joiResolver(schema, {
      abortEarly: false,
    }),
    defaultValues: { ...initialValues },
    mode: "onSubmit",
  });

  const onSubmit = (data: EmailPwTypes) => {
    trackEvent(EVENTS.SIGN_UP_INITIATED, { email: data.email });
    handleEmail(data.email);
    handlePassword(data.password);
    moveForward();
  };

  return (
    <div className="flex flex-grow flex-col h-full flex-shrink-0">
      <div className="flex flex-col flex-1 flex-shrink-0 justify-center">
        <div className="flex flex-col items-center justify-center">
          <Heading ariaLabel="SIGNUP_TITLE_LABEL">{t("signup-page.title.signup")}</Heading>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <Input
              ariaLabel="SIGNUP_EMAIL"
              label={t("signup-page.input.label.email")}
              placeholder={t("signup-page.placeholder.email-address")}
              hasError={!!errors.email}
              name="email"
              type="email"
              register={register({
                required: {
                  value: true,
                  message: t("signup.page.error.email-is-required"),
                },
                pattern: {
                  value: emailRegex,
                  message: t("signup-page.input.email.error.invalid-email"),
                },
              })}
            />
            {errors.email?.message && (
              <div className="my-2">
                <Message ariaLabel="SIGNUP_EMAILALERT_LABEL" variant="error">{errors.email.message}</Message>
              </div>
            )}
          </div>
          <div className="my-4">
            <Input
              label={t("signup-page.input.password.label")}
              ariaLabel="SIGNUP_PASSWORD"
              className={cx("password-input", { "mb-4": errors.email?.message })}
              hasError={!!errors.password}
              placeholder={t("signup-page.input.password.placeholder")}
              name="password"
              register={register({
                required: {
                  value: true,
                  message: t("signup-page.input.password.error.password-is-required"),
                },
                minLength: {
                  value: 8,
                  message: t("signup-page.input.password.error.password-min-length-6"),
                },
              })}
              isSecure
            />
            {errors.password?.message && (
              <div className="my-2">
                <Message ariaLabel={errors.password.message.includes('required') ? "SIGNUP_PASSWORDALERT_LABEL" : "SIGNUP_PASSWORDINSTRUCTIONS_LABEL"} variant="error">{errors.password.message}</Message>
              </div>
            )}
          </div>

          <div className="my-6">
            <div className="flex items-center mx-4">
              <p aria-label="SIGNUP_LEGAL_LABEL" className="w-full text-white">
                {t("legal.text.i-agree-to-the")}{" "}
                <a className="underline" href="https://www.humblpay.com/legal-docs/mobile-pay-terms-and-conditions">
                  {t("legal.link.terms-of-service")}
                </a>{" "}
                <a className="underline" href="https://www.humblpay.com/legal-docs/mobile-pay-privacy-policy">
                  {t("legal.link.privacy-policy")}
                </a>
              </p>
              <div aria-label="SIGNUP_LEGAL_CHECKBOX" style={{ width: "25px" }} className="flex">
                <Checkbox name="terms" control={control} />
              </div>
            </div>
            {errors.terms?.message && (
              <div className="my-2">
                <Message ariaLabel="SIGNUP_LEGALALERT_LABEL" variant="error">{errors.terms.message}</Message>
              </div>
            )}
          </div>
          <div className="my-6 flex justify-center">
            <Button ariaLabel="SIGNUP_SIGNUP_BUTTON" type="submit">{t("signup-page.button.sign-up")}</Button>
          </div>
          <div className="mb-4 flex flex-col text-xl">
            <Link aria-label="SIGNUP_ALREADYHAVE_LABEL" className="mx-auto m-1 text-white text-xl" to="/login" replace>
              {t("signup-page.link.already-have-account")}
            </Link>
            <Link aria-label="SIGNUP_LOGIN_BUTTON" className="mx-auto m-1 text-white" to="/login" replace>
              {t("signup-page.link.login")}
            </Link>
          </div>
        </form>
      </div>
      <div className="mb-4 flex flex-col text-xl">
        <LanguagePicker />
      </div>
    </div>
  );
};

export default EmailPwCreate;
