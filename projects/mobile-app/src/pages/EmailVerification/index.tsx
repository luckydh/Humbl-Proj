import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import firebase, { getEmailVerification, loginUserWithJwt } from "../../Firebase";
import { useTranslation } from "react-i18next";
import { useVerifyEmailMutation } from "generated/graphql";
import { clearCurrentAccount } from "state/cache";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import { Heading } from "components/Text/Text";
import { LanguagePicker } from "components/Language/LanguagePicker";
import { Message } from "components/Message/Message";
import LayoutUnauthed from "components/PageTemplates/LayoutUnauthed";
import { ModalContent } from "pages/Ticketing/Checkout/ModalContent";
import { IonModal } from "@ionic/react";
import { Loading } from "components/Loading";
import { useHardwareBackButton } from "hooks/useHardwareBackButton";
import CheckMark from "components/CheckMark";
import EVENTS from "utils/analytics/AnalyticEvents";
import { buildPath } from "utils/routes";
import { trackEvent } from "utils/analytics/Segment";
import { useURLSearchParams } from "hooks/useUrlSearchParams";

const EmailVerification: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { newUser, token } = useURLSearchParams(["newUser", "token"]);
  const [emailResent, setEmailResent] = useState(false);
  const [loadingUserState, setLoadingUserState] = useState(false);
  const { currentUser } = firebase.auth();
  const [verified, setVerified] = useState(false);
  let email = "";

  useHardwareBackButton(() => null /* do nothing */);

  if (currentUser) {
    email = currentUser?.email || "";
  }

  const [verifyEmailMutation] = useVerifyEmailMutation({
    variables: {
      email: currentUser?.email || "",
    },
  });

  const modalDismiss = () => {
    setEmailResent(false);
  };

  const resendEmail = () => {
    trackEvent(EVENTS.RESEND_EMAIL, { email: currentUser?.email || "" });
    verifyEmailMutation();
    setEmailResent(true);
    setTimeout(() => {
      setEmailResent(false);
    }, 5000);
    setEmailResent(true);
  };

  const handleLogout = () => {
    clearCurrentAccount();
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.replace("/login");
      });
  };

  // make the query once upon component load.
  useEffect(() => {
    let makeVerificationQuery = true;
    if (makeVerificationQuery) {
      makeVerificationQuery = false;
      setLoadingUserState(true);

      // Check if the route params have email and token (this means we are a returning user after verification)
      if (!newUser) {
        // set the state for the emailVerfication.
        setVerified(!!getEmailVerification());
        // If this is not a new user we want to verify if the users eamil is verified.
        // To ensure we have a fresh user record we need to make the request.
        firebase
          .auth()
          .currentUser!.reload()
          .then(() => {
            const refreshedVerification = getEmailVerification();
            setLoadingUserState(false);
            if (refreshedVerification) {
              // at this point the user is cleared for entry into our app
              history.push(buildPath("cryptoWallet"));
            }
          });
      } else {
        // Log user in
        if (token) {
          // we have a token (therefore this is a email verification requst)
          loginUserWithJwt(token);
        }
        // we are simply doing this to clear the search params.
        window.history.replaceState(null, "", window.location.pathname);
        setLoadingUserState(false);
      }
    }

    return () => {
      makeVerificationQuery = false;
    };
    // This should only run once!!!
  }, [history, newUser, token]);

  if (loadingUserState) {
    return (
      <LayoutUnauthed>
        <div className="flex items-center justify-center h-full">
          <Loading loading={loadingUserState} />
        </div>
      </LayoutUnauthed>
    );
  }

  return (
    <LayoutUnauthed onClickBack={handleLogout}>
      <div className="main-wrapper flex flex-col flex-grow justify-between h-full">
        {
          // Should not occur
          !currentUser && (
            <Message variant="error">
              <p className="text-black pl-5">{t("email-verification.error.message")}</p>
            </Message>
          )
        }
        <div className="text-center my-6">
          <Heading ariaLabel="VERIFYEMAILADDRESSHEADER">{t("verify-email-address")}</Heading>
        </div>

        <div className="text-center align-middle">
          <span className="py-4 text-center text-lg text-white">{t("verify-email.page.focus-text", { email })}</span>
        </div>

        {!verified && currentUser && (
          <div className="py-4">
            <Button onClick={resendEmail}>
              {/* Resend Verification Email */}
              {t("email-verification.page.email-button")}
            </Button>
            <Button variant="text" className="my-2" onClick={handleLogout}>
              {t("login-page.button.login")}
            </Button>
          </div>
        )}

        <div className="safe-area-bottom mb-4">
          <LanguagePicker />
        </div>
      </div>

      <IonModal isOpen={emailResent} cssClass="warning-modal" backdropDismiss onDidDismiss={modalDismiss}>
        <div className="flex items-center justify-center h-full bg-blue">
          <ModalContent
            icon={
              <div className="">
                <CheckMark noBackground />
              </div>
            }
            message={`Email has been sent to ${currentUser?.email}`}
            title={t("verify-email.page.modal-title")}
          />
        </div>
      </IonModal>
    </LayoutUnauthed>
  );
};

export default EmailVerification;
