import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import cx from "classnames";

import ActionModal from "components/Modules/CryptoWallet/ActionModalAndTabs/ActionModal/ActionModal";
import { CheckBoxCardContainer } from "components/CheckBoxCard";
import { PaymentMethodIcon, Title, SubTitle, PaymentTypes } from "./common";
import { ChevronRightFilled } from "assets/icons";
import { IonIcon } from "@ionic/react";
import { Icon } from "components/Icon/Icon";
import { PlaidWrapper } from "components/Plaid/PlaidWrapper";
import { PaymentMethodType } from "generated/graphql";
import Button from "components/Button/Button";
import { chevronForwardOutline } from "ionicons/icons";
import { MasterCardIcon } from "assets/svgs/MasterCard";
import { VisaDarkIcon } from "assets/svgs/VisaDark";
import { DiscoverDarkIcon } from "assets/svgs/DiscoverDark";
import { useCanUsePlaid } from "components/Plaid/plaidHook";
import { useLayerManager } from "components/Layers/hooks";
import { useWarningModal } from "hooks/useWarningModal";
import { ConfirmationDrawer } from "components/ConfirmationDrawer/ConfirmationDrawer";

type AddPaymentMethodProps = {
  buttonsDisabled?: boolean;
  /** for non-ach button, show card providers */
  buttonsShowProviders?: boolean;
  /** for non-ach button, text to place on button */
  addCardButtonText?: string;
  variant?: "light" | "dark";
  ariaLabel?: string;
  paymentTypes?: PaymentTypes;
  onCompleted?: (paymentMethod: PaymentMethodType) => void;
  onProcessing?: (processing: boolean) => void;
};

const supportedCardProviders = [
  { icon: <MasterCardIcon width="16" height="10" />, key: "masterCardIcon" },
  { icon: <VisaDarkIcon />, key: "visaDarkIcon" },
  { icon: <DiscoverDarkIcon />, key: "discoverDarkIcon" },
];

