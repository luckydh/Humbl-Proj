/// <reference types="@capacitor/splash-screen" />

import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "humbl-consumer",
  bundledWebRuntime: false,
  webDir: "build",
  plugins: {
    SplashScreen: {
      launchShowDuration: 6000,
      launchAutoHide: true,
      showSpinner: false,
    },
  },
  cordova: {},
};

export default config;
