import { matchFieldName } from "./missingFields";
import {
  MissingStripeField,
  StripeUpdateFieldInput,
  MissingStripeRequirementsType,
  StripeUpdatePersonFieldsInput,
  UpdateStripeAccountMutationVariables,
  UpdateStripeBankingMutationVariables,
  StripeBusinessTypeInput,
} from "generated/graphql";
import { Countries } from "utils/Countries";
import { mapToRouting } from "pages/MerchantOnboarding/utils/mapToRouting";
import { extractDateFromField } from "pages/MerchantOnboarding/utils/extractDateFromField";

export type AccountAndBankingData = UpdateStripeAccountMutationVariables & {
  banking?: UpdateStripeBankingMutationVariables;
};

/**
 * Iterates over the form keys and executes the given callback
 * every time the form key and the missing field name match.
 * Also iterates over the missing field properties if needed.
 *
 * @param missingField The Stripe missing field
 * @param formKeys The form keys from "react-hook-form" structure
 * @param callback The callback to be executed
 *
 * @returns {void}
 */
function iterateFormValues(
  missingField: MissingStripeField,
  formKeys: string[],
  callback: (fieldName: string, formKey: string) => void
): void {
  // DOB field has properties, but must be treated as if it hasn't
  if (missingField.properties && missingField.fieldName !== "dob") {
    for (const prop of missingField.properties) {
      for (const key of formKeys) {
        if (matchFieldName(key, prop)) {
          callback(prop, key);
        }
      }
    }
  } else {
    for (const key of formKeys) {
      if (matchFieldName(key, missingField.fieldName)) {
        callback(missingField.fieldName!, key);
      }
    }
  }
}

export interface SubmitDataPayload {
  formData: Record<string, string>;
  stripeData?: MissingStripeRequirementsType;
  selectedCountry: Countries;
  requireBanking?: boolean;
}

const businessTypeMap: Record<string, StripeBusinessTypeInput> = {
  company: StripeBusinessTypeInput.Company,
  individual: StripeBusinessTypeInput.Individual,
};

/**
 * Creates an object to be sent to the back-end mutation, getting all
 * the form data and putting it on the right place inside the structure.
 *
 * @returns {UpdateStripeAccountMutationVariables}
 */
export function getSubmitData({
  formData,
  stripeData,
  selectedCountry,
  requireBanking = false,
}: SubmitDataPayload): AccountAndBankingData {
  const submitData: AccountAndBankingData = {
    persons: [],
    business: {
      fields: [],
      id: stripeData?.business?.id,
      type: businessTypeMap[stripeData?.business?.type!],
    },
  };

  if (stripeData?.business) {
    /**
     * Form keys for the business details. All the keys that
     * don't start with "person" are related to the business details.
     */
    const businessFormKeys = Object.keys(formData).filter((key) => !key.startsWith("person"));

    const businessFields: StripeUpdateFieldInput[] = [];

    // for each missing field of business details
    for (const missingField of stripeData.business.missingFields!) {
      // iterate over the matching form keys and set the field value
      iterateFormValues(missingField, businessFormKeys, (fieldName, key) => {
        // govId should go into the "business" level, not "fields"
        if (key.includes("govId")) {
          submitData.business!.govId = formData[key];
          return;
        }

        // DOB has a special treatment
        if (key.includes("dob")) {
          const values = extractDateFromField(formData[key], selectedCountry);
          businessFields.push({ fieldName: "day", value: values.day.toString() });
          businessFields.push({ fieldName: "month", value: values.month.toString() });
          businessFields.push({ fieldName: "year", value: values.year.toString() });
          return;
        }

        businessFields.push({ fieldName, value: formData[key] });
      });
    }

    submitData.business!.fields = businessFields;
  }

  const persons: StripeUpdatePersonFieldsInput[] = [];

  if (stripeData?.persons) {
    // for each person of Stripe persons
    for (const person of stripeData.persons!) {
      const personData: StripeUpdatePersonFieldsInput = {
        id: person.id,
        fields: [],
        relationships: person.relationships,
      };

      /**
       * Form keys for the person details. All the keys that
       * include the person ID are related to the person details.
       */
      const personFormKeys = Object.keys(formData).filter((key) => key.includes(person.id!));

      // for each missing field of the person
      for (const missingField of person.missingFields!) {
        // iterate over the matching form keys and set the field value
        iterateFormValues(missingField, personFormKeys, (fieldName, key) => {
          // govId should go into the "person" level, not "fields"
          if (key.includes("govId")) {
            personData.govId = formData[key];
            return;
          }

          // DOB has a special treatment
          if (key.includes("dob")) {
            const values = extractDateFromField(formData[key], selectedCountry);
            personData.fields?.push({ fieldName: "day", value: values.day.toString() });
            personData.fields?.push({ fieldName: "month", value: values.month.toString() });
            personData.fields?.push({ fieldName: "year", value: values.year.toString() });
            return;
          }

          personData.fields?.push({ fieldName, value: formData[key] });
        });
      }

      persons.push(personData);
    }
  }

  submitData.persons = persons;

  if (requireBanking) {
    submitData.banking = {
      accountNumber: formData?.accountNumber,
      routingNumber: mapToRouting(selectedCountry, formData?.routingNumber, formData?.routingNumber2),
    };
  }

  return submitData;
}
