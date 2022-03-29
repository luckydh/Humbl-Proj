import React from "react";
import { useSetRecoilState } from "recoil";
import { InvestFlowStepProps } from "../sharedTypes";
import { AssetBalanceType, DistributionCurrency, useMyAssetsQuery } from "generated/graphql";
import PaymentMethodScreen from "./PaymentMethodScreen";
import { investFlowAmountState } from "../atoms";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";

interface PaymentMethodContainerProps extends InvestFlowStepProps {
  distribution: DistributionCurrency[];
}

export const PaymentMethodContainer: React.FC<PaymentMethodContainerProps> = ({
  onGoBack,
  onComplete,
  onAbort,
  distribution,
}) => {
  const setAmountState = useSetRecoilState(investFlowAmountState);
  const currency = useGetCurrentAccountCurrency();

  const {
    data: myAssetData,
    loading: myAssetsLoading,
    refetch: refetchMyAssetData,
  } = useMyAssetsQuery({
    fetchPolicy: "network-only",
    variables: {
      currency,
      type: "INVEST",
    },
  });

  const assets = myAssetData?.myAssets?.filter((asset) =>
    distribution.some((distributionData) => distributionData.code === asset.code)
  );
  // TODO: ETX/Blocks remove unnecessary async syntax
  const handleContinue = async (asset: AssetBalanceType) => {
    setAmountState({
      cryptoCode: asset.code,
      cryptoName: asset.name,
      availableFiatAmount: asset.fiatAmount,
    });
    onComplete();
  };

  return (
    <PaymentMethodScreen
      onClickClose={onAbort}
      onBack={onGoBack}
      assets={assets}
      isLoading={myAssetsLoading}
      refetchMyAssetData={refetchMyAssetData}
      onContinue={handleContinue}
      ariaLabel="PAYMENTMETHOD"
    />
  );
};

export default PaymentMethodContainer;
