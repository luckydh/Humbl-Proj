import { IonPage } from "@ionic/react";
import Button from "components/Button/Button";
import React from "react";
import { HumblLogo } from "assets/svgs/HumblLogo";
import { useTranslation } from "react-i18next";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { WalletIcon, TransferSuccessIcon } from "assets/icons";
import { useHistory } from "react-router";
import { formatUsingIntl } from "utils/currency";
import { buildPath } from "utils/routes";

export interface ThankYouProps {
  currency: string;
  value: number;
  email: string;
  transactionID: string;
  shouldShowViewTransactionButton: boolean;
  transferSuccess?: boolean;
  message?: string;
  title?: string;
  onComplete?: () => void;
  viewAllTransactions?: () => void;
}

const ThankYou: React.FC<ThankYouProps> = ({
  currency,
  value,
  email,
  transactionID,
  shouldShowViewTransactionButton,
  transferSuccess,
  message,
  title,
  onComplete,
  viewAllTransactions,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const textClasses = "text-white mx-6 font-hando font-semibold text-center justify-center";

  const handleViewTransactions = () => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "View Transactions",
      pathName: window.location.pathname,
    });
    if (viewAllTransactions) {
      viewAllTransactions();
    }
    history.push(buildPath("cryptoWalletTransactionsAll"));
  };

  const handleBackToWallet = () => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Back to Wallet",
      pathName: window.location.pathname,
    });
    if (onComplete) {
      onComplete();
    } else {
      history.push(buildPath("cryptoWallet"));
    }
  };

  return (
    <IonPage className="safe-area-top bg-lines mb-6">
      <div className="flex items-center m-auto text-base justify-center mt-16 mb-10">
        <HumblLogo />
      </div>

      <div className="overflow-y-auto">
        <div className="flex flex-col flex-grow flex-shrink-0 mb-5">
          <div className="p-4 text-center">
            <img src={transferSuccess ? TransferSuccessIcon : WalletIcon} alt="" className="inline h-40" />
          </div>

          <div className={`${textClasses} mb-4 text-2xl`}>
            <div>
              {title || (transferSuccess ? t("thank-you-success-transfer-message") : t("thank-you-success-message"))}
            </div>
            <span>
              {formatUsingIntl(value, "standard", currency)} {currency}
            </span>
          </div>

          <div className={`${textClasses} mb-3 mt-1 text-center font-normal`}>
            <div className="mx-auto max-w-md">
              {message ||
                t("thank-you-message-confirmation-msg", {
                  email,
                })}
            </div>
          </div>

          <div className={`${textClasses} mb-6 mt-6`}>
            <span className="text-white block mb-2 font-normal text-base">{t("purchase-success.transaction-id")}</span>
            <span className="font-medium text-white text-lg">{transactionID}</span>
          </div>

          <div className="px-6 w-full mt-10 space-y-3">
            <Button onClick={() => handleBackToWallet()}>{t("thank-you-button-back-to-wallet")}</Button>
            {shouldShowViewTransactionButton && (
              <Button
                onClick={() => handleViewTransactions()}
                variant="text"
                className="border-2 border-blue-dark border-solid text-blue-dark rounded-md"
              >
                {t("thank-you-button-view-transaction")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </IonPage>
  );
};
export default ThankYou;
