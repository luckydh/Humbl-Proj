import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { joiResolver } from "@hookform/resolvers/joi";

import Input from "components/Input/Input";
import { MaskedDateInput } from "components/MaskedInput/MaskedDateInput";
import { Countries } from "utils/Countries";
import { getExtendedJoiInstance } from "hooks/useExtendedJoi";
import { Message } from "components/Message/Message";
import PageHeading from "./PageHeading";
import { useKYCActions, useKYCForm } from "./KYCFlowContext";
import { ContinueButton } from "./ContinueButton";
import { Notice } from "./Notice";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";

export interface PersonalDetailsPayload {
  legalFirstName: string;
  legalLastName: string;
  dateOFBirth: string;
  individualSsn: string;
}

const Joi = getExtendedJoiInstance();

export const PersonalDetails: React.FC = () => {
  const { t } = useTranslation();
  const { currentAccount } = useGetCurrentAccount();
  const {
    formData: { personalDetails },
    setFormData,
  } = useKYCForm();
  const { next } = useKYCActions();

  const [firstName, lastName] = currentAccount?.displayName.split(" ") ?? [];

  const schema = Joi.object({
    legalFirstName: Joi.string()
      .required()
      .messages({
        "string.empty": t("kyc.personal-details.form-message.first-name-required"),
      }),
    legalLastName: Joi.string()
      .required()
      .messages({
        "string.empty": t("kyc.personal-details.form-message.last-name-required"),
      }),
    dateOFBirth: Joi.date()
      .format("MM/DD/YYYY")
      .raw()
      .required()
      .messages({
        "date.base": t("kyc.personal-details.form-message.dob-required"),
      }),
    individualSsn: Joi.string()
      .regex(/^\d{9}$/)
      .length(9)
      .required()
      .messages({
        "string.empty": t("kyc.personal-details.form-message.ssn-required"),
      }),
  });

  const { control, errors, register, handleSubmit, reset } = useForm<PersonalDetailsPayload>({
    defaultValues: {
      legalFirstName: personalDetails?.legalFirstName ?? firstName,
      legalLastName: personalDetails?.legalLastName ?? lastName,
      dateOFBirth: personalDetails?.dateOFBirth,
      individualSsn: personalDetails?.individualSsn,
    },
    resolver: joiResolver(schema, { abortEarly: false }),
  });

  const onSubmit = (payload: PersonalDetailsPayload) => {
    reset(payload);
    setFormData({ type: "PersonalDetails", payload });
    next();
  };

  const dobInputField = {
    label: t("kyc.personal-details.form.dob.label"),
    name: "dateOFBirth",
    country: [Countries.US],
    ariaLabel: "KYC_DATE",
  };

  return (
    <>
      <PageHeading
        ariaLabel="KYC_PERSONALDETAILS"
        title={t("kyc.personal-details.page.title")}
        description={t("kyc.personal-details.page.description")}
      />
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          name="legalFirstName"
          type="text"
          label={t("kyc.personal-details.form.first-name.label")}
          placeholder={t("kyc.personal-details.form.first-name.placeholder")}
          ariaLabel="KYC_FIRSTNAME"
        />
        {errors.legalFirstName?.message && (
          <div className="my-2">
            <Message variant="error" ariaLabel="KYC_FIRSTNAMEALERT_LABEL">
              {errors.legalFirstName?.message}
            </Message>
          </div>
        )}
        <Input
          register={register}
          name="legalLastName"
          type="text"
          label={t("kyc.personal-details.form.last-name.label")}
          placeholder={t("kyc.personal-details.form.last-name.placeholder")}
          ariaLabel="KYC_LASTNAME"
        />
        {errors.legalLastName?.message && (
          <div className="my-2">
            <Message variant="error" ariaLabel="KYC_LASTNAMEALERT_LABEL">
              {errors.legalLastName?.message}
            </Message>
          </div>
        )}
        <MaskedDateInput
          control={control}
          errors={errors}
          field={dobInputField}
          placeholder={t("kyc.personal-details.form.dob.placeholder")}
        />
        <Input
          type="text"
          register={register}
          name="individualSsn"
          pattern="[0-9]*"
          inputMode="numeric"
          isSecure
          label={t("kyc.personal-details.form.ssn.label")}
          placeholder={t("kyc.personal-details.form.ssn.placeholder")}
          ariaLabel="KYC_SOCIALSECURITY"
        />
        {errors.individualSsn?.message && (
          <div className="my-2">
            <Message variant="error" ariaLabel="KYC_SOCIALSECURITYALERT_LABEL">
              {errors.individualSsn?.message}
            </Message>
          </div>
        )}
        <ContinueButton type="submit" />
      </form>
      <Notice
        iconName="bold_lock"
        title={t("kyc.personal-details.notice.title")}
        description={t("kyc.personal-details.notice.description")}
        ariaLabel="KYC_SECUREDISCLAIMER_LABEL"
      />
    </>
  );
};
