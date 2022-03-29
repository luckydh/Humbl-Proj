import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "components/Button/Button";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { useLocation } from "react-router";
import { WarningIcon } from "assets/icons";
import { ConfirmationModal } from "components/ConfirmationModal/ConfirmationModal";
import PhoneandLock from "./PhoneandLock";
import BankandLock from "./BankandLock";
import { TwoFactorInput } from "./TwoFactorInput";

export interface TwoFactorProps {
  onChange: (otp: string) => void;
  value: string;
  twoFactorType: "SMS" | "BANK";
  phoneNumber?: string;
  secondaryClick?: () => void;
  continueClick: () => void;
  error?: string;
  disableButtons?: boolean;
  onExit?: () => void;
}

const renderImage = (type: string): JSX.Element => (type === "SMS" ? <PhoneandLock /> : <BankandLock />);

export const TwoFactor: React.FC<TwoFactorProps> = ({
  twoFactorType,
  secondaryClick,
  continueClick,
  value,
  phoneNumber,
  error,
  onChange,
  disableButtons = false,
  onExit,
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    trackEvent(EVENTS.SCREEN_VIEW, {
      screenName: `VerificationRequired${twoFactorType}`,
      pathName: location?.pathname,
    });
  }, [location?.pathname, twoFactorType]);

  const onClickCancel = () => {
    setShowExitModal(true);
  };

  return (
    <div className="flex justify-center flex-col flex-1 text-white">
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <div>{renderImage(twoFactorType)}</div>
        <h4 className="text-2xl -mt-4">
          {twoFactorType === "SMS" ? t("wyre-2fa-sent-msg-sms") : t("wyre-2fa-sent-msg-bank")}
        </h4>
        <p className="mt-4">
          {twoFactorType === "SMS" ? (
            <span>
              {t("wyre-2fa-sent-msg-sms-phone-1")} <span className="whitespace-nowrap">{phoneNumber}</span>{" "}
              {t("wyre-2fa-sent-msg-sms-phone-2")}
            </span>
          ) : (
            t("wyre-2fa-instruction-msg-bank")
          )}
        </p>
        <TwoFactorInput
          numInputs={6}
          className="mt-8"
          separator={<span>&nbsp;&nbsp;</span>}
          error={error}
          onChange={onChange}
          value={value}
        />
      </div>
      <div className="flex flex-col">
        {twoFactorType === "BANK" && (
          <Button
            variant="text"
            size="default"
            style={{ color: "#3b5b7b" }}
            onClick={secondaryClick}
            isDisabled={disableButtons}>
            {t("wyre-2fa-cta-msg-bank")}
          </Button>
        )}
        <Button className="mb-2" onClick={continueClick} isDisabled={disableButtons}>
          {t("wyre-2fa-continue-btn")}
        </Button>
        <Button
          variant="text"
          onClick={onClickCancel}
          className="border-2 border-blue-dark border-solid text-blue-dark rounded-md">
          {t("wyre-2fa-cancel-btn")}
        </Button>

        {showExitModal && (
          <ConfirmationModal
            isOpen={showExitModal}
            IconComponent={<img src={WarningIcon} alt="warning icon" />}
            title={t("crypto-wallet.buy.order-preview.exit-modal.title")}
            subTitle={t("crypto-wallet.buy.order-preview.exit-modal.subtitle")}
            cancelButtonText={t("crypto-wallet.buy.order-preview.exit-modal.cancel-action")}
            confirmationButtonText={t("crypto-wallet.buy.order-preview.exit-modal.confirm-action")}
            onCancel={() => {
              setShowExitModal(false);
            }}
            onConfirm={() => {
              setShowExitModal(false);
              onExit?.();
            }}
          />
        )}
      </div>
    </div>
  );
};
