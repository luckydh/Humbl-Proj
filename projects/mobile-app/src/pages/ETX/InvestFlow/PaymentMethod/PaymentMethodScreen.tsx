import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AssetBalanceType } from "generated/graphql";
import { Button } from "components/Button/Button";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { CheckBoxCard } from "components/CheckBoxCard/CheckBoxCard";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { CheckBoxCardSkeleton } from "components/CheckBoxCard/CheckBoxCardSkeleton";
import { decimalPrecision, ETX_INVEST_PAYMENT_SCREEN } from "utils/decimalPrecision";
import { CloseIcon } from "assets/svgs/CloseIcon";
import { Illustration } from "components/Illustration/Illustration";
import { useLayerManager } from "components/Layers/hooks";
import { formatUsingIntl } from "utils/currency";

export interface PaymentMethodScreenProps {
  assets?: AssetBalanceType[];
  isLoading?: boolean;
  isSubmitting?: boolean;
  onBack?: () => void;
  onContinue: (selectedAsset: AssetBalanceType) => void;
  onClickClose?: () => void;
  refetchMyAssetData?: () => void;
  ariaLabel?: string;
}

export const PaymentMethodScreen: React.FC<PaymentMethodScreenProps> = ({
  assets,
  onBack,
  onClickClose,
  onContinue,
  isLoading,
  isSubmitting,
  refetchMyAssetData,
  ariaLabel,
}) => {
  const { t } = useTranslation();
  const [selectedAsset, setSelectedAsset] = useState<AssetBalanceType | undefined>();
  const layerManager = useLayerManager();

  const isSelected = (identifier?: string) => {
    if (selectedAsset) {
      return selectedAsset.code === identifier;
    }

    return false;
  };

  const handleClickContinue = () => {
    if (selectedAsset) {
      onContinue(selectedAsset);
    }
  };

  const handleSelectAsset = (asset: AssetBalanceType) => {
    setSelectedAsset(asset);
  };

  const hasNoCrypto = !isLoading && !assets?.length;

  const handleOnBuy = () => {
    layerManager.open("cryptoWalletBuyingFlow", { onComplete: refetchMyAssetData });
  };

  return (
    <LayoutModal
      ariaLabel={ariaLabel}
      title={t("etx.invest.title.payment-method")}
      onClickBack={onBack}
      onRightClick={onClickClose}
      horizontalPadding={false}
      rightClickIcon={
        <div className="m-2 mt-3">
          <CloseIcon />
        </div>
      }>
      {!isLoading && (
        <div className="flex flex-col pt-2 transition-all duration-150 h-full">
          <div className="flex flex-col flex-grow">
            {assets?.map((asset) => (
              <div key={asset.code} className="mb-2">
                <CheckBoxCard
                  ariaLabel={ariaLabel}
                  title={asset.name!}
                  icon={
                    <div className="p-1 bg-white bg-opacity-50 rounded-full">
                      <img
                        alt={asset.name}
                        className="object-contain"
                        style={{ width: 22, height: 22 }}
                        src={asset.logoImage}
                      />
                    </div>
                  }
                  middleColumnContent={
                    <div className="text-sm truncate text-blue-dark">
                      {decimalPrecision(asset.amount!, ETX_INVEST_PAYMENT_SCREEN)} {asset.code}
                    </div>
                  }
                  subtitle={formatUsingIntl(asset?.fiatAmount?.major ?? 0.0)}
                  onClick={() => handleSelectAsset(asset)}
                  selected={isSelected(asset?.code)}
                  bottomLineContent={
                    isSelected(asset?.code) && (
                      <Button
                        className="mb-2 mt-4"
                        onClick={handleClickContinue}
                        ariaLabel={ariaLabel && `${ariaLabel}_CONTINUE_BUTTON`}>
                        {t("global.continue")}
                      </Button>
                    )
                  }
                />
              </div>
            ))}
            {hasNoCrypto && (
              <div className="px-6 flex flex-col items-center justify-center flex-grow h-full">
                <div className="flex flex-col items-center justify-center flex-grow h-full">
                  <Illustration name="wallet_coins" size="lg" />
                  <h1
                    className="text-2xl tracking-tight text-center text-white"
                    aria-label={ariaLabel && `${ariaLabel}_NOASSETSTITLE_LABEL`}>
                    {t("etx.invest.payment-method.no-crypto.heading")}
                  </h1>
                  <p
                    className="mt-2 text-base tracking-normal text-center text-white"
                    aria-label={ariaLabel && `${ariaLabel}_NOASSETSBODY_LABEL`}>
                    {t("etx.invest.payment-method.no-crypto.description")}
                  </p>
                </div>
                <Button
                  onClick={handleOnBuy}
                  className="w-full py-2 mt-4 text-center rounded-md"
                  ariaLabel={ariaLabel && `${ariaLabel}_BUYASSET_BUTTON`}>
                  {t("etx.invest.payment-method.button.buy-crypto")}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {isLoading && (
        <>
          <CheckBoxCardSkeleton className="mb-2 mx-6" />
          <CheckBoxCardSkeleton className="mb-2 mx-6" />
          <CheckBoxCardSkeleton className="mb-2 mx-6" />
        </>
      )}
      <OverlayLoading isOpen={!!isSubmitting} />
    </LayoutModal>
  );
};

export default PaymentMethodScreen;
