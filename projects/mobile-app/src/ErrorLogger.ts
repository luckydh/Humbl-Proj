import * as Sentry from "@sentry/react";
import * as SentryBrowser from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
import "assets/3rd-party/sentry-error-dialog.scss";
import { CaptureConsole as CaptureConsoleIntegration } from "@sentry/integrations";
import i18n from "i18next";
import { buildVersionString } from "utils/env";

const isProduction = process.env.NODE_ENV === "production";
const env = process.env.REACT_APP_QA_TESTING === "true" ? "qa-test" : process.env.NODE_ENV;

// Some devs might have some default value here so let's
// make an effort to avoid tripping inadvertently.
const hasDSN = (process.env.REACT_APP_SENTRY_DSN ?? "").length > 10;

export function errorLoggerInit() {
  if (!hasDSN) {
    // eslint-disable-next-line no-console
    console.log("ErrorLoger[dev] will be displayed as console errors.");
    return;
  }

  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: env,
    // sample rate establishses odds of transaction being sampled.
    // 0.5 === 50% chance transaction will be sent to Sentry.
    tracesSampleRate: 0.5,
    integrations: [
      new Integrations.BrowserTracing(),
      new CaptureConsoleIntegration({
        levels: ["error"],
      }),
    ],
    beforeBreadcrumb(breadcrumb, hint) {
      if (breadcrumb.category === "ui.click" && hint?.event) {
        const { target } = hint.event;

        const breadcrumbMessage = target.ariaLabel || target.dataset?.testid || buildTargetBreadCrumbString(target);

        if (breadcrumbMessage) {
          // eslint-disable-next-line no-param-reassign
          breadcrumb.message = breadcrumbMessage;
        }
      }
      return breadcrumb;
    },
  });

  const appVersion = buildVersionString();

  Sentry.configureScope((scope) => scope.setTag("appVersion", appVersion));
}

function buildTargetBreadCrumbString(target: HTMLElement) {
  const innerText = target.innerText.substr(0, 16);
  const textString = innerText.length ? ` | "${innerText}"` : "";

  return `${target.tagName} ${target.className}${textString}`;
}

export function showReportDialog(user: { name?: string; email?: string }) {
  if (!hasDSN) {
    // eslint-disable-next-line no-console
    console.log("ErrorLoger[dev] show report dialog disabled");
    // eslint-disable-next-line no-console
    console.log("User Details:", user);
    return;
  }

  Sentry.showReportDialog({
    title: i18n.t("error-logger.title"),
    subtitle: i18n.t("error-logger.subtitle"),
    subtitle2: "",
    labelSubmit: i18n.t("error-logger.label-submit"),
    // Feedback does not show in Sentry if eventId is not set manually. :\
    eventId: Sentry.captureMessage("showReportDialog"),
    user: {
      name: user.name,
      email: user.email,
    },
  });
}

export function captureException(
  error: Error | string | unknown,
  meta?: { description?: string; title?: string } | Record<string, string>
) {
  const extraInfo = meta ? { extra: meta } : undefined;

  if (!isProduction) {
    // eslint-disable-next-line no-console
    extraInfo && console.log("ErrorLoger[dev] captured extra info:", extraInfo);
    // eslint-disable-next-line no-console
    console.log("ErrorLoger[dev] captured Exception", error);
  }

  if (!hasDSN) {
    return;
  }

  SentryBrowser.captureException(error, extraInfo);
}
