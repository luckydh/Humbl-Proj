import React from "react";
import { useTranslation } from "react-i18next";
import { PurchaseSuccessScreen } from "components/Modules/CryptoWallet/PurchaseSuccessScreen/PurchaseSuccessScreen";
import { getCurrentUser } from "../../../../Firebase";
import { InvestFlowStepProps } from "../sharedTypes";
import { useRecoilValue } from "recoil";
import { investFlowAmountState, investFlowOrderState } from "../atoms";

interface SuccessContainerProps extends InvestFlowStepProps {
  blockLogo: string;
  blockName: string;
  etxKey: string;
}

export const SuccessContainer: React.FC<SuccessContainerProps> = ({ onComplete, blockLogo, blockName, etxKey }) => {
  const { t } = useTranslation();
  const user = getCurrentUser();
  const orderState = useRecoilValue(investFlowOrderState);
  const amountState = useRecoilValue(investFlowAmountState);

  return (
    <PurchaseSuccessScreen
      coin={etxKey}
      coinName={blockName}
      logo={blockLogo}
      price={amountState.enteredAmount?.fiatAmount || 0}
      transactionId={orderState.transactionId}
      title={t("etx.invest.order-success.title.order-complete")}
      isLoading={false}
      subTitle={t("etx.invest.order-success.message.confirmation-email", { email: user?.email })}
      onClickCta={onComplete}
      multipleCoinsLogo={orderState.distribution}
    />
  );
};

export default SuccessContainer;
