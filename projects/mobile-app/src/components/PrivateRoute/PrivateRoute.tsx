import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { LayoutPrimary } from "components/PageTemplates/LayoutPrimary";
import LayoutUnauthed from "components/PageTemplates/LayoutUnauthed";
import React, { ReactElement, ReactFragment, useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import EVENTS from "utils/analytics/AnalyticEvents";
import { trackEvent } from "utils/analytics/Segment";
import { TermsAndConditions } from "pages/TermsAndConditions/TermsAndConditions";
import { shouldShowToS } from "state/terms";
import Firebase from "../../Firebase";

interface PrivateRouteProps extends RouteProps {
  layout?: "primary" | "modal" | "none" | "unauthed";
  title?: string | ReactElement | ReactFragment;
  background?: string;
  horizontalPadding?: boolean;
  componentName: string;
  ariaLabel?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const user = Firebase.auth().currentUser;
  const layout = props.layout ?? "primary";
  const title = props.title ?? "";
  const background = props.background ?? "bg-lines";
  const { horizontalPadding, componentName, location, ariaLabel } = props;
  const [showToS, setShowToS] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    async function getShouldShowToS() {
      const shouldShow = await shouldShowToS();
      setShowToS(!!shouldShow);
    }

    getShouldShowToS();
  }, []);

  useEffect(() => {
    if (user && showToS !== undefined) {
      trackEvent(EVENTS.SCREEN_VIEW, {
        screenName: user && showToS ? "TermsAndCondition" : componentName,
        pathName: location?.pathname,
      });
    }
  }, [location, componentName, user, showToS]);

  if (user) {
    if (showToS) {
      return <TermsAndConditions onAccept={() => setShowToS(false)} />;
    }
    switch (layout) {
      case "none":
        return <Route {...props} />;
      case "modal":
        return (
          <LayoutModal
            title={title}
            background={background}
            horizontalPadding={horizontalPadding}
            ariaLabel={ariaLabel}>
            <Route {...props} />
          </LayoutModal>
        );
      case "unauthed":
        return (
          <LayoutUnauthed background={background}>
            <Route {...props} />
          </LayoutUnauthed>
        );
      case "primary":
      default:
        return (
          <LayoutPrimary background={background}>
            <Route {...props} />
          </LayoutPrimary>
        );
    }
  } else {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: {
            from: props.location,
          },
        }}
      />
    );
  }
};

export default PrivateRoute;
