import React from "react";
import { useTranslation } from "react-i18next";
import { ApolloError } from "@apollo/client";
import { CheckBoxCardContainer } from "components/CheckBoxCard";
import { PaymentMethodType } from "generated/graphql";
import { formatExpDate } from "utils/formatExpDate";
import { Message } from "components/Message/Message";
import { formatMaskedValue, Loading } from "./common";
import { useHistory } from "react-router";
import { buildPath } from "utils/routes";

type CardsProps = {
  cards?: PaymentMethodType[];
  loading: boolean;
  error?: ApolloError;
  autoSwipe?: boolean;
  handleDeleteCard: (deleteData: PaymentMethodType | undefined) => void;
};

export const Cards: React.FC<CardsProps> = ({ cards = [], loading, error, handleDeleteCard, autoSwipe = false }) => {
  const { t } = useTranslation();
  const history = useHistory();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="mb-4 px-6">
        <Message variant="error">{t("page-card-list.message.unexpected-error")}</Message>
      </div>
    );
  }

  const handleEdit = (cardId: string) => {
    history.push(buildPath("cards_Card_edit", { id: cardId }));
  };

  return (
    <>
      {cards.map((card, index) => (
        <CheckBoxCardContainer
          key={card.id}
          className="mb-2 w-full"
          title={card.cardBrand?.display}
          icon={<img src={card.cardBrand?.image} alt={card.cardBrand?.display} className="w-[30px]" />}
          subtitle={formatMaskedValue(card.lastFour)}
          autoSwipe={autoSwipe && index === 0}
          id={card.id}
          onEdit={handleEdit}
          onDelete={() => handleDeleteCard(card)}>
          <div className="text-sm text-blue-dark">
            <span>{t("crypto-wallet.buy.payment-method.exp-date")} </span>
            <span className="tabular-nums">{formatExpDate(card.expirationDate!)}</span>
          </div>
        </CheckBoxCardContainer>
      ))}
    </>
  );
};
