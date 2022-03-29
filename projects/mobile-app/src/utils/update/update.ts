import { Market } from "@ionic-native/market";
import { makeVar, useReactiveVar } from "@apollo/client";
import { Capacitor } from "@capacitor/core";

export const currAppVersion = `${process.env.REACT_APP_VERSION_MAJOR}.${process.env.REACT_APP_VERSION_MINOR}`;

/**
 * Checks against current version to handle semver comparison.
 * semver 1.5 is not decimal (1.5), instead it's Major 1 Minor 5 etc.
 * meaning in decimal 1.11 < 1.9 but semver 1.11 > 1.9
 */
export const versionGreaterThan = (version: string, comparisonVersion: string) => {
  // parseInt on both to ensure proper value comparison.
  const [versionMajor, versionMinor] = version.split(".").map((versionString) => parseInt(versionString, 10));
  const [compareMajor, compareMinor] = comparisonVersion.split(".").map((versionString) => parseInt(versionString, 10));

  if (versionMajor > compareMajor) {
    return true;
  }

  if (versionMajor < compareMajor) {
    return false;
  }

  // if we are here then versionMajor === compareMajor, so compare minor
  return versionMinor > compareMinor;
};

export const minAppVersionVar = makeVar("");
export const useForceUpdate = () => {
  const minAppVersion = useReactiveVar(minAppVersionVar);

  if (!minAppVersion.length) {
    return false;
  }

  return versionGreaterThan(minAppVersion, currAppVersion);
};

export const setMinAppVersion = (key: string) => {
  if (Capacitor.getPlatform() !== "web") {
    minAppVersionVar(key);
  }
};

export const openAppStore = () => {
  const platform = Capacitor.getPlatform();

  if (platform === "android") {
    Market.open("com.humbllite");
  } else if (platform === "ios") {
    Market.open("id1548843501");
  }
};
