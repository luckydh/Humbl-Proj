// .storybook/preview.js
import React, { Suspense } from "react";
import { StaticRouter } from "react-router";
import { IonApp, IonContent, IonPage } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "../src/assets/compiled.css";
import "../src/theme/humbl.scss";
import isChromatic from "chromatic/isChromatic";
import i18n from "../src/i18n";
import MockDate from "mockdate";
import { MOCK_DATE } from "../src/utils/test-helpers/mockDate";

if (isChromatic()) {
  i18n.options.lng = "en";
  MockDate.set(MOCK_DATE);
}

window.analytics = {
  track: () => {},
  identify: () => {},
  trackLink: () => {},
  page: () => {},
};

// We wrap all stories in suspense to load i18n and also
// static router so we have access to history and location for testing

const IonWrapper = ({ children }) => {
  return (
    <Suspense fallback={<></>}>
      <StaticRouter>
        <IonApp>
          <IonPage>
            <IonContent className="bg-blue">{children}</IonContent>
          </IonPage>
        </IonApp>
      </StaticRouter>
    </Suspense>
  );
};

export const decorators = [
  (Story) => (
    <div style={{ minHeight: 100 }}>
      <IonWrapper>
        <Story />
      </IonWrapper>
    </div>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  // Set the viewports in Chromatic globally.
  chromatic: { viewports: [414] },
};
