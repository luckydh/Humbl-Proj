import { AccountType } from "generated/graphql";
import { useState, useEffect } from "react";

const checkForDocumentVerificationRequired = (requirements: Array<string> | undefined) => {
  const result =
    requirements?.find((requirement: string) => requirement.includes(".verification.document")) || [];

  return result?.length > 0;
};

export const useStripeOnboardingStatus = (account: AccountType | undefined) => {
  const [state, setState] = useState({
    pending: false,
    restricted: false,
    restrictedSoon: false,
    showRatings: false,
    showNoRatings: false,
    showMerchantOnboardingChecklist: false,
    documentVerificationRequiredSoon: false,
    documentVerificationRequired: false,
    hasOnlyExternalAccountRequirement: false,
  });

  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    if (account) {
      const pastDueRequirements = account?.merchantProfileDetails?.businessDetails?.pastDueRequirements;
      const currentlyDueRequirements = account?.merchantProfileDetails?.businessDetails?.currentlyDueRequirements;

      const hasOnboarded = !!account?.merchantProfileDetails?.businessDetails?.hasOnboarded;
      const hasBanking = !!account?.merchantProfileDetails?.businessDetails?.hasBanking;
      const acceptsPayments = !!account?.merchantProfileDetails?.businessDetails?.chargesEnabled;
      const payoutsEnabled = !!account?.merchantProfileDetails?.businessDetails?.payoutsEnabled;
      const hasRatings =
        account?.averageRating !== undefined &&
        account?.reviews?.pageInfo?.totalCount !== undefined &&
        account?.reviews?.pageInfo?.totalCount > 0;
      const hasNoRatings =
        account?.averageRating === undefined ||
        account?.reviews?.pageInfo?.totalCount === undefined ||
        account?.reviews?.pageInfo?.totalCount === 0;

      const hasCurrentlyDueRequirements = (() => {
        const result =
          currentlyDueRequirements?.filter((requirement) => {
            if (requirement.includes(".verification.document")) return false;

            return true;
          }) || [];

        return result.length > 0;
      })();

      const hasPastDueRequirements = (() => {
        const result =
          pastDueRequirements?.filter((requirement) => {
            if (requirement.includes(".verification.document")) return false;

            return true;
          }) || [];

        return result.length > 0;
      })();

      const hasRequirements = hasCurrentlyDueRequirements || hasPastDueRequirements;

      const documentVerificationRequiredSoon = checkForDocumentVerificationRequired(currentlyDueRequirements);

      const documentVerificationRequired = checkForDocumentVerificationRequired(pastDueRequirements);

      // true if the only requirement is "external_account" for currently and past due
      const hasOnlyExternalAccountRequirement =
        pastDueRequirements?.every((item) => item.includes("external_account")) &&
        currentlyDueRequirements?.every((item) => item.includes("external_account"));

      const pending =
        hasBanking &&
        (!acceptsPayments || !payoutsEnabled) &&
        !hasRequirements &&
        !documentVerificationRequiredSoon &&
        !documentVerificationRequired;

      setState({
        pending,
        restricted: (hasOnboarded && hasPastDueRequirements) || (!hasBanking && acceptsPayments),
        restrictedSoon: hasOnboarded && hasCurrentlyDueRequirements && !hasPastDueRequirements,
        showMerchantOnboardingChecklist: pending || !hasOnboarded,
        showRatings: !pending && hasRatings,
        showNoRatings:
          !pending &&
          hasNoRatings &&
          hasOnboarded &&
          hasBanking &&
          !hasCurrentlyDueRequirements &&
          !documentVerificationRequiredSoon &&
          !documentVerificationRequired,
        documentVerificationRequiredSoon,
        documentVerificationRequired,
        hasOnlyExternalAccountRequirement: !!hasOnlyExternalAccountRequirement,
      });
      setProcessing(false);
    }
  }, [account]);

  const {
    pending,
    restricted,
    restrictedSoon,
    showRatings,
    showNoRatings,
    showMerchantOnboardingChecklist,
    documentVerificationRequiredSoon,
    documentVerificationRequired,
    hasOnlyExternalAccountRequirement,
  } = state;

  return {
    processing,
    pending,
    restricted,
    restrictedSoon,
    showRatings,
    showNoRatings,
    showMerchantOnboardingChecklist,
    documentVerificationRequired,
    documentVerificationRequiredSoon,
    hasOnlyExternalAccountRequirement,
  };
};
