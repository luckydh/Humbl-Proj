import React, { useRef, useState } from "react";
import { useUnmount } from "react-use";
import { useHistory, useLocation } from "react-router-dom";
import { buildPath } from "utils/routes";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { useAddCreditCardMutation } from "generated/graphql";
import { CardForm, CardOutput } from "components/CardForm";
import { Message } from "components/Message/Message";
import { useTranslation } from "react-i18next";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { useURLSearchParams } from "hooks/useUrlSearchParams";

const LEAVE_TIMEOUT_MS = 3000;

export interface CardAddLocationState {
  newPaymentMethodId?: string;
}

/**
 * This component should be dropped as soon as the
 * other flows are updated to use the "AddCardFlow" Layer.
 */
const CardAdd: React.FC = () => {
  const { t } = useTranslation();
  const timeoutId = useRef<NodeJS.Timeout>();

  const { redirect } = useURLSearchParams(["redirect"]);
  const history = useHistory<CardAddLocationState>();
  const { state } = useLocation<CardAddLocationState>();

  const [addCardHeader, setaddCardHeader] = useState(true);

  const [addCreditCard, { loading, error }] = useAddCreditCardMutation({
    onCompleted({ createPaymentMethod }) {
      if (createPaymentMethod) {
        timeoutId.current = setTimeout(() => handleGoBack(createPaymentMethod.id), LEAVE_TIMEOUT_MS);
      }
    },
  });

  useUnmount(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  });

  const handleGoBack = (newPaymentMethodId?: string) => {
    if (redirect) {
      return history.replace(redirect, {
        ...state,
        newPaymentMethodId,
      });
    }
    history.replace(buildPath("paymentMethods"));
  };

  const handleComplete = async (data: CardOutput) => {
    await addCreditCard({
      context: {
        uri: process.env.REACT_APP_SECURE_HUMBL_DATA_URL,
      },
      variables: {
        lastFour: data.lastFour,
        cardBrand: data.cardBrand,
        nameOnCard: data.cardholderName,
        expirationDate: data.expirationDate,
        tokenizedCVC: data.cvv,
        tokenizedCardNum: data.cardNumber,
        city: data.city,
        country: data.country,
        postal: data.postalCode,
        region: data.state,
        street: data.addressLine1,
        streetAdditional: data.addressLine2,
      },
    });
  };

  return (
    <LayoutModal
      ariaLabel="ADDCARD"
      onClickBack={handleGoBack}
      title={
        addCardHeader ? t("page-card-add.title.add-card") : t("page-billing-address-step.button.add-billing-address")
      }>
      <OverlayLoading isOpen={loading} />
      {error && <Message variant="error">{t("page-card-add.message.unexpected-error")}</Message>}
      <CardForm onComplete={handleComplete} setIsHeaderAddCard={setaddCardHeader} />
    </LayoutModal>
  );
};

export default CardAdd;
