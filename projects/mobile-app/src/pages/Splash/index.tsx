import React from "react";
import { IonPage } from "@ionic/react";

import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { useTranslation } from "react-i18next";
import { LanguagePicker } from "components/Language/LanguagePicker";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";

const Splash: React.FC = () => {
  const { t } = useTranslation();

  return (
    <IonPage className="safe-area-top">
      <div className="bg-lines flex flex-col justify-between h-full">
        <div className="flex items-center justify-center mt-48 flex-shink-0">
          <svg width="290" viewBox="0 0 143 31" xmlns="http://www.w3.org/2000/svg">
            <g fill="#FFF" fillRule="nonzero">
              <path d="M18.418 1v11.484H7.151V1H0v29.794h7.151V18.335h11.267v12.459h7.259V1zM37.594 1v17.118a7.15 7.15 0 001.3 4.55 4.659 4.659 0 003.9 1.517 5.092 5.092 0 003.9-1.517 6.934 6.934 0 001.3-4.55V1h7.151v17.118c.09 2.45-.47 4.88-1.625 7.042a11.376 11.376 0 01-4.442 4.334 13.543 13.543 0 01-6.392 1.406c-2.18.06-4.339-.423-6.284-1.408a10.4 10.4 0 01-4.334-4.334 14.518 14.518 0 01-1.517-7.148V1h7.043zM93.39 1.217v29.577h-7.151V12.376l-6.392 18.527h-6.175L67.28 12.376v18.527h-7.151V1.217h8.776l8.017 20.585 7.907-20.585zM120.475 18.118a6.934 6.934 0 011.625 4.55 7.476 7.476 0 01-2.492 5.959 11.159 11.159 0 01-7.259 2.167H98.482V.998h13.543c2.5-.159 4.98.528 7.042 1.95a6.934 6.934 0 012.492 5.634 6.609 6.609 0 01-1.408 4.442 6.934 6.934 0 01-3.792 2.384 8.884 8.884 0 014.117 2.709m-14.952-4.875h4.767c2.492 0 3.792-1.083 3.792-3.25s-1.3-3.25-3.792-3.25h-4.658l-.109 6.5zm9.209 8.451a2.817 2.817 0 00-1.083-2.492 4.225 4.225 0 00-3.034-.867h-5.092v6.609h5.092c2.709 0 4.117-1.083 4.117-3.25M133.044 25.268h9.642v5.525h-16.793V1h7.151zM140.519 1a2.167 2.167 0 110 4.334 2.167 2.167 0 010-4.334m0 4.117a1.95 1.95 0 10-1.95-1.95 1.95 1.95 0 001.95 1.95m-.758-3.25h.975c.542 0 .867.217.867.758a.65.65 0 01-.65.65l.758 1.192h-.217l-.758-1.192h-.65v1.192h-.325v-2.6zm.217 1.192h.65c.433 0 .65-.108.65-.433s-.217-.542-.65-.542h-.65v.975z" />
            </g>
          </svg>
        </div>

        <div className="flex flex-col flex-1 mx-6 flex-grow justify-center">
          <div className="mb-4 ">
            <Link to="/signup" onClick={() => trackEvent(EVENTS.SIGN_UP_ATTEMPT, { previousPage: "/" })}>
              <Button>{t("page-splash.button.sign-up")}</Button>
            </Link>
          </div>
          <div className=" flex flex-col text-center">
            <p className="m-1 text-xl text-white">{t("page-splash.description.already-have-account")}</p>
            <Link to="/login" className="mx-auto m-1 text-white text-xl">
              {t("page-splash.link.login")}
            </Link>
          </div>
        </div>
        <div className="mb-4 flex flex-col text-lg">
          <LanguagePicker />
        </div>
      </div>
    </IonPage>
  );
};

export default Splash;
