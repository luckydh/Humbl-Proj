import React from "react";
import firebase from "../../Firebase";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TickeriLogo from "assets/svgs/TickeriLogo";
import HomeCircleIcon from "assets/svgs/HomeCircleIcon";
import ticketingSuccess from "assets/svgs/ticketing-success.svg";
import { LayoutPrimary } from "components/PageTemplates/LayoutPrimary";
import { CloseIcon } from "assets/svgs/CloseIcon";
import { buildPath } from "utils/routes";

export const Success: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const user = firebase.auth().currentUser;

  const onClickClose = () => {
    history.replace(buildPath("home"));
  };

  return (
    <LayoutPrimary
      onRightClick={onClickClose}
      rightClickIcon={
        <div className="m-2 mt-3">
          <CloseIcon />
        </div>
      }
      hideFooter>
      <div className="flex flex-col items-center justify-between px-6 h-full">
        <div className="flex flex-col items-center mt-8">
          <img src={ticketingSuccess} alt="" className="w-3/5" />
          <h1 className="text-3xl text-center font-medium text-white tracking-tight mb-4 mt-8">
            {t("ticketing-checkout-page.message.success")}
          </h1>
          <p className="text-white text-center text-lg tracking-tight leading-tight w-5/6">
            {t("ticketing-checkout-page.message.email-with-tickets-sent", {
              email: user?.email,
              platform: "Tickeri",
            })}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <TickeriLogo />
          <Link to={buildPath("home")} replace className="my-6">
            <HomeCircleIcon className="w-14 h-14" />
          </Link>
        </div>
      </div>
    </LayoutPrimary>
  );
};

export default Success;
