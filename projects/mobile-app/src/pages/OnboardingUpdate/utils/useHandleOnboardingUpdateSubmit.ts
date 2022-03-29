import { getSubmitData, SubmitDataPayload } from "./getSubmitData";
import { AccountNotCreatedError } from "pages/MerchantOnboarding/Errors/AccountNotCreated";
import { BankInformationNotCreatedError } from "pages/MerchantOnboarding/Errors/BankInformationNotCreated";
import { useUpdateStripeAccountMutation, useUpdateStripeBankingMutation } from "generated/graphql";

export function useHandleOnboardingUpdateSubmit(requireBanking = false) {
  const [updateStripeAccount, { loading: accountSubmitting }] = useUpdateStripeAccountMutation();

  const [updateStripeBanking, { loading: bankingSubmitting }] = useUpdateStripeBankingMutation();

  const handleOnboardingUpdateSubmit = async (payload: SubmitDataPayload) => {
    const { persons, business, banking } = getSubmitData({ ...payload, requireBanking });

    try {
      await updateStripeAccount({
        variables: { persons, business },
      });
    } catch (err) {
      throw new AccountNotCreatedError(JSON.stringify(err));
    }

    if (requireBanking) {
      try {
        await updateStripeBanking({
          variables: banking,
        });
      } catch (err) {
        throw new BankInformationNotCreatedError(JSON.stringify(err));
      }
    }
  };

  return {
    handleOnboardingUpdateSubmit,
    isSubmitting: accountSubmitting || bankingSubmitting,
  };
}
