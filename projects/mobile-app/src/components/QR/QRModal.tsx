import React, { ReactElement } from "react";
import { IonModal } from "@ionic/react";
import { modalController } from "@ionic/core";
import Modal from "../Modal/Modal";
import { ProfileAvatar } from "../Avatar/Avatar";
import { HumblLogo } from "assets/svgs/HumblLogo";
import { useTranslation } from "react-i18next";

import "./styles.scss";
import { useGetCurrentAccount } from "../../hooks/useGetCurrentAccount";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { useLocation } from "react-router";

const QRModal = ({ setShowQRModal, showQRModal }: { setShowQRModal: Function; showQRModal: boolean }): ReactElement => {
  const { t } = useTranslation();
  const { currentAccount: account } = useGetCurrentAccount();
  const location = useLocation();

  if (!account) {
    return <></>;
  }
  if (showQRModal) {
    trackEvent(EVENTS.SCREEN_VIEW, {
      screenName: "QR Scan",
      pathName: location.pathname,
    });
  }

  return (
    <IonModal
      swipeToClose={true}
      isOpen={showQRModal}
      cssClass="qr-modal"
      onDidDismiss={() => {
        setShowQRModal(false);
      }}>
      <Modal
        title={t("my-qr-modal.title.my-qr-code")}
        background="bg-profiles"
        onClose={() => {
          modalController.dismiss();
        }}>
        <div className="flex flex-col pt-16 text-center content-center">
          <ProfileAvatar name={account.displayName} username={account.userName} src={account.image} size="medium" />
          <div className="w-56 bg-blue-dark mt-10 shadow-lg m-auto px-3 py-3 rounded-xl">
            <img className="m-auto" alt={`HUMBL - @${account.userName} QR Code}`} src={account?.qr?.image || ""} />
            <div className="flex flex-col content-center text-center">
              <div className="m-auto mb-4">
                <HumblLogo />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </IonModal>
  );
};

export default QRModal;
