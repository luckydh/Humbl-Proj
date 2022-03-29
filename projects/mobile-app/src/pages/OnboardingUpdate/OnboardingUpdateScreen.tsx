import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useTranslation } from "react-i18next";
import { PersonRelationshipStatus, MissingStripeRequirementsType } from "generated/graphql";
import { Countries } from "utils/Countries";
import { getSchema } from "pages/MerchantOnboarding/utils/getSchema";
import { RenderFormFields } from "pages/MerchantOnboarding/utils/RenderFormFields";
import { makePersonSchema } from "pages/MerchantOnboarding/Person/Person.schema";
import { getMissingFields } from "./utils/missingFields";
import { useGetFieldList } from "pages/MerchantOnboarding/Payouts/PayoutDetails.schema";
import { useBusinessDetailsSchema } from "pages/MerchantOnboarding/Business/BusinessDetails/MerchantBusinessDetails.schema";
import { useIndividualDetailsSchema } from "pages/MerchantOnboarding/Individual/IndividualDetails/IndividualDetails.schema";
import { useIndividualBusinessDetailsSchema } from "pages/MerchantOnboarding/Individual/IndividualBusinessDetails/IndividualBusinessDetails.schema";

import Alert from "components/Alert/Alert";
import Button from "components/Button/Button";
import WarningIcon from "assets/svgs/WarningIcon";
import { KeyboardAwareView } from "components/common";

export interface Props {
  data?: MissingStripeRequirementsType;
  onSubmit: (formData: Record<string, string>) => void;
  isSubmitting: boolean;
  selectedCountry: Countries;
  requireBankingFields?: boolean;
}

const relationshipNames: Record<PersonRelationshipStatus, string> = {
  OWNER: "stripe.relationship.owner",
  DIRECTOR: "stripe.relationship.director",
  EXECUTIVE: "stripe.relationship.executive",
  INDIVIDUAL: "stripe.relationship.individual",
  REPRESENTATIVE: "stripe.relationship.representative",
};

export const OnboardingUpdateScreen: React.FC<Props> = ({
  data,
  onSubmit,
  isSubmitting,
  selectedCountry,
  requireBankingFields = false,
}) => {
  const { t } = useTranslation();
  const businessFields = useBusinessDetailsSchema();
  const individualFields = useIndividualDetailsSchema();
  const individualBusinessFields = useIndividualBusinessDetailsSchema();

  const bankingFieldList = useGetFieldList();
  const { fields: bankingFields, schema: bankingSchema } = getSchema(bankingFieldList, selectedCountry);

  const allFields =
    data?.business?.type === "company" ? businessFields : individualFields.concat(individualBusinessFields);

  const missingFields = getMissingFields(allFields, data?.business?.missingFields);

  const { fields: detailsFields, schema: detailsSchema } = getSchema(missingFields, selectedCountry);

  const personsWithMissingFields = data?.persons?.filter((person) => person.missingFields?.length! > 0);

  const personSchemas = personsWithMissingFields!.map((person) => {
    const isOwner = person.relationships?.includes(PersonRelationshipStatus.Owner);
    const allPersonFields = makePersonSchema(person.id, isOwner, t);
    const missingPersonFields = getMissingFields(allPersonFields, person?.missingFields);
    return getSchema(missingPersonFields, selectedCountry);
  });

  const schema = useMemo(() => {
    let fullSchema = personSchemas.reduce((prev, curr) => prev.concat(curr.schema), detailsSchema);

    if (requireBankingFields) {
      fullSchema = fullSchema.concat(bankingSchema);
    }

    return fullSchema;
  }, [personSchemas, bankingSchema, detailsSchema, requireBankingFields]);

  const { register, errors, control, handleSubmit } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(schema, {
      abortEarly: false,
    }),
  });

  const onSubmitForm = (formData: Record<string, string>) => {
    onSubmit(formData);
  };

  return (
    <KeyboardAwareView>
      <div className="mt-6">
        <Alert>
          <WarningIcon className="w-7 h-7 mb-4" />
          <p className="text-white leading-tight">{t("merchant-onboarding-update.alert.message")}</p>
        </Alert>
        <form onSubmit={handleSubmit(onSubmitForm)} className="text-white">
          {data?.business?.missingFields?.length! > 0 && (
            <>
              <h1 className="my-6 text-2xl text-center text-white">
                {data?.business?.type === "company"
                  ? t("onboarding.business.title.business-details")
                  : t("onboarding.individual.title.individual-details")}
              </h1>
              <RenderFormFields fields={detailsFields} register={register} errors={errors} control={control} />
            </>
          )}
          {personsWithMissingFields?.map((person, index) => (
            <div key={person.id} className="my-8">
              <h1 className="text-xl font-semibold text-center">{person.name}</h1>
              <h2 className="mb-4 text-lg font-normal text-center">
                {person?.relationships?.map((item) => t(relationshipNames[item])).join(", ")}
              </h2>
              <RenderFormFields
                fields={personSchemas?.[index].fields ?? []}
                register={register}
                errors={errors}
                control={control}
              />
            </div>
          ))}
          {requireBankingFields && (
            <div className="my-8">
              <h1 className="mb-6 text-2xl text-center text-white">{t("onboarding.payout.title")}</h1>
              <RenderFormFields fields={bankingFields} register={register} errors={errors} control={control} />
            </div>
          )}
          <div className="mb-8 mt-6">
            <Button type="submit" isDisabled={isSubmitting}>
              {t("global.continue")}
            </Button>
          </div>
        </form>
      </div>
    </KeyboardAwareView>
  );
};
