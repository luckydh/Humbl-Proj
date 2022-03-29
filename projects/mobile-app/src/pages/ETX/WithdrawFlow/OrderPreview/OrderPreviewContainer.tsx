import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";
import { formatUsingIntl } from "utils/currency";
import { decimalPrecision, ORDER_PREVIEW_DECIMAL_PRECISION } from "utils/decimalPrecision";
import { withdrawEtxFlowAmountState, withdrawEtxFlowOrderState } from "../atoms";
import OrderPreviewScreen from "./OrderPreviewScreen";
import { WithdrawFlowStepProps } from "../sharedTypes";
import { captureException } from "ErrorLogger";
import { useStartEtxWithdrawlTransferQuoteMutation } from "generated/graphql";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { getPotentialHumblError } from "graphql/humblGraphqlError";

interface OrderPreviewContainerProps extends WithdrawFlowStepProps {
  onAbort: () => void;
  onError: () => void;
}

export const OrderPreviewContainer: React.FC<OrderPreviewContainerProps> = ({
  onGoBack,
  onAbort,
  onComplete,
  onError,
}) => {
  const amountState = useRecoilValue(withdrawEtxFlowAmountState);
  const [orderState, setOrderState] = useRecoilState(withdrawEtxFlowOrderState);
  const userCurrency = useGetCurrentAccountCurrency();
  const formatInUserCurrency = (value: number) => formatUsingIntl(value, "standard", userCurrency);
  const fiatAmount = formatInUserCurrency(amountState.enteredAmount?.fiatAmount || 0);
  const totalAmount = formatInUserCurrency(amountState.enteredAmount?.fiatAmount || 0);
  const fiatCurrency = amountState.enteredAmount?.fiatCurrencyCode;
  const cryptoAmount = Number(orderState.sourceAmount);
  const cryptoCurrency = orderState.sourceCurrencyCode;
  const [startEtxWithdraw, { loading, error }] = useStartEtxWithdrawlTransferQuoteMutation();

  const handleConfirm = async () => {
    try {
      const etxTransferData = await startEtxWithdraw({
        variables: {
          etxDistributionuuid: orderState.uuId,
          maxOption: amountState.maxOption,
        },
      });
      setOrderState({
        ...orderState,
        transactionId: etxTransferData.data?.startETXWithdrawlTransferQuote?.transactionId,
      });
      if (onComplete) {
        onComplete();
      }
    } catch (e) {
      captureException(e);
    }
  };

  const potentialHumblError = error?.graphQLErrors && getPotentialHumblError(error.graphQLErrors);

  return (
    <>
      <OrderPreviewScreen
        fiatAmount={fiatAmount}
        fiatCurrency={fiatCurrency}
        cryptoAmount={decimalPrecision(cryptoAmount, ORDER_PREVIEW_DECIMAL_PRECISION)}
        cryptoCurrency={cryptoCurrency}
        total={totalAmount}
        exchangeRate={orderState.exchangeRate}
        onBack={onGoBack}
        onError={onError}
        onConfirm={handleConfirm}
        onCancelOrder={onAbort}
        error={potentialHumblError}
        userCurrency={userCurrency}
      />
      {loading && <OverlayLoading isOpen={loading} />}
    </>
  );
};
