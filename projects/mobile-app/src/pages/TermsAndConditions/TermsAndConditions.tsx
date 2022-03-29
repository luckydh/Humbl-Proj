import React from "react";
import Firebase from "../../Firebase";
import { useHistory } from "react-router";
import { buildPath } from "utils/routes";
import { clearCurrentAccount } from "state/cache";
import { Trans, useTranslation } from "react-i18next";
import { setAcceptedToSVersion, TOS_VERSION } from "state/terms";

import Button from "components/Button/Button";
import LayoutUnauthed from "components/PageTemplates/LayoutUnauthed";
import termsAndConditions from "assets/images/terms-and-conditions.png";

import "./styles.scss";

export interface TermsAndConditionsProps {
  onAccept: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onAccept }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const handleAccept = async () => {
    await setAcceptedToSVersion(TOS_VERSION);
    onAccept();
  };

  const handleDecline = async () => {
    await clearCurrentAccount();
    await Firebase.auth().signOut();
    history.replace(buildPath("login"));
  };

  return (
    <LayoutUnauthed classNames="" background="bg-blue">
      <div className="text-sm text-dark-blue-3">
        <div className="pb-4 text-center">
          <img
            aria-label="TERMSANDCONDITIONS_HUMBL_IMAGE"
            src={termsAndConditions}
            alt=""
            className="inline-block my-6"
          />
          <h5 aria-label="TERMSANDCONDITIONS_TITLE_LABEL" className="text-xl font-medium text-white">
            {t("terms-and-conditions.title")}
          </h5>
        </div>
        <hr className="border-0 h-px bg-[#A1DFF6]" />
        <div className="px-6 pt-4 pb-40 overflow-hidden overflow-y-auto">
          <div aria-label="TERMSANDCONDITIONS_BODY_LABEL" className="text-sm leading-5 text-justify text-white">
            <Trans i18nKey="terms-and-conditions.content" components={{ p: <p className="mb-4" /> }} />
          </div>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 w-full p-6 space-y-2 rounded-t-3xl bg-blue terms-page-action-wrapper">
        <Button ariaLabel="TERMSANDCONDITIONS_ACCEPT_BUTTON" onClick={handleAccept}>
          {t("terms-and-conditions.action.accept")}
        </Button>
        <Button
          ariaLabel="TERMSANDCONDITIONS_EXIT_BUTTON"
          variant="text"
          onClick={handleDecline}
          className="border-2 border-solid rounded-md border-blue-dark text-blue-dark">
          {t("terms-and-conditions.action.decline")}
        </Button>
      </div>
    </LayoutUnauthed>
  );
};
