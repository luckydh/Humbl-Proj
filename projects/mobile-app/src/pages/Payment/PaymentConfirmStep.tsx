import React, { useEffect } from "react";
import { BackButtonEvent } from "@ionic/core";
import { AccountType } from "generated/graphql";
import { useTranslation } from "react-i18next";
import { formatCurrency, getCurrencySymbol } from "utils/currency";
import { Button } from "components/Button/Button";
import { Message } from "components/Message/Message";
import { ProfileAvatar } from "components/Avatar/Avatar";
import { LayoutModal } from "components/PageTemplates/LayoutModal";

export interface Props {
  account: AccountType;
  loading: boolean;
  totalAmount: number;
  currency: string;
  destroyStripeModal?: () => void;
  error?: boolean;
  onBack: () => void;
  onComplete: () => void;
}

export const PaymentConfirmStep: React.FC<Props> = ({
  account,
  loading = false,
  totalAmount,
  currency,
  error,
  destroyStripeModal,
  onBack,
  onComplete,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    const handleBackButton = (event: Event) => {
      destroyStripeModal?.();
      const ionEvent = event as BackButtonEvent;
      ionEvent.detail.register(1, () => {
        onBack();
      });
    };

    document.addEventListener("ionBackButton", handleBackButton);
    return () => {
      document.removeEventListener("ionBackButton", handleBackButton);
    };
  }, [onBack, destroyStripeModal]);

  return (
    <LayoutModal title="Pay Merchant" onClickBack={onBack} background="bg-profiles">
      <div className="flex flex-col flex-grow h-full justify-between pt-14">
        <div className=" flex items-center flex-col relative w-full">
          <ProfileAvatar size="large" username={account.userName} src={account.image} name={account.displayName} />
        </div>
        <div className="flex-1 flex flex-col flex-grow justify-center text-center text-white pb-6">
          <h1 className="text-center text-white text-3xl">
            {getCurrencySymbol(currency)}
            {formatCurrency(totalAmount)} {currency}
          </h1>

          {error && (
            <div className="mt-2">
              <Message variant="error">{t("payment-page.error.error-processing-transaction")}</Message>
            </div>
          )}
        </div>
        <div className="relative bottom-0 flex py-4 flex-col">
          <Button
            type="button"
            className="inline-block"
            // size="large"
            onClick={onComplete}
            isDisabled={loading}>
            {!loading && <span>{t("payment-page.action.confirm-and-pay")}</span>}
            {loading && <span className="animate-pulse">Processing...</span>}
          </Button>
        </div>
      </div>
    </LayoutModal>
  );
};

export default PaymentConfirmStep;
