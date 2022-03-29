import React, { useState } from "react";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { UpIcon, DownIcon, bankIcon, ActionIcon } from "assets/icons";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { useHardwareBackButton } from "hooks/useHardwareBackButton";
import cx from "classnames";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import { Countries } from "utils/Countries";
import { buildPath } from "utils/routes";
import { Icon } from "components/Icon/Icon";
import { IconsType } from "assets/icons2";
import SwapIcon from "assets/icons2/outline_swap.svg";
import { CreateAnimation } from "@ionic/react";
import ActionModal from "./ActionModal/ActionModal";
import ActionTab from "./ActionTabs/ActionTab";
import { useLayerManager } from "components/Layers/hooks";
import { LayerId } from "components/Layers/layers";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { sendFlowCurrentState } from "pages/CryptoWallet/SendFlow/sendFlowUtils";
import { FlowType } from "pages/CryptoWallet/SendFlow/SendFlowContainer";

export enum Disabled {
  send = "send",
  receive = "receive",
  swap = "swap",
  withdraw = "withdraw",
}

const WITHDRAW_BLOCKED_COUNTRIES: Set<string> = new Set([Countries.CA, Countries.SG, Countries.EU]);

export const NO_ASSETS_DISABLED_TABS = [Disabled.send, Disabled.withdraw, Disabled.swap];
export const DISABLED_TABS_SET: Set<Disabled> = new Set();

// Create tab data as a hook in order to be able to use translations on it.
const useTabData = (cryptoId?: string) => {
  const { t } = useTranslation();
  const { currentAccount } = useGetCurrentAccount();
  const country = currentAccount?.country?.alpha2?.toUpperCase() ?? "";

  const receivePath = cryptoId
    ? buildPath("cryptoWalletReceive_Crypto_", { cryptoId })
    : buildPath("cryptoWalletReceive");
  const withdrawPath = cryptoId
    ? buildPath("cryptoWalletWitdraw_Crypto_", { cryptoId })
    : buildPath("cryptoWalletWitdraw");

  return [
    {
      title: t("crypto-wallet.drawer.tab.send.title"),
      description: t("crypto-wallet.drawer.tab.send.description"),
      leftIcon: UpIcon,
      rightIcon: ActionIcon,
      type: Disabled.send,
      testIdObject: {
        button: "TRANSFER_SEND_BUTTON",
        label: "TRANSFER_SEND_LABEL",
      },
      shouldShowButton: true,
    },
    {
      title: t("crypto-wallet.drawer.tab.recieve.title"),
      description: t("crypto-wallet.drawer.tab.recieve.description"),
      leftIcon: DownIcon,
      rightIcon: ActionIcon,
      type: Disabled.receive,
      actionUrl: receivePath,
      testIdObject: {
        button: "TRANSFER_RECEIVE_BUTTON",
        label: "TRANSFER_RECEIVE_LABEL",
      },
      shouldShowButton: true,
    },
    {
      title: t("crypto-wallet.swap.title"),
      description: t("crypto-wallet.swap.subtitle"),
      // TODO: update ActionTab to use Icon component instead so that this isn't the odd one out.
      leftIcon: SwapIcon,
      rightIcon: ActionIcon,
      type: Disabled.swap,
      actionLayerId: "cryptoWalletSwap" as const,
      testIdObject: {
        button: "TRANSFER_SWAP_BUTTON",
        label: "TRANSFER_SWAP_LABEL",
      },
      shouldShowButton: true,
    },
    {
      title: t("crypto-wallet.drawer.tab.withdraw.title"),
      description: t("crypto-wallet.drawer.tab.withdraw.description"),
      leftIcon: bankIcon,
      rightIcon: ActionIcon,
      type: Disabled.withdraw,
      actionUrl: withdrawPath,
      testIdObject: {
        button: "TRANSFER_WITHDRAW_BUTTON",
        label: "TRANSFER_WITHDRAW_LABEL",
      },
      shouldShowButton: !WITHDRAW_BLOCKED_COUNTRIES.has(country),
    },
  ];
};

interface ActionTabsProps {
  showActionModal: boolean;
  cryptoId?: string;
  setShowActionModal: (showActionModal: boolean) => void;
  disableTabs?: Set<Disabled>;
}

type ActionTabClickData = {
  actionUrl?: string;
  actionLayerId?: LayerId;
  title: string;
  type?: Disabled;
  flowType?: FlowType;
};

type SendModalContentType = {
  onSendUser: () => void;
  onSendWallet: () => void;
};

