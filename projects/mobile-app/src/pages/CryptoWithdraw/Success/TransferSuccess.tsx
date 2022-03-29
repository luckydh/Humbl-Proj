import ThankYou from "components/Modules/CryptoWallet/SendFlow/ThankYou/ThankYou";
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import EVENTS from "utils/analytics/AnalyticEvents";
import { trackEvent } from "utils/analytics/Segment";

interface TransferSUccessProps {
  email: string;
  transactionId: string;
  fiatCurrencyCode: string;
  fiatAmount: number;
  cryptoAmount: number;
  cryptoId: string | undefined;
}

export const TransferSuccess: React.FC<TransferSUccessProps> = ({
  email,
  transactionId,
  fiatAmount,
  fiatCurrencyCode,
  cryptoAmount,
  cryptoId,
}) => {
  const location = useLocation();

  useEffect(() => {
    trackEvent(EVENTS.SCREEN_VIEW, {
      screenName: "ThankYou",
      pathName: location.pathname,
    });
    trackEvent(EVENTS.WITHDRAW_CRYPTO, {
      screenName: "ThankYou",
      assetName: cryptoId,
      assetAmount: cryptoAmount,
      pathName: location?.pathname,
      transactionId,
      status: "Success",
    });
  }, [cryptoAmount, cryptoId, location.pathname, transactionId]);

  return (
    <ThankYou
      currency={fiatCurrencyCode}
      value={fiatAmount}
      email={email}
      transactionID={transactionId}
      shouldShowViewTransactionButton={true}
      transferSuccess={true}
    />
  );
};
