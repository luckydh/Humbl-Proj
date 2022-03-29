import React, { useState, useRef, useEffect } from "react";
import { useGetEventQuery, useStartTicketOrderMutation } from "generated/graphql";
import { LayoutPrimary } from "components/PageTemplates/LayoutPrimary";
import { IonIcon } from "@ionic/react";
import { CalendarIcon, TicketIcon } from "assets/icons";
import TickeriLogo from "assets/svgs/TickeriLogo";
import Button from "components/LoaderButton/LoaderButton";
import FadeOutImage from "components/Modules/Ticketing/FadeOutImage";
import cx from "classnames";
import { useHistory, useLocation, useParams, Link } from "react-router-dom";
import moment from "moment-timezone";
import { Loading } from "components/Loading";
import TicketSelector, { TicketOrderType } from "./ticketSelector";
import { Message } from "components/Message/Message";
import { useTranslation } from "react-i18next";

export interface ParamTypes {
  eventId: string;
  platformId: string;
  accountId: string;
  pageState: string;
}

export interface IProps {}

const EventDetail: React.FC<IProps> = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [showDetailsExpansionButton, setShowDetailsExpansionButton] = useState(false);
  const [startOrderError, setStartOrderError] = useState<string | null>(null);
  const history = useHistory();
  const { t } = useTranslation();
  const location = useLocation();
  const { eventId, platformId, accountId, pageState } = useParams<ParamTypes>();
  const ticketSelectionBool = pageState === "ticketSelection";
  const [startTicketOrderMutation] = useStartTicketOrderMutation();
  const { data, loading, error } = useGetEventQuery({
    variables: {
      platformEventId: eventId,
      venuePlatformId: platformId,
      merchantId: accountId,
    },
  });
  const event = data?.getEvent?.eventInfo;
  const { getEvent: { ticketDetails = [] } = {} } = { ...data };

  const detailsRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    data && calculateEventDetailsLineHeight();
  }, [data]);

  const calculateEventDetailsLineHeight = () => {
    setTimeout(() => {
      if (detailsRef.current) {
        const lineHeightStringValue =
          document.defaultView?.getComputedStyle(detailsRef?.current, null).getPropertyValue("line-height") || "0";

        const lineHeightIntValue = parseInt(lineHeightStringValue.slice(0, -2), 10);

        if (detailsRef.current.scrollHeight > lineHeightIntValue * 2) {
          return setShowDetailsExpansionButton(true);
        }
        return setShowDetailsExpansionButton(false);
      }
    }, 0);
  };

  const handleLocalBack = () => {
    setStartOrderError(null);
    history.goBack();
  };

  const handleStartOrder = async (tickets: TicketOrderType[]) => {
    setStartOrderError(null);
    const orderHasTickets = tickets.length > 0;

    if (orderHasTickets) {
      await startTicketOrderMutation({
        variables: {
          tickets,
          merchantId: accountId,
          platformEventId: eventId,
        },
      })
        .then((res) => {
          const orderId = res?.data?.startTicketOrder?.orderId;
          if (orderId) {
            history.replace(`/account/${accountId}/ticketing/${platformId}/orders/${orderId}`);
          }
        })
        .catch(() => {
          setStartOrderError(t("ticket-select-error.too-many-selected"));
        });
    } else {
      setStartOrderError(t("ticket-select-error.none-selected"));
    }
  };

  const getTicketPrice = () => {
    // this is assuming the first ticket option is the lowest price.
    if (ticketDetails[0].price === 0) {
      return t("event-details.label.free");
    }

    if (ticketDetails && ticketDetails.length >= 1) {
      return `${ticketDetails[0].price?.display} ${t("event-details.label.and-up")}`;
    }
  };

  if (loading && !data && !error) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loading loading={loading} />
      </div>
    );
  }

  return (
    <LayoutPrimary
      hideFooter={true}
      showBackButton={true}
      onClickBackHandler={() => {
        handleLocalBack();
      }}>
      {ticketSelectionBool ? (
        <div className="pt-1">
          {startOrderError && (
            <div className="px-6 pb-6">
              <Message variant={"error"}>
                <div className="text-center w-full">{startOrderError}</div>
              </Message>
            </div>
          )}
          <TicketSelector ticketDetails={ticketDetails} startTicketOrder={handleStartOrder} />
        </div>
      ) : (
        <>
          {event?.imageUrl && (
            <div className="-mb-16">
              <FadeOutImage src={event?.imageUrl || ""} />
            </div>
          )}
          <div className="relative flex flex-col h-full px-6 pb-6">
            <h1 className="text-white text-xl font-bold text-left">{event?.title}</h1>
            <div className="flex flex-row mt-4">
              <IonIcon className="relative text-xl mr-4 top-1" icon={CalendarIcon} />
              <div className="flex flex-col">
                <p className="text-white text-lg font-bold">{moment(event?.dateTime).format("dddd, MMM D, YYYY")}</p>
                <p>
                  {t("doors")} {moment(event?.dateTime).format("h:mm a")}
                </p>
              </div>
            </div>
            <div className="flex flex-row mt-4 items-center">
              <IonIcon className="flex text-2xl mr-4" icon={TicketIcon} />
              <p className="flex">{getTicketPrice()}</p>
            </div>
            <div className="flex flex-col mt-4">
              <p className="text-white text-lg font-bold mb-2">{t("event-details.label.details")}</p>
              <p
                className={cx("text-white text-base", {
                  "line-clamp-2": !showDetails,
                })}
                ref={detailsRef}>
                {event?.description}
              </p>
              {showDetailsExpansionButton && (
                <button className="flex" onClick={() => setShowDetails(!showDetails)}>
                  <p className="text-blue-dark text-base font-bold underline mt-2">
                    {showDetails ? t("event-details.label.read-less") : t("event-details.label.read-more")}
                  </p>
                </button>
              )}
              <span className="my-6">
                <Link to={location.pathname + "/ticketSelection"}>
                  <Button text={t("event-details.label.find-tickets")} />
                </Link>
              </span>
            </div>
            <div className="flex justify-center mt-auto">
              <TickeriLogo />
            </div>
          </div>
        </>
      )}
    </LayoutPrimary>
  );
};

export default EventDetail;
