import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";

import "@humbl/uikit/dist/compiled.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
/* Theme variables */
import "./theme/variables.scss";
import "./assets/compiled.css";

import "./theme/humbl.scss";

import { ApolloProvider } from "@apollo/client";

import { Capacitor } from "@capacitor/core";
import { Keyboard, KeyboardResize } from "@capacitor/keyboard";
import LoadingSplash from "pages/LoadingSplash/LoadingSplash";
import Routes from "./Routes";
import client from "./graphql/client";

const platform = Capacitor.getPlatform();

if (platform === "ios") {
  Keyboard.setResizeMode({ mode: KeyboardResize.None });
  Keyboard.setAccessoryBarVisible({ isVisible: true });
}

const App: React.FC = () => (
  <Suspense fallback={<LoadingSplash />}>
    <ApolloProvider client={client}>
      <RecoilRoot>
        <Routes />
      </RecoilRoot>
    </ApolloProvider>
  </Suspense>
);

export default App;
