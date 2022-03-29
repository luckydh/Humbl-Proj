import React from "react";
import { Link } from "react-router-dom";
import { HumblLogoResizeable } from "assets/svgs/HumblLogoResizeable";
import { chevronForwardIcon } from "assets/icons";
import { IonIcon } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { CardItemSkeleton } from "components/PaymentMethodSelector/CardItem";

const RenderTextorSkeleton: React.FC<{
  loading: boolean;
  showMerchantPending: boolean;
}> = ({ loading, showMerchantPending }) => {
  const { t } = useTranslation();
  if (loading) {
    return <CardItemSkeleton backgroundColor="#ffffff" forgroundColor="#4cb4dd" />;
  }

  return !showMerchantPending ? (
    <Link to="/merchant-onboarding">
      <div className="flex flex-row justify-between items-center">
        <p data-testid="CTA-onboard" className="text-3xl text-white">
          {t("home-page.accept-cards")}
        </p>
        <IonIcon className="text-2xl mr-2  text-white" icon={chevronForwardIcon} />
      </div>
    </Link>
  ) : (
    <div className="flex flex-row justify-between items-center">
      <p data-testid="pending" className="text-3xl text-white">
        {t("home-page.pending-status")}
      </p>
    </div>
  );
};

const AcceptCards: React.FC<{ showMerchantPending: boolean; loading: boolean }> = ({
  showMerchantPending,
  loading,
}) => (
    <div className="relative flex-1 bg-carousel">
      <div className="h-60 w-full px-6 absolute bottom-0">
        <div className="relative top-24">
          <div className="w-40 mb-2">
            <HumblLogoResizeable />
          </div>
          <RenderTextorSkeleton
            loading={loading}
            showMerchantPending={showMerchantPending}
          />
        </div>
      </div>
    </div>
  );

export default AcceptCards;
