import React from "react";
import ReactDOM from "react-dom";
import { errorLoggerInit } from "ErrorLogger";

import "./i18n";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

// TODO: add dynamic load polyfill locales based on i18n.language - https://humblpay.atlassian.net/browse/HC-1450
// https://formatjs.io/docs/polyfills/intl-numberformat
import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/locale-data/en";
import "@formatjs/intl-pluralrules/locale-data/ca";
import "@formatjs/intl-pluralrules/locale-data/es";
import "@formatjs/intl-pluralrules/locale-data/sg";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-numberformat/locale-data/en";
import "@formatjs/intl-numberformat/locale-data/en-CA";
import "@formatjs/intl-numberformat/locale-data/es-MX";
import "@formatjs/intl-numberformat/locale-data/en-SG";
import "@formatjs/intl-numberformat/locale-data/en-AU";
import "@formatjs/intl-numberformat/locale-data/en-NZ";

errorLoggerInit();

ReactDOM.render(<App />, document.getElementById("root"));

defineCustomElements(window);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
