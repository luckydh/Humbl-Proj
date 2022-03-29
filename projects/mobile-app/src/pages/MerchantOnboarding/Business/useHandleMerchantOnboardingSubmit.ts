import {
  StripePersonInput,
  useCreateCompanyStripeAccountMutation,
  useUpdateStripeBankingMutation,
} from "../../../generated/graphql";
import { extractDateFromField } from "../utils/extractDateFromField";
import { Countries } from "../../../utils/Countries";
import { AccountNotCreatedError } from "../Errors/AccountNotCreated";
import { mapToRouting } from "../utils/mapToRouting";
import { captureException } from "ErrorLogger";

const getDefaultCity = (selectedCountry: Countries) => {
  if (selectedCountry === Countries.SG) {
    return "Singapore";
  }

  return "";
};

const createPersons = (payload: Record<string, any>) => {
  const persons: StripePersonInput[] = [];
  // Allways add representative
  const isRepOwner =
    typeof payload.representative_0_representativeIsOwner === "undefined" ||
    payload.representative_0_representativeIsOwner;

  persons.push({
    firstName: payload.representative_0_firstName,
    lastName: payload.representative_0_lastName,
    // DOB might be an empty object of all fields are undefined. Backend accounts for this;
    dob: extractDateFromField(payload.representative_0_dob, payload.country.alpha2),
    govId: payload.representative_0_govId,
    phone: payload.phone,
    email: payload.email,
    address: {
      street: payload.addressLine1 || "",
      additional: payload.addressLine2 || "",
      city: getDefaultCity(payload.country.alpha2) || payload.addressCity || "",
      region: payload.addressState || "",
      postal: payload.addressPostalCode,
      country: payload.country.alpha2,
    },
    title: "",
    isRepresentative: true,
    isExecutive: true,
    isOwner: isRepOwner,
  });

  if (!isRepOwner) {
    // Owner information if different.
    const owner: StripePersonInput = {
      isOwner: true,
      isDirector: true,
      isExecutive: true,
      firstName: payload.owner_0_firstName,
      lastName: payload.owner_0_lastName,
      // DOB might be an empty object of all fields are undefined. Backend accounts for this;
      dob: extractDateFromField(payload.owner_0_dob, payload.country.alpha2),
      govId: payload.owner_0_govId,
      email: payload.owner_0_email,
      address: {
        street: payload.addressLine1 || "",
        additional: payload.addressLine2 || "",
        city: getDefaultCity(payload.country.alhpa2) || payload.addressCity || "",
        region: payload.addressState || "",
        postal: payload.addressPostalCode,
        country: payload.country.alpha2 || "",
      },
    };
    persons.push(owner);
  }

  return persons;
};

const parseFormData = (payload: Record<string, any>) => ({
  legalName: payload.businessName,
  taxId: payload.businessTaxId,
  email: payload.email,
  address: {
    street: payload.addressLine1 || "",
    additional: payload.addressLine2 || "",
    city: payload.addressCity || "",
    region: payload.addressState || "",
    postal: payload.addressPostalCode,
    country: payload.country.alpha2 || "",
  },
  phone: payload.phone,
  website: `https://www.humblpay.com/account/${payload.id}`,
  businessDescription: `${payload.displayName} | ${payload.merchantProfileDetails?.merchantType}`,
  persons: createPersons(payload),
});

export const useHandleMerchantOnboardingSubmit = () => {
  const [updateStripeBankingMutation, { loading: bankingSubmitting }] = useUpdateStripeBankingMutation({});
  const [createCompanyStripeAccountMutation, { loading: accountSubmitting }] = useCreateCompanyStripeAccountMutation(
    {}
  );

  const createCompanyStripeAccount = async (payload: Record<string, any>) => {
    try {
      const formData = parseFormData(payload);
      return await createCompanyStripeAccountMutation({
        variables: formData,
        context: {
          uri: process.env.REACT_APP_SECURE_HUMBL_DATA_URL,
        },
      });
    } catch (err) {
      captureException(err);
      throw new AccountNotCreatedError(JSON.stringify(err));
    }
  };

  const updateStripeBankingAccount = async (payload: Record<string, any>) => {
    try {
      const routingNumber = mapToRouting(payload.country.alpha2, payload.routingNumber, payload.routingNumber2);
      await updateStripeBankingMutation({
        variables: {
          routingNumber,
          accountNumber: payload.accountNumber,
        },
        context: {
          uri: process.env.REACT_APP_SECURE_HUMBL_DATA_URL,
        },
      });
    } catch (err) {
      captureException(err);
      throw new AccountNotCreatedError(JSON.stringify(err));
    }
  };

  const handleMerchantOnboardingSubmit = async (payload: Record<string, any>) => {
    const stripeAccountResponse = await createCompanyStripeAccount(payload);
    const bankingAccountUpdatedResponse = await updateStripeBankingAccount(payload);
    return { stripeAccountResponse, bankingAccountUpdatedResponse };
  };

  return {
    handleMerchantOnboardingSubmit,
    isSubmitting: accountSubmitting || bankingSubmitting,
  };
};
