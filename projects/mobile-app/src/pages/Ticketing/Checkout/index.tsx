import React, { useCallback, useEffect, useState } from "react";
import cx from "classnames";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { IonModal } from "@ionic/react";
import { ModalContent } from "./ModalContent";
import { Loading } from "components/Loading";
import { Label } from "components/Label/Label";
import { LayoutPrimary } from "components/PageTemplates/LayoutPrimary";
import { PaymentMethodSelector } from "components/PaymentMethodSelector";
import Timer from "components/Modules/Ticketing/Timer";
import Button from "components/LoaderButton/LoaderButton";
import FadeOutImage from "components/Modules/Ticketing/FadeOutImage";
import BottomAction from "components/Modules/Ticketing/BottomAction/BottomAction";
import WarningIcon from "assets/svgs/WarningIcon";
import TimeoutIcon from "assets/svgs/TimeoutIcon";
import TickeriLogoSmall from "assets/svgs/TickeriLogoSmall";
import { useHardwareBackButton } from "hooks/useHardwareBackButton";
import {
  PaymentMethodType,
  useGetOrderQuery,
  useGetEventLazyQuery,
  useCompleteTicketOrderWithPaymentMutation,
} from "generated/graphql";

import "./styles.scss";

interface RouteParams {
  orderId: string;
  accountId: string;
  platformId: string;
}

enum ModalState {
  CLOSED = "closed",
  TIMEOUT = "timeout",
  BACK_PRESSED = "back_pressed",
  PROCESSING_ERROR = "processing_error",
}

