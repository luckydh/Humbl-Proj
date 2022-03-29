import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { getSchema } from "../../utils/getSchema";
import { useGetFieldList } from "../../Payouts/PayoutDetails.schema";
import { RenderFormFields } from "../../utils/RenderFormFields";
import { useTranslation } from "react-i18next";
import Button from "components/Button/Button";
import { OnboardingFlowFormsProps } from "../OnboardingFlowFormsProps";

const BankingDetails = ({ onNextStep, selectedCountry, formState, onFormChanged }: OnboardingFlowFormsProps) => {
  const { t } = useTranslation();
  const { fields, schema } = getSchema(useGetFieldList(formState), selectedCountry);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const { register, handleSubmit, errors, control, getValues } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(schema, {
      abortEarly: false,
    }),
  });

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          setIsButtonLoading(true);
          onNextStep(data);
        })}
        className="text-white"
        onChange={() => {
          onFormChanged?.(getValues());
        }}>
        <h1 className="text-white text-2xl text-center mb-6">{t("onboarding.payout.title")}</h1>
        <RenderFormFields fields={fields} register={register} errors={errors} control={control} />
        <div className="flex flex-col w-full">
          <p className="text-white text-sm my-4">{t("onboarding.payout.bottom-description")}</p>
          <Button isDisabled={isButtonLoading} type={"submit"}>
            {t("onboarding.button.verify-my-information")}
          </Button>
        </div>
      </form>
    </>
  );
};

export default BankingDetails;
