import { IonIcon } from "@ionic/react";
import moment from "moment";
import React, { FC } from "react";
import calendar from "assets/svgs/calendar.svg";
import clock from "assets/svgs/clock.svg";

export type EventCardProps = {
  title: string;
  date?: Date;
  image?: string;
  platform: string;
  onClick?: () => void;
};

export const EventCard: FC<EventCardProps> = (props) => {
  const { title, image, platform, date, onClick } = props;
  return (
    <button className="w-full bg-blue-dark rounded-lg overflow-hidden shadow-lg block text-left" onClick={onClick}>
      {image && (
        <div className="bg-black w-full flex justify-center">
          <img src={image} alt={`Event - ${platform} : ${title}`} />
        </div>
      )}
      <div className="m-4 text-white">
        <h3 className="text-xl">{title}</h3>
        <time dateTime={moment(date).toISOString()} className="text-base flex flex-col sm:flex-row items-center">
          <div className="flex items-center">
            <IonIcon src={calendar} className="mr-1" />
            <span>{moment(date).format("dddd, MMM D, YYYY")}</span>
          </div>
          <div className="flex items-center sm:ml-6">
            <IonIcon src={clock} className="mr-1" />
            <span>{moment(date).format("h:mma")}</span>
          </div>
        </time>
      </div>
    </button>
  );
};
