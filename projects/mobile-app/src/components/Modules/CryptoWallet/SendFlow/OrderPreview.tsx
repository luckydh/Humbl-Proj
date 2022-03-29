import Button from "components/Button/Button";
import React, { useEffect } from "react";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { CloseIcon } from "assets/svgs/CloseIcon";
import { useTranslation } from "react-i18next";
import cx from "classnames";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { useHardwareBackButton } from "hooks/useHardwareBackButton";
import { useLocation } from "react-router";
import AlertCircleIcon from "assets/svgs/AlertCircleIcon";

type OrderProps = {
  title: string;
  value: string;
  currency: string;
  titleAriaLabel?: string;
  currencyAriaLabel?: string;
};

const OrderItems: React.FC<OrderProps> = ({ currency, title, value, titleAriaLabel, currencyAriaLabel }) => (
  <div className="bg-blue-lightest p-4 border border-white">
    <div className="flex flex-col flex-1 text-center">
      <div aria-label={titleAriaLabel} className="text-base item-center text-center font-normal text-blue-dark">
        {title}
      </div>
      <div aria-label={currencyAriaLabel} className="text-blue-dark leading-relaxed font-medium text-2xl">
        {value} {currency}
      </div>
    </div>
  </div>
);

export interface HeaderItem {
  title: string;
  value: string;
  currency: string;
  titleAriaLabel?: string;
  currencyAriaLabel?: string;
}

type OrderPreviewProps = {
  transferTo: string;
  note?: string;
  amount: string;
  fees: string;
  total: string;
  headerItems: Array<HeaderItem>;
  onClickBack: () => void;
  onClickCancel: () => void;
  onClickConfirm: () => void;
  ariaLabel?: string;
};

const OrderPreview: React.FC<OrderPreviewProps> = ({
  transferTo,
  note,
  amount,
  fees,
  total,
  headerItems,
  onClickBack,
  onClickCancel,
  onClickConfirm,
  ariaLabel,
}) => {
  const classes = cx("flex justify-between mb-3");
  const location = useLocation();

  const handleOpenRemoveModal = () => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Close",
      pathName: window.location.pathname,
    });
    onClickCancel();
  };
  const { t } = useTranslation();
  useHardwareBackButton(onClickBack, 1000);

  const handleConfirmSend = () => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Confirm Send",
      pathName: window.location.pathname,
    });
    onClickConfirm();
  };

  useEffect(() => {
    trackEvent(EVENTS.SCREEN_VIEW, {
      screenName: "Order Preview",
      pathName: location.pathname,
    });
  }, [location.pathname]);

  return (
    <LayoutModal
      ariaLabel={ariaLabel}
      title="Order Preview"
      horizontalPadding={false}
      onClickBack={onClickBack}
      rightClickIcon={
        <div className="m-2 mt-3">
          <CloseIcon />
        </div>
      }
      onRightClick={handleOpenRemoveModal}>
      <div className="pb-6">
        {headerItems &&
          headerItems.map((item) => (
            <OrderItems
              titleAriaLabel={item.titleAriaLabel}
              currencyAriaLabel={item.currencyAriaLabel}
              key={item.title}
              title={item.title}
              value={item.value}
              currency={item.currency}
            />
          ))}
        <div className="p-4 bg-blue-lightest">
          <div
            aria-label={ariaLabel && `${ariaLabel}_WYREDISCLAIMER_LABEL`}
            className="flex justify-center align-middle items-center">
            <div className="block">
              <AlertCircleIcon width={14} height={14} />
            </div>
            <p className="text-[10px] text-blue-dark px-2 max-w-xs font-semibold">
              {t("select-crypto-asset.withdraw.order-preview-alert-text")}
            </p>
          </div>
        </div>
        <div className="text-lg text-white items-center mt-8 mb-6 mx-6 font-normal">
          <div className={classes}>
            <span aria-label={ariaLabel && `${ariaLabel}_TRANSFERTO_LABEL`} className="whitespace-nowrap pr-1">
              {t("order-preview-text-transfer-to")}:
            </span>
            <span aria-label={ariaLabel && `${ariaLabel}_BANKNAME_LABEL`} className="text-right">
              {transferTo}
            </span>
          </div>

          {note && (
            <>
              <hr className="mb-3" />
              <div className={classes}>
                <span aria-label={ariaLabel && `${ariaLabel}_NOTE_LABEL`}>{t("order-preview-text-note")}:</span>
                <span aria-label={ariaLabel && `${ariaLabel}_NOTE`}>{note}</span>
              </div>
            </>
          )}
          <hr className="mb-3" />
          <div className={classes}>
            <span aria-label={ariaLabel && `${ariaLabel}_AMOUNT_LABEL`}>
              {t("select-crypto-asset.withdraw.order-preview-text-amount")}:
            </span>
            <span aria-label={ariaLabel && `${ariaLabel}_AMOUNT`}>{amount}</span>
          </div>
          <hr className="mb-3" />
          <div className={classes}>
            <span aria-label={ariaLabel && `${ariaLabel}_FEES_LABEL`}>
              {t("select-crypto-asset.withdraw.order-preview-text-fees")}:
            </span>
            <span aria-label={ariaLabel && `${ariaLabel}_FEESAMOUNT_LABEL`}>{fees}</span>
          </div>
        </div>

        <div className="text-white items-center mt-8 mb-6 mx-6 font-semibold text-2xl">
          <div className={classes}>
            <span aria-label={ariaLabel && `${ariaLabel}_TOTAL_LABEL`}>
              {t("select-crypto-asset.withdraw.order-preview-text-total")}:
            </span>
            <span aria-label={ariaLabel && `${ariaLabel}_TOTALAMOUNT_LABEL`}>{total}</span>
          </div>
        </div>
        <div className="px-6 w-full mb-10">
          <Button ariaLabel={ariaLabel && `${ariaLabel}_WITHDRAW_BUTTON`} onClick={handleConfirmSend}>
            {t("select-crypto-asset.withdraw.order-preview-button-confirm-send")}
          </Button>
        </div>
      </div>
    </LayoutModal>
  );
};
export default OrderPreview;
