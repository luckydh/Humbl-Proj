import React, { useEffect } from "react";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { useHistory, useParams } from "react-router-dom";
import { useGetPaymentMethodQuery, useEditCreditCardMutation } from "generated/graphql";
import { CardForm, CardOutput } from "components/CardForm";
import { Message } from "components/Message/Message";
import { useTranslation } from "react-i18next";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { buildPath } from "utils/routes";

interface RouteParams {
  id: string;
}

const LEAVE_TIMEOUT_MS = 3000;

const CardEdit: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { id: cardId } = useParams<RouteParams>();

  const { data: cardData } = useGetPaymentMethodQuery({
    variables: { id: cardId },
    fetchPolicy: "network-only",
  });

  const [editCreditCard, { data, loading, error }] = useEditCreditCardMutation();

  useEffect(() => {
    if (!data?.editPaymentMethod) {
      return;
    }

    const timeout = setTimeout(() => {
      history.push(buildPath("paymentMethods"));
    }, LEAVE_TIMEOUT_MS);

    return () => {
      clearTimeout(timeout);
    };
  }, [data, history]);

  const handleComplete = async (formData: CardOutput) => {
    await editCreditCard({
      context: {
        uri: process.env.REACT_APP_SECURE_HUMBL_DATA_URL,
      },
      variables: {
        id: cardId,
        lastFour: formData.lastFour,
        cardBrand: formData.cardBrand,
        nameOnCard: formData.cardholderName,
        expirationDate: formData.expirationDate,
        tokenizedCVC: formData.cvv,
        tokenizedCardNum: formData.cardNumber,
        city: formData.city,
        country: formData.country,
        postal: formData.postalCode,
        region: formData.state,
        street: formData.addressLine1,
        streetAdditional: formData.addressLine2,
      },
    });
  };

  return (
    <LayoutModal title={t("pages-card-edit.title.edit-card")}>
      {error && <Message variant="error">{t("page-card-add.message.unexpected-error")}</Message>}
      {cardData?.paymentMethod && <CardForm onComplete={handleComplete} initialData={cardData?.paymentMethod} />}
      <OverlayLoading isOpen={loading} />
    </LayoutModal>
  );
};

export default CardEdit;
