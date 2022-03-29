import React, { useState } from "react";
import { useEtxDistributionMutation, useGetCryptoAssetMetricsQuery } from "generated/graphql";
import { ChooseAmountScreen, SubmitPayload } from "components/Modules/CryptoWallet/ChooseAmountScreen";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { withdrawEtxFlowAmountState, withdrawEtxFlowOrderState } from "../atoms";
import { WithdrawFlowStepProps } from "../sharedTypes";
import { WarningModal } from "components/WarningModal";
import { captureException } from "ErrorLogger";
import { Icon } from "components/Icon/Icon";
import { getCurrentUser } from "../../../../Firebase";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { formatUsingIntl } from "utils/currency";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";

interface ChooseAmountContainerProps extends WithdrawFlowStepProps {
  etxKey: string;
}
export const ChooseAmountContainer: React.FC<ChooseAmountContainerProps> = ({
  onGoBack,
  onComplete,
  onAbort,
  etxKey,
}) => {
  const { t } = useTranslation();
  const [amountState, setAmountState] = useRecoilState(withdrawEtxFlowAmountState);
  const currency = amountState.selectedAsset?.tickerCode || "";
  const fiatMaxAmount = amountState?.availableFiatAmount;
  const user = getCurrentUser();
  const { data, loading } = useGetCryptoAssetMetricsQuery({
    skip: !currency,
    fetchPolicy: "network-only",
    variables: { assetName: currency },
  });
  const setOrderState = useSetRecoilState(withdrawEtxFlowOrderState);
  const [etxDistribution, { loading: etxDistributionLoading }] = useEtxDistributionMutation();
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const userCurrency = useGetCurrentAccountCurrency();
  // TODO: ETX/Blocks move consts outside of component
  const DURATION = 2000;
  const MINIMUM_FIAT_AMOUNT = 1;

  const handleSubmit = async (payload: SubmitPayload) => {
    setAmountState({
      ...amountState,
      enteredAmount: {
        cryptoAmount: payload.cryptoAmount,
        fiatAmount: payload.fiatAmount,
        fiatCurrencyCode: payload.fiatCurrencyCode,
      },
      maxOption: payload.maxOption,
    });
    try {
      const etxDistributionData = await etxDistribution({
        variables: {
          product: etxKey,
          amount: Number(payload.cryptoAmount),
          amountCurrency: currency,
          userEmail: user?.email!,
          transactionType: "WITHDRAWL",
        },
      });
      setOrderState({
        uuId: etxDistributionData?.data?.etxDistribution?.uuid,
        exchangeRate: etxDistributionData?.data?.etxDistribution?.destinationAsset?.price,
        sourceAmount: etxDistributionData?.data?.etxDistribution?.sourceAmount,
        sourceCurrencyCode: etxDistributionData?.data?.etxDistribution?.sourceCurrencyCode,
      });
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      setShowWarning(true);
      captureException(error);
    }
  };

  const validateAmount = (amount: number) => {
    if (fiatMaxAmount && amount > fiatMaxAmount) {
      return t("etx.withdraw.choose_amount.error.amount_exceeded");
    }
    if (amount < MINIMUM_FIAT_AMOUNT) {
      return t("etx.withdraw.choose_amount.error.minFiatAmount", {
        minimumFiatAmount: formatUsingIntl(MINIMUM_FIAT_AMOUNT, "standard", userCurrency),
      });
    }
    return null;
  };

  return (
    <>
      {showWarning ? (
        <WarningModal
          show={!!showWarning}
          duration={DURATION}
          title={<Icon name="bold_danger" color="red" size="md" />}
          onDismiss={() => setShowWarning(false)}
          message={t("global.generic.error")}
        />
      ) : (
        <ChooseAmountScreen
          asset={data?.getAssetMetrics}
          availableAmountInFiat={amountState.availableFiatAmount}
          onBack={onGoBack}
          onSubmit={handleSubmit}
          ariaLabel="CALCULATOR"
          onClickClose={onAbort}
          isLoading={loading}
          isSubmitting={false}
          suggestions={[{ type: "max" }]}
          validateAmount={validateAmount}
        />
      )}
      {etxDistributionLoading && <OverlayLoading isOpen={etxDistributionLoading} />}
    </>
  );
};
