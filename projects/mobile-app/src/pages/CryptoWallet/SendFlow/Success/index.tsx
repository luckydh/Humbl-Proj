import ThankYou from "components/Modules/CryptoWallet/SendFlow/ThankYou/ThankYou";
import { useFlowActions } from "pages/CryptoWallet/Flow";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import EVENTS from "utils/analytics/AnalyticEvents";
import { trackEvent } from "utils/analytics/Segment";
import { SendFlowCurrentState, sendFlowCurrentState } from "../sendFlowUtils";

export const Success: React.FC = () => {
  const { payload, code, transactionId, email } = useRecoilValue<SendFlowCurrentState>(sendFlowCurrentState);
  const { exit } = useFlowActions();

  useEffect(() => {
    trackEvent(EVENTS.SEND_CRYPTO, {
      screenName: "ThankYou",
      assetName: code,
      assetAmount: payload?.cryptoAmount,
      transactionId,
    });
  }, [code, payload?.cryptoAmount, transactionId]);

  return (
    <ThankYou
      currency={payload?.fiatCurrencyCode}
      value={payload?.fiatAmount}
      email={email}
      onComplete={exit}
      viewAllTransactions={exit}
      transactionID={transactionId}
      shouldShowViewTransactionButton
    />
  );
};
