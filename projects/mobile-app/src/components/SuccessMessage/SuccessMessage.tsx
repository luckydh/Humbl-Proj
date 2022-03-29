import React, { FC } from "react";
import { Link } from "react-router-dom";
import { IonPage } from "@ionic/react";
import CheckMark from "components/CheckMark";
import { HomeIcon } from "assets/svgs/HomeIcon";
import { HumblLogoResizeable } from "assets/svgs/HumblLogoResizeable";

export interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: FC<SuccessMessageProps> = ({ children, message }) => (
    <IonPage className="bg-profiles safe-area-top">
      <div className="flex flex-col h-full justify-between pt-12 pb-4">
        <div className="mx-auto max-w-xs px-4">
          <HumblLogoResizeable />
        </div>
        <div className="flex items-center flex-col relative w-full">
          <CheckMark noBackground />
          <div className="flex-1 flex flex-col flex-grow justify-center text-center text-white">
            <h1 className="font-medium text-center text-3xl mt-8 text-white px-12 tracking-tight leading-tight">
              {message}
            </h1>
            {children}
          </div>
        </div>
        <Link
          to="/home"
          replace={true}
          data-testid="return_home"
          className="border-2 border-white border-solid rounded-full self-center my-6">
          <HomeIcon className="w-12 h-12 text-white fill-current" />
        </Link>
      </div>
    </IonPage>
  );

export default SuccessMessage;
