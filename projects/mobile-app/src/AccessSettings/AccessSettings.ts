import { AndroidSettings, IOSSettings, NativeSettings } from "capacitor-native-settings";
import { Capacitor } from "@capacitor/core";
import { captureException } from "ErrorLogger";

const platform = Capacitor.getPlatform();

export const accessNativeSetting = async () => {
  try {
    if (platform === "android") {
      NativeSettings.openAndroid({
        option: AndroidSettings.ApplicationDetails,
      });
    }

    if (platform === "ios") {
      NativeSettings.openIOS({
        option: IOSSettings.App,
      });
    }
  } catch (error) {
    captureException(error);
  }
};
