import React, { useState } from "react";
import { useEtxDistributionMutation, useGetCryptoAssetMetricsQuery } from "generated/graphql";
import { ChooseAmountScreen, SubmitPayload } from "components/Modules/CryptoWallet/ChooseAmountScreen";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { investFlowAmountState, investFlowOrderState } from "../atoms";
import { InvestFlowStepProps } from "../sharedTypes";
import { captureException } from "ErrorLogger";
import { getCurrentUser } from "../../../../Firebase";
import { WarningModal } from "components/WarningModal";
import { Icon } from "components/Icon/Icon";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";
import { formatUsingIntl } from "utils/currency";

interface ChooseAmountContainerProps extends InvestFlowStepProps {
  etxKey: string;
}
const DURATION = 2000;
const MINIMUM_FIAT_AMOUNT = 1;
export const ChooseAmountContainer: React.FC<ChooseAmountContainerProps> = ({
  onGoBack,
  onComplete,
  onAbort,
  etxKey,
}) => {
  const { t } = useTranslation();
  const [amountState, setAmountState] = useRecoilState(investFlowAmountState);
  const currency = amountState.cryptoCode || "";
  const fiatMaxAmount = amountState?.availableFiatAmount?.major;
  const { data, loading } = useGetCryptoAssetMetricsQuery({
    skip: !currency,
    fetchPolicy: "network-only",
    variables: { assetName: currency },
  });
  const [etxDistribution, { loading: etxDistributionLoading }] = useEtxDistributionMutation();
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const user = getCurrentUser();
  const setOrderState = useSetRecoilState(investFlowOrderState);
  const userCurrency = useGetCurrentAccountCurrency();

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
          transactionType: "INVEST",
        },
      });
      setOrderState({
        uuId: etxDistributionData?.data?.etxDistribution?.uuid,
        sourceAmount: etxDistributionData?.data?.etxDistribution?.sourceAmount,
        sourceCurrencyCode: etxDistributionData?.data?.etxDistribution?.sourceCurrencyCode,
      });
      onComplete();
    } catch (error) {
      setShowWarning(true);
      captureException(error);
    }
  };

  const validateAmount = (amount: number) => {
    if (fiatMaxAmount && amount > fiatMaxAmount) {
      return t("etx.invest.choose_amount.error.amount_exceeded");
    }
    if (amount < MINIMUM_FIAT_AMOUNT) {
      return t("etx.invest.choose_amount.error.minFiatAmount", {
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
          ariaLabel="CALCULATOR"
          asset={data?.getAssetMetrics}
          availableAmountInFiat={amountState?.availableFiatAmount?.major}
          onBack={onGoBack}
          onSubmit={handleSubmit}
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
