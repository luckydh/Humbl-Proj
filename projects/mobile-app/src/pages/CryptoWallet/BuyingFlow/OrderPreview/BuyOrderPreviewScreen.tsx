import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CloseIcon } from "assets/svgs/CloseIcon";
import { Button } from "components/Button/Button";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { OrderPreviewSkeleton } from "components/Modules/CryptoWallet/OrderPreviewSkeleton";
import { ErrorModal } from "components/ErrorHandling/ErrorModal";
import WarningIcon from "assets/svgs/Warning-Icon.svg";
import AlertCircleIcon from "assets/svgs/AlertCircleIcon";
import { mapErrorCodeToTranslationKey, HumblError } from "graphql/humblGraphqlError";
import { SwapAssetCoinIcon } from "pages/CryptoWallet/SwapFlow/SwapAssetCoinIcon/SwapAssetCoinIcon";

export interface BuyOrderPreviewScreenProps {
  total?: string;
  onBack?: () => void;
  onConfirm?: () => void;
  onCancelOrder?: () => void;
  isLoading?: boolean;
  isSubmitting?: boolean;
  error: HumblError | undefined;
  exchangeRate?: string;
  feesAmount?: string;
  sourceAmount?: string;
  sourceCurrency?: string;
  destinationAmount?: string;
  destinationCurrency?: string;
  paymentMethodName?: string;
  ariaLabel?: string;
  swapOrderFlow?: boolean;
  sourceCryptoCurrency?: string;
  sourceCryptoAmount?: string;
  leftCoinImage?: string;
  rightCoinImage?: string;
}

const orderDetailItemClasses =
  "flex justify-between py-3 text-sm font-normal tracking-tight text-white border-b border-white border-opacity-75 border-solid last:border-0";

