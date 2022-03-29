import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IonIcon } from "@ionic/react";
import { VectorIcon, TransferIcon } from "assets/icons";
import ActionModalAndTabs, { Disabled } from "components/Modules/CryptoWallet/ActionModalAndTabs";

interface ActionBuyButtonsProps {
  cryptoId?: string;
  onBuy: () => void;
  disableTabs?: Set<Disabled>;
  ariaLabel?: string;
}

const BUTTON_BASE_STYLE = "rounded-lg flex flex-row items-center justify-center text-md py-3 w-full font-medium";
const BUY_BUTTON_CLASS = `${BUTTON_BASE_STYLE} bg-white text-blue-dark mr-2`;
const TRANSFER_BUTTON_CLASS = `${BUTTON_BASE_STYLE} bg-blue-dark text-white`;

export const ActionBuyButtons: React.FC<ActionBuyButtonsProps> = ({ cryptoId, onBuy, disableTabs, ariaLabel }) => {
  const { t } = useTranslation();
  const [showActionModal, setShowActionModal] = useState(false);

  const handleOnTransfer = () => {
    setShowActionModal(true);
  };

  return (
    <>
      <button aria-label={ariaLabel && `${ariaLabel}_BUY_BUTTON`} onClick={onBuy} className={BUY_BUTTON_CLASS}>
        <IonIcon className="mr-2 " icon={VectorIcon} />
        {t("coin-info.buy")}
      </button>
      <button
        aria-label={ariaLabel && `${ariaLabel}_TRANSFER_BUTTON`}
        onClick={handleOnTransfer}
        className={TRANSFER_BUTTON_CLASS}
      >
        <IonIcon className="mr-2 text-2xl" icon={TransferIcon} />
        {t("coin-info.transfer")}
      </button>
      <ActionModalAndTabs
        cryptoId={cryptoId}
        setShowActionModal={setShowActionModal}
        showActionModal={showActionModal}
        disableTabs={disableTabs}
      />
    </>
  );
};
