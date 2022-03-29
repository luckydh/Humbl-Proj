import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

import { Rect } from "self-define-app";
import {
  useMyUserProfileQuery,
  useUpdateAccountImageMutation,
  useUpdateUserProfileMutation,
  useUpdateAccountMutation,
  useMeQuery,
} from "generated/graphql";

import "./styles.scss";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { Message } from "components/Message/Message";
import { ProfileAvatarSkeleton } from "components/Avatar/Avatar";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import { Controller, useForm } from "react-hook-form";
import { PhoneInput, PhoneNumberSchema } from "components/PhoneInput/PhoneInput";
import { CountrySelect } from "components/CountrySelect/CountrySelect";
import { presentToast } from "utils/toast";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { StringWithoutEmojiSchema } from "utils/validations";
import ImageEditSelector from "components/imageUploader/ImageSelector";
import { captureException } from "ErrorLogger";

export type ProfileSettings = {
  firstName: string;
  lastName: string;
  phone: string;
  city?: string;
  country: string;
};

const ProfileImageCreate: React.FC = () => {
  const { t } = useTranslation();

  const schema = Joi.object<ProfileSettings>({
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
    city: StringWithoutEmojiSchema.max(40)
      .required()
      .messages({
        "any.required": t("signup-page.input.error.city-is-required"),
        "string.empty": t("signup-page.input.error.city-is-required"),
        "string.max": t("input.error.city-name-is-too-long"),
        "string.pattern.invert.base": t("input.error.city-name-is-invalid"),
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
  const [updateAccountMutation] = useUpdateAccountMutation();
  const [updateAccountImageMutation] = useUpdateAccountImageMutation();
  const [updateUserProfileMutation] = useUpdateUserProfileMutation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const { loading: accountLoading, data: accountData } = useMeQuery({
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });
  const { loading: profileLoading, data: userProfileData } = useMyUserProfileQuery({
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });
  const { control, register, handleSubmit, reset, errors } = useForm<ProfileSettings>({
    resolver: joiResolver(schema, {
      abortEarly: false,
    }),
    mode: "onSubmit",
    shouldUnregister: false,
    defaultValues: {
      firstName: userProfileData?.myUserProfile?.firstName ?? "",
      lastName: userProfileData?.myUserProfile?.lastName ?? "",
      country: accountData?.me.country?.alpha2 ?? "",
      city: accountData?.me.city ?? "",
      phone: accountData?.me.phone ?? "",
    },
  });
  // loads remote changes into form
  useEffect(() => {
    reset(
      {
        firstName: userProfileData?.myUserProfile?.firstName ?? "",
        lastName: userProfileData?.myUserProfile?.lastName ?? "",
        city: accountData?.me.city ?? "",
        country: accountData?.me.country?.alpha2 ?? "",
        phone: accountData?.me.phone ?? "",
      },
      {}
    );
  }, [reset, userProfileData, accountData]);

  const handleFinish = async (imageString: string, _dimensions: Rect) => {
    try {
      setLoading(true);
      const imageData = await updateAccountImageMutation({
        variables: {
          image: imageString,
        },
      });

      if (imageData.data?.updateAccountImage?.image) {
        setImage(imageData.data?.updateAccountImage?.image);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const goToProfile = () => {
    history.push("/profile");
  };

  const onFormSubmit = async ({ firstName, lastName, country, phone, city }: ProfileSettings) => {
    setLoading(true);
    try {
      await updateUserProfileMutation({
        variables: {
          firstName,
          lastName,
        },
      });
      await updateAccountMutation({
        variables: {
          country,
          phone,
          city,
        },
      });
      reset(
        {
          firstName,
          lastName,
          country,
          city,
          phone,
        },
        {}
      );

      setLoading(false);
      presentToast(t("profile.edit.form.success"), 2000, "success");
    } catch (e) {
      setLoading(false);
      presentToast(t("profile.edit.form.error"), 2000, "danger");
      captureException(e);
    }
  };

  if (accountLoading || profileLoading) {
    return (
      <div className="flex-grow align-start">
        <div className="my-10">
          <ProfileAvatarSkeleton />
        </div>
      </div>
    );
  }

  return (
    <>
      <OverlayLoading isOpen={loading} />
      {error && (
        <div className="h-12">
          <Message variant="error">{t("profile.edit.error.there-was-an-error-uploading-your-image")}</Message>
        </div>
      )}
      <div className="flex-grow align-start">
        <div className="my-10">
          <ImageEditSelector onFinish={handleFinish} image={image || accountData?.me?.image} />
        </div>
        <div className="flex flex-col">
          <div className="">
            <Input
              label={t("username.first-name.input.placeholder")}
              name="firstName"
              hasError={!!errors.firstName}
              placeholder="First name"
              className={errors.firstName?.message ? "" : "mb-4"}
              register={register}
            />
            {errors.firstName?.message && (
              <div className="my-2">
                <Message variant="error">{errors.firstName?.message}</Message>
              </div>
            )}
          </div>
          <div className="">
            <Input
              label={t("username.input.placeholder.last-name")}
              name="lastName"
              hasError={!!errors.lastName}
              max={40}
              placeholder="Last name"
              className={errors.lastName?.message ? "" : "mb-4"}
              register={register}
            />
            {errors.lastName?.message && (
              <div className="my-2">
                <Message variant="error">{errors.lastName?.message}</Message>
              </div>
            )}
          </div>

          <div className="">
            <Input
              label={t("merchant-create-page.label.city")}
              name="city"
              placeholder="City"
              max={40}
              hasError={!!errors.city}
              className={errors.city?.message ? "" : "mb-4"}
              register={register}
            />
            {errors.city?.message && (
              <div className="my-2">
                <Message variant="error">{errors.city?.message}</Message>
              </div>
            )}
          </div>
          <div>
            <CountrySelect label={t("profile-edit-page.input.country.label")} name="country" register={register} />
            {errors.country?.message && (
              <div className="my-2">
                <Message variant="error">{errors.country?.message}</Message>
              </div>
            )}
          </div>
          <div className="mt-4">
            <Controller
              control={control}
              name="phone"
              render={({ onChange, onBlur, value, name }) => (
                <PhoneInput
                  label={t("merchant-create-page.label.phone-number")}
                  onBlur={onBlur}
                  onChange={onChange}
                  defaultCountry="US"
                  onCountryChange={() => {}}
                  value={value}
                  name={name}
                  placeholder={t("merchant-create-page.placeholder.phone-number")}
                />
              )}
            />
            {errors.phone?.message && (
              <div className="my-2">
                <Message variant="error">{errors.phone.message}</Message>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center mt-6">
            <Button className="mt-4" onClick={handleSubmit(onFormSubmit)}>
              {t("profile.edit.button.save-changes")}
            </Button>
            <Button variant="text" className="mt-4" onClick={goToProfile}>
              {t("profile.edit.button.cancel-changes")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileImageCreate;