const Checkout: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { orderId, accountId, platformId } = useParams<RouteParams>();

  const { data: orderData, loading: orderLoading } = useGetOrderQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      orderId,
      merchantId: accountId,
    },
  });

  const [getEvent, { data: eventData, loading: eventLoading }] = useGetEventLazyQuery({
    fetchPolicy: "cache-and-network",
  });

  const [completeTicketOrder] = useCompleteTicketOrderWithPaymentMutation();

  const [processing, setProcessing] = useState(false);
  const [modalState, setModalState] = useState<ModalState>(ModalState.CLOSED);
  const [selectedCard, setSelectedCard] = useState<PaymentMethodType>();
  const [cvv, setCvv] = useState<string | undefined>();

  const order = orderData?.getOrder;
  const event = eventData?.getEvent?.eventInfo;
  const paymentMethods = orderData?.paymentMethods;

  const isFree = orderData?.getOrder?.orderTotal?.value === 0;

  useEffect(() => {
    if (!isFree && !selectedCard) {
      setSelectedCard(paymentMethods?.[0]);
    }
  }, [isFree, selectedCard, paymentMethods]);

  useEffect(() => {
    if (orderData) {
      getEvent({
        variables: {
          merchantId: accountId,
          venuePlatformId: platformId,
          platformEventId: orderData?.getOrder?.eventId,
        },
      });
    }
  }, [orderData, platformId, accountId, getEvent]);

  const handleBackPressed = useCallback(() => {
    if (!processing) {
      setModalState(ModalState.BACK_PRESSED);
    }
  }, [processing]);

  useHardwareBackButton(handleBackPressed);

  if (eventLoading || orderLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading loading />
      </div>
    );
  }

  const momentDate = moment(event?.dateTime);
  const ticketingUrl = `/account/${accountId}/ticketing/${platformId}`;

  const wrapperClasses = cx("px-6 pb-36", {
    "mt-4": !event?.imageUrl,
    "transform -translate-y-12": event?.imageUrl,
  });

  const handleGoBack = () => {
    handleCloseModal();
    history.replace(`${ticketingUrl}/events/${order?.eventId}/ticketSelection`);
  };

  const handleSelectCard = (paymentMethod: PaymentMethodType, selectedCvv?: string) => {
    setSelectedCard(paymentMethod);

    if (selectedCvv) {
      setCvv(selectedCvv);
    }
  };

  const handleCloseModal = () => {
    setModalState(ModalState.CLOSED);
  };

  const handleTimerExpired = () => {
    setModalState(ModalState.TIMEOUT);
  };

  const handlePlaceOrder = async () => {
    if (!isFree && (!selectedCard || !cvv)) {
      return;
    }

    setProcessing(true);
    try {
      await completeTicketOrder({
        context: {
          uri: process.env.REACT_APP_SECURE_HUMBL_DATA_URL,
        },
        variables: {
          cvv,
          orderId,
          eventId: event?.id,
          merchantId: accountId,
          payMethodId: selectedCard?.id ?? "free",
          postal: selectedCard?.PostalAddress,
        },
      });

      history.replace(`${ticketingUrl}/orders/${orderId}/success`);
    } catch (error) {
      setModalState(ModalState.PROCESSING_ERROR);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <LayoutPrimary hideFooter showBackButton disableBackButton={processing} onClickBackHandler={handleBackPressed}>
      {event?.imageUrl && <FadeOutImage src={event.imageUrl} />}
      <div className={wrapperClasses}>
        <h1 className="text-white text-base font-medium leading-tight tracking-tight mb-2">
          {momentDate.format("dddd, MMM D, YYYY")} | {momentDate.format("h:mma")}
        </h1>
        <h1 className="text-white text-base font-semibold leading-tight tracking-tight">{event?.title}</h1>
        <hr className="border-t border-white my-4" />
        <div>
          <div className="mb-1">
            <Label>{t("ticketing-checkout-page.label.order-summary")}</Label>
          </div>
          {order?.tickets?.map((ticket) => (
            <div key={ticket.id} className="flex items-start justify-between mb-3">
              <div>
                <p className="text-white font-semibold text-base">{ticket.type}</p>
                <p className="text-white font-medium text-sm">
                  {t("ticketing-checkout-page.label.quantity")}: <span className="tabular-nums">{ticket.quantity}</span>{" "}
                  <span className="mx-1">|</span> {ticket.price?.display}
                </p>
              </div>
              <p className="text-white font-medium text-base">
                {ticket.price?.value === 0 ? t("event-details.text.free") : ticket.subtotalPrice?.display}
              </p>
            </div>
          ))}
          <div className="flex justify-between text-sm font-semibold text-secondary mb-2">
            <p>{t("ticketing-checkout-page.label.fees")}</p>
            <p>{order?.orderFees?.display}</p>
          </div>
          <div className="flex justify-between text-white font-semibold text-base">
            <p>{t("ticketing-checkout-page.label.total-due")}</p>
            <p>{order?.orderTotal?.display}</p>
          </div>
          {!isFree && (
            <div className="mt-6">
              <PaymentMethodSelector
                loading={orderLoading}
                disabled={processing}
                redirectTo={pathname}
                hasCvv={!!cvv}
                onSelect={handleSelectCard}
                paymentMethods={paymentMethods}
                selectedPaymentMethod={selectedCard}
              />
            </div>
          )}
        </div>
      </div>
      <BottomAction platformLogo={<TickeriLogoSmall />}>
        <div className="flex justify-center mb-2">
          <Timer onExpired={handleTimerExpired} startingTime={order?.timeRemainingInSecs!} />
        </div>
        <Button
          text={t("ticketing-checkout-page.action.place-order")}
          loading={processing}
          loadingText={t("ticketing-checkout-page.message.processing")}
          onClick={handlePlaceOrder}
        />
      </BottomAction>
      <IonModal
        isOpen={modalState !== ModalState.CLOSED}
        cssClass="warning-modal"
        backdropDismiss={modalState !== ModalState.TIMEOUT}
        onDidDismiss={handleCloseModal}>
        <div className="flex items-center justify-center h-full bg-transparent">
          {modalState === ModalState.TIMEOUT && (
            <ModalContent
              title={t("ticketing-checkout-page.title.time-limit-reached")}
              icon={<TimeoutIcon width={47} />}
              message={t("ticketing-checkout-page.message.ran-out-of-time")}>
              <Button text={t("ticketing-checkout-page.action.back-to-tickets")} onClick={handleGoBack} />
            </ModalContent>
          )}
          {modalState === ModalState.BACK_PRESSED && (
            <ModalContent
              title={t("ticketing-checkout-page.title.are-you-sure-you-want-to-go-back")}
              message={t("ticketing-checkout-page.message.your-transaction-will-be-lost")}>
              <Button text={t("ticketing-checkout-page.action.yes-exit-transaction")} onClick={handleGoBack} />
              <Button
                text={t("ticketing-checkout-page.action.return-to-transaction")}
                variant="outlined"
                className="mt-3"
                onClick={handleCloseModal}
              />
            </ModalContent>
          )}
          {modalState === ModalState.PROCESSING_ERROR && (
            <ModalContent
              title={t("ticketing-checkout-page.title.problem-with-your-transaction")}
              icon={<WarningIcon width={35} />}
              message={t("ticketing-checkout-page.message.unable-to-process-order")}>
              <Button text={t("ticketing-checkout-page.action.return-to-transaction")} onClick={handleCloseModal} />
            </ModalContent>
          )}
        </div>
      </IonModal>
    </LayoutPrimary>
  );
};

export default Checkout;
