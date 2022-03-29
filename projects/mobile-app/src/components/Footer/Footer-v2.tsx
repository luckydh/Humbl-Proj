import React from "react";
import { IonLabel, IonTabBar, IonTabButton, isPlatform } from "@ionic/react";
import { useTranslation } from "react-i18next";
import cx from "classnames";

import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import Home from "./Home";
import Search from "./Search";
import Wallet from "./Wallet";
import Location from "./Location";
import Profile from "./Profile";

import "./styles-v2.scss";

const TabNames = {
  HOME: "home",
  SEARCH: "search",
  WALLET: "wallet",
  DISCOVERY: "discovery-map",
  PROFILE: "profile",
};

const Footer: React.FC = () => {
  const { currentAccount: account } = useGetCurrentAccount();
  const { t } = useTranslation();

  return (
    <IonTabBar
      slot="bottom"
      className={cx("v2_ionTabBar shadow-md app_sm:p-1 app_md:py-2", {
        "ios-tab": isPlatform("iphone"),
      })}>
      {account && account.isMerchant && (
        <IonTabButton aria-label="HOME_MENU_BUTTON" className="v2_tab" tab={TabNames.HOME} href="/home">
          <div className="v2-icon-container transition-all duration-500 ease-in-out">
            <Home />
          </div>
          <IonLabel>{t("component-footer.label.home")}</IonLabel>
        </IonTabButton>
      )}
      {account && !account.isMerchant && (
        <IonTabButton aria-label="WALLET_MENU_BUTTON" className="v2_tab" tab={TabNames.WALLET} href="/crypto-wallet">
          <div className="v2-icon-container transition-all duration-500 ease-in-out">
            <Wallet />
          </div>
          <IonLabel>{t("component-footer.label.wallet")}</IonLabel>
        </IonTabButton>
      )}
      <IonTabButton aria-label="SEARCH_MENU_BUTTON" className="v2_tab" tab={TabNames.SEARCH} href="/search">
        <div className="v2-icon-container overflow-hidden transition-all duration-500 ease-in-out">
          <Search />
        </div>
        <IonLabel>{t("component-footer.label.search")}</IonLabel>
      </IonTabButton>

      <IonTabButton aria-label="DISCOVER_MENU_BUTTON" className="v2_tab" tab={TabNames.DISCOVERY} href="/discovery-map">
        <div className="v2-icon-container transition-all duration-500 ease-in-out">
          <Location />
        </div>
        <IonLabel>{t("component-footer.label.discovery")}</IonLabel>
      </IonTabButton>

      <IonTabButton aria-label="PROFILE_MENU_BUTTON" className="v2_tab" tab={TabNames.PROFILE} href="/profile">
        <div className="v2-icon-container transition-all duration-500 ease-in-out">
          <Profile />
        </div>
        <IonLabel>{t("component-footer.label.profile")}</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default Footer;
