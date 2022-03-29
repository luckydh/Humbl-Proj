import { HumblLogo } from "assets/svgs/HumblLogo";
import React, { FC } from "react";
import { BackIcon } from "../../assets/svgs/BackIcon";

import { ScrollableView } from "../ScrollableView/ScrollableView";

export type ModalVariant = "default" | "secondary" | "secondary-faded";

export interface ModalProps {
  /** Respond to close button click */
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  onBack?: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
  background?: string;
  ariaLabel?: string;
}

export const Modal: FC<ModalProps> = ({ onClose, onBack, children, title, background = "bg-unauthed", ariaLabel }) => (
  <>
    <div className={`${background} flex flex-col w-full h-full px-6 pt-10`}>
      <button
        type="button"
        className=" absolute left-5 flex items-center justify-center text-white"
        onClick={(e) => {
          !onBack ? onClose(e) : onBack(e);
        }}
        style={{ height: 34, width: 34, top: 38 }}
        aria-label={ariaLabel ? `${ariaLabel}_BACK_BUTTON` : "MODAL_BACK_BUTTON"}>
        <BackIcon />
        {/* {!onBack ? <CloseIcon /> : <BackIcon />} */}
      </button>
      {!!title && (
        <h1
          className="flex items-center m-auto text-xl font-medium"
          aria-label={ariaLabel ? `${ariaLabel}_MODAL_TITLE` : "MODAL_TITLE"}>
          {title}
        </h1>
      )}
      {!title && (
        <div
          className="flex items-center m-auto text-base"
          aria-label={ariaLabel ? `${ariaLabel}_MODAL_TITLE_LOGO` : "MODAL_TITLE_LOGO"}>
          <HumblLogo />
        </div>
      )}
      <ScrollableView>{children}</ScrollableView>
    </div>
  </>
);

export default Modal;

Modal.displayName = "Modal";
