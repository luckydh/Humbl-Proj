import React from "react";
import CheckMark from "../../components/CheckMark";
import { HumblLogo } from "../../assets/svgs/HumblLogo";
import { HomeIcon } from "../../assets/svgs/HomeIcon";
import { Link } from "react-router-dom";
import { IonPage } from "@ionic/react";

export interface ConfirmationPageProps {
  title: string;
  subtitle?: string;
  linkTo: string;
}

export const ConfirmationPage = ({
  title,
  subtitle,
  linkTo = "",
}: ConfirmationPageProps) => (
    <IonPage>
      <div className="flex flex-col flex-grow justify-between">
        <div className="flex flex-col flex-grow">
          <div className="flex flex-col mb-12 items-center">
            <HumblLogo />
          </div>
          <div className="flex flex-col mb-6 items-center">
            <CheckMark noBackground />
          </div>
          <div className="flex flex-col items-center mb-4">
            <span className="text-white text-2xl">{title}</span>
          </div>
          <div className="flex flex-col items-center mb-6">
            <span className="text-white">{subtitle}</span>
          </div>
        </div>
        <div className="flex flex-col flex-grow flex-auto justify-end">
          <Link
            to={linkTo}
            replace={true}
            data-testid="return_home"
            className="border-2 border-white border-solid rounded-full self-center my-6"
          >
            <HomeIcon className="w-12 h-12 text-white fill-current" />
          </Link>
        </div>
      </div>
    </IonPage>
  );
