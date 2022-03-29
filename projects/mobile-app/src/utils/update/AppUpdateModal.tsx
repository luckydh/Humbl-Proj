import React from "react";
import { IonAlert, AlertButton } from "@ionic/react";
import { useTranslation } from "react-i18next";

import { openAppStore, useForceUpdate } from "./update";

export const AppUpdateModal = () => {
  const { t } = useTranslation();
  const showUpdateAlert = useForceUpdate();

  const buttons: AlertButton[] = [
    {
      text: t("update-alert.button.update"),
      handler: () => {
        openAppStore();
        return false;
      },
    },
  ];

  return (
    <IonAlert
      isOpen={showUpdateAlert}
      backdropDismiss={false}
      header={t("update-alert.heading")}
      cssClass="alert-css"
      subHeader={t("update-alert.force-sub-heading")}
      buttons={buttons}
    />
  );
};

export default AppUpdateModal;
