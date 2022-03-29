import { trackUserId, logEvent } from "../../Firebase";
import { buildVersionString } from "utils/env";

const appVersion = buildVersionString();

/**
 * @description Method to set user id in segment analytics
 * @param userId is the userId fetched from API after login/sign up
 */
export function identifyUser(userId: string) {
  trackUserId(userId);
  analytics.identify(userId);
}

/**
 * @description Method to track event in segment analytics
 * @param eventName is predefined set in AnalyticEvents.js
 * @param properties is screen specific details to be tracked
 */
export function trackEvent(eventName: string, properties: Record<string, unknown>) {
  const props = { ...properties, appVersion };
  logEvent(eventName, props);
  analytics.track(eventName, props);
}

/**
 * @description Method to track pages in segment analytics
 * @param title is the page title
 */
export function trackPage(title: string) {
  logEvent(title, {});
  analytics.page(title);
}
