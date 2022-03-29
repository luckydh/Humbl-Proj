import {
  PayoutItemProps,
  PayoutScreen,
} from "pages/MerchantOnboarding/Payouts/PayoutScreen";
import { useGetPayoutSummaryQuery } from "generated/graphql";
import React from "react";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import { useStripeOnboardingStatus } from "utils/hooks/useStripeOnboardingStatus";

const Payouts: React.FC = () => {
  const { data, loading } = useGetPayoutSummaryQuery();
  const { currentAccount } = useGetCurrentAccount();
  const { restricted, restrictedSoon } = useStripeOnboardingStatus(currentAccount);

  const payoutHistory: PayoutItemProps[] =
    data?.getPayoutSummary?.payoutHistory?.map((payoutItem) => ({
        date: new Date(payoutItem.date),
        amount: payoutItem.amount?.display!,
      })) || [];

  return (
    <PayoutScreen
      payouts={payoutHistory}
      stripeRestricted={restricted}
      stripeRestrictedSoon={restrictedSoon}
      pendingBalance={data?.getPayoutSummary?.pending?.display || ""}
      currentBalance={data?.getPayoutSummary?.available?.display || ""}
      loading={loading}
    />
  );
};

export default Payouts;
