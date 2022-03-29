import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ApolloError } from "@apollo/client";
import { Storage } from "@capacitor/storage";
import { IonModal } from "@ionic/react";

import {
  useGetMyPaymentMethodsQuery,
  PaymentMethodType,
  useRemovePaymentMethodMutation,
  PaymentMethodCategory,
} from "generated/graphql";
import { Button } from "components/Button/Button";
import { Cards } from "./Cards";
import { NoPaymentMethods } from "./NoPaymentMethods";
import { Message } from "components/Message/Message";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { Divider } from "./common";
import { Banks } from "./Banks";
import { AddPaymentMethod } from "./AddPaymentMethod";
import { captureException } from "ErrorLogger";
import { useFeatureFlag } from "utils/Feature";

export const PaymentMethods: React.FC = () => {
  const { data, loading, error, refetch } = usePaymentMethods();
  const { cards, banks } = data;
  const { banksLoading, cardsLoading } = loading;
  const { cardRefetch, bankRefetch } = refetch;

  const [forceBanksLoading, setForceBanksLoading] = useState(false);
  const [autoSwipe, setAutoSwipe] = useState(false);

  const banksLen = banks?.length ?? 0;
  const cardsLen = cards?.length ?? 0;
  const noBanks = !banksLoading && banksLen === 0;
  const noCards = !cardsLoading && cardsLen === 0;
  const noPaymentMethods = noBanks && noCards;

  const { t } = useTranslation();

  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentMethodType | undefined>(undefined);

  const [removePaymentMethod, { loading: removePaymentLoading, error: removePaymentError }] =
    useRemovePaymentMethodMutation();

  const handleCloseRemoveModal = () => {
    setRemoveModalOpen(false);
  };

  const handleCompleted = () => {
    bankRefetch();
    cardRefetch();
  };

  const openDeleteModal = (deletePaymentMethod: PaymentMethodType | undefined) => {
    if (deletePaymentMethod) {
      setPaymentData(deletePaymentMethod);
      setRemoveModalOpen(true);
    }
  };

  useEffect(() => {
    const checkAutoSwipeRequired = async () => {
      const { value } = await Storage.get({ key: "autoSwipeCompleted" });
      setAutoSwipe(value !== "true");
    };
    checkAutoSwipeRequired();
  }, []);

  const autoSwipeCompleted = async () => {
    await Storage.set({ key: "autoSwipeCompleted", value: "true" });
  };

  useEffect(() => {
    if (cardsLen || banksLen) {
      autoSwipeCompleted();
    }
  }, [banksLen, cardsLen]);

  const handleDeletePaymentMethod = async () => {
    if (!paymentData?.id) {
      return;
    }

    try {
      await removePaymentMethod({
        variables: {
          id: paymentData.id,
          type: paymentData.type,
        },
      });

      paymentMethodIsCard(paymentData) ? cardRefetch() : bankRefetch();
      setRemoveModalOpen(false);
    } catch (removeError) {
      captureException(removeError);
    }
  };

  return (
    <>
      {noPaymentMethods ? (
        <NoPaymentMethods />
      ) : (
        <div className="h-full w-full mb-20 overflow-y-auto">
          <Cards
            cards={cards}
            loading={cardsLoading}
            error={error}
            handleDeleteCard={openDeleteModal}
            autoSwipe={autoSwipe}
          />
          {!noBanks && !noCards && (
            <div className="px-6">
              <Divider />
            </div>
          )}
          <Banks
            isAch
            banks={banks}
            loading={banksLoading || forceBanksLoading}
            error={error}
            handleDeleteBank={openDeleteModal}
            autoSwipe={autoSwipe && !cardsLoading && !cardsLen}
          />
          <IonModal isOpen={removeModalOpen} onDidDismiss={handleCloseRemoveModal}>
            <div className="bg-profiles flex flex-col items-center justify-center p-12 h-full">
              <h1 className="text-white text-2xl text-center font-semibold mb-6">
                {paymentMethodIsCard(paymentData) &&
                  t("pages-cards.my-payment-methods.delete-card", {
                    cardBrand: paymentData?.cardBrand?.display,
                    lastFourDigit: paymentData?.lastFour,
                  })}
                {paymentMethodIsBank(paymentData) &&
                  t("pages-cards.my-payment-methods.delete-bank", { lastFourDigit: paymentData?.lastFour })}
              </h1>
            </div>
            <div className="fixed inset-x-0 bottom-0 flex py-4 flex-col px-4 text-lg">
              {removePaymentError && (
                <div className="mt-2 mb-2">
                  <Message variant="error">
                    {paymentMethodIsCard(paymentData) && t("pages-card-edit.delete.message.error")}
                    {paymentMethodIsBank(paymentData) && t("pages-card.my-payment-methods.delete.message.error")}
                  </Message>
                </div>
              )}
              <Button className="mb-2" onClick={handleDeletePaymentMethod}>
                {t("pages-cards.my-payment-methods.button.delete")}
              </Button>
              <Button
                variant="custom"
                customClass="rounded-md w-full border-blue-dark text-blue-dark py-1 px-4 border-2 border-solid"
                onClick={handleCloseRemoveModal}>
                {t("pages-cards.my-payment-methods.button.cancel")}
              </Button>
            </div>
            <OverlayLoading isOpen={removePaymentLoading} />
          </IonModal>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 z-10 mb-6">
        <AddPaymentMethod
          onCompleted={handleCompleted}
          onProcessing={setForceBanksLoading}
          paymentTypes="ALL"
          variant="dark"
          addCardButtonText={t("crypto-wallet.buy.payment-method.add-payment-method")}
          buttonsDisabled={banksLoading}
        />
      </div>
    </>
  );
};

function paymentMethodIsBank(paymentMethod?: PaymentMethodType) {
  return paymentMethod?.type === PaymentMethodCategory.Ach;
}

function paymentMethodIsCard(paymentMethod?: PaymentMethodType) {
  return paymentMethod?.type === PaymentMethodCategory.Card;
}

type UsePaymentMethodsResult = {
  data: {
    banks?: PaymentMethodType[];
    cards?: PaymentMethodType[];
  };
  loading: {
    banksLoading: boolean;
    cardsLoading: boolean;
  };
  error?: ApolloError;
  refetch: {
    bankRefetch: () => void;
    cardRefetch: () => void;
  };
};

function usePaymentMethods(): UsePaymentMethodsResult {
  const isAchEnabled = useFeatureFlag("ach-feature-redux-121521");

  const {
    data: banks,
    loading: banksLoading,
    error: banksError,
    refetch: bankRefetch,
  } = useGetMyPaymentMethodsQuery({
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    skip: !isAchEnabled,
    variables: {
      paymentMethodCategory: PaymentMethodCategory.Ach,
    },
  });

  const {
    data: cards,
    loading: cardsLoading,
    error: cardsError,
    refetch: cardRefetch,
  } = useGetMyPaymentMethodsQuery({
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    data: { banks: banks?.paymentMethods, cards: cards?.paymentMethods },
    loading: { banksLoading, cardsLoading },
    error: banksError ?? cardsError,
    refetch: { bankRefetch, cardRefetch },
  };
}
