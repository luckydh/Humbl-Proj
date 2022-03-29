import { useCreateIndividualStripeAccountMutation, useUpdateStripeBankingMutation } from "../../../generated/graphql";
import { extractDateFromField } from "../utils/extractDateFromField";
import { mapToRouting } from "../utils/mapToRouting";
import { Countries } from "../../../utils/Countries";
import { AccountNotCreatedError } from "../Errors/AccountNotCreated";
import { BankInformationNotCreatedError } from "../Errors/BankInformationNotCreated";
import { captureException } from "ErrorLogger";

const getDefaultCity = (selectedCountry: Countries) => {
  if (selectedCountry === Countries.SG) {
    return "Singapore";
  }

  return "";
};

interface CreateInvididualStripAccountPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  govId: string;
  displayName: string;
  merchantType: string;
  individualAddressLine1: string;
  individualAddressLine2?: string;
  selectedCountry: Countries;
  individualAddressState: string;
  individualAddressPostalCode: string;
  individualAddressCity: string;
  merchantProfileDetails: { merchantType: string };
  id: string;
  dob: string;
}

export const useHandleIndividualOnboardingSubmit = () => {
  const [createIndividualStripeAccountMutation, { loading: accountSubmitting }] =
    useCreateIndividualStripeAccountMutation({});
  const [updateStripeBankingMutation, { loading: bankingSubmitting }] = useUpdateStripeBankingMutation({});

  const createIndividualStripeAccount = async (payload: CreateInvididualStripAccountPayload) => {
    try {
      const parsedPayload = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        dob: extractDateFromField(payload.dob, payload.selectedCountry),
        email: payload.email,
        govId: payload.govId,
        businessDescription: `${payload.displayName} | ${payload.merchantProfileDetails?.merchantType}`,
        address: {
          street: payload.individualAddressLine1,
          additional: payload.individualAddressLine2,
          city: getDefaultCity(payload.selectedCountry) || payload.individualAddressCity,
          region: payload.individualAddressState,
          postal: payload.individualAddressPostalCode,
          country: payload.selectedCountry,
        },
        website: `https://www.humblpay.com/account/${payload.id}`,
      };

      const createIndividualResponse = await createIndividualStripeAccountMutation({
        variables: parsedPayload,
        context: {
          uri: process.env.REACT_APP_SECURE_HUMBL_DATA_URL,
        },
      });

      if (!createIndividualResponse?.data || createIndividualResponse.errors) {
        return new AccountNotCreatedError(JSON.stringify(createIndividualResponse.errors));
      }

      return createIndividualResponse;
    } catch (err) {
      captureException(err);
      throw new AccountNotCreatedError(JSON.stringify(err));
    }
  };

  const updateIndividualStripeInfo = async (payload: {
    selectedCountry: Countries;
    routingNumber: string;
    routingNumber2: string;
    accountNumber: string;
  }) => {
    try {
      const routingNumber = mapToRouting(payload.selectedCountry, payload?.routingNumber, payload?.routingNumber2);
      return await updateStripeBankingMutation({
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
      throw new BankInformationNotCreatedError(JSON.stringify(err));
    }
  };
  const handleIndividualOnboardingSubmit = async (payload: any) => {
    const individualAccountResponse = await createIndividualStripeAccount(payload);
    const updateIndividualStripeInfoResponse = await updateIndividualStripeInfo(payload);
    return { individualAccountResponse, updateIndividualStripeInfoResponse };
  };

  return {
    handleIndividualOnboardingSubmit,
    isSubmitting: accountSubmitting || bankingSubmitting,
  };
};
