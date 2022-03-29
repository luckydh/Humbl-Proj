import React, { useRef, useState } from "react";
import { useUnmount } from "react-use";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { useAddCreditCardMutation } from "generated/graphql";
import { CardForm, CardOutput } from "components/CardForm";
import { Message } from "components/Message/Message";
import { useTranslation } from "react-i18next";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { LayerComponentProps } from "components/Layers/common";

const LEAVE_TIMEOUT_MS = 3000;

/**
 * This is the expected Layer to be used everywhere to add a new card.
 * The legacy component will be dropped as soon as all other flows are updated.
 */
export const AddCardFlow: React.FC<LayerComponentProps<"addCardFlow">> = ({ onClose, onComplete }) => {
  const { t } = useTranslation();
  const timeoutId = useRef<NodeJS.Timeout>();
  const [isHeaderAddCard, setIsHeaderAddCard] = useState(true);
  const [addCreditCard, { loading, error }] = useAddCreditCardMutation({
    onCompleted({ createPaymentMethod }) {
      if (createPaymentMethod) {
        onComplete?.(createPaymentMethod);
        timeoutId.current = setTimeout(() => {
          onClose();
        }, LEAVE_TIMEOUT_MS);
      }
    },
  });

  useUnmount(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  });

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
      onClickBack={onClose}
      title={
        isHeaderAddCard ? t("page-card-add.title.add-card") : t("page-billing-address-step.button.add-billing-address")
      }>
      <OverlayLoading isOpen={loading} />
      {error && <Message variant="error">{t("page-card-add.message.unexpected-error")}</Message>}
      <CardForm onComplete={handleComplete} setIsHeaderAddCard={setIsHeaderAddCard} />
    </LayoutModal>
  );
};
