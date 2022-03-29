import React from "react";
import { useTranslation } from "react-i18next";
import { ApolloError } from "@apollo/client";

import { BankType, PaymentMethodStatus, PaymentMethodType } from "generated/graphql";
import { CheckBoxCardContainer } from "components/CheckBoxCard";
import { IonIcon } from "@ionic/react";
import { bankBlueIcon } from "assets/icons";
import { PaymentMethodIcon, Loading, formatMaskedValue } from "./common";
import { Message } from "components/Message/Message";

interface BanksProps {
  loading: boolean;
  error?: ApolloError;
  autoSwipe?: boolean;
  handleDeleteBank: (deletePaymentMethod: PaymentMethodType | undefined) => void;
  banks?: (PaymentMethodType | BankType)[];
  isAch?: boolean;
}

export const Banks: React.FC<BanksProps> = ({
  banks = [],
  loading,
  error,
  handleDeleteBank,
  autoSwipe = false,
  isAch,
}) => {
  const { t } = useTranslation();

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

  return (
    <>
      {banks.map((bank, index) => (
        <CheckBoxCardContainer
          key={bank.id}
          icon={
            <PaymentMethodIcon transparent>
              <IonIcon icon={bankBlueIcon} />
            </PaymentMethodIcon>
          }
          id={bank.id}
          autoSwipe={autoSwipe && index === 0}
          className="mb-2 w-full"
          disabled={isAch && (bank as PaymentMethodType).status !== PaymentMethodStatus.Active}
          title={
            <p className="text-base font-medium">
              {isAch ? (bank as PaymentMethodType).name : (bank as BankType).nickname}
            </p>
          }
          subtitle={<p className="text-sm font-medium">{formatMaskedValue(bank.lastFour)}</p>}
          onDelete={() => handleDeleteBank(bank as PaymentMethodType)}
        />
      ))}
    </>
  );
};
