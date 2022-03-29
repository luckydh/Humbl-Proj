import React, { FC, useCallback, useRef, useState } from "react";
import Input, { LabelContainer } from "components/Input/Input";
import { Message } from "components/Message/Message";
import { useTranslation } from "react-i18next";
import { loader } from "graphql.macro";

import { IsUsernameAvailableQuery } from "generated/graphql";
import useImperativeQuery from "hooks/useImperativeQuery";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import Joi from "joi";

const USERNAME_AVAILABLE = loader("../../queries/USERNAMEAVAILABLE.gql");

export const USERNAME_MIN_LENGTH = 6;

export const UsernameSchema = Joi.string()
  .required()
  .min(6)
  .max(24)
  .pattern(/^[a-zA-Z\d]+([-][a-zA-Z\d]+)*$/);
interface UsernameInputProps {
  register: any;
  errors: any;
  trigger?: (payload?: string | string[]) => Promise<boolean>;
  onValidate?: (isValid: boolean) => void;
  ariaLabel?: string;
}

const UsernameInput: FC<UsernameInputProps> = ({ trigger, register, errors, onValidate, ariaLabel }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<boolean | undefined>(undefined);

  const isUsernameAvailable = useImperativeQuery<IsUsernameAvailableQuery>(USERNAME_AVAILABLE);

  // wrapped in a ref to avoid recreating the debounced function everytime
  // https://github.com/slorber/awesome-debounce-promise#why-is-my-debouncing-function-always-firing-and-is-not-debounced
  const checkUsername = useRef(
    AwesomeDebouncePromise(async (username?: string) => {
      setLoading(true);

      const result = await isUsernameAvailable({
        keyword: username,
      });

      setLoading(false);
      setIsAvailable(result?.data?.isUsernameAvailable);

      if (onValidate) {
        onValidate(!!result?.data?.isUsernameAvailable);
      }
    }, 500)
  ).current;

  const onChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      event.persist();
      if (trigger) {
        // triggers parent validation and waits for result
        const isValid = await trigger("userName");
        // only run if parent validation succeeds
        if (isValid) {
          checkUsername(event.target.value);
        } else {
          // this prevents the success message from previous
          // validations attempts from showing up when it shouldn't
          setIsAvailable(undefined);
        }
      }
    },
    [trigger, checkUsername]
  );

  const renderMessage = () => {
    if (loading) {
      return (
        <div className="text-white flex items-center text-sm rounded-md p-2 leading-5">
          {t("merchant-create-page.message.username-check")}
        </div>
      );
    }

    if (!errors.userName?.message) {
      if (isAvailable) {
        return (
          <div className="my-2 ">
            <Message variant="success">{t("user-name.success.this-username-is-available")}</Message>
          </div>
        );
      }

      if (typeof isAvailable !== "undefined" && !isAvailable) {
        return (
          <Message ariaLabel={ariaLabel && `${ariaLabel}ALERT_LABEL`} variant="error">
            {t("user-name.failure.this-username-is-not-available")}
          </Message>
        );
      }
    }

    return null;
  };

  return (
    <div className="mb-2">
      <LabelContainer ariaLabel={ariaLabel && `${ariaLabel}_LABEL`} label={t("merchant-create-page.label.user-name")} />
      <Input
        placeholder={t("merchant-create-page.placeholder.user-name")}
        name="userName"
        ariaLabel={ariaLabel}
        type="text"
        minLength={USERNAME_MIN_LENGTH}
        maxLength={24}
        onChange={onChange}
        register={register}
        errorMessage={errors.userName?.message}
      />
      {renderMessage()}
      <div
        aria-label={ariaLabel && `${ariaLabel}INSTRUCTIONS_LABEL`}
        className="pt-2 pb-4 u-1 text-white text-sm font-medium">
        {t("merchant-create-page.info.usernames-can-only-be-letters-numbers-hyphens")}
      </div>
    </div>
  );
};

export default UsernameInput;
