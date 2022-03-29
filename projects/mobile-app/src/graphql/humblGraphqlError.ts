import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";
import i18n from "i18n";

export type HumblErrorCode = keyof typeof errorCodesTranslationKeys;

export interface HumblError {
  humblErrorCode: HumblErrorCode;
}

export interface HumblGraphQLError extends GraphQLError {
  humblErrorCode?: HumblErrorCode;
}

const errorCodesTranslationKeys = {
  SERVER_ERROR: "crypto-wallet.buy.order-preview.error-modal.fallback-message",
  IDENTITY_MISMATCH: "crypto-wallet.buy.order-preview.error-modal.identity-mismatch",
  PHONE_MISMATCH_INVALID: "crypto-wallet.buy.order-preview.error-modal.phone-mismatch-invalid",
  TOO_MUCH_ABUSE_SUSPICIOUS: "crypto-wallet.buy.order-preview.error-modal.abuse-suspicious",
  AUTHORIZATION_FAILED: "crypto-wallet.buy.order-preview.error-modal.auth-failed",
  ORDER_EXPIRED: "crypto-wallet.buy.order-preview.error-modal.order-expired",
  DECLINED_DO_NOT_HONOR: "crypto-wallet.buy.order-preview.error-modal.declined-do-not-honor",
  INSUFFICIENT_FUNDS: "crypto-wallet.buy.order-preview.error-modal.insufficient-funds",
  RESTRICTED: "crypto-wallet.buy.order-preview.error-modal.restricted",
  CARD_ISSUER_DECLINED: "crypto-wallet.buy.order-preview.error-modal.card-issuer-declined",
  LIMIT_REACHED: "crypto-wallet.buy.order-preview.error-modal.limit-reached",
  VALIDATION_ERROR: "crypto-wallet.buy.order-preview.error-modal.validation-error",
};

const fallback = errorCodesTranslationKeys.SERVER_ERROR;

export function getPotentialHumblError(graphQLErrors: ReadonlyArray<HumblGraphQLError>): HumblError | undefined {
  // This can sometimes trigger with 0 graphQLErrors hence this guard.
  const humblErrorCode = graphQLErrors[0]?.humblErrorCode;
  return humblErrorCode && { humblErrorCode };
}

export function getErrorMessage(error?: ApolloError) {
  if (!error) {
    return;
  }
  const humblError = getPotentialHumblError(error.graphQLErrors);
  return i18n.t(mapErrorCodeToTranslationKey(humblError?.humblErrorCode));
}

export function mapErrorCodeToTranslationKey(errorCode: HumblErrorCode = "SERVER_ERROR") {
  return errorCodesTranslationKeys[errorCode] ?? fallback;
}
