import React from "react";
import { useTranslation } from "react-i18next";
import Button from "components/Button/Button";
import ActionModal from "components/Modules/CryptoWallet/ActionModalAndTabs/ActionModal/ActionModal";

export interface ConfirmationDrawerProps {
  open: boolean;
  title: string;
  subtitle: string;
  onClose: () => void;
  onConfirm: () => void;
  ariaLabel: string;
}

export const ConfirmationDrawer: React.FC<ConfirmationDrawerProps> = ({
  title,
  subtitle,
  children,
  onConfirm,
  open,
  onClose,
  ariaLabel,
}) => {
  const { t } = useTranslation();
  return (
    <ActionModal ariaLabel={ariaLabel} background="bg-white" showActionModal={open} setShowActionModal={onClose}>
      <div className="pt-4">
        <h1 className="text-blue-dark2 text-xl font-bold text-center mb-3" aria-label={`${ariaLabel}_TITLE_LABEL`}>
          {title}
        </h1>
        <p className="text-blue-dark2 text-sm font-light text-center mb-4" aria-label={`${ariaLabel}_BODY_LABEL`}>
          {subtitle}
        </p>
        {children}
        <Button onClick={onConfirm} ariaLabel={`${ariaLabel}_CONTINUE_BUTTON`}>
          {t("global.continue")}
        </Button>
      </div>
    </ActionModal>
  );
};
