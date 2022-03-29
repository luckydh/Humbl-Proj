import React from "react";
import { useForm } from "react-hook-form";
import { getSchema } from "../../utils/getSchema";
import { useBusinessOwnerSchema } from "./BusinessOwner.schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { RenderFormFields } from "../../utils/RenderFormFields";
import Button from "components/Button/Button";
import { useTranslation } from "react-i18next";
import { OnboardingFlowFormsProps } from "../../Individual/OnboardingFlowFormsProps";

export const BusinessOwnerInformation: React.FC<OnboardingFlowFormsProps> = ({
  onNextStep,
  selectedCountry,
  formState,
  onFormChanged,
}) => {
  const { t } = useTranslation();
  const fieldList = useBusinessOwnerSchema(formState);
  const { fields, schema } = getSchema(fieldList, selectedCountry);
  const { register, handleSubmit, errors, control, getValues } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(schema, {
      abortEarly: false,
    }),
  });
  return (
    <form
      onSubmit={handleSubmit((data) => onNextStep(data))}
      className="text-white"
      onChange={() => {
        onFormChanged?.(getValues());
      }}>
      <h1 className="text-white text-2xl text-center mb-6">{t("onboarding.owner.title")}</h1>
      <RenderFormFields fields={fields} register={register} errors={errors} control={control} />
      <div>
        <p className="my-6">{t("onboarding.owner.bottom-description")}</p>
      </div>
      <div>
        <Button type={"submit"}>{t("onboarding.button.next")}</Button>
      </div>
    </form>
  );
};
