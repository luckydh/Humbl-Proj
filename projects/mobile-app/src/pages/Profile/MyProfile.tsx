import React, { useState } from "react";
import { QrButton } from "./QrButton";
import { ProfileAvatar } from "../../components/Avatar/Avatar";
import QRModal from "../../components/QR/QRModal";
import { ConsumerProfile } from "./Consumer/ConsumerProfile";
import { LayoutPrimary } from "../../components/PageTemplates/LayoutPrimary";
import { IonIcon } from "@ionic/react";
import { menu } from "ionicons/icons";
import { menuController } from "@ionic/core";
import { MerchantProfileContainer } from "./Merchant/MerchantProfileContainer";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";

import { useHistory } from "react-router";
import { ScanIconNoBorder } from "assets/svgs/ScanIconNoBorder";

export const MyProfile = () => {
  const history = useHistory();
  const { currentAccount: account } = useGetCurrentAccount();
  const [showQRModal, setShowQRModal] = useState(false);
  const handleMenuButtonClick = () => {
    trackEvent(EVENTS.HAMBURGER_CLICK, { fromPage: "Profile" });
    menuController.open("menu");
  };

  const scan = () => {
    history.push("/qrcodescan");
  };

  return (
    <LayoutPrimary
      background="bg-profiles"
      rightClickIcon={<ScanIconNoBorder className="w-5 block" />}
      onRightClick={scan}
      leftButton={
        <button type="button" className="text-3xl z-50 text-white" onClick={handleMenuButtonClick} title="Menu">
          <IonIcon icon={menu} className="block" />
        </button>
      }>
      {account && (
        <>
          <div className="relative px-6 pt-10">
            <ProfileAvatar
              name={account.displayName}
              size="large"
              src={account.image}
              username={account.userName}
              action={<QrButton onClick={() => setShowQRModal(true)} />}
            />
          </div>
          <QRModal setShowQRModal={setShowQRModal} showQRModal={showQRModal} />
          {!account.isMerchant && <ConsumerProfile />}
          {account.isMerchant && <MerchantProfileContainer />}
        </>
      )}
    </LayoutPrimary>
  );
};
