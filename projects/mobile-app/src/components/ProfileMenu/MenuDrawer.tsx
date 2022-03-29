import { IonIcon, IonMenu, IonMenuToggle } from "@ionic/react";
import Button from "components/Button/Button";
import React, { useState } from "react";
import { HumblLogoResizeable } from "assets/svgs/HumblLogoResizeable";
import { profileIcon, chevronForwardIcon } from "assets/icons";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import QRModal from "components/QR/QRModal";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import { Share } from "@capacitor/share";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { FeedbackTrigger } from "pages/CryptoWallet/FeedbackTrigger";
import { useMenuItems } from "./useMenuItems";
import { AccountType } from "../../generated/graphql";
import { VersionObject, buildVersionString } from "utils/env";

export type MenuOption = {
  text: string;
  link: string | { pathname: string };
  target?: string;
  isSingOut?: boolean;
  action?: string;
  icon?: string;
  hide?: boolean;
};

type MenuDrawerProps = {
  accountProp?: AccountType;
  /** Only for testing  */
  testingVersionObject?: VersionObject;
};

const MenuDrawer: React.FC<MenuDrawerProps> = ({ accountProp, testingVersionObject }) => {
  const [showQRModal, setShowQRModal] = useState(false);
  // const account = useCurrentAccount();
  let account: AccountType;
  const { currentAccount: accountReq } = useGetCurrentAccount();

  // This is primarily used for dependency injection for tests.
  if (accountProp) {
    account = { ...accountProp };
  } else {
    account = { ...(accountReq as AccountType) };
  }

  const actions: { [key: string]: () => void } = {
    setShowQRModal: () => setShowQRModal(true),
  };
  const history = useHistory();
  const { t } = useTranslation();

  const versionString = buildVersionString(testingVersionObject);
  const options = useMenuItems(account);

  return (
    <div className="safe-area-top">
      <IonMenu side="start" menuId="menu" contentId="main_content" type="overlay" swipeGesture={false}>
        <div className="bg-blue h-full">
          <div className="w-full flex relative items-center">
            <IonMenuToggle className="my-3 sm:my-6 absolute left-5 top-0 ">
              <IonIcon icon="close" className="text-3xl text-white" />
            </IonMenuToggle>
            <h2 className="flex-1 text-xl text-white my-3 sm:m-6 text-center">Menu</h2>
          </div>
          <div className="px-6">
            <IonMenuToggle>
              {options.map(({ hide, link, text, action: actionKey, icon, target }) => {
                if (hide) return null;
                return (
                  <Link
                    key={text}
                    replace={false}
                    to={link}
                    className="justify-between text-white group flex items-center px-0 py-2 text-lg font-medium rounded-md"
                    target={target || "_self"}
                    onClick={(e) => {
                      if (actionKey) {
                        e.preventDefault();
                        const action = actions[actionKey];
                        action && action();
                      }
                      if (link === "/merchantcreate") {
                        trackEvent(EVENTS.MERCHANT_CREATION_INITIATED, { previousPage: history.location.pathname });
                      }
                    }}>
                    <div className="flex items-center align-middle">
                      <IonIcon className="text-white mr-4 h-6 w-6" icon={icon} />
                      <h2 className="text-white">{t(text)}</h2>
                    </div>
                    <IonIcon className="text-xl" icon={chevronForwardIcon} />
                  </Link>
                );
              })}
              {account?.hasMultipleAccounts && (
                <button
                  type="button"
                  className="w-full justify-between text-white group flex items-center px-0 py-2 text-lg font-medium rounded-md"
                  onClick={() => {
                    history.push("/switch-accounts");
                  }}>
                  <div className="flex items-center align-middle">
                    <IonIcon className="text-white mr-4 h-6 w-6" icon={profileIcon} />
                    <h2 className="text-lg">{t("pages-switch-account.title.switch-accounts")}</h2>
                  </div>
                  <IonIcon className="text-xl text-white" icon={chevronForwardIcon} />
                </button>
              )}
              <FeedbackTrigger>
                <div className="w-full flex items-center justify-center text-center pt-8">
                  {t("pull_out_menu_version")} {versionString}
                </div>
              </FeedbackTrigger>
              <div className="flex justify-center mt-3 sm:mt-12 pb-6 w-full">
                <Button
                  onClick={async () => {
                    await Share.share({
                      title: t("component-share-widget.title"),
                      text: t("component-share-widget.text"),
                      url: `https://www.humblpay.com/get-humbl/?invitedby=${account?.id}`,
                      dialogTitle: t("component-share-widget.dialogTitle"),
                    });
                  }}>
                  <div className="flex">
                    <span className="inline-block text-xl font-semibold">
                      {t("component-profile-menu.button.invite-friends-to-humbl")}
                    </span>
                    <span className="inline-block m-auto ml-1.5">
                      <div className="w-16">
                        <HumblLogoResizeable />
                      </div>
                    </span>
                  </div>
                </Button>
              </div>
            </IonMenuToggle>
          </div>
        </div>
      </IonMenu>
      <QRModal setShowQRModal={setShowQRModal} showQRModal={showQRModal} />
    </div>
  );
};

export default MenuDrawer;
