import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CloseIcon } from "assets/svgs/CloseIcon";
import { Button } from "components/Button/Button";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { OrderPreviewSkeleton } from "components/Modules/CryptoWallet/OrderPreviewSkeleton";
import { ErrorModal } from "components/ErrorHandling/ErrorModal";
import WarningIcon from "assets/svgs/Warning-Icon.svg";
import { HumblError } from "graphql/humblGraphqlError";
import { formatUsingIntl } from "utils/currency";

export interface OrderPreviewScreenProps {
  onBack?: () => void;
  onConfirm?: () => void;
  onCancelOrder: () => void;
  onError: () => void;
  isLoading?: boolean;
  isSubmitting?: boolean;
  error: HumblError | undefined;
  fiatAmount?: string;
  fiatCurrency?: string;
  cryptoAmount?: string;
  cryptoCurrency?: string;
  exchangeRate?: number;
  total: string;
  userCurrency: string;
}
const orderDetailItemClasses =
  "flex justify-between py-3 text-sm font-normal tracking-tight text-white border-b border-white border-opacity-75 border-solid last:border-0";

export const OrderPreviewScreen: React.FC<OrderPreviewScreenProps> = ({
  isLoading,
  fiatAmount,
  fiatCurrency,
  cryptoAmount,
  cryptoCurrency,
  isSubmitting,
  total,
  error,
  exchangeRate,
  userCurrency,
  onBack,
  onConfirm,
  onCancelOrder,
  onError,
}) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClickCancel = () => {
    setModalOpen(true);
  };

  return (
    <LayoutModal
      title={t("crypto-wallet.buy.title.order-preview")}
      onClickBack={onBack}
      ariaLabel="ORDERPREVIEW"
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
                <div className="flex flex-col text-center">
                  <div aria-label="ORDERPREVIEW_YOUARETRANSFERRING_LABEL" className="text-base text-blue-dark">
                    {t("etx.withdraw.order-preview.header.you-are-transferring")}
                  </div>
                  <div
                    aria-label="ORDERPREVIEW_CRYPTOAMOUNT_LABEL"
                    className="text-2xl font-medium leading-relaxed text-blue-dark">
                    {cryptoAmount} {cryptoCurrency}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-lightest">
                <div className="flex flex-col text-center">
                  <div aria-label="ORDERPREVIEW_WHICHEQUALS_LABEL" className="text-base text-blue-dark">
                    {t("etx.invest.order-preview.header.which-equals")}
                  </div>
                  <div
                    aria-label="ORDERPREVIEW_FIATAMOUNT_LABEL"
                    className="text-2xl font-medium leading-relaxed text-blue-dark">
                    {fiatAmount} {fiatCurrency}
                  </div>
                </div>
              </div>
              <div className="mx-3 mt-4 mb-6">
                <div className={orderDetailItemClasses}>
                  <span aria-label="ORDERPREVIEW_TRANSFERTO_LABEL">{t("etx.withdraw.order_preview.transfer_to")}</span>
                  <span aria-label="ORDERPREVIEW_WALLET_LABEL">
                    {t("etx.withdraw.order_preview.humbl_saving_wallet")}
                  </span>
                </div>
                <div className={orderDetailItemClasses}>
                  <span aria-label="ORDERPREVIEW_CRYPTO_LABEL">
                    {t("etx.withdraw.order_preview.cryptoValue", { crypto: cryptoCurrency })}
                  </span>
                  <span aria-label="ORDERPREVIEW_CRYPTOVALUE_LABEL">
                    {formatUsingIntl(exchangeRate!, "standard", userCurrency)}
                  </span>
                </div>
                <div className={orderDetailItemClasses}>
                  <span aria-label="ORDERPREVIEW_AMOUNT_LABEL">{t("etx.withdraw.order_preview.amount")}</span>
                  <span aria-label="ORDERPREVIEW_FIATAMOUNTRECEIPT_LABEL">{total}</span>
                </div>
              </div>
              <div className="flex justify-between mx-6 mt-16 text-2xl font-medium tracking-tight text-white">
                <span aria-label="ORDERPREVIEW_TOTAL_LABEL">{t("etx.withdraw.order-preview.total")}</span>
                <span aria-label="ORDERPREVIEW_TOTALAMOUNT_LABEL">{total}</span>
              </div>
            </>
          )}
        </div>
        <div className="px-6">
          <Button ariaLabel="ORDERPREVIEW_CONFIRM_BUTTON" isDisabled={isSubmitting} onClick={onConfirm}>
            {t("etx.withdraw.order-preview.button.confirm-order")}
          </Button>
        </div>
      </div>
      <OverlayLoading isOpen={!!isSubmitting} />
      <ErrorModal
        isOpen={modalOpen}
        ariaLabel="ORDERPREVIEW"
        IconComponent={<img src={WarningIcon} alt="warning icon" />}
        title={t("etx.withdraw.order-preview.exit-modal.title")}
        subTitle={t("etx.withdraw.order-preview.exit-modal.subtitle")}
        primaryAction={{
          text: t("etx.withdraw.order-preview.exit-modal.confirm-action"),
          action: onCancelOrder,
        }}
        secondaryAction={{
          text: t("etx.withdraw.order-preview.exit-modal.cancel-action"),
          action: () => setModalOpen(false),
        }}
      />
      <ErrorModal
        isOpen={!!error}
        IconComponent={<img src={WarningIcon} alt="warning icon" />}
        title={t("etx.withdraw.order-preview.error-modal.title")}
        subTitle={t("etx.withdraw.order-preview.error-modal.subtitle")}
        primaryAction={{
          text: t("etx.withdraw.order-preview.error-modal.button.confirm-action"),
          action: onError,
        }}
      />
    </LayoutModal>
  );
};

export default OrderPreviewScreen;
