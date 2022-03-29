import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { Message } from "../../components/Message/Message";
import { IsUsernameAvailableQuery, useCreateNewUserMutation } from "../../generated/graphql";
import { useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { loader } from "graphql.macro";

import "./styles.scss";
import { useTranslation } from "react-i18next";
import { buildPath } from "utils/routes";
import { captureException } from "ErrorLogger";

const USERNAME_AVAILABLE = loader("../../queries/USERNAMEAVAILABLE.gql");
interface IFormInputs {
  FirstName: string;
  LastName: string;
  UserName: string;
}

const initialValues = {
  FirstName: "",
  LastName: "",
  UserName: "",
};

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { handleSubmit, register, formState, errors } = useForm<IFormInputs>({
    defaultValues: initialValues,
    mode: "onChange",
  });
  const { isValid } = formState;
  const history = useHistory();
  const [userName, setUsername] = useState<string>("");

  // I still need to use the loaded query as I need return values from forms in order for this query work.
  const [isUsernameAvailable, { loading, data: returnData }] =
    useLazyQuery<IsUsernameAvailableQuery>(USERNAME_AVAILABLE);
  // mutations work as this returns a function that I can pass values into later.
  const [createNewUserMutation, { error }] = useCreateNewUserMutation();

  const checkUsername = (data: any) => {
    isUsernameAvailable({
      variables: {
        keyword: data.UserName,
      },
    });

    setUsername(data.UserName);
  };

  const submitNewUser = async (data: any) => {
    //actually fire off the mutation
    const variables = {
      firstName: data.FirstName,
      lastName: data.LastName,
      userName: data.UserName,
    };

    await createNewUserMutation({
      variables,
    });

    if (!error) {
      setUsername("");
      setTimeout(() => {
        history.push(buildPath("profileImageCreate"));
      }, 2000);
    } else {
      captureException(error);
    }
  };

  const renderMessage = () => {
    if (loading) {
      return <div className="mt-5">{t("page-username-create.text.checking-if-username-available")}</div>;
    }
    if (returnData?.isUsernameAvailable === true && userName !== "") {
      return (
        <div className="mt-5">
          <Message variant="success">{t("page-username-create.message.this-username-is-available")}</Message>
        </div>
      );
    }
    if (returnData?.isUsernameAvailable === false && userName !== "") {
      return (
        <div className="mt-5">
          <Message variant="error">{t("page-username-craete.message.this-username-is-not-available")}</Message>
        </div>
      );
    }
    return null;
  };

  const renderSubmitButtonText = returnData?.isUsernameAvailable
    ? t("page-username-create.text.continue")
    : t("page-username-create.text.check-username");

  return (
    <>
      <div className="p-5 flex-col flex h-full">
        <form
          className="flex flex-col justify-center items-center w-full h-full content-between"
          onSubmit={returnData?.isUsernameAvailable ? handleSubmit(submitNewUser) : handleSubmit(checkUsername)}>
          <Input
            placeholder={t("page-username-create.placeholder.first-name")}
            name="FirstName"
            type="text"
            minLength={2}
            maxLength={40}
            register={register({
              required: {
                value: true,
                message: t("page-username-create.message.first-name-is-required"),
              },
            })}
          />
          {errors.FirstName?.message && (
            <div className="my-2">
              <Message variant="error">{errors.FirstName.message}</Message>
            </div>
          )}
          &nbsp;
          <Input
            placeholder={t("page-username-create.placeholder.last-name")}
            name="LastName"
            type="text"
            minLength={2}
            maxLength={40}
            register={register({
              required: {
                value: true,
                message: t("page-username-create.message.last-name-is-required"),
              },
            })}
          />
          {errors.LastName?.message && (
            <div className="my-2">
              <Message variant="error">{errors.LastName.message}</Message>
            </div>
          )}
          &nbsp;
          <Input
            placeholder={t("page-username-create.placeholder.user-name")}
            name="UserName"
            type="text"
            minLength={6}
            maxLength={24}
            register={register({
              required: {
                value: true,
                message: t("page-username-create.message.user-name-is-required"),
              },
              pattern: {
                value: /^[a-zA-Z\d]+([-][a-zA-Z\d]+)*$/,
                message: t("page-username-create.message.this-is-not-a-valid-user-name"),
              },
            })}
          />
          {errors.UserName?.message && (
            <div className="my-2">
              <Message variant="error">{errors.UserName.message}</Message>
            </div>
          )}
          <div className="p-2">{t("page-username-create.text.usernames-can-only-be")}</div>
          &nbsp;
          <Button type="submit" isDisabled={!isValid}>
            {renderSubmitButtonText}
          </Button>
          {renderMessage()}
        </form>
      </div>
    </>
  );
};

export default Profile;
