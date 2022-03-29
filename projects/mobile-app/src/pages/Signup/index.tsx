import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Message } from "components/Message/Message";
import LayoutUnauthed from "components/PageTemplates/LayoutUnauthed";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import firebase from "../../Firebase";
import UserNameCreate from "./userNameCreate";
import EmailPwCreate from "./emailPwCreate";
import { useCreateNewUserMutation, MutationCreateNewUserArgs } from "../../generated/graphql";

const authNavEnum = Object.freeze({
  EMAIL: "EMAIL",
  FL_USERNAME: "FL_USERNAME",
});

const Signup: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [returnedError, setReturnedError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [authNav, setAuthNav] = useState(authNavEnum.EMAIL);
  const setFlUserName = () => setAuthNav(authNavEnum.FL_USERNAME);
  const setEmailRoute = () => setAuthNav(authNavEnum.EMAIL);
  const location = useLocation();

  // mutations work as this returns a function that I can pass values into later.
  const [createNewUserMutation] = useCreateNewUserMutation();

  const signInNewUser = async (customToken: string) => {
    firebase.auth().signInWithCustomToken(customToken);
  };

  useEffect(() => {
    if (authNav === authNavEnum.FL_USERNAME) {
      trackEvent(EVENTS.SCREEN_VIEW, {
        screenName: "SignUpDetail",
        pathName: location?.pathname,
      });
    }
  }, [authNav, location?.pathname]);
  const createNewUser = async (variables: MutationCreateNewUserArgs) => {
    setLoading(true);
    trackEvent(EVENTS.SIGN_UP_CREATE_USER, {
      email: variables.email,
      userName: variables.userName,
      country: variables.country,
      phone: variables.phone,
    });
    try {
      // THIS CREATES A FIREBASE USER AND HUMBL DATA ACCOUNT AND USER, RETURNS A CUSTOM TOKEN//
      const token = await createNewUserMutation({
        variables,
      });

      if (token?.data?.createNewUser) {
        // THIS WILL TRIGGER ONAUTH and call a me function and load user/account to local state
        await signInNewUser(`${token.data.createNewUser}`).then(() => {
          setLoading(false);
          trackEvent(EVENTS.SIGN_UP_SUCCESS, { status: "success" });
          setTimeout(() => {
            trackEvent(EVENTS.EMAIL_VERIFICATION_STARTED, {
              pathName: location?.pathname,
            });
            history.replace("/profileimagecreate");
          }, 3000);
        });
      }
    } catch (e) {
      setLoading(false);
      trackEvent(EVENTS.SIGN_UP_FAILURE, { error: e });
      // how do we translate error messages from server?
      const errMessage = e.message.split(":")[2];
      errMessage ? setReturnedError(errMessage) : setReturnedError(e.message);
    }
  };

  return (
    <>
      {authNav === authNavEnum.EMAIL && (
        <LayoutUnauthed>
          <EmailPwCreate moveForward={setFlUserName} handleEmail={setEmail} handlePassword={setPassword} />
        </LayoutUnauthed>
      )}
      {authNav === authNavEnum.FL_USERNAME && (
        <LayoutUnauthed ariaLabel="SIGNUPFORM" onClickBack={setEmailRoute}>
          <UserNameCreate isLoading={loading} createNewUser={createNewUser} email={email} password={password} />
          {returnedError && (
            <div className="my-2 text-center">
              <Message variant="error">{returnedError}</Message>
            </div>
          )}
        </LayoutUnauthed>
      )}
    </>
  );
};

export default Signup;