export const AddPaymentMethod: React.FC<AddPaymentMethodProps> = ({
  buttonsDisabled,
  buttonsShowProviders,
  addCardButtonText,
  paymentTypes,
  variant = "light",
  ariaLabel,
  onCompleted,
  onProcessing,
}) => {
  const { t } = useTranslation();
  const canUsePlaid = useCanUsePlaid();

  const [showActionModal, setShowActionModal] = useState(false);
  const [showLimitationsDrawer, setShowLimitationsDrawer] = useState(false);

  const layerManager = useLayerManager();
  const { warningModal, setWarningModalError } = useWarningModal();

  const handleAddCard = () => {
    setShowLimitationsDrawer(true);
  };

  const handleAddCardConfirm = () => {
    setShowActionModal(false);
    setShowLimitationsDrawer(false);
    layerManager.open("addCardFlow", { onComplete: onCompleted });
  };

  const closeModal = () => {
    setShowActionModal(false);
  };

  const openModal = () => {
    setShowActionModal(true);
  };

  const handleProcessing = (isProcessing: boolean) => {
    if (onProcessing) {
      closeModal();
      onProcessing(isProcessing);
    }
  };

  const handleOnSuccess = (paymentMethod: PaymentMethodType) => {
    closeModal();
    onProcessing?.(false);
    onCompleted?.(paymentMethod);
  };

  const canUseACH = canUsePlaid && paymentTypes === "ALL";

  if (!canUseACH) {
    return (
      <div
        className="mx-6"
        onClick={handleAddCardConfirm}
        aria-label={ariaLabel && `${ariaLabel}_ADDPAYMENTMETHOD_BUTTON`}>
        {buttonsShowProviders ? (
          <Button
            variant="custom"
            isDisabled={buttonsDisabled}
            className="w-full pt-2 pb-2 my-4 h-16 pl-4 pr-2 border-2 border-solid rounded-md border-blue-dark text-blue-dark">
            <div className="flex flex-row w-full items-center">
              <div className="font-semibold mt-1">
                {addCardButtonText ?? t("crypto-wallet.buy.payment-method.button.add-a-card")}
              </div>
              <div className="flex flex-row flex-1 justify-end mr-4">
                {supportedCardProviders.map((card) => (
                  <div className="mx-1" key={card.key}>
                    {card.icon}
                  </div>
                ))}
              </div>
              <div className="mt-1">
                <IonIcon icon={chevronForwardOutline} className="text-4xl" />
              </div>
            </div>
          </Button>
        ) : (
          <Button isDisabled={buttonsDisabled} className="w-full py-2 px-6 mt-4 text-center rounded-md">
            {addCardButtonText ?? t("crypto-wallet.buy.payment-method.button.add-a-card")}
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="mx-6">
        <Button
          variant="custom"
          isDisabled={buttonsDisabled}
          onClick={openModal}
          ariaLabel={ariaLabel && `${ariaLabel}_ADDPAYMENTMETHOD_BUTTON`}
          className={cx("w-full px-2 my-4 border-2 border-solid border-blue-dark rounded-md", {
            "bg-blue-dark": variant === "dark",
            "text-blue-dark ": variant === "light",
          })}>
          <div className="flex flex-row w-full items-center justify-center">
            <div className="font-semibold text-lg">{t("crypto-wallet.buy.payment-method.add-payment-method")}</div>
          </div>
        </Button>
      </div>
      <ActionModal
        setShowActionModal={closeModal}
        showActionModal={showActionModal}
        ariaLabel="ADDPAYMENTMETHOD_DRAWER">
        {/* container here avoids scroll due to margin offsets etc */}
        <div className="max-w-full overflow-hidden">
          {/* Accounts for the modal padding of px-6 */}
          <div className="-mx-6">
            <PlaidWrapper
              onExit={closeModal}
              onSuccess={handleOnSuccess}
              onProcessing={handleProcessing}
              onError={setWarningModalError}>
              <CheckBoxCardContainer
                icon={
                  <PaymentMethodIcon>
                    <Icon name="bold_bank" size="xs" />
                  </PaymentMethodIcon>
                }
                title={<Title>{t("pages-cards.my-payment-methods.add-bank-account.title")}</Title>}
                subtitle={<SubTitle>{t("pages-cards.my-payment-methods.add-bank-account.subtitle")}</SubTitle>}
                ariaLabel={ariaLabel && `${ariaLabel}_ADD_ACH_PAYMENTMETHOD_BUTTON`}
                className="relative mb-2 pt-5 bg-gray-100 shadow-md border border-gray-100">
                <IonIcon icon={ChevronRightFilled} className="w-7 h-7" />
                <div className="bg-yellow-light bg-opacity-20 absolute right-0 -top-1.5 px-2 pb-0.5 pt-1.5 rounded-bl-lg shadow-sm">
                  <p className="text-yellow text-xs font-semibold">
                    {t("pages-cards.my-payment-methods.add-bank-account.label")}
                  </p>
                </div>
              </CheckBoxCardContainer>
            </PlaidWrapper>
          </div>
          {/* Accounts for the modal padding of px-6 */}
          <div className="-mx-6">
            <CheckBoxCardContainer
              icon={
                <PaymentMethodIcon>
                  <Icon name="bold_credit_card" size="xs" />
                </PaymentMethodIcon>
              }
              onClick={handleAddCard}
              ariaLabel={ariaLabel && `${ariaLabel}_ADD_CARD_PAYMENTMETHOD_BUTTON`}
              title={
                <Title ariaLabel="ADD_PAYMENT_METHOD_CREDITCARDTITLE_LABEL">
                  {t("pages-cards.my-payment-methods.add-credit-or-debit-card.title")}
                </Title>
              }
              subtitle={
                <SubTitle ariaLabel="ADD_PAYMENT_METHOD_CREDITCARDBODY_LABEL">
                  {t("pages-cards.my-payment-methods.add-credit-or-debit-card.subtitle")}
                </SubTitle>
              }
              className="mb-2 bg-gray-100 shadow-md border border-gray-100">
              <IonIcon icon={ChevronRightFilled} className="w-7 h-7" />
            </CheckBoxCardContainer>
          </div>
        </div>
      </ActionModal>
      <ConfirmationDrawer
        title={t("payment-limitations.drawer.card.title")}
        subtitle={t("payment-limitations.drawer.card.subtitle")}
        open={showLimitationsDrawer}
        onConfirm={handleAddCardConfirm}
        ariaLabel="CREDITCARDLIMITATIONS"
        onClose={() => setShowLimitationsDrawer(false)}
      />
      {warningModal}
    </>
  );
};
