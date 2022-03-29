import React from "react";
import VenueTitle from "components/Modules/Ticketing/VenueTitle/VenueTitle";
import { IonPage, IonIcon } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { HumblLogo } from "assets/svgs/HumblLogo";
import { ScrollableView } from "components/ScrollableView/ScrollableView";
import { EventCard } from "components/Modules/Ticketing/EventCard";
import TickeriLogo from "assets/svgs/TickeriLogo";
import { useGetVenueByIdQuery } from "generated/graphql";
import { Link } from "react-router-dom";
import { Loading } from "components/Loading";
import CalendarImage from "assets/svgs/CalendarImage.svg";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

interface Props {
  id: string;
}

export const VenueProfile = (props: Props) => {
  const { data, loading } = useGetVenueByIdQuery({
    variables: {
      id: props.id,
    },
  });

  const { t } = useTranslation();
  const history = useHistory();

  const venue = data?.getVenueById;
  const events = data?.getVenueById?.venueEvents?.events;

  const hasEvents = events && events?.length > 0;

  const onClickBack = () => {
    if (history.length >= 1) {
      history.goBack();
    } else {
      history.replace("/home");
    }
  };

  return (
    <IonPage className="bg-lines">
      <ScrollableView>
        <div className="relative flex items-center justify-center py-6">
          <button className="absolute left-3 top-6 justify-center text-white z-10" onClick={onClickBack}>
            <IonIcon icon={chevronBackOutline} className="text-3xl" />
          </button>
          <HumblLogo />
        </div>
        {loading && (
          <div className="flex justify-center pt-24">
            <Loading loading={true} />
          </div>
        )}
        {!loading && (
          <>
            <div className="px-4 flex flex-1 flex-col">
              <VenueTitle
                title={venue?.merchant?.displayName || ""}
                address={{
                  street: venue?.merchant?.address?.street,
                  city: venue?.merchant?.address?.city,
                  postal: venue?.merchant?.address?.postal,
                  region: venue?.merchant?.address?.region,
                }}
              />
              {hasEvents && (
                <h2 className="text-white font-medium text-lg mb-4">{t("page-venue-profile.upcoming-events")}</h2>
              )}
              {!hasEvents && (
                <div className="flex flex-col flex-1 items-center justify-center relative bottom-10">
                  <IonIcon className="flex text-8xl" icon={CalendarImage} />
                  <p className="text-white font-medium text-2xl text-center mt-4">
                    {t("page-venue-profile.no-events")}
                  </p>
                </div>
              )}

              {events?.map((event, index) => (
                  <div className="mb-4" key={index}>
                    <Link
                      to={`/account/${venue?.merchant?.id}/ticketing/${venue?.platformId}/events/${event.eventInfo.id}`}>
                      <EventCard
                        title={event.eventInfo.title}
                        platform="tickeri"
                        image={event.eventInfo.imageUrl}
                        date={new Date(event.eventInfo.dateTime)}
                      />
                    </Link>
                  </div>
                ))}
            </div>
            <div className="flex justify-center pb-4">
              <TickeriLogo />
            </div>
          </>
        )}
      </ScrollableView>
    </IonPage>
  );
};
