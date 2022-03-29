import React, { FC } from "react";
import { IonIcon } from "@ionic/react";

export interface InterestCardProps {
  heading: string;
  content: string;
  src: string;
}

export const InterestCard: FC<InterestCardProps> = ({ heading, content, src }) => (
  <div className="flex rounded-md bg-blue-light bg-cover bg-interestCardBackground">
    <div className="flex flex-col my-4 ml-4 justify-center">
      <div className="text-base font-bold text-blue-dark">{heading}</div>
      <div className="text-sm font-semibold text-blue-dark">{content}</div>
    </div>
    <div className="flex-grow flex justify-end pr-3">
      <div className="px-3 flex">
        <IonIcon icon={src} className="h-24 w-24 self-center" color="dark" />
      </div>
    </div>
  </div>
);

InterestCard.displayName = "InterestCard";
