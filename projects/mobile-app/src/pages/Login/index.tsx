import { LanguagePicker } from "components/Language/LanguagePicker";
import { Message } from "components/Message/Message";
import { Heading } from "components/Text/Text";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import EVENTS from "utils/analytics/AnalyticEvents";
import { identifyUser, trackEvent } from "utils/analytics/Segment";
import { loginUser } from "../../Firebase";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import "./styles.scss";

type FormInputs = {
  email: string;
  password: string;
};

const initialValues: FormInputs = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const { handleSubmit, register, errors } = useForm<FormInputs>({
    defaultValues: initialValues,
    mode: "onChange",
  });

  const [hasError, setHasError] = useState<boolean>(false);

  const login = async ({ email, password }: FormInputs) => {
    identifyUser(email);
    loginUser(email, password)
      .then(() => {
        trackEvent(EVENTS.LOGIN_SUCCESS, { status: "success" });
        history.push("/verify");
      })
      .catch((error) => {
        trackEvent(EVENTS.LOGIN_FAILURE, { error });
        setHasError(error);
      });
  };

  return (
    <div className="flex flex-grow flex-col h-full flex-shrink-0">
      <div className="flex flex-col flex-1 flex-shrink-0 justify-center">
        <div className="flex flex-col items-center justify-center">
          <Heading ariaLabel="LOGIN_TITLE_LABEL">{t("login-page.title.login")}</Heading>
        </div>
        <form onSubmit={handleSubmit(login)}>
          {hasError && (
            <div className="my-2">
              <Message variant="error">{t("login-page.form.error.invalid-login")}</Message>
            </div>
          )}
          <div className="my-4">
            <Input
              ariaLabel="LOGIN_EMAIL"
              label={t("login-page.label.email")}
              hasError={!!errors.email}
              placeholder={t("login-page.input.placeholder.email-address")}
              name="email"
              type="email"
              register={register({
                required: {
                  value: true,
                  message: t("login-page.input.email.error.email-is-required"),
                },
              })}
            />
            {errors.email && (
              <div className="my-2">
                <Message variant="error">{errors.email.message}</Message>
              </div>
            )}
          </div>
          <div className="my-4">
            <Input
              label={t("login-page.label.password")}
              ariaLabel="LOGIN_PASSWORD"
              hasError={!!errors.password}
              isSecure
              placeholder={t("login-page.input.placeholder.password")}
              name="password"
              register={register({
                required: {
                  value: true,
                  message: t("login-page.input.password.error.password-is-required"),
                },
              })}
            />
            {errors.password && (
              <div className="my-2">
                <Message variant="error">{errors.password.message}</Message>
              </div>
            )}
          </div>

          <div className="my-6 flex justify-center">
            <Button
              ariaLabel="LOGIN_LOGIN_BUTTON"
              onClick={() => trackEvent(EVENTS.LOGIN_ATTEMPT, { previousPage: "/login" })}
              type="submit">
              {t("login-page.button.login")}
            </Button>
          </div>
          <div className="mb-4 flex flex-col text-xl">
            <Link
              onClick={() => trackEvent(EVENTS.FORGOT_PASSWORD_ATTEMPT, { previousPage: "/login" })}
              aria-label="LOGIN_FORGOTPASSWORD_BUTTON"
              className="mx-auto m-1 text-white"
              to="/forgotpass"
              replace>
              {t("login-page.link.forgot-password")}
            </Link>
            <Link
              onClick={() => trackEvent(EVENTS.SIGN_UP_ATTEMPT, { previousPage: "/login" })}
              to="/signup"
              aria-label="LOGIN_CREATEACCOUNT_BUTTON"
              className="mx-auto m-1 text-white"
              replace>
              {t("login-page.link.create-a-new-account")}
            </Link>
          </div>
        </form>
      </div>
      <div className="mb-4 flex flex-col text-lg">
        <LanguagePicker />
      </div>
    </div>
  );
};

export default Login;
