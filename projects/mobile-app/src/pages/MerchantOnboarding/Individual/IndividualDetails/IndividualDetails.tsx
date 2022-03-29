import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useIndividualDetailsSchema } from "./IndividualDetails.schema";
import { RenderFormFields } from "../../utils/RenderFormFields";
import { getSchema } from "../../utils/getSchema";
import Button from "../../../../components/Button/Button";
import { useTranslation } from "react-i18next";
import { OnboardingFlowFormsProps } from "../OnboardingFlowFormsProps";

const IndividualDetails = ({ onNextStep, selectedCountry, formState, onFormChanged }: OnboardingFlowFormsProps) => {
  const { t } = useTranslation();
  const fieldList = useIndividualDetailsSchema(formState);
  const { fields, schema } = getSchema(fieldList, selectedCountry);
  const { register, handleSubmit, errors, control, getValues } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(schema, {
      abortEarly: false,
    }),
  });

  return (
    <>
      <h1 className="text-white text-2xl text-center mb-6">
        {t("onboarding-indvidual.title.individual-details-name-page")}
      </h1>
      <form
        onSubmit={handleSubmit((data) => onNextStep(data))}
        className="text-white"
        onChange={() => {
          onFormChanged?.(getValues());
        }}>
        <RenderFormFields fields={fields} register={register} errors={errors} control={control} />
        <div>
          <p className="my-3">{t("onboarding.individual.details.text.2")}</p>
        </div>
        <div>
          <Button type={"submit"}>{t("onboarding.button.next")}</Button>
        </div>
      </form>
    </>
  );
};

export default IndividualDetails;
