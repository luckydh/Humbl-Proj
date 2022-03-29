import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { getSchema } from "pages/MerchantOnboarding/utils/getSchema";
import { RenderFormFields } from "pages/MerchantOnboarding/utils/RenderFormFields";
import Button from "components/Button/Button";
import { Countries } from "../../../utils/Countries";
import { usePersonalDetailsFormSchema } from "./PersonalDetailsForm.schema";
import { AddBankForm } from "../AddNewBankAccount.reducer";

export type BankDetails = {
  firstName: string;
  lastName: string;
  phone: string;
  city?: string;
  country: string;
};

export interface AddPersonalDetailsPageProps {
  onSubmitSuccess: (data: AddBankForm) => void;
  countryCode: Countries;
  formState: AddBankForm;
}

export const PersonalDetailsForm = ({ onSubmitSuccess, countryCode, formState }: AddPersonalDetailsPageProps) => {
  const { t } = useTranslation();
  const { fields, schema } = getSchema(usePersonalDetailsFormSchema(), Countries[countryCode]);
  const { register, handleSubmit, errors, control } = useForm({
    mode: "onChange",
    defaultValues: formState,
    resolver: joiResolver(schema, {
      abortEarly: false,
    }),
  });
  const handleSubmitSuccess = (data: AddBankForm) => {
    onSubmitSuccess(data);
  };
  return (
    <div className="flex flex-grow flex-col overflow-y-auto overscroll-none">
      <form className="flex-grow" onSubmit={handleSubmit(handleSubmitSuccess)}>
        <div className="flex-grow">
          <RenderFormFields fields={fields} register={register} errors={errors} control={control} />
        </div>
        <Button className="mb-6 px-6" type="submit" ariaLabel="ADDBANKDETAILSFORM_CONTINUE_BUTTON">
          {t("personal-details-page.button.continue")}
        </Button>
      </form>
    </div>
  );
};
