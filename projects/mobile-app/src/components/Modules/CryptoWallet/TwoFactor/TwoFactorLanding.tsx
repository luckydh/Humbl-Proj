import Button from "components/Button/Button";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import EVENTS from "utils/analytics/AnalyticEvents";
import { trackEvent } from "utils/analytics/Segment";
import { LandingImage } from "./LandingImage";

export enum TwoFactorLandingType {
  Sms = "sms",
  Bank = "bank",
  Both = "both",
}

export interface TwoFactorLandingProps {
  onClick?: () => void;
  cancelClick?: () => void;
  twoFactorType: TwoFactorLandingType;
}

export const TwoFactorLanding: React.FC<TwoFactorLandingProps> = ({ onClick, twoFactorType, cancelClick }) => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    trackEvent(EVENTS.SCREEN_VIEW, {
      screenName: "VerificationRequired",
      pathName: location?.pathname,
    });
  }, [location?.pathname]);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col items-center justify-center flex-grow px-2">
        <LandingImage />
        <h1 className="text-2xl text-center text-white -mt-6">
          {twoFactorType === TwoFactorLandingType.Bank && t("wyre-2fa-landing-bank-header")}
          {twoFactorType === TwoFactorLandingType.Sms && t("wyre-2fa-landing-sms-header")}
          {twoFactorType === TwoFactorLandingType.Both && t("wyre-2fa-landing-both-header")}
        </h1>
        <div className="text-center text-white mt-4">
          <p>{t("wyre-2fa-landing-confirmation-msg-1")}</p>
          <p className="mt-4">{t("wyre-2fa-landing-confirmation-msg-2")}</p>
        </div>
      </div>
      <Button className="mb-2" onClick={onClick}>
        {t("wyre-2fa-landing-proceed-btn")}
      </Button>
      <Button
        variant="text"
        onClick={cancelClick}
        className="border-2 border-blue-dark border-solid text-blue-dark rounded-md">
        {t("wyre-2fa-cancel-btn")}
      </Button>
    </div>
  );
};
