import { IonPage } from "@ionic/react";
import React, { FC } from "react";
import { useHistory } from "react-router";
import { BackIcon } from "../../assets/svgs/BackIcon";
import { HumblLogo } from "../../assets/svgs/HumblLogo";
import { KeyboardAwareView } from "../common";

interface ProfileLayoutProps {
  onClickBack?: () => void;
  showBackButton?: boolean;
}

export const ProfileLayout: FC<ProfileLayoutProps> = ({ children, onClickBack, showBackButton = true }) => {
  const history = useHistory();

  function onClose() {
    if (onClickBack) {
      return onClickBack();
    }

    if (history.length >= 1) {
      history.goBack();
    } else {
      history.push("/verify");
    }
    return null;
  }

  return (
    <IonPage className="bg-profiles safe-area-top">
      <div className="relative flex-1 flex flex-col justify-between w-full h-full">
        <div className="flex items-center justify-center py-6 flex-shink-0">
          <HumblLogo />
        </div>
        {showBackButton && (
          <button
            type="button"
            className="absolute left-6 top-5 justify-center mb-8 text-white"
            onClick={onClose}
            style={{ height: 38, width: 38, margin: 0 }}>
            <BackIcon />
          </button>
        )}
        <KeyboardAwareView>
          <div className="px-6 flex-grow">{children}</div>
        </KeyboardAwareView>
      </div>
    </IonPage>
  );
};