export const BuyOrderPreviewScreen: React.FC<BuyOrderPreviewScreenProps> = ({
  total,
  isLoading,
  exchangeRate,
  feesAmount,
  sourceAmount,
  sourceCurrency,
  destinationAmount,
  destinationCurrency,
  paymentMethodName,
  isSubmitting,
  error,
  onBack,
  onConfirm,
  onCancelOrder,
  ariaLabel,
  swapOrderFlow = false,
  sourceCryptoCurrency,
  sourceCryptoAmount,
  leftCoinImage = undefined,
  rightCoinImage = undefined,
}) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const paymentMethod = paymentMethodName?.split("-");
  const bankName = paymentMethod?.[0];
  const accountNumber = paymentMethod?.[1];

  const handleClickCancel = () => {
    setModalOpen(true);
  };

  return (
    <LayoutModal
      title={t("crypto-wallet.buy.title.order-preview")}
      ariaLabel={ariaLabel}
      onClickBack={onBack}
      horizontalPadding={false}
      onRightClick={handleClickCancel}
      rightClickIcon={
        <div className="m-2 mt-3">
          <CloseIcon />
        </div>
      }>
      <div className="flex flex-col flex-1">
        <div className="flex-grow">
          {isLoading && <OrderPreviewSkeleton />}
          {!isLoading && (
            <>
              <div className="p-4 border-b border-white bg-blue-lightest">
                {swapOrderFlow && leftCoinImage && rightCoinImage && (
                  <SwapAssetCoinIcon leftCoinImage={leftCoinImage} rightCoinImage={rightCoinImage} />
                )}
                <div className="flex flex-col text-center">
                  <div
                    className="text-base text-blue-dark"
                    aria-label={
                      ariaLabel && `${ariaLabel}_${swapOrderFlow ? "YOUARESWAPPING_LABEL" : "YOUAREBUYING_LABEL"}`
                    }>
                    {swapOrderFlow
                      ? t("order-preview-text-you-are-swapping")
                      : t("crypto-wallet.buy.order-preview.header.you-are-buying")}
                  </div>
                  {swapOrderFlow ? (
                    <>
                      <div className="text-2xl font-medium leading-relaxed text-blue-dark">
                        <span aria-label="SWAP_FROM_CRYPTOAMOUNT_LABEL">{sourceCryptoAmount}</span>{" "}
                        <span aria-label="SWAP_FROM_FIATCURRENCY_LABEL">{sourceCryptoCurrency}</span>
                      </div>
                      <div className="text-lg leading-relaxed text-blue-dark">
                        <span aria-label="SWAP_FROM_FIATAMOUNT_LABEL">{sourceAmount}</span>{" "}
                        <span aria-label="SWAP_FROM_FIATCURRENCY_LABEL">{sourceCurrency}</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-2xl font-medium leading-relaxed text-blue-dark">
                      {/* formatting is being handled by the parent */}
                      {/* we show formatted amount + currency code here */}
                      <span aria-label={ariaLabel && `${ariaLabel}_CRYPTOAMOUNT_LABEL`}>{destinationAmount}</span>{" "}
                      <span aria-label={ariaLabel && `${ariaLabel}_CRYPTOCURRENCY_LABEL`}>{destinationCurrency}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 bg-blue-lightest">
                <div className="flex flex-col text-center">
                  <div
                    className="text-base text-blue-dark"
                    aria-label={ariaLabel && `${ariaLabel}_${swapOrderFlow ? "SWAP_TO" : "WHICHEQUALS"}_LABEL`}>
                    {swapOrderFlow
                      ? t("order-preview.swap.to")
                      : t("crypto-wallet.buy.order-preview.header.which-equals")}
                  </div>
                  {swapOrderFlow ? (
                    <>
                      <div className="text-2xl font-medium leading-relaxed text-blue-dark">
                        <span aria-label="SWAP_TO_CRYPTOAMOUNT_LABEL">{destinationAmount}</span>{" "}
                        <span aria-label="SWAP_TO_CRYPTOCURRENCY_LABEL">{destinationCurrency}</span>
                      </div>
                      <div className="text-lg leading-relaxed text-blue-dark">
                        <span aria-label="SWAP_TO_FIATAMOUNT_LABEL">{sourceAmount}</span>{" "}
                        <span aria-label="SWAP_TO_FIATCURRENCY_LABEL">{sourceCurrency}</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-2xl font-medium leading-relaxed text-blue-dark">
                      {/* formatting is being handled by the parent */}
                      {/* we show formatted amount + currency code here */}
                      <span aria-label={ariaLabel && `${ariaLabel}_FIATAMOUNT_LABEL`}>{sourceAmount}</span>{" "}
                      <span aria-label={ariaLabel && `${ariaLabel}_FIATCURRENCY_LABEL`}>{sourceCurrency}</span>
                    </div>
                  )}
                </div>
              </div>
              {/* TODO: Temporary spread warning/alert. Can be repurposed and generic but will most likely go away or show conditionally */}
              <div className="p-4 bg-blue-lightest">
                <div className="flex justify-center align-middle items-center">
                  <div className="block">
                    <AlertCircleIcon width={14} height={14} />
                  </div>
                  <p
                    className="text-[10px] text-blue-dark px-2 max-w-xs font-semibold"
                    aria-label={ariaLabel && `${ariaLabel}_CRYPTODISCLAIMER_LABEL`}>
                    {t("crypto-wallet.buy.order-preview.alert-text")}
                  </p>
                </div>
              </div>
              <div className="mx-6 mt-4 mb-6">
                {!swapOrderFlow && (
                  <>
                    <div className={orderDetailItemClasses}>
                      <span aria-label={ariaLabel && `${ariaLabel}_CRYPTOMARKET_LABEL`}>
                        {t("crypto-wallet.buy.order-preview.details.coin-value", { coin: destinationCurrency })}
                      </span>
                      <span aria-label={ariaLabel && `${ariaLabel}_CRYPTOMARKETVALUE_LABEL`}>{exchangeRate}</span>
                    </div>

                    <div className={orderDetailItemClasses}>
                      <span aria-label={ariaLabel && `${ariaLabel}_PAYMENTMETHOD_LABEL`}>
                        {t("crypto-wallet.buy.order-preview.details.payment-method")}
                      </span>
                      <div className="flex flex-col text-right">
                        <span aria-label={ariaLabel && `${ariaLabel}_PAYMENTMETHODNAME_LABEL`}>{bankName}</span>
                        {accountNumber && <span> {accountNumber}</span>}
                      </div>
                    </div>
                  </>
                )}
                <div className={orderDetailItemClasses}>
                  <span aria-label={ariaLabel && `${ariaLabel}_PURCHASE_LABEL`}>
                    {swapOrderFlow
                      ? t("order-preview-text-amount")
                      : t("crypto-wallet.buy.order-preview.details.purchase")}
                  </span>
                  <div>
                    <span aria-label={ariaLabel && `${ariaLabel}_PURCHASEAMOUNT_LABEL`}>{sourceAmount}</span>{" "}
                    <span aria-label={ariaLabel && `${ariaLabel}_PURCHASECURRENCY_LABEL`}>{sourceCurrency}</span>
                  </div>
                </div>
                <div className={orderDetailItemClasses}>
                  <span aria-label={ariaLabel && `${ariaLabel}_FEES_LABEL`}>
                    {t("crypto-wallet.buy.order-preview.details.fees")}
                  </span>
                  <span aria-label={ariaLabel && `${ariaLabel}_FEESAMOUNT_LABEL`}>{feesAmount}</span>
                </div>
              </div>
              <div className="flex justify-between mx-6 my-6 text-2xl font-medium tracking-tight text-white">
                <span aria-label={ariaLabel && `${ariaLabel}_TOTAL_LABEL`}>
                  {t("crypto-wallet.buy.order-preview.details.total")}
                </span>
                <span aria-label={ariaLabel && `${ariaLabel}_TOTALAMOUNT_LABEL`}>{total}</span>
              </div>
            </>
          )}
        </div>
        <div className="px-6">
          {/* Terms and Conditions to Buying */}
          <p className="mb-6 text-[10px] leading-6" aria-label={ariaLabel && `${ariaLabel}_WYREDISCLAIMER_LABEL`}>
            {t("crypto-wallet.buy.buy-terms")}
          </p>
          <Button
            isDisabled={isSubmitting}
            onClick={onConfirm}
            ariaLabel={ariaLabel && `${ariaLabel}_CONFIRMORDER_BUTTON`}>
            {t("crypto-wallet.buy.order-preview.action.confirm-order")}
          </Button>
        </div>
      </div>
      <OverlayLoading isOpen={!!isSubmitting} />
      <ErrorModal
        isOpen={modalOpen}
        ariaLabel="CANCELCONFIRMATION"
        IconComponent={<img src={WarningIcon} alt="warning icon" />}
        title={t("crypto-wallet.buy.order-preview.exit-modal.title")}
        subTitle={t("crypto-wallet.buy.order-preview.exit-modal.subtitle")}
        secondaryAction={{
          text: t("crypto-wallet.buy.order-preview.exit-modal.cancel-action"),
          action: () => setModalOpen(false),
        }}
        primaryAction={
          onCancelOrder
            ? {
                text: t("crypto-wallet.buy.order-preview.exit-modal.confirm-action"),
                action: onCancelOrder,
              }
            : undefined
        }
      />
      <ErrorModal
        isOpen={!!error}
        IconComponent={<img src={WarningIcon} alt="warning icon" />}
        title={t("crypto-wallet.buy.order-preview.error-modal.title")}
        subTitle={
          <>
            <p className="mt-2 mb-4">{error && t(mapErrorCodeToTranslationKey(error.humblErrorCode))}</p>
            {t("crypto-wallet.buy.order-preview.error-modal.subtitle")}
          </>
        }
        primaryAction={
          onBack ? { text: t("crypto-wallet.buy.order-preview.error-modal.confirm-action"), action: onBack } : undefined
        }
      />
    </LayoutModal>
  );
};

export default BuyOrderPreviewScreen;
