import { MissingStripeField } from "generated/graphql";
import { FieldDefinitions } from "pages/MerchantOnboarding/utils/getSchema";

const fieldNamesDictionary: Record<string, string> = {
  legalName: "businessName",
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  street: "addressLine1",
  streetAdditional: "addressLine2",
  city: "addressCity",
  region: "addressState",
  postal: "addressPostalCode",
};

/**
 * Indicates whether a Stripe field name matches a front-end
 * field name based on a well-known dictionary or not.
 *
 * @param fieldName The field name in front-end
 * @param missingFieldName The missing field name from Stripe
 *
 * @returns {boolean}
 */
function matchFieldNameInDictionary(fieldName = "", missingFieldName = ""): boolean {
  const entry = fieldNamesDictionary[missingFieldName];

  if (!entry) {
    return false;
  }

  if (entry === fieldName) {
    return true;
  }

  if (fieldName.toLowerCase().includes(entry.toLowerCase())) {
    return true;
  }

  return false;
}

/**
 * Indicates whether a Stripe field name matches a front-end
 * field name partially or not. In other words, it checks if the
 * front-end field name contains a substring with the Stripe field name.
 *
 * @param fieldName The field name in front-end
 * @param missingFieldName The missing field name from Stripe
 *
 * @returns {boolean}
 */
function matchPartialFieldName(fieldName = "", missingFieldName = ""): boolean {
  return fieldName.toLowerCase().includes(missingFieldName.toLowerCase());
}

/**
 * Indicates whether a Stripe field name matches a front-end
 * field name based on multiple checks (partial and dictionary).
 *
 * @param fieldName The field name in front-end
 * @param missingFieldName The missing field name from Stripe
 *
 * @returns {boolean}
 */
export function matchFieldName(fieldName = "", missingFieldName = ""): boolean {
  return (
    matchFieldNameInDictionary(fieldName, missingFieldName) ||
    matchPartialFieldName(fieldName, missingFieldName)
  );
}

/**
 * Iterates over the missing fields list and and checks
 * if each missing field name matches the single field name.
 * Also iterates over the missing field properties if needed.
 *
 * Returns early if it finds a match, as it's
 * intended to be used with Array.filter() function.
 *
 * @param field The front-end single field structure
 * @param missingFields The list of missing fields from Stripe
 *
 * @returns {boolean}
 */
function filterMissingFields(
  field: FieldDefinitions,
  missingFields: MissingStripeField[]
): boolean {
  for (const missingField of missingFields) {
    // DOB field has properties, but must be treated as if it hasn't
    if (missingField.properties && missingField.fieldName !== "dob") {
      for (const prop of missingField.properties) {
        if (matchFieldName(field.name, prop)) {
          return true;
        }
      }
    } else if (matchFieldName(field.name, missingField?.fieldName)) {
      return true;
    }
  }

  return false;
}

/**
 * Returns a new list of fields in front-end structure,
 * removing all the fields that are not missing.
 *
 * @param allFields The list of fields from the front-end
 * @param missingFields The list of missing fields from Stripe
 *
 * @returns {FieldDefinitions[]}
 */
export function getMissingFields(
  allFields: FieldDefinitions[] = [],
  missingFields: MissingStripeField[] = []
): FieldDefinitions[] {
  return allFields.filter((field) => filterMissingFields(field, missingFields));
}
