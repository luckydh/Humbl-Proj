import React from "react";
import { IonModal } from "@ionic/react";
import Button from "../Button/Button";

export interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  subTitle: string;
  confirmationButtonText: string;
  cancelButtonText: string;
  onCancel: () => void;
  onConfirm: () => void;
  IconComponent?: JSX.Element;
  ariaLabel?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  IconComponent,
  cancelButtonText,
  confirmationButtonText,
  isOpen,
  onCancel,
  onConfirm,
  subTitle,
  title,
  ariaLabel,
}) => (
  <IonModal isOpen={isOpen}>
    <div className="h-full flex flex-col text-white">
      <div className="flex flex-col flex-grow justify-end items-center pb-4 px-4">
        {IconComponent && <div className="mb-4">{IconComponent}</div>}
        <p
          className="text-center text-3xl mb-2 break-words w-100 relative"
          aria-label={ariaLabel && `${ariaLabel}_TITLE_LABEL`}>
          {title}
        </p>
        <p className="text-center mb-2 break-words w-100 relative" aria-label={ariaLabel && `${ariaLabel}_BODY_LABEL`}>
          {subTitle}
        </p>
      </div>
      <div className="flex flex-col flex-grow items-center justify-end px-4 pb-2 sm:pb-6 md:pb-8">
        <Button onClick={onConfirm} className="mb-3" ariaLabel={ariaLabel && `${ariaLabel}_YES_BUTTON`}>
          {confirmationButtonText}
        </Button>
        <Button
          ariaLabel={ariaLabel && `${ariaLabel}_NO_BUTTON`}
          onClick={onCancel}
          variant="text"
          className="border-2 border-solid border-blue-dark2 text-blue-dark2 rounded-md">
          {cancelButtonText}
        </Button>
      </div>
    </div>
  </IonModal>
);
