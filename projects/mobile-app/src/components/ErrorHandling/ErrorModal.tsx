import React from "react";
import { IonModal } from "@ionic/react";
import Button from "../Button/Button";

export interface ErrorModalProps {
  isOpen: boolean;
  title: string;
  subTitle: React.ReactNode;
  primaryAction?: {
    text: string;
    action: () => void;
  };
  secondaryAction?: {
    text: string;
    action: () => void;
  };
  IconComponent?: JSX.Element;
  ariaLabel?: string;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
  IconComponent,
  primaryAction,
  secondaryAction,
  isOpen,
  title,
  subTitle,
  ariaLabel,
}) => (
  <IonModal isOpen={isOpen}>
    <div className="h-full flex flex-col text-white">
      <div className="flex flex-col flex-grow justify-end items-center pb-4 px-4">
        {IconComponent && <div className="mb-4">{IconComponent}</div>}
        <p
          aria-label={ariaLabel && `${ariaLabel}_TITLE_LABEL`}
          className="text-center text-3xl mb-2 break-words w-100 relative">
          {title}
        </p>
        <p aria-label={ariaLabel && `${ariaLabel}_BODY_LABEL`} className="text-center mb-2 break-words w-100 relative">
          {subTitle}
        </p>
      </div>
      <div className="flex flex-col flex-grow items-center justify-end px-4 pb-2 sm:pb-6 md:pb-8">
        {!!primaryAction && (
          <Button
            onClick={primaryAction.action}
            className="mb-3"
            ariaLabel={ariaLabel && `${ariaLabel}_PRIMARY_BUTTON`}>
            {primaryAction.text}
          </Button>
        )}
        {!!secondaryAction && (
          <Button
            onClick={secondaryAction.action}
            variant="text"
            ariaLabel={ariaLabel && `${ariaLabel}_SECONDARY_BUTTON`}
            className="border-2 border-solid border-blue-dark2 text-blue-dark2 rounded-md">
            {secondaryAction.text}
          </Button>
        )}
      </div>
    </div>
  </IonModal>
);
