import React from "react";
import { WithdrawFlowStepProps } from "../sharedTypes";
import ThankYou from "components/Modules/CryptoWallet/SendFlow/ThankYou/ThankYou";
import { withdrawEtxFlowAmountState, withdrawEtxFlowOrderState } from "../atoms";
import { useRecoilValue } from "recoil";
import { getCurrentUser } from "../../../../Firebase";
import { useTranslation } from "react-i18next";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";

export const SuccessContainer: React.FC<WithdrawFlowStepProps> = ({ onComplete }) => {
  const user = getCurrentUser();
  const userCurrency = useGetCurrentAccountCurrency();
  const orderState = useRecoilValue(withdrawEtxFlowOrderState);
  const amountState = useRecoilValue(withdrawEtxFlowAmountState);
  const { t } = useTranslation();

  return (
    <ThankYou
      currency={userCurrency}
      value={amountState.enteredAmount?.fiatAmount!}
      email={user?.email!}
      title={t("etx.withdraw.order-success.message.title", {
        crypto: `${orderState.sourceAmount} ${orderState.sourceCurrencyCode}`,
      })}
      message={t("etx.withdraw.order-success.message.confirmation-email", { email: user?.email })}
      transactionID={orderState.transactionId!}
      shouldShowViewTransactionButton={false}
      transferSuccess={false}
      onComplete={onComplete}
    />
  );
};

export default SuccessContainer;
