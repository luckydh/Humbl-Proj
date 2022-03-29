import Label from "components/Label/Label";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import moment from "moment";
import { bankIcon } from "assets/icons";

import React from "react";
import ContentLoader from "react-content-loader";
import { useTranslation } from "react-i18next";
import { IonIcon } from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import { ReviewDetailsCard } from "components/ReviewDetailsCard/ReviewDetailsCard";

export type PayoutItemProps = {
  /** Payout amount as a formatted currency string */
  amount: string;
  date: Date;
};

const PayoutItem: React.FC<PayoutItemProps> = ({ amount, date }) => (
  <div id="nextPayout" className="flex justify-between items-center my-5">
    <div className="font-medium">{amount}</div>
    <div>{moment(date).format("MMM D, YYYY")}</div>
  </div>
);

export const PayoutItemSkeleton: React.FC = () => (
  <ContentLoader
    uniqueKey="ye2426g"
    className="my-5"
    animate
    speed={2}
    width={400}
    height={14}
    viewBox="0 0 400 14"
    backgroundColor="#4cb4dd"
    foregroundColor="#127aa3">
    <rect x="0" y="0" rx="3" ry="3" width="80" height="14" />{" "}
    <rect x="215" y="0" rx="3" ry="3" width="150" height="14" />
  </ContentLoader>
);

export type PayoutScreenProps = {
  loading: boolean;
  /**
   * Current balance as a formatted currency string
   */
  currentBalance: string;
  pendingBalance: string;
  payouts?: PayoutItemProps[];
  stripeRestricted?: boolean;
  stripeRestrictedSoon?: boolean;
  /**
   * Account bank last 4 digits
   */
};

export const PayoutScreen: React.FC<PayoutScreenProps> = ({
  currentBalance,
  stripeRestricted,
  stripeRestrictedSoon,
  pendingBalance,
  loading = false,
  payouts = [],
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const payoutsList =
    payouts?.map((payout) => <PayoutItem {...payout} key={`${payout.amount}-${payout.date}`} />) ?? null;

  return (
    <LayoutModal title={t("merchants.payouts.title.manage-payouts")}>
      <div id="currentBalance" className="flex flex-col items-center my-8 text-white">
        <div className="mb-3">
          <Label>{t("merchants.payouts.available-balance")}</Label>
        </div>
        <div className="uppercase text-4xl mb-4">{currentBalance}</div>
        <p className="text-xs">{t("merchants.payouts.funds-disclaimer")}</p>
      </div>
      {stripeRestricted && (
        <div className="px-5">
          <ReviewDetailsCard status="restricted" onCtaClick={() => history.push("/merchant-onboarding-update")} />
        </div>
      )}
      {stripeRestrictedSoon && (
        <div className="px-5">
          <ReviewDetailsCard status="restrictedSoon" onCtaClick={() => history.push("/merchant-onboarding-update")} />
        </div>
      )}
      <div className="flex justify-between items-center">
        <div id="pendingBalance" className="my-8 text-white">
          <Label>{t("merchants.payouts.pending-balance")}</Label>
          <div className="uppercase text-xl">{pendingBalance}</div>
        </div>
        <Link to="/update-bank-info">
          <button
            type="button"
            className="flex flex-row items-center text-white border border-white border-solid rounded-lg px-4 py-1">
            <IonIcon className="flex mr-2" icon={bankIcon} />
            <p className="flex text-sm uppercase">{t("merchants.payouts.update-payout-details")}</p>
          </button>
        </Link>
      </div>

      <div>
        <p className="text-xs italic text-white">{t("onboarding.payout.payout-description")}</p>
      </div>
      <hr className="border-t border-white my-4" />
      <div className="text-white">
        <div id="payoutHistory">
          <Label>{t("merchants.payouts.payout-history")}</Label>
          {loading && <PayoutItemSkeleton />}

          {payoutsList?.length ? payoutsList : <div className="my-4 mb-10">{t("merchants.payouts.no-payouts")}</div>}
        </div>
      </div>
    </LayoutModal>
  );
};
