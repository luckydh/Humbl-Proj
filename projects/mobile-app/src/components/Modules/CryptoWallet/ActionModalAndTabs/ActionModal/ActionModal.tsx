import React, { FC } from "react";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { IonModal } from "@ionic/react";
import { ScrollableView } from "components/ScrollableView/ScrollableView";

import "./style.scss";

export type ModalVariant = "default" | "secondary" | "secondary-faded";
export type TitleVariant = "default" | "semiBold";
export interface ActionModalProps {
  title?: string;
  background?: string;
  setShowActionModal: (arg: boolean) => void;
  showActionModal: boolean;
  onClick?: () => void;
  showCloseButton?: boolean;
  contentClass?: string;
  onCloseClick?: () => void;
  closeButtonIsText?: boolean;
  crossButtonTestId?: string;
  ariaLabel: string;
  titleVariant?: TitleVariant;
}

const VARIANTS: Record<TitleVariant, string> = {
  default: "text-normal font-medium",
  semiBold: "font-semibold pl-2 text-base",
};

export const ActionModal: FC<ActionModalProps> = ({
  setShowActionModal,
  showActionModal,
  children,
  title,
  onCloseClick,
  background = "bg-blue-lightest",
  showCloseButton = false,
  contentClass = "",
  closeButtonIsText = true,
  crossButtonTestId,
  ariaLabel,
  titleVariant = "default",
}) => {
  const { t } = useTranslation();

  const handleClose = () => {
    setShowActionModal(false);
    onCloseClick?.();
  };

  return (
    <IonModal isOpen={showActionModal} backdropDismiss showBackdrop onDidDismiss={handleClose} cssClass="action-modal">
      <div className="absolute bottom-0 flex items-end w-full pointer-events-auto">
        <div
          className={`rounded-t-2xl overflow-hidden relative w-full safe-area-bottom pb-8 ${background}`}
          aria-label={`${ariaLabel}_DRAWER`}>
          {showCloseButton && !title && (
            <div className="flex justify-end pt-2 pr-2">
              <button
                type="button"
                aria-label={`${ariaLabel}_CLOSE_BUTTON`}
                className={cx(
                  "text-blue tracking-tight p-2",
                  { "font-medium text-lg": !contentClass },
                  { "text-blue-dark trasform rotate-45 text-3xl font-normal": !closeButtonIsText }
                )}
                onClick={handleClose}>
                {closeButtonIsText ? t("global.close") : "+"}
              </button>
            </div>
          )}
          <div
            className={cx("flex flex-col w-full px-6", {
              "pt-2": showCloseButton,
              "pt-6": !showCloseButton,
            })}>
            {showCloseButton && !!title && (
              <div className={cx("flex pb-2 w-full", { "flex-row w-full justify-around": title, "pr-2": !title })}>
                {!!title && (
                  <h1
                    aria-label={`${ariaLabel}_TITLE`}
                    className={cx("flex items-center text-blue-dark w-full", VARIANTS[titleVariant])}>
                    {title}
                  </h1>
                )}
                <button
                  aria-label={crossButtonTestId}
                  type="button"
                  className={cx(
                    "tracking-tight",
                    { "font-medium text-lg": !contentClass && closeButtonIsText },
                    {
                      "text-blue-dark trasform rotate-45 text-3xl font-normal items-end pr-3": !closeButtonIsText,
                      "text-blue p-2 leading-1": closeButtonIsText,
                    }
                  )}
                  onClick={handleClose}>
                  {/* TODO replace the plus with a styled out closeIcon */}
                  {closeButtonIsText ? t("global.close") : "+"}
                </button>
              </div>
            )}

            <ScrollableView>{children}</ScrollableView>
          </div>
        </div>
      </div>
    </IonModal>
  );
};

export default ActionModal;
