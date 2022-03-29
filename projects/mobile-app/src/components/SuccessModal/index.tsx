import React, { useEffect, useState } from "react";
import { IonModal, IonIcon } from "@ionic/react";
import "./style.css";
import CheckIcon from "assets/svgs/checkmark-border.svg";
import { useTranslation } from "react-i18next";

export interface SuccessModalProps {
  duration?: number;
  message: string;
  isOpen: boolean;
  onTimeout?: () => any;
}

const SuccessModal = ({ duration, message, isOpen: isOpenProp, onTimeout }: SuccessModalProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);

  const handleOnDidPresent = () => {
    if (duration) {
      setTimeout(() => {
        onTimeout && onTimeout();
      }, duration);
    }
  };

  return (
    <IonModal isOpen={isOpen} animated={false} cssClass="success-modal" onDidPresent={handleOnDidPresent}>
      <div className="flex flex-col h-full items-center justify-center">
        <IonIcon className="text-6xl mb-8" icon={CheckIcon} />
        <p className="text-xl font-medium mb-4">{t("success-modal.tittle")}</p>
        <p className="text-base w-52 text-center">{message}</p>
      </div>
    </IonModal>
  );
};

export default SuccessModal;
