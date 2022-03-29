import { generatePath, useParams } from "react-router";

/**
 * This file contains the route consts and a means to keep vars synced.
 * This will make it so that if paths are updated, we don't have straggler
 * implementations. It will also help us avoid bugs with typos etc.
 *
 * When adding or modifying a route, make sure to update this map
 * as well as the type below.
 *
 * We may want to consider locking down the routes to just the Router files
 * and enforcing the build function everywhere else.
 */

/**
 * route object for use in Router paths. If you're looking for a path
 * to generate a link, use the buildPath function below to ensure the path is built correctly.
 */
export const route: Record<RouteKey, RouteString> = {
  splash: "/splash",
  home: "/home",

  login: "/login",
  forgotPassword: "/forgotpass",
  signUp: "/signup",

  settings: "/settings",
  updateSecurity: "/update-security",

  personalDetals: "/personal-details",

  discoveryMap: "/discovery-map",
  qrCodeScan: "/qrcodescan",
  processorDash: "/processor-dashboard",
  search: "/search",
  verify: "/verify",

  bankAccountAdd: "/add-bank-account",
  bankAccountAddSuccess: "/add-bank-success",
  bankDetailsAdd: "/add-bank-details",
  bankInfoUpdate: "/update-bank-info",
  bankSelect: "/select-bank",

  paymentMethods: "/payment-methods",
  cardsAdd: "/cards/add",
  cards_Card_edit: "/cards/:id/edit",

  merchantCreate: "/merchantcreate",
  merchantCreateSuccess: "/merchantcreatesuccess",
  merchantOnboarding: "/merchant-onboarding",
  merchantOnboardingUpdate: "/merchant-onboarding-update",
  merchantOnboardingUpdateSuccess: "/merchant-onboarding-update-success",
  merchantPaymentAccountSuccess: "/merchantpaymentaccountsuccess",
  merchantUpdateProfile: "/update-merchant-profile",

  profile: "/profile",
  profileImageCreate: "/profileimagecreate",
  profileUpdate: "/update-profile",

  stripeConnect: "/stripeconnect",
  stripeConfirm: "/stripeconfirm",

  sales: "/sales",
  sales_Sale: "/sales/:id",

  offersBlocks: "/offers/blocks",
  offersCreditCards: "/offers/credit-cards",
  offersPersonalLoans: "/offers/personal-loans",

  account_Account_: "/account/:id",
  account_Account_pay: "/account/:id/pay",
  account_Account_ratings: "/account/:id/ratings",
  accountSwitch: "/switch-accounts",

  account_Account_Ticketing_Platform_Events_Event__PageState_:
    "/account/:accountId/ticketing/:platformId/events/:eventId/:pageState?",
  account_Account_Ticketing_Platform_Orders_Order_: "/account/:accountId/ticketing/:platformId/orders/:orderId",
  account_Account_Ticketing_Platform_Orders_Order_Success:
    "/account/:accountId/ticketing/:platformId/orders/:orderId/success",

  portfolio: "/portfolio",
  terms: "/terms",

  payouts: "/payouts",

  transactions: "/transactions",

  cryptoWallet: "/crypto-wallet",
  cryptoWalletTransactionsAll: "/crypto-wallet/all-transactions",

  cryptoWalletWitdraw: "/crypto-wallet/withdraw",
  cryptoWalletWitdraw_Crypto_: "/crypto-wallet/withdraw/:cryptoId",
  cryptoWalletUserSearch: "/crypto-wallet/search",
  cryptoWalletUserSearch_Currency_: "/crypto-wallet/search/:currency",

  cryptoWalletUserSearch_SelectCurrency_: "/crypto-wallet/search/user/:userId",
  cryptoWalletUserSearch_SelectAmount_: "/crypto-wallet/search/chooseAmount/:userId",
  cryptoWalletSend_Currency_Success: "/crypto-wallet/send/:cryptoId/success",
  cryptoWalletUserSearch_PreviewTransfer_: "/crypto-wallet/search/previewTransfer/:transactionId",

  coinMarket: "/coins/market",

  cryptoWalletCoinInfo_Coin_: "/crypto-wallet/coin/:coinId",
  cryptoWalletReceive: "/crypto-wallet/receive",
  cryptoWalletReceive_Crypto_: "/crypto-wallet/receive/:cryptoId",
  plaidOAuth: "/plaid-oauth",
  etxInsights: "/etx-insights",
  etxInsightsInvest: "/etx-insights/invest",
  etxWithdraw: "/etx/withdraw",
  etxTransactionsAll: "/etx/all-transactions",
};

type RouteKey = keyof Routes;
export type RouteString = Routes[RouteKey]["path"];

