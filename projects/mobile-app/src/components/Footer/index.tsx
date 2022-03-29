import React from "react";
import "./styles.scss";
import { IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { Avatar } from "components/Avatar/Avatar";
import { useTranslation } from "react-i18next";
import { MapIcon } from "assets/svgs/MapIcon";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { ProfileIcon } from "../../assets/svgs/ProfileIcon";
import { ScanIcon } from "../../assets/svgs/ScanIcon";
import { SearchIcon } from "../../assets/svgs/SearchIcon";
import { HomeIcon } from "../../assets/svgs/HomeIcon";

const Footer: React.FC = () => {
  // const account = useCurrentAccount();
  const { currentAccount: account } = useGetCurrentAccount();
  const { t } = useTranslation();

  const handleTabWillChange = (event: CustomEvent<{ tab: string }>) => {
    if (event?.detail?.tab) {
      trackEvent(EVENTS.SELECT_TABS, { tab: event.detail.tab });
    }
  };

  return (
    <IonTabBar onIonTabsWillChange={handleTabWillChange} slot="bottom" className="v1_ionTabBar">
      <IonTabButton tab="home" href="/home">
        <div className="icon-container">
          <HomeIcon />
        </div>
        <IonLabel style={{ fontSize: 11 }}>{t("component-footer.label.home")}</IonLabel>
      </IonTabButton>
      <IonTabButton tab="search" href="/search">
        <div className="icon-container">
          <SearchIcon />
        </div>
        <IonLabel style={{ fontSize: 11 }}>{t("component-footer.label.search")}</IonLabel>
      </IonTabButton>
      <IonTabButton tab="qrcodescan" href="/qrcodescan">
        <div className="icon-container">
          <ScanIcon />
        </div>
        <IonLabel style={{ fontSize: 11 }}>{t("component-footer.label.scan-pay")}</IonLabel>
      </IonTabButton>
      <IonTabButton tab="discovery-map" href="/discovery-map">
        <div className="icon-container">
          <MapIcon />
        </div>
        <IonLabel>{t("component-footer.label.discovery")}</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href="/profile">
        <div className="flex flex-col items-center flex-none outline-none select-none text-blue">
          <span className="icon-container" style={{ height: 31, width: 31, fontSize: 32 }}>
            {account ? <Avatar src={account.image} size="tiny" className="" /> : <ProfileIcon />}
          </span>
          <IonLabel className="text-white mt-1" style={{ fontSize: 11 }}>
            {t("component-footer.label.profile")}
          </IonLabel>
        </div>
      </IonTabButton>
    </IonTabBar>
  );
};

export default Footer;
