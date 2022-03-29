import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { getSchema } from "../../utils/getSchema";
import { useGetFieldList } from "../../Payouts/PayoutDetails.schema";
import { useTranslation } from "react-i18next";
import Button from "../../../../components/Button/Button";
import { OnboardingFlowFormsProps } from "../../Individual/OnboardingFlowFormsProps";
import { RenderFormFields } from "../../utils/RenderFormFields";

const MerchantPayoutDetails = ({ onNextStep, selectedCountry, formState, onFormChanged }: OnboardingFlowFormsProps) => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const { t } = useTranslation();
  const { fields, schema } = getSchema(useGetFieldList(formState), selectedCountry);
  const { register, control, handleSubmit, errors, getValues } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(schema, {
      abortEarly: false,
    }),
  });

  return (
    <>
      <h1 className="text-white text-2xl text-center mb-6">{t("onboarding.payout.title")}</h1>
      <form
        onSubmit={handleSubmit((data) => {
          setIsButtonLoading(true);
          onNextStep(data);
        })}
        onChange={() => {
          onFormChanged?.(getValues());
        }}>
        <RenderFormFields fields={fields} register={register} control={control} errors={errors} />
        <div className="flex flex-col w-full">
          <p className="text-white text-sm my-3">{t("onboarding.payout.bottom-description")}</p>
          <Button isDisabled={isButtonLoading} type={"submit"}>
            {t("onboarding.button.verify-my-information")}
          </Button>
        </div>
      </form>
    </>
  );
};

export default MerchantPayoutDetails;
