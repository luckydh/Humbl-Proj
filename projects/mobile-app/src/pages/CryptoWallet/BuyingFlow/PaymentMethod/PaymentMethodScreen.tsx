import React, { useState } from "react";
import { ApolloError } from "@apollo/client";
import { Trans, useTranslation } from "react-i18next";
import { AssetBalanceType, PaymentMethodStatus, PaymentMethodType, PaymentMethodCategory } from "generated/graphql";
import { Button } from "components/Button/Button";
import { Message } from "components/Message/Message";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { AddCardIcon } from "assets/svgs/AddCardIcon";
import { CheckBoxCard } from "components/CheckBoxCard/CheckBoxCard";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { CreditCardCheckbox } from "components/Modules/CryptoWallet/CreditCardCheckbox";
import { CheckBoxCardSkeleton } from "components/CheckBoxCard/CheckBoxCardSkeleton";
import { decimalPrecision } from "utils/decimalPrecision";
import { SupportedCardProviders } from "components/SupportedCardProviders/SupportedCardProviders";
import ActionModal from "components/Modules/CryptoWallet/ActionModalAndTabs/ActionModal/ActionModal";
import { CloseIcon } from "assets/svgs/CloseIcon";
import { BuyingFlowPaymentMethodType as PurchaseMethodType } from "../sharedTypes";
import { AddPaymentMethod } from "pages/PaymentMethods/AddPaymentMethod";
import { PlaidDataCard } from "pages/PaymentMethods/PlaidDataCard";
import { WarningModal } from "components/WarningModal";
import { getErrorMessage } from "graphql/humblGraphqlError";
import { Icon } from "components/Icon/Icon";
import { PaymentTypes } from "pages/PaymentMethods/common";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import { useLayerManager } from "components/Layers/hooks";
import { PaymentLimitationsBanner } from "./PaymentLimitationsBanner";

export interface PaymentMethodScreenProps {
  error?: ApolloError;
  cards?: PaymentMethodType[];
  banks?: PaymentMethodType[];
  assets?: AssetBalanceType[];
  isLoading?: boolean;
  isSubmitting?: boolean;
  showBanner?: boolean;
  ariaLabel?: string;
  paymentTypes?: PaymentTypes;
  onContinue: (payload: PurchasePayload) => void;
  refetchPaymentMethods?: () => void;
  onBack?: () => void;
  onClickClose?: () => void;
}

export interface PurchasePayload {
  type: PaymentMethodCategory | PurchaseMethodType.Asset;
  assetCode?: string;
  paymentMethodId?: string;
  cvvConfirmation?: string;
  cardLastFour?: string;
}

interface PurchaseMethodAsset extends AssetBalanceType {
  type: PurchaseMethodType.Asset;
}

const isCardDisabled = (card: PaymentMethodType): boolean => {
  const region = card.region?.toLowerCase();
  return region === "ny" || region === "new york" || region === "tx" || region === "texas";
};

export type PurchaseMethod = PurchaseMethodAsset | PaymentMethodType;

