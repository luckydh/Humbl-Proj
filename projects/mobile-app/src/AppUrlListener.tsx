import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { App as CapApp, URLOpenListenerEvent } from "@capacitor/app";
import { route } from "utils/routes";

const AppUrlListener = () => {
  const history = useHistory();

  useEffect(() => {
    CapApp.addListener("appUrlOpen", (event: URLOpenListenerEvent) => {
      if (event.url.includes(route.plaidOAuth)) {
        const redirectUri = event.url?.replace("capacitor", "https");
        // Set the redirect uri for Plaid OAuth to be access in PlaidOAuth component
        history.push({ state: encodeURI(redirectUri) });
        return;
      }

      const slug = event.url.split("app.humblpay.com").pop();

      if (slug) {
        history.push(slug);
      }
    });
  }, [history]);
  return null;
};

export default AppUrlListener;
