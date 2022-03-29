import React, { useState } from "react";
import Button from "components/Button/Button";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { CloseIcon } from "assets/svgs/CloseIcon";
import { Trans, useTranslation } from "react-i18next";
import cx from "classnames";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { useLocation } from "react-router";
import { QuoteType } from "generated/graphql";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { formatUsingIntl } from "utils/currency";
import { ErrorModal } from "components/ErrorHandling/ErrorModal";
import WarningIcon from "assets/svgs/Warning-Icon.svg";
import Banner from "components/Banner/Banner";
import { CelebrationIcon, InfoIconDark } from "assets/icons";
import { SendUserIcon } from "pages/CryptoWallet/SendFlow/SendUserIcon/SendUserIcon";
import { HumblError, mapErrorCodeToTranslationKey } from "graphql/humblGraphqlError";
import { OrderPreviewSkeleton } from "../../OrderPreviewSkeleton";
import ActionModal from "../../ActionModalAndTabs/ActionModal/ActionModal";

export type SendOrderPreviewProps = {
  quote?: QuoteType;
  isLoadingQuote: boolean;
  isLoadingConfirmation: boolean;
  error?: HumblError | undefined;
  coinImage?: string;
  userImage?: string;
  displayName?: string;
  onConfirmOrder: () => void;
  onRightClick?: () => void;
  ariaLabel?: string;
  onClickBack: () => void;
};

type OrderPreviewLayoutProps = {
  loading: boolean;
  onRightClick?: () => void;
  onClickBack?: () => void;
  ariaLabel?: string;
};

/**
 * Abstracted layout container
 * @param loading shows overlay loading for submitting
 * @returns Layout
 */
const SendOrderPreviewLayout: React.FC<OrderPreviewLayoutProps> = ({
  loading,
  children,
  onRightClick,
  ariaLabel,
  onClickBack,
}) => {
  const location = useLocation();
  const { t } = useTranslation();

  const handleOpenRemoveModal = () => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Close",
      pathName: location.pathname,
    });
    if (onRightClick) onRightClick();
  };

  return (
    <LayoutModal
      title={t("crypto-wallet.buy.title.order-preview")}
      horizontalPadding={false}
      rightClickIcon={
        <div className="m-2 mt-3">
          <CloseIcon />
        </div>
      }
      ariaLabel={ariaLabel}
      onClickBack={onClickBack}
      onRightClick={handleOpenRemoveModal}
    >
      <OverlayLoading isOpen={loading} />
      {children}
    </LayoutModal>
  );
};

/**
 * SendOrderPreview thin component which handles loading, error, and data states.
 * @returns
 */