export const PaymentMethodScreen: React.FC<PaymentMethodScreenProps> = ({
  cards,
  error,
  banks,
  assets,
  onBack,
  onClickClose,
  onContinue,
  isLoading,
  isSubmitting,
  paymentTypes,
  refetchPaymentMethods,
  showBanner,
  ariaLabel,
}) => {
  const { t } = useTranslation();
  const layerManager = useLayerManager();
  const [cvv, setCvv] = useState("");
  const [cvvError, setCvvError] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PurchaseMethod>();
  const [plaidData, setPlaidData] = useState<PaymentMethodType | null>(null);
  const [plaidProcessing, setIsPlaidProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bankModalMessage, setBankModalMessage] = useState<{ title: string; description: string } | null>(null);
  const { currentAccount } = useGetCurrentAccount();

  const isSelected = (identifier?: string) => {
    if (selectedMethod?.type === PaymentMethodCategory.Card || selectedMethod?.type === PaymentMethodCategory.Ach) {
      return selectedMethod.id === identifier;
    }

    if (selectedMethod?.type === PurchaseMethodType.Asset) {
      return selectedMethod.code === identifier;
    }

    return false;
  };

  const handleClickContinue = () => {
    onContinue({
      type: selectedMethod!.type,
      cvvConfirmation: cvv !== "" ? cvv : undefined,
      assetCode: (selectedMethod as AssetBalanceType).code,
      paymentMethodId: (selectedMethod as PaymentMethodType).id,
      cardLastFour: (selectedMethod as PaymentMethodType).lastFour
        ? (selectedMethod as PaymentMethodType).lastFour
        : undefined,
    });
  };

  const handleSelectCard = (card: PaymentMethodType) => {
    setCvv("");
    setCvvError(false);
    if (isCardDisabled(card)) {
      setIsModalOpen(true);
    } else {
      setSelectedMethod(card);
    }
  };

  const closeBankWarningModal = () => {
    setBankModalMessage(null);
  };

  const openBankWarningModal = (status?: PaymentMethodStatus) => {
    const isPending = status === PaymentMethodStatus.Pending;

    setBankModalMessage({
      title: isPending
        ? t("crypto-wallet.buy.payment-method.warning.pending.title")
        : t("crypto-wallet.buy.payment-method.warning.error.title"),
      description: isPending
        ? t("crypto-wallet.buy.payment-method.warning.pending.description")
        : t("crypto-wallet.buy.payment-method.warning.error.description"),
    });
  };

  const handleSelectBank = (bank: PaymentMethodType) => {
    if (bank.status !== PaymentMethodStatus.Active) {
      openBankWarningModal(bank.status);
      return;
    }

    setCvvError(false);
    setSelectedMethod(bank);
  };

  const handleSelectAsset = (asset: AssetBalanceType) => {
    setCvvError(false);
    setSelectedMethod({ type: PurchaseMethodType.Asset, ...asset });
  };

  const handlePaymentAdded = (paymentMethod: PaymentMethodType) => {
    if (paymentMethod?.type === PaymentMethodCategory.Card) {
      setSelectedMethod(paymentMethod);
      // new cards need to be queried in, plaid loads plaid data so refetch not needed there
      refetchPaymentMethods?.();
      return;
    }

    setPlaidData(paymentMethod);
    handleSelectBank(paymentMethod);
  };

  const noAssets = !assets?.length;
  const noCards = !cards?.length;
  const noBanks = !banks?.length && !plaidData && !plaidProcessing;
  const noPaymentMethods = noAssets && noBanks && noCards;

  if (isLoading) {
    return (
      <BaseLayout onBack={onBack} onClickClose={onClickClose} isSubmitting={false}>
        <div className="px-6">
          <CheckBoxCardSkeleton className="mb-2" />
          <CheckBoxCardSkeleton className="mb-2" />
          <CheckBoxCardSkeleton className="mb-2" />
          <hr className="w-full h-px my-4 bg-white bg-opacity-50 border-0" />
          <CheckBoxCardSkeleton className="mb-2" />
          <CheckBoxCardSkeleton className="mb-2 " />
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout onBack={onBack} onClickClose={onClickClose} isSubmitting={!!isSubmitting} ariaLabel={ariaLabel}>
      {showBanner && (
        <PaymentLimitationsBanner isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} ariaLabel={ariaLabel} />
      )}
      <div className="flex flex-col flex-grow">
        <div aria-label={ariaLabel && `${ariaLabel}_CRYPTO_SECTION`}>
          {assets?.map((asset) => (
            <div key={asset.code} className="mb-2">
              <CheckBoxCard
                ariaLabel={ariaLabel && `${ariaLabel}_CRYPTO`}
                title={<span aria-label={ariaLabel && `${ariaLabel}_CRYPTONAME_LABEL`}>{asset.name!}</span>}
                icon={
                  <div className="p-1 bg-white bg-opacity-50 rounded-full">
                    <img
                      alt={asset.name}
                      className="object-contain"
                      style={{ width: 22, height: 22 }}
                      src={asset.logoImage}
                      aria-label={ariaLabel && `${ariaLabel}_CRYPTO_LOGO`}
                    />
                  </div>
                }
                middleColumnContent={
                  <div
                    className="text-sm truncate text-blue-dark"
                    aria-label={ariaLabel && `${ariaLabel}_CRYPTOAMOUNT_LABEL`}
                  >
                    {decimalPrecision(asset.amount!)} {asset.code}
                  </div>
                }
                subtitle={
                  <span aria-label={ariaLabel && `${ariaLabel}_CRYPTOFIATAMOUNT_LABEL`}>
                    {asset.fiatAmount?.display}
                  </span>
                }
                onClick={() => handleSelectAsset(asset)}
                selected={isSelected(asset?.code)}
                bottomLineContent={
                  isSelected(asset?.code) && (
                    <Button
                      className="mb-2 mt-4"
                      onClick={handleClickContinue}
                      isDisabled={!selectedMethod}
                      ariaLabel={ariaLabel && `${ariaLabel}_CRYPTOCONTINUE_BUTTON`}
                    >
                      {t("global.continue")}
                    </Button>
                  )
                }
              />
            </div>
          ))}
        </div>
        <div className="px-6">
          {!noAssets && !noCards && <hr className="w-full h-px my-4 bg-white bg-opacity-50 border-0" />}
        </div>
        <div aria-label={ariaLabel && `${ariaLabel}_CREDITCARD_SECTION`}>
          {cards?.map((card) => (
            <div key={card.id} className="mb-2">
              <CreditCardCheckbox
                card={card}
                ariaLabel={ariaLabel && `${ariaLabel}_CARD`}
                onSelect={handleSelectCard}
                selected={isSelected(card?.id)}
                onCvvChange={setCvv}
                onCvvError={setCvvError}
                disabled={isCardDisabled(card)}
                handleClickContinue={handleClickContinue}
              />
              {isSelected(card?.id) && cvvError && (
                <div className="mt-4 mb-2">
                  <Message variant="error">{t("crypto-wallet.buy.payment-method.error.card-cvv")}</Message>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="px-6">
          {(!noAssets || !noCards) && !noBanks && <hr className="w-full h-px my-4 bg-white bg-opacity-50 border-0" />}
          {banks?.map((bank) => (
            <div key={bank.id} className="mb-2">
              <PlaidDataCard data={bank} key={bank.id} onSelect={handleSelectBank} isSelected={isSelected(bank?.id)}>
                <Button className="mb-2 mt-4" onClick={handleClickContinue}>
                  {t("global.continue")}
                </Button>
              </PlaidDataCard>
            </div>
          ))}
          {noPaymentMethods && (
            <>
              <div className="flex flex-col items-center justify-center flex-grow">
                <AddCardIcon />
                <h1
                  className="-mt-6 text-2xl tracking-tight text-center text-white"
                  aria-label={ariaLabel && `${ariaLabel}_ADDPAYMENTTITLE_LABEL`}
                >
                  {t("crypto-wallet.buy.payment-method.add-payment-method")}
                </h1>
                <p
                  className="mt-2 text-base tracking-normal text-center text-white"
                  aria-label={ariaLabel && `${ariaLabel}_ADDPAYMENTBODY_LABEL`}
                >
                  {t("crypto-wallet.buy.payment-method.payment-method-message")}
                </p>
              </div>
              <div className="mt-2">
                <SupportedCardProviders />
              </div>
            </>
          )}
          {(plaidData || plaidProcessing) && (
            <PlaidDataCard data={plaidData} onSelect={handleSelectBank} isSelected={isSelected(plaidData?.id)}>
              <Button className="mb-2 mt-4" onClick={handleClickContinue}>
                {t("global.continue")}
              </Button>
            </PlaidDataCard>
          )}
        </div>
        <AddPaymentMethod
          ariaLabel={ariaLabel}
          paymentTypes={paymentTypes}
          buttonsDisabled={isSubmitting}
          buttonsShowProviders={!noPaymentMethods}
          onProcessing={setIsPlaidProcessing}
          onCompleted={handlePaymentAdded}
        />
        <WarningModal
          show={!!error}
          title={<Icon name="bold_danger" color="red" size="md" />}
          message={getErrorMessage(error)}
        />

        {bankModalMessage && (
          <ActionModal
            ariaLabel="BANK_PAYMENT_METHOD_PENDING_MODAL"
            background="bg-white"
            setShowActionModal={closeBankWarningModal}
            showActionModal
            showCloseButton
          >
            <div className="p-8">
              {currentAccount?.kycNeeded ? (
                // The text in this component will be translated via this key, no need to worry about the untranslated text
                <Trans i18nKey="crypto-wallet.buy.payment-method.warning.kycNeeded.message">
                  <h1 className="text-blue-dark2 text-xl font-bold text-center mb-3">
                    This payment method needs additional details
                  </h1>
                  <p className="text-blue-dark2 text-sm font-light text-center mb-4">
                    It looks like we need a couple more details from you. Click here to{" "}
                    <div
                      className="text-blue font-medium tracking-tight"
                      onClick={() => {
                        closeBankWarningModal();
                        layerManager.open("updateKYC");
                      }}
                    >
                      Add Personal Details.
                    </div>
                  </p>
                </Trans>
              ) : (
                <>
                  <h1 className="text-blue-dark2 text-xl font-bold text-center mb-3">{bankModalMessage.title}</h1>
                  <p className="text-blue-dark2 text-sm font-light text-center mb-4">{bankModalMessage.description}</p>
                </>
              )}
            </div>
          </ActionModal>
        )}
      </div>
    </BaseLayout>
  );
};

interface BaseLayoutProps {
  onBack: PaymentMethodScreenProps["onBack"];
  onClickClose: PaymentMethodScreenProps["onClickClose"];
  isSubmitting: boolean;
  ariaLabel?: string;
}
const BaseLayout: React.FC<BaseLayoutProps> = ({ children, isSubmitting, onBack, onClickClose, ariaLabel }) => {
  const { t } = useTranslation();
  return (
    <LayoutModal
      title={t("crypto-wallet.buy.title.payment-method")}
      horizontalPadding={false}
      onClickBack={onBack}
      onRightClick={onClickClose}
      ariaLabel={ariaLabel}
      rightClickIcon={
        <div className="m-2 mt-3">
          <CloseIcon />
        </div>
      }
    >
      <div className="flex flex-col pt-2 transition-all duration-150">{children}</div>
      <OverlayLoading isOpen={isSubmitting} />
    </LayoutModal>
  );
};

export default PaymentMethodScreen;
