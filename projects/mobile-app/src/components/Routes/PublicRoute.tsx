import React, { useEffect } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import LayoutUnauthed from "components/PageTemplates/LayoutUnauthed";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import Firebase from "../../Firebase";

interface PublicRouteProps extends RouteProps {
  restricted: boolean;
  layout?: "none";
  componentName: string;
}

const PublicRoute: React.FC<PublicRouteProps> = (props) => {
  const user = Firebase.auth().currentUser;

  const { restricted, layout, componentName, location } = props;

  useEffect(() => {
    trackEvent(EVENTS.SCREEN_VIEW, {
      screenName: componentName,
      pathName: location?.pathname,
    });
  }, [componentName, location?.pathname]);

  // restricted = false meaning public route
  // restricted = true meaning restricted route
  if (user && restricted) {
    // should redirect when route is signup. otherwise it hasn't caused a problem.
    return window.location.pathname !== "/signup" ? <Redirect to="/verify" /> : null;
  }
  if (layout === "none") {
    return <Route {...props} />;
  }
  return (
    <LayoutUnauthed>
      <Route {...props} />
    </LayoutUnauthed>
  );
};

export default PublicRoute;
