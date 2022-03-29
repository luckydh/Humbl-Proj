import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { IonModal } from "@ionic/react";
import { PaymentMethodCategory, PaymentMethodType } from "generated/graphql";
import { Label } from "../Label/Label";
import { LayoutModal } from "../PageTemplates/LayoutModal";
import { CardItem, CardItemSkeleton } from "./CardItem";
import PaymentMethodScreen, { PurchasePayload } from "pages/CryptoWallet/BuyingFlow/PaymentMethod/PaymentMethodScreen";
import { CheckBoxCardContainer } from "components/CheckBoxCard";
import { formatExpDate } from "utils/formatExpDate";
import { buildPath } from "utils/routes";
import { LegacyPaymentMethodModal } from "./LegacyPaymentMethodModal";
import { Illustration } from "components/Illustration/Illustration";
import { Icon } from "components/Icon/Icon";

export interface PaymentMethodSelectorProps {
  redirectTo?: string;
  paymentMethods?: PaymentMethodType[];
  selectedPaymentMethod?: PaymentMethodType;
  onSelect?: (paymentMethod: PaymentMethodType, cvv?: string) => void;
  loading?: boolean;
  disabled?: boolean;
  hasCvv?: boolean;
  useLegacyPaymentMethodScreen?: boolean;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  onSelect,
  loading,
  disabled,
  hasCvv,
  redirectTo,
  paymentMethods,
  selectedPaymentMethod,
  useLegacyPaymentMethodScreen,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelect = (
    data: { isLegacy: true; payload: PaymentMethodType } | { isLegacy?: false; payload: PurchasePayload }
  ) => {
    if (data.isLegacy) {
      onSelect?.(data.payload);
    } else {
      const selectedMethod = paymentMethods?.find((item) => item.id === data.payload.paymentMethodId);
      onSelect?.(selectedMethod!, data.payload.cvvConfirmation!);
    }
    setIsModalOpen(false);
  };

  const paymentMethodList = useMemo(() => {
    if (!hasCvv) {
      return paymentMethods;
    }

    return paymentMethods?.filter((item) => item.id !== selectedPaymentMethod?.id);
  }, [paymentMethods, selectedPaymentMethod, hasCvv]);

  const redirect = redirectTo ? `?redirect=${redirectTo}` : "";
  const addCardLink = {
    pathname: buildPath("cardsAdd"),
    search: redirect,
    state: history.location.state ?? null,
  };

  if (loading) {
    return (
      <div className="flex flex-col">
        <Label>{t("payment-page.title.payment-method")}</Label>
        <div className="mt-2 flex flex-col -mx-6">{loading && <CardItemSkeleton />}</div>
      </div>
    );
  }

  const isValidSelectedPaymentMethod = useLegacyPaymentMethodScreen || hasCvv;

  return (
    <>
      <div className="flex flex-col">
        <Label>{t("payment-page.title.payment-method")}</Label>
        <div className="mt-2 flex flex-col -mx-6">
          {!selectedPaymentMethod && (
            <Link to={addCardLink}>
              <div className="flex">
                <CardItem
                  brandName={t("payment-page.action.add-a-new-card")}
                  showChevron
                  bordered={false}
                  className="flex-1"
                  disabled={disabled}
                />
              </div>
            </Link>
          )}

          {selectedPaymentMethod && isValidSelectedPaymentMethod && (
            <CheckBoxCardContainer
              key={selectedPaymentMethod.id}
              className="mb-2 w-full"
              onClick={handleOpenModal}
              title={selectedPaymentMethod.cardBrand?.display}
              icon={
                <img
                  src={selectedPaymentMethod.cardBrand?.image}
                  alt={selectedPaymentMethod.cardBrand?.display}
                  className="w-[30px]"
                />
              }
              subtitle={`**** ${selectedPaymentMethod.lastFour}`}>
              <div className="text-sm text-blue-dark">
                <span>{t("crypto-wallet.buy.payment-method.exp-date")} </span>
                <span className="tabular-nums">{formatExpDate(selectedPaymentMethod.expirationDate!)}</span>
              </div>
            </CheckBoxCardContainer>
          )}

          {selectedPaymentMethod && !isValidSelectedPaymentMethod && (
            <CheckBoxCardContainer
              className="mb-2 w-full"
              onClick={handleOpenModal}
              title="Select Payment Method"
              icon={<Illustration name="asset_cards" size="sm" />}>
              <Icon name="circle_chevron" color="blue-dark2" />
            </CheckBoxCardContainer>
          )}
        </div>
      </div>
      <IonModal isOpen={isModalOpen} onDidDismiss={handleCloseModal}>
        <LayoutModal title={t("payment-page.title.payment-method")} onClickBack={handleCloseModal}>
          {useLegacyPaymentMethodScreen ? (
            <LegacyPaymentMethodModal
              selectedPaymentMethod={selectedPaymentMethod}
              handleCloseModal={handleCloseModal}
              paymentMethodList={paymentMethodList}
              handleSelect={handleSelect}
              addCardLink={addCardLink}
            />
          ) : (
            <div className="mt-8">
              <PaymentMethodScreen
                paymentTypes={PaymentMethodCategory.Card}
                cards={paymentMethodList}
                onContinue={(payload) => handleSelect({ payload })}
              />
            </div>
          )}
        </LayoutModal>
      </IonModal>
    </>
  );
};

export default PaymentMethodSelector;
