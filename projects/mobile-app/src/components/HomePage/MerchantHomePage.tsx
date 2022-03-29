import React from "react";
import QRModal from "components/QR/QRModal";
import { useTranslation } from "react-i18next";
import { Redirect, useHistory } from "react-router";
import AcceptCards from "components/AcceptCards";
import ActionCard from "components/ActionCard";
import { bankIcon, moneyIcon, qrIcon } from "assets/icons";
import { AccountType } from "../../generated/graphql";
import { useStripeOnboardingStatus } from "utils/hooks/useStripeOnboardingStatus";
// import { useGetMyMerchantBusinessDetailsQuery } from "generated/graphql";

const MerchantPayHome = ({ currentAccount }: { currentAccount: AccountType }) => {
  const history = useHistory();

  const [showQRModal, setShowQRModal] = React.useState(false);
  const { t } = useTranslation();
  const { pending: isPendingVerification } = useStripeOnboardingStatus(currentAccount);
  const merchantProfile = currentAccount?.merchantProfileDetails;

  if (!currentAccount) {
    return <Redirect to="/profile" push={true} />;
  }

  if (!merchantProfile?.businessDetails?.hasOnboarded || isPendingVerification) {
    return <AcceptCards loading={!currentAccount} showMerchantPending={isPendingVerification} />;
  }

  return (
    <div className="flex flex-col px-6 pt-6">
      <div className="mb-8">
        <ActionCard
          text={t("home-page.action-card.sales")}
          icon={moneyIcon}
          onClick={() => {
            history.push("/sales");
          }}
        />
      </div>
      <div className="mb-8">
        <ActionCard
          text={t("home-page.action-card.my-qr-code")}
          icon={qrIcon}
          onClick={() => {
            setShowQRModal(true);
          }}
        />
      </div>
      <ActionCard
        text={t("home-page.action-card.purchases")}
        icon={bankIcon}
        onClick={() => {
          history.push("/payouts");
        }}
      />
      <QRModal setShowQRModal={setShowQRModal} showQRModal={showQRModal} />
    </div>
  );
};

export default MerchantPayHome;
