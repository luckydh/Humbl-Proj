import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useTranslation } from "react-i18next";
import Button from "../../../../components/Button/Button";
import { useIndividualBusinessDetailsSchema } from "./IndividualBusinessDetails.schema";
import { getSchema } from "../../utils/getSchema";
import { RenderFormFields } from "../../utils/RenderFormFields";
import { OnboardingFlowFormsProps } from "../OnboardingFlowFormsProps";

export const IndividualBusinessDetails = ({
  onNextStep,
  selectedCountry,
  formState,
  onFormChanged,
}: OnboardingFlowFormsProps) => {
  const { t } = useTranslation();
  const fieldList = useIndividualBusinessDetailsSchema(formState);
  const { fields, schema } = getSchema(fieldList, selectedCountry);
  const { register, handleSubmit, errors, control, getValues } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(schema, {
      abortEarly: false,
    }),
  });

  return (
    <>
      <h1 className="text-white text-2xl text-center mb-6">{t("onboarding.individual.title.individual-details")}</h1>
      <form
        onSubmit={handleSubmit((data) => onNextStep(data))}
        onChange={() => {
          onFormChanged?.(getValues());
        }}>
        <RenderFormFields fields={fields} register={register} errors={errors} control={control} />
        <div className="mt-3">
          <Button type="submit">{t("onboarding.button.next")}</Button>
        </div>
      </form>
    </>
  );
};
