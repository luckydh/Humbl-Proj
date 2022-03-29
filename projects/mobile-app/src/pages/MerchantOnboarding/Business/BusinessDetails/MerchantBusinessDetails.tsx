import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button";
import { joiResolver } from "@hookform/resolvers/joi";
import { useTranslation } from "react-i18next";
import { RenderFormFields } from "../../utils/RenderFormFields";
import { useBusinessDetailsSchema } from "./MerchantBusinessDetails.schema";
import { getSchema } from "../../utils/getSchema";
import { OnboardingFlowFormsProps } from "../../Individual/OnboardingFlowFormsProps";

export const MerchantBusinessDetails = ({
  onNextStep,
  selectedCountry,
  formState,
  onFormChanged,
}: OnboardingFlowFormsProps) => {
  const { t } = useTranslation();
  const fieldList = useBusinessDetailsSchema(formState);
  const { fields, schema } = getSchema(fieldList, selectedCountry);
  const { register, handleSubmit, errors, control, getValues } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(schema, {
      abortEarly: false,
    }),
  });

  return (
    <div>
      <h1 className="text-white text-2xl text-center mb-6">{t("onboarding.business.title.business-details")}</h1>
      <form
        onSubmit={handleSubmit((data) => onNextStep(data))}
        className="text-white"
        onChange={() => {
          onFormChanged?.(getValues());
        }}>
        <p className="my-4 mb-7 text-center">{t("onboarding.business.description.pre-form")}</p>
        <RenderFormFields fields={fields} register={register} errors={errors} control={control} />
        <div>
          <p className="my-3">{t("onboarding.business.description.post-form-how-we-use")}</p>
        </div>
        <div>
          <Button type={"submit"}>{t("onboarding.button.next")}</Button>
        </div>
      </form>
    </div>
  );
};