export type Routes = {
  splash: {
    path: "/splash";
  };
  home: {
    path: "/home";
  };
  login: {
    path: "/login";
  };
  forgotPassword: {
    path: "/forgotpass";
  };
  signUp: {
    path: "/signup";
  };
  settings: {
    path: "/settings";
  };
  updateSecurity: {
    path: "/update-security";
  };
  personalDetals: {
    path: "/personal-details";
  };
  discoveryMap: {
    path: "/discovery-map";
  };
  qrCodeScan: {
    path: "/qrcodescan";
  };
  processorDash: {
    path: "/processor-dashboard";
  };
  search: {
    path: "/search";
  };
  verify: {
    path: "/verify";
  };
  bankAccountAdd: {
    path: "/add-bank-account";
  };
  bankAccountAddSuccess: {
    path: "/add-bank-success";
  };
  bankDetailsAdd: {
    path: "/add-bank-details";
  };
  bankInfoUpdate: {
    path: "/update-bank-info";
  };
  bankSelect: {
    path: "/select-bank";
  };
  paymentMethods: {
    path: "/payment-methods";
  };
  cardsAdd: {
    path: "/cards/add";
  };
  cards_Card_edit: {
    path: "/cards/:id/edit";
    params: { id: string };
  };
  merchantCreate: {
    path: "/merchantcreate";
  };
  merchantCreateSuccess: {
    path: "/merchantcreatesuccess";
  };
  merchantOnboarding: {
    path: "/merchant-onboarding";
  };
  merchantOnboardingUpdate: {
    path: "/merchant-onboarding-update";
  };
  merchantOnboardingUpdateSuccess: {
    path: "/merchant-onboarding-update-success";
  };
  merchantPaymentAccountSuccess: {
    path: "/merchantpaymentaccountsuccess";
  };
  merchantUpdateProfile: {
    path: "/update-merchant-profile";
  };
  profile: {
    path: "/profile";
  };
  profileImageCreate: {
    path: "/profileimagecreate";
  };
  profileUpdate: {
    path: "/update-profile";
  };
  stripeConnect: {
    path: "/stripeconnect";
  };
  stripeConfirm: {
    path: "/stripeconfirm";
  };
  sales: {
    path: "/sales";
  };
  sales_Sale: {
    path: "/sales/:id";
    params: { id: string };
  };
  offersBlocks: {
    path: "/offers/blocks";
  };
  offersCreditCards: {
    path: "/offers/credit-cards";
  };
  offersPersonalLoans: {
    path: "/offers/personal-loans";
  };
  account_Account_: {
    path: "/account/:id";
    params: { id: string };
  };
  account_Account_pay: {
    path: "/account/:id/pay";
    params: { id: string };
  };
  account_Account_ratings: {
    path: "/account/:id/ratings";
    params: { id: string };
  };
  accountSwitch: {
    path: "/switch-accounts";
  };
  account_Account_Ticketing_Platform_Events_Event__PageState_: {
    path: "/account/:accountId/ticketing/:platformId/events/:eventId/:pageState?";
    params: { accountId: string; platformId: string; eventId: string; pageState?: string };
  };
  account_Account_Ticketing_Platform_Orders_Order_: {
    path: "/account/:accountId/ticketing/:platformId/orders/:orderId";
    params: { accountId: string; platformId: string; orderId: string };
  };
  account_Account_Ticketing_Platform_Orders_Order_Success: {
    path: "/account/:accountId/ticketing/:platformId/orders/:orderId/success";
    params: { accountId: string; platformId: string; orderId: string };
  };
  portfolio: {
    path: "/portfolio";
  };

  terms: {
    path: "/terms";
  };
  payouts: {
    path: "/payouts";
  };
  transactions: {
    path: "/transactions";
  };
  cryptoWallet: {
    path: "/crypto-wallet";
  };
  cryptoWalletTransactionsAll: {
    path: "/crypto-wallet/all-transactions";
  };
  cryptoWalletWitdraw: {
    path: "/crypto-wallet/withdraw";
  };

  cryptoWalletWitdraw_Crypto_: {
    path: "/crypto-wallet/withdraw/:cryptoId";
    params: { cryptoId: string };
  };
  cryptoWalletSend_Currency_Success: {
    path: "/crypto-wallet/send/:cryptoId/success";
    params: { cryptoId: string };
  };
  cryptoWalletUserSearch: {
    path: "/crypto-wallet/search";
  };
  cryptoWalletUserSearch_Currency_: {
    path: "/crypto-wallet/search/:currency";
    params: { currency: string };
  };
  cryptoWalletUserSearch_SelectCurrency_: {
    path: "/crypto-wallet/search/user/:userId";
    params: { userId: string };
  };
  cryptoWalletUserSearch_SelectAmount_: {
    path: "/crypto-wallet/search/chooseAmount/:userId";
    params: { userId: string };
  };
  cryptoWalletUserSearch_PreviewTransfer_: {
    path: "/crypto-wallet/search/previewTransfer/:transactionId";
    params: { transactionId: string };
  };
  coinMarket: {
    path: "/coins/market";
  };
  cryptoWalletCoinInfo_Coin_: {
    path: "/crypto-wallet/coin/:coinId";
    params: { coinId: string };
  };
  cryptoWalletReceive: {
    path: "/crypto-wallet/receive";
  };
  cryptoWalletReceive_Crypto_: {
    path: "/crypto-wallet/receive/:cryptoId";
    params: { cryptoId: string };
  };
  plaidOAuth: {
    path: "/plaid-oauth";
    params: { state: string };
  };
  etxInsights: {
    path: "/etx-insights";
  };
  etxInsightsInvest: {
    path: "/etx-insights/invest";
  };
  etxWithdraw: {
    path: "/etx/withdraw";
  };
  etxTransactionsAll: {
    path: "/etx/all-transactions";
  };
};

type RouteHasParams<T> = T extends { params: unknown } ? [T["params"]] : [undefined?];

/**
 * used to build paths for links. this is typed to the available routes
 * and ensures the appropriate params are passed in.
 */
export function buildPath<K extends keyof Routes, P extends RouteHasParams<Routes[K]>>(
  path: K,
  ...params: P
): RouteString {
  const paramObject = params[0];

  if (paramObject) {
    return generatePath(route[path], paramObject) as RouteString;
  }

  return route[path];
}

type EmptyObject = Record<never, never>;

export function useRoutesParams<T extends keyof Routes>(): Routes[T] extends { params: unknown }
  ? Routes[T]["params"]
  : EmptyObject {
  return useParams();
}
