import Firebase from "../../Firebase";
import { IonIcon } from "@ionic/react";
import { logoutIcon, chevronForwardIcon } from "assets/icons";
import React, { FC, useState } from "react";
import { Redirect } from "react-router";
import { clearCurrentAccount } from "state/cache";
import { useTranslation } from "react-i18next";

export const Logout: FC = () => {
  const { t } = useTranslation();
  const [navigate, setNavigate] = useState(false);
  const logout = () => {
    clearCurrentAccount();
    Firebase.auth()
      .signOut()
      .then(() => {
        setNavigate(true);
      });
  };

  if (navigate) {
    return <Redirect to="/login" push={true} />;
  }
  return (
    <>
      <button className="flex flex-row items-center justify-between w-fulls" onClick={logout}>
        <div className="justify-between text-white group flex items-center px-0 py-2 text-lg font-medium rounded-md">
          <IonIcon className="text-white mr-4 h-6 w-6" icon={logoutIcon} />
          <div className=" text-white text-lg flex justify-between items-center">
            <h2 className="text-white">{t("component-profile-menu.text.sign-out")}</h2>
          </div>
        </div>
        <IonIcon className="text-xl text-white" icon={chevronForwardIcon} />
      </button>
    </>
  );
};
