import { IonIcon, IonPage } from "@ionic/react";
import { KeyboardAwareView } from "components/common";
import { chevronBackOutline } from "ionicons/icons";
import React, { FC } from "react";
import { HumblLogo } from "../../assets/svgs/HumblLogo";

interface Props {
  background?: string;
  onClickBack?: () => void;
  classNames?: string;
  ariaLabel?: string;
}
const LayoutUnauthed: FC<Props> = ({
  background = "bg-lines",
  classNames = "px-6",
  onClickBack,
  children,
  ariaLabel,
}) => (
  <IonPage className={`safe-area-top ${background}`}>
    <div className={`flex flex-col min-h-full ${classNames}`}>
      <div className="flex flex-row justify-center items-center relative">
        {!!onClickBack && (
          <button
            aria-label={ariaLabel && `${ariaLabel}_BACK_BUTTON`}
            type="button"
            className="absolute flex justify-center m-1 w-8 h-8 left-0 text-white"
            onClick={onClickBack}>
            <IonIcon icon={chevronBackOutline} className="text-3xl" />
          </button>
        )}
        <div className="flex items-center justify-center py-8 h-24 flex-shrink-0">
          <HumblLogo />
        </div>
      </div>
      <KeyboardAwareView>{children}</KeyboardAwareView>
    </div>
  </IonPage>
);

export default LayoutUnauthed;