const SendModalContent: React.FC<SendModalContentType> = ({ onSendUser, onSendWallet }) => {
  const { t } = useTranslation();
  return (
    <CreateAnimation
      duration={250}
      keyframes={[
        { offset: 0, opacity: ".4" },
        { offset: 0.5, opacity: ".6" },
        { offset: 0.7, opacity: ".8" },
        { offset: 1, opacity: "1" },
      ]}
      play
    >
      <div aria-label="SENDDRAWER_SEND_PROMPT" className="flex justify-items-stretch flex-row">
        <div className="flex flex-1 mr-3" aria-label="SENDDRAWER_SENDTOUSER_BUTTON">
          <SendOption
            iconName="bold_user"
            variant="bright-blue"
            title={t("send.option.send-to-user")}
            subtitle={t("send.option.send-user-subtitle")}
            onClick={onSendUser}
            testIdTitle="SENDDRAWER_SENDUSERTITLE_LABEL"
            testIdBody="SENDDRAWER_SENDUSERBODY_LABEL"
          />
        </div>
        <div className="flex flex-1 ml-3" aria-label="SENDDRAWER_SENDTOWALLET_BUTTON">
          <SendOption
            iconName="bold_wallet"
            title={t("send.option.send-to-wallet")}
            subtitle={t("send.option.send-wallet-subtitle")}
            onClick={onSendWallet}
            testIdTitle="SENDDRAWER_SENDWALLETTITLE_LABEL"
            testIdBody="SENDDRAWER_SENDWALLETBODY_LABEL"
          />
        </div>
      </div>
    </CreateAnimation>
  );
};

const ActionTabs: React.FC<ActionTabsProps> = ({
  cryptoId,
  showActionModal,
  setShowActionModal,
  disableTabs = DISABLED_TABS_SET,
}) => {
  const history = useHistory();
  const layerManager = useLayerManager();
  const { t } = useTranslation();
  const [showSendActionModal, setShowSendActionModal] = useState(false);
  const setCurrentState = useSetRecoilState(sendFlowCurrentState);
  const resetSendFlowCurrentState = useResetRecoilState(sendFlowCurrentState);

  const handleBackButton = () => {
    setShowActionModal(false);
  };

  useHardwareBackButton(handleBackButton);

  // Load items for tab data from hook
  const items = useTabData(cryptoId);

  const handleTabs = (data: ActionTabClickData) => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      pathName: window.location.pathname,
      type: data?.title,
      status: "Crypto Wallet Initiated",
    });

    setCurrentState((state) => ({
      ...state,
      currency: cryptoId,
    }));

    setTimeout(() => {
      if (data.actionLayerId) {
        setShowSendActionModal(false);
        setShowActionModal(false);
        layerManager.open(data.actionLayerId, { flowType: data.flowType });
      } else if (data.actionUrl) {
        history.push({ pathname: data?.actionUrl, state: { currency: cryptoId } });
      }
    }, 100);
  };

  const setActionModalClickFunctions = (item: ActionTabClickData) => {
    if (item.type === "send") {
      setShowSendActionModal(true);
    } else if (item) {
      handleTabs(item);
    }
  };

  const renderActions = () =>
    items.map((item) => {
      if (item.shouldShowButton) {
        return (
          <ActionTab
            title={item.title}
            key={item.title}
            description={item.description}
            testIdButton={item.testIdObject.button}
            testIdLabel={item.testIdObject.label}
            leftIcon={item.leftIcon}
            rightIcon={item.rightIcon}
            onClick={() => setActionModalClickFunctions(item)}
            disabled={disableTabs.has(item.type)}
            className={cx("mb-3", {
              "opacity-50": disableTabs.has(item.type),
            })}
          />
        );
      }
      return null;
    });

  return (
    <>
      <ActionModal
        title={t("send.action-modal.send-title")}
        ariaLabel="ACTIONMODAL"
        setShowActionModal={setShowActionModal}
        showActionModal={showActionModal}
        onCloseClick={() => setShowSendActionModal(false)}
        onClick={() => {
          setShowSendActionModal(false);
          setShowActionModal(false);
        }}
        crossButtonTestId="SENDDRAWER_CLOSE_BUTTON"
        closeButtonIsText={false}
        showCloseButton={showSendActionModal}
        background="bg-blue-lightest"
      >
        {showSendActionModal ? (
          <SendModalContent
            onSendUser={() => {
              resetSendFlowCurrentState();
              handleTabs({
                title: t("crypto-wallet.drawer.tab.send.title"),
                actionLayerId: "cryptoWalletSendFlow",
                flowType: "user",
              });
            }}
            onSendWallet={() => {
              resetSendFlowCurrentState();
              handleTabs({
                title: t("crypto-wallet.drawer.tab.send.title"),
                actionLayerId: "cryptoWalletSendFlow",
                flowType: "wallet",
              });
            }}
          />
        ) : (
          renderActions()
        )}
      </ActionModal>
    </>
  );
};

interface SendOptionProps {
  iconName: IconsType;
  title: string;
  subtitle: string;
  onClick: () => void;
  variant?: "bright-blue";
  testIdTitle: string;
  testIdBody: string;
}
const SendOption: React.FC<SendOptionProps> = ({
  iconName,
  onClick,
  subtitle,
  title,
  variant,
  testIdTitle,
  testIdBody,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex flex-col flex-1 rounded-md text-blue-dark2 text-center h-32 p-4 bg-white"
  >
    <span
      className={cx("rounded-md mx-auto mb-2 p-2", {
        "bg-bright-blue": variant,
        "bg-light-bright-blue": !variant,
      })}
    >
      <Icon name={iconName} size="xs" />
    </span>
    <div aria-label={testIdTitle} className="text-sm font-semibold w-full text-center">
      {title}
    </div>
    <span aria-label={testIdBody} className="text-xs text-blue-dark w-full text-center">
      {subtitle}
    </span>
  </button>
);

export default ActionTabs;
