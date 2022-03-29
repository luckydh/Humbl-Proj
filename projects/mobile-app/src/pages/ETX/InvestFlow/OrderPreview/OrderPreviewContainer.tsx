import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";
import { formatUsingIntl } from "utils/currency";
import { decimalPrecision, ORDER_PREVIEW_DECIMAL_PRECISION } from "utils/decimalPrecision";
import { investFlowAmountState, investFlowOrderState } from "../atoms";
import OrderPreviewScreen from "./OrderPreviewScreen";
import { InvestFlowStepProps } from "../sharedTypes";
import { useEtxOrderDetailMutation, useStartEtxTransferQuoteMutation } from "generated/graphql";
import { captureException } from "ErrorLogger";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { getPotentialHumblError } from "graphql/humblGraphqlError";

// TODO: This fee is fixed but it should eventually be removed.
// Ideally, the fees are calculated on the BE and then just used here
const ETX_FEE_PERCENT = 0.0075; // 0.75%

interface OrderPreviewContainerProps extends InvestFlowStepProps {
  blockName: string;
  onAbort: () => void;
  onError: () => void;
}

export const OrderPreviewContainer: React.FC<OrderPreviewContainerProps> = ({
  onGoBack,
  onAbort,
  onComplete,
  onError,
  blockName,
}) => {
  const amountState = useRecoilValue(investFlowAmountState);
  const [orderState, setOrderState] = useRecoilState(investFlowOrderState);
  const userCurrency = useGetCurrentAccountCurrency();
  // TODO: This fn has been created in buy flow, we should extract out to its own util to make nicer and avoid duplication
  const formatInUserCurrency = (value: number) => formatUsingIntl(value, "standard", userCurrency);
  const fiatAmount = formatInUserCurrency(amountState.enteredAmount?.fiatAmount || 0);
  const totalAmount = formatInUserCurrency(amountState.enteredAmount?.fiatAmount || 0);
  const fiatCurrency = amountState.enteredAmount?.fiatCurrencyCode;
  const cryptoAmount = Number(orderState.sourceAmount);
  const cryptoCurrency = orderState.sourceCurrencyCode;
  const [startEtxTransfer, { loading, error }] = useStartEtxTransferQuoteMutation();
  const [etxOrderDetail, { loading: etxOrderLoading, data: etxOrderData }] = useEtxOrderDetailMutation({});

  useEffect(() => {
    const getEtxOrderData = async () => {
      try {
        await etxOrderDetail({
          variables: {
            uuid: orderState.uuId!,
          },
        });
      } catch (e) {
        captureException(e);
      }
    };
    getEtxOrderData();
  }, [etxOrderDetail, orderState.uuId]);

  const handleConfirm = async () => {
    try {
      const etxTransferData = await startEtxTransfer({
        variables: {
          etxDistributionuuid: orderState.uuId,
          maxOption: amountState.maxOption,
        },
      });
      setOrderState({
        ...orderState,
        transactionId: etxTransferData.data?.startETXTransferQuote?.transactionId,
        distribution: etxOrderData?.etxOrderDetail?.distribution,
      });
      onComplete();
    } catch (e) {
      captureException(e);
    }
  };

  const fees = (amountState.enteredAmount?.fiatAmount ?? 0) * ETX_FEE_PERCENT;
  const purchaseAmount = formatInUserCurrency((amountState.enteredAmount?.fiatAmount ?? 0) - fees);

  const potentialHumblError = error?.graphQLErrors && getPotentialHumblError(error.graphQLErrors);

  return (
    <>
      <OrderPreviewScreen
        ariaLabel="ORDERPREVIEW"
        isLoading={etxOrderLoading}
        fiatAmount={fiatAmount}
        fiatCurrency={fiatCurrency}
        cryptoAmount={decimalPrecision(cryptoAmount, ORDER_PREVIEW_DECIMAL_PRECISION)}
        cryptoCurrency={cryptoCurrency}
        total={totalAmount}
        onBack={onGoBack}
        onError={onError}
        onConfirm={handleConfirm}
        onCancelOrder={onAbort}
        error={potentialHumblError}
        purchaseAmount={purchaseAmount}
        fees={formatInUserCurrency(fees)}
        paymentMethod={amountState.cryptoName}
        etxOrderData={etxOrderData?.etxOrderDetail?.distribution}
        blockName={blockName}
      />
      {loading && <OverlayLoading isOpen={loading} />}
    </>
  );
};
