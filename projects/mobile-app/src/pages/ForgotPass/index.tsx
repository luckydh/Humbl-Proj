import { LanguagePicker } from "components/Language/LanguagePicker";
import { Heading } from "components/Text/Text";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import EVENTS from "utils/analytics/AnalyticEvents";
import { trackEvent } from "utils/analytics/Segment";
import { emailRegex } from "utils/validations";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { Message } from "../../components/Message/Message";
import firebase from "../../Firebase";

type FormInput = {
  email: string;
};

const initialValues: FormInput = {
  email: "",
};

const ForgotPass: React.FC = () => {
  const { t } = useTranslation();
  const [emailSent, setEmailSent] = useState(false);
  const { handleSubmit, register, errors } = useForm<FormInput>({
    defaultValues: initialValues,
  });

  const resetPass = async (data: FormInput) => {
    firebase
      .auth()
      .sendPasswordResetEmail(data.email)
      .finally(() => {
        // We do not catch the errors. We show the same message regardless of if email exists or not as best security practice
        trackEvent(EVENTS.FORGOT_PASSWORD_SUCCESS, { status: "success" });
        setEmailSent(true);
      });
  };

  return (
    <div className="flex flex-grow flex-col h-full flex-shrink-0">
      <div className="flex flex-col flex-1 flex-shrink-0 justify-center">
        {!emailSent && (
          <>
            <div className="flex flex-col items-center justify-center text-center">
              <Heading ariaLabel="FORGOTPASSWORD_TITLE_LABEL">{t("forgot-page.title.forgot-password")}</Heading>
            </div>
            <form onSubmit={handleSubmit(resetPass)} noValidate>
              <div className="my-4">
                <p aria-label="FORGOTPASSWORD_BODY_LABEL" className="leading-tight text-white">{t("forgot-page.description")}</p>
              </div>
              <div className="my-4">
                <Input
                  label={t("forgot-page.input.label.email")}
                  placeholder={t("forgot-page.input.email.label")}
                  ariaLabel="FORGOTPASSWORD_EMAIL"
                  hasError={!!errors.email}
                  name="email"
                  type="email"
                  register={register({
                    required: {
                      value: true,
                      message: t("forgot-page.input.email.error.email-is-required"),
                    },
                    pattern: {
                      value: emailRegex,
                      message: t("forgot-page.input.email.error.invalid-email"),
                    },
                  })}
                />
                {errors.email && (
                  <div className="my-2">
                    <Message variant="error">{errors.email.message}</Message>
                  </div>
                )}
              </div>
              <div className="my-6 flex justify-center">
                <Button ariaLabel="FORGOTPASSWORD_SEND_BUTTON" type="submit">{t("forgot-page.button.send-password-reset")}</Button>
              </div>
              <div className="mb-4 flex flex-col text-xl">
                <Link aria-label="FORGOTPASSWORD_LOGIN_BUTTON" className="mx-auto m-1 text-white" to="/login" replace>
                  {t("forgot-page.link.login")}
                </Link>
                <Link aria-label="FORGOTPASSWORD_CREATEACCOUNT_BUTTON" className="mx-auto m-1 text-white text-center" to="signup" replace>
                  {t("forgot-page.link.create-account")}
                </Link>
              </div>
            </form>
          </>
        )}
        {emailSent && (
          <div>
            <h2 className="font-bold leading-snug text-white mb-2 text-center" style={{ fontSize: "26px" }}>
              {t("forgot-page.success.title.email-sent")}
            </h2>
            <p className="text-center">{t("forgot-page.success.message")}</p>
          </div>
        )}
      </div>
      {emailSent && (
        <div className="mb-4 flex flex-col text-xl">
          <Link className="mx-auto m-1 text-white" to="/login" replace>
            {t("forgot-page.link.login")}
          </Link>
          <Link className="mx-auto m-1 text-white" to="signup" replace>
            {t("forgot-page.link.create-account")}
          </Link>
        </div>
      )}
      <div className="mb-4 flex flex-col text-xl">
        <LanguagePicker />
      </div>
    </div>
  );
};

export default ForgotPass;
