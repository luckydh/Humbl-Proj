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
import { CoinChip } from "components/Modules/CryptoWallet/CoinChip/CoinChip";
import { compactNumberFormat } from "utils/compactNumberFormat";

interface EtxOrderData {
  currencyCode?: string;
  currencyName?: string;
  image?: string;
  percentage?: string;
}
export interface OrderPreviewScreenProps {
  onBack?: () => void;
  onConfirm?: () => void;
  onCancelOrder: () => void;
  onError: () => void;
  isLoading?: boolean;
  isSubmitting?: boolean;
  error: HumblError | undefined;
  fiatAmount?: string;
  fees?: string;
  paymentMethod?: string;
  fiatCurrency?: string;
  cryptoAmount?: string;
  cryptoCurrency?: string;
  etxOrderData: EtxOrderData[] | undefined;
  purchaseAmount: string;
  total: string;
  blockName: string;
  ariaLabel?: string;
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
  purchaseAmount,
  paymentMethod,
  fees,
  error,
  etxOrderData,
  blockName,
  onBack,
  onConfirm,
  onCancelOrder,
  onError,
  ariaLabel,
}) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClickCancel = () => {
    setModalOpen(true);
  };

  return (
    <LayoutModal
      ariaLabel={ariaLabel}
      title={t("etx.invest.order-preview.title.order-preview")}
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
                <div className="flex flex-col text-center">
                  <div
                    className="text-base text-blue-dark"
                    aria-label={ariaLabel && `${ariaLabel}_YOUAREINVESTING_LABEL`}>
                    {t("etx.invest.order-preview.header.you-are-investing", { blockName })}
                  </div>
                  <div
                    className="text-2xl font-medium leading-relaxed text-blue-dark"
                    aria-label={ariaLabel && `${ariaLabel}_CRYPTOAMOUNT_LABEL`}>
                    {cryptoAmount} {cryptoCurrency}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-lightest">
                <div className="flex flex-col text-center">
                  <div className="text-base text-blue-dark" aria-label={ariaLabel && `${ariaLabel}_WHICHEQUALS_LABEL`}>
                    {t("etx.invest.order-preview.header.which-equals")}
                  </div>
                  <div
                    className="text-2xl font-medium leading-relaxed text-blue-dark"
                    aria-label={ariaLabel && `${ariaLabel}_FIATAMOUNT_LABEL`}>
                    {fiatAmount} {fiatCurrency}
                  </div>
                </div>
              </div>
              <div className="mx-6 mt-4">
                <div aria-label={ariaLabel && `${ariaLabel}_CRYPTODISTRIBUTIONTITLE_LABEL`}>
                  {t("etx.invest.order-preview.header.amount-distributed")}
                </div>
                <div
                  className="flex flex-wrap py-3 text-sm font-normal tracking-tight text-white border-b border-white border-opacity-75 border-solid"
                  aria-label={ariaLabel && `${ariaLabel}_CRYPTODISTRIBUTION_SECTION`}>
                  {etxOrderData?.map((data) => (
                    <div className="mb-2 mr-3" key={data.currencyCode}>
                      <CoinChip
                        ariaLabel="ORDERPREVIEW"
                        size="xx-small"
                        bgType="bg-solid"
                        coinImage={data.image}
                        content={`${data.currencyCode} ${compactNumberFormat(parseFloat(data.percentage ?? "0"))}%`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mx-6 mb-6">
                <div className={orderDetailItemClasses}>
                  <span>{t("etx.invest.order-preview.payment-method")}</span>
                  <span>{paymentMethod}</span>
                </div>
                <div className={orderDetailItemClasses}>
                  <span>{t("etx.invest.order-preview.purchase")}</span>
                  <span>{`${purchaseAmount} ${fiatCurrency}`}</span>
                </div>
                <div className={orderDetailItemClasses}>
                  <span>{t("etx.invest.order-preview.fees")}</span>
                  <span>{fees}</span>
                </div>
              </div>
              <div className="flex justify-between mx-6 text-2xl font-medium tracking-tight text-white">
                <span aria-label={ariaLabel && `${ariaLabel}_TOTAL_LABEL`}>{t("etx.invest.order-preview.total")}</span>
                <span aria-label={ariaLabel && `${ariaLabel}_TOTALAMOUNT_LABEL`}>{total}</span>
              </div>
            </>
          )}
        </div>
        <div className="px-6">
          <Button isDisabled={isSubmitting} onClick={onConfirm} ariaLabel={ariaLabel && `${ariaLabel}_CONFIRM_BUTTON`}>
            {t("etx.invest.order-preview.button.confirm-order")}
          </Button>
        </div>
      </div>
      <OverlayLoading isOpen={!!isSubmitting} />
      <ErrorModal
        ariaLabel="CANCELCONFIRMATION"
        isOpen={modalOpen}
        IconComponent={<img src={WarningIcon} alt="warning icon" />}
        title={t("etx.invest.order-preview.exit-modal.title")}
        subTitle={t("etx.invest.order-preview.exit-modal.subtitle")}
        primaryAction={{
          text: t("etx.invest.order-preview.exit-modal.confirm-action"),
          action: onCancelOrder,
        }}
        secondaryAction={{
          text: t("etx.invest.order-preview.exit-modal.cancel-action"),
          action: () => setModalOpen(false),
        }}
      />
      <ErrorModal
        isOpen={!!error}
        IconComponent={<img src={WarningIcon} alt="warning icon" />}
        title={t("etx.invest.order-preview.error-modal.title")}
        subTitle={<>{t("etx.invest.order-preview.error-modal.subtitle")}</>}
        primaryAction={{
          text: t("etx.invest.order-preview.error-modal.button.confirm-action"),
          action: onError,
        }}
      />
    </LayoutModal>
  );
};

export default OrderPreviewScreen;
