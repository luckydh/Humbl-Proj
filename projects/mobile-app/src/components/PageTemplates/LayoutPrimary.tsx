import { IonPage, IonIcon } from "@ionic/react";
import React, { FC, MouseEventHandler, ReactElement } from "react";
import { chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { HumblLogoResizeable } from "assets/svgs/HumblLogoResizeable";
import { KeyboardAwareView } from "components/common/KeyboardAwareView";
import NewFooter from "../Footer/Footer-v2";
/** View that takes up remaining vertical space and is scrollable */
interface Props {
  showBackButton?: boolean;
  hideFooter?: boolean;
  background?: string;
  onClickBackHandler?: () => void;
  leftButton?: React.ReactNode;
  disableBackButton?: boolean;

  onRightClick?: MouseEventHandler;
  rightClickIcon?: ReactElement;
}

export const LayoutPrimary: FC<Props> = ({
  showBackButton = false,
  hideFooter = false,
  onClickBackHandler,
  children,
  leftButton,
  disableBackButton = false,
  background = "bg-lines",
  onRightClick,
  rightClickIcon,
}) => {
  const history = useHistory();

  function onClickBack() {
    if (disableBackButton) {
      return null;
    }

    if (onClickBackHandler) {
      onClickBackHandler();
      return;
    }

    if (history.length >= 1) {
      history.goBack();
    } else {
      history.push("/verify");
    }
    return null;
  }

  return (
    <IonPage className="safe-area-top bg-blue ion-container" data-testid="LayoutPrimary">
      <div className={`flex flex-col flex-grow justify-between ${background} h-full bg-blue`}>
        <div className="relative flex items-center justify-center py-6 px-6 flex-shink-0 layout-header align-middle">
          {/* Absolutely position the action items so we can justify between */}
          <div className="flex justify-between w-full items-center">
            <div className="w-3/12 inline-flex">
              {leftButton && leftButton}
              {!leftButton && showBackButton && (
                <button
                  title="Go back"
                  type="button"
                  className="left-6 top-6 justify-center text-white z-10"
                  onClick={onClickBack}
                  disabled={disableBackButton}
                >
                  <IonIcon icon={chevronBackOutline} className="text-3xl" />
                </button>
              )}
            </div>
            <div className="w-6/12">
              <div aria-label="ONBOARDING_HUMBL_LOGO" className="w-32 mx-auto">
                <HumblLogoResizeable />
              </div>
            </div>
            <div className="flex justify-end w-3/12">
              {onRightClick && (
                <button type="button" className="justify-center text-white" onClick={onRightClick}>
                  {rightClickIcon}
                </button>
              )}
            </div>
          </div>
        </div>
        <KeyboardAwareView>{children}</KeyboardAwareView>

        {!hideFooter && <NewFooter />}
      </div>
    </IonPage>
  );
};