const SendOrderPreview: React.FC<SendOrderPreviewProps> = ({
  quote,
  isLoadingQuote,
  error,
  isLoadingConfirmation,
  userImage = "",
  coinImage = "",
  displayName = "",
  onConfirmOrder,
  onRightClick,
  ariaLabel,
  onClickBack,
}) => {
  const { t } = useTranslation();
  const classes = cx("flex justify-between my-3");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const handleBannerClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (isLoadingQuote) {
    return (
      <SendOrderPreviewLayout loading={false} onRightClick={onRightClick}>
        <OrderPreviewSkeleton />
      </SendOrderPreviewLayout>
    );
  }

  const onCrossIconClick = () => {
    setErrorModalOpen(true);
  };

  if (error) {
    return (
      <SendOrderPreviewLayout loading={false}>
        <ErrorModal
          isOpen={!!error}
          ariaLabel="CANCELCONFIRMATION"
          IconComponent={<img src={WarningIcon} alt="warning icon" />}
          title={t("crypto-wallet.send.order-preview.error-modal.title")}
          subTitle={
            <>
              <p className="mt-2 mb-4">{error && t(mapErrorCodeToTranslationKey(error.humblErrorCode))}</p>
              {t("crypto-wallet.send.order-preview.error-modal.subtitle")}
            </>
          }
          primaryAction={{
            text: t("crypto-wallet.send.order-preview.error-modal.confirm-action"),
            action: onClickBack,
          }}
        />
      </SendOrderPreviewLayout>
    );
  }

  if (!quote) {
    return null;
  }

  const { sourceAmount, sourceCurrencyCode, fiatCurrencyCode, fiatAmount, fiatFees, destination, isInternal, notes } =
    quote;

  return (
    <SendOrderPreviewLayout
      ariaLabel={ariaLabel}
      onClickBack={onClickBack}
      loading={isLoadingConfirmation}
      onRightClick={onCrossIconClick}
    >
      <div className="pb-6">
        {userImage && coinImage && displayName && (
          <div className="bg-blue-lightest pt-2 px-4 pb-4 border border-white h-24">
            <div className="flex flex-col text-base item-center text-center font-normal" style={{ color: "#035B8B" }}>
              <SendUserIcon
                ariaLabel={ariaLabel}
                image={userImage}
                coinImage={coinImage}
                displayName={displayName}
                size="lg"
              />
            </div>
          </div>
        )}
        <div className="bg-blue-lightest p-4 border border-white">
          <div className="flex flex-col flex-1 text-center">
            <div
              aria-label={ariaLabel && `${ariaLabel}_YOUARESENDING_LABEL`}
              className="text-base item-center text-center font-normal"
              style={{ color: "#035B8B" }}
            >
              {t("order-preview-text-you-are-sending")}
            </div>
            <div
              aria-label={ariaLabel && `${ariaLabel}_CRYPTOAMOUNT_LABEL`}
              className="text-blue-dark leading-relaxed font-medium text-2xl"
            >
              {sourceAmount} {sourceCurrencyCode}
              {/*
               * TODO: FIXME: This should use decimalPrecision when it is figured out. This use case
               * is slightly different since the backend returns the srouceValue as a string (when decimalPrecision
               * calls for a number/float value)
               * {decimalPrecision(sourceValue, ORDER_PREVIEW_DECIMAL_PRECISION)} {sourceCurrency}
               * */}
            </div>
          </div>
        </div>

        <div className="bg-blue-lightest p-4 border border-white">
          <div className="flex flex-col flex-1 text-center">
            <div
              aria-label={ariaLabel && `${ariaLabel}_WHICHEQUALS_LABEL`}
              className="text-base item-center text-center font-normal"
              style={{ color: "#035B8B" }}
            >
              {t("order-preview-text-which-equals")}
            </div>
            <div
              aria-label={ariaLabel && `${ariaLabel}_FIATAMOUNT_LABEL`}
              className="text-blue-dark leading-relaxed font-medium text-2xl"
            >
              {formatUsingIntl(fiatAmount, "standard", fiatCurrencyCode)} {fiatCurrencyCode}
            </div>
          </div>
        </div>

        <div className="text-lg text-white items-center mt-8 mb-6 mx-6 font-normal">
          <div className={classes}>
            <span aria-label={ariaLabel && `${ariaLabel}_TRANSFERTO_LABEL`} className="whitespace-nowrap w-3/6">
              {t("order-preview-text-transfer-to")}:
            </span>
            <span aria-label={ariaLabel && `${ariaLabel}__ADDRESS_LABEL`} className="text-right w-3/6 truncate">
              {destination}
            </span>
          </div>

          <hr />
          {notes && (
            <div className={classes}>
              <span aria-label={ariaLabel && `${ariaLabel}_NOTE_LABEL`}>{t("order-preview-text-note")}:</span>
              <span aria-label={ariaLabel && `${ariaLabel}_NOTEPHRASE_LABEL`} className="truncate">
                {notes}
              </span>
            </div>
          )}

          <hr />
          <div className={classes}>
            <span aria-label={ariaLabel && `${ariaLabel}_AMOUNT_LABEL`}>{t("order-preview-text-amount")}:</span>
            <span aria-label={ariaLabel && `${ariaLabel}_FIATAMOUNTRECEIPT_LABEL`}>
              {formatUsingIntl(fiatAmount, "standard", fiatCurrencyCode)}
            </span>
          </div>
          <hr />
          <div className={classes}>
            <span aria-label={ariaLabel && `${ariaLabel}_FEES_LABEL`}>{t("order-preview-text-fees")}:</span>
            <span aria-label={ariaLabel && `${ariaLabel}_FEESAMOUNT_LABEL`}>
              {formatUsingIntl(fiatFees || 0, "standard", fiatCurrencyCode)}
            </span>
          </div>
          {isInternal && (
            <>
              <div className="h-14">
                <Banner
                  ariaLabel="ORDERPREVIEW_GASSLESS"
                  text={
                    <Trans
                      i18nKey="send-order-preview.fee.banner-text"
                      components={{ em: <em className="text-blue font-normal not-italic" /> }}
                    />
                  }
                  size="fill"
                  fontSize="regular"
                  bgColor="white"
                  leftIcon={<img src={CelebrationIcon} alt="Credit Card Artwork" />}
                  rightIcon={<img src={InfoIconDark} alt="Letter i inside Circle" />}
                  onClick={handleBannerClick}
                />
              </div>
              <ActionModal
                ariaLabel="GASSLESS"
                background="bg-white"
                setShowActionModal={setIsModalOpen}
                showActionModal={isModalOpen}
                showCloseButton
              >
                <div className="pb-3 pt-5 px-2">
                  <h1 aria-label="GASSLESS_TITLE_LABEL" className="text-blue-dark2 text-xl font-bold text-center mb-3">
                    {t("send-order-preview.action-modal.header-text")}
                  </h1>
                  <p aria-label="GASSLESS_BODY_LABEL" className="text-blue-dark2 text-sm font-light text-center mb-4">
                    {t("send-order-preview.action-modal.main-text")}
                  </p>
                </div>
              </ActionModal>
            </>
          )}
        </div>

        <div className="text-white items-center mt-8 mb-6 mx-6 font-semibold text-3xl">
          <div className={classes}>
            <span aria-label={ariaLabel && `${ariaLabel}_TOTAL_LABEL`}>{t("order-preview-text-total")}:</span>
            <span aria-label={ariaLabel && `${ariaLabel}_TOTALAMOUNT_LABEL`}>
              {formatUsingIntl(fiatAmount + (fiatFees || 0), "standard", fiatCurrencyCode)}
            </span>
          </div>
        </div>
        <div className="px-6 w-full mb-10">
          <Button ariaLabel={ariaLabel && `${ariaLabel}_CONFIRM_BUTTON`} onClick={onConfirmOrder}>
            {t("order-preview-button-confirm-send")}
          </Button>
        </div>
      </div>

      <ErrorModal
        isOpen={errorModalOpen}
        IconComponent={<img src={WarningIcon} alt="warning icon" />}
        title={t("crypto-wallet.buy.order-preview.exit-modal.title")}
        subTitle={t("crypto-wallet.buy.order-preview.exit-modal.subtitle")}
        secondaryAction={{
          text: t("crypto-wallet.buy.order-preview.exit-modal.cancel-action"),
          action: () => setErrorModalOpen(false),
        }}
        primaryAction={
          onRightClick
            ? {
                text: t("crypto-wallet.buy.order-preview.exit-modal.confirm-action"),
                action: onRightClick,
              }
            : undefined
        }
        ariaLabel="CANCELCONFIRMATION"
      />
    </SendOrderPreviewLayout>
  );
};
export default SendOrderPreview;
