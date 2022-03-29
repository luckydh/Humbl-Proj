import { IonPage, IonIcon } from "@ionic/react";
import cx from "classnames";
import React, { FC, MouseEventHandler, ReactElement, ReactFragment } from "react";
import { useHistory } from "react-router";
import { chevronBackOutline } from "ionicons/icons";
import { KeyboardAwareView } from "components/common/KeyboardAwareView";
import { buildPath } from "utils/routes";

export type TitlePosition = "default" | "offset";

interface Props {
  title: string | ReactFragment | ReactElement;
  background?: string;
  onClickBack?: () => void;
  // TODO: this override should eventually be removed. This is only used because it's unknown
  // how many places depend on the fallback onClickBack behavior
  overrideBack?: () => void;
  onRightClick?: MouseEventHandler;
  leftClickIcon?: ReactElement;
  rightClickIcon?: ReactElement;
  horizontalPadding?: boolean;
  shouldShowLeftButton?: boolean;
  variant?: TitlePosition;
  ariaLabel?: string;
}

export const LayoutModal: FC<Props> = ({
  background = "bg-lines",
  title,
  onClickBack,
  onRightClick,
  overrideBack,
  leftClickIcon,
  rightClickIcon,
  children,
  horizontalPadding = true,
  shouldShowLeftButton = true,
  variant = "default",
  ariaLabel,
}) => {
  const history = useHistory();

  function onClose() {
    if (onClickBack) {
      onClickBack();
    } else {
      if (history.length >= 1) {
        history.goBack();
        return null;
      }
      history.push(buildPath("home"));
      return null;
    }
  }

  const classes = cx("w-max flex-1", {
    "mt-10": variant === "offset",
  });

  return (
    <IonPage className={`safe-area-top ${background}`}>
      <div className="flex-1 flex flex-col w-full h-full">
        <div className="flex flex-wrap items-center px-6 py-5 w-full">
          {shouldShowLeftButton && (
            <button
              aria-label={ariaLabel && `${ariaLabel}_BACK_BUTTON`}
              className="relative justify-center text-white inline-flex top-0.5 left-0 z-10"
              data-testid="layout-modal-close"
              type="button"
              onClick={overrideBack ?? onClose}>
              {leftClickIcon ?? <IonIcon icon={chevronBackOutline} className="text-3xl" />}
            </button>
          )}

          <div className={classes}>
            <h1
              aria-label={ariaLabel && `${ariaLabel}_TITLE_LABEL`}
              className="text-xl capitalize border-white font-medium text-center text-white m-auto">
              {title}
            </h1>
          </div>
          {(rightClickIcon || shouldShowLeftButton) && (
            <div className="w-7">
              {typeof onRightClick === "function" && (
                <button
                  aria-label={ariaLabel && `${ariaLabel}_CLOSE_BUTTON`}
                  className="justify-center inline-flex text-white"
                  onClick={onRightClick}
                  type="button">
                  {rightClickIcon}
                </button>
              )}
            </div>
          )}
        </div>
        <div
          className={cx("flex flex-col flex-1 overflow-auto", {
            "px-6": horizontalPadding,
          })}>
          <KeyboardAwareView>
            <div className="flex flex-col flex-grow flex-shrink-0 mb-6">{children}</div>
          </KeyboardAwareView>
        </div>
      </div>
    </IonPage>
  );
};
