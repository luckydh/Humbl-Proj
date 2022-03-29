import { makeVar, ReactiveVar, useReactiveVar } from "@apollo/client";
import client from "graphql/client";
import { AccountType, MerchantProfileType } from "../generated/graphql";
import { Storage } from "@capacitor/storage";
import { getAcceptedToSVersion, setAcceptedToSVersion } from "state/terms";

export const currentAccount: ReactiveVar<AccountType | null> = makeVar<AccountType | null>(null);

export const useCurrentAccount = () => useReactiveVar(currentAccount);

export const setCurrentAccount = async (account: AccountType): Promise<void> => {
  await Storage.migrate();
  await Storage.set({ key: "defaultAccountId", value: account.id });
  currentAccount(account);
};

const PLAID_LINK_TOKEN_STORAGE_KEY = "PlaidLinkToken";
export const setStoredPlaidToken = async (token: string): Promise<void> => {
  await Storage.set({
    key: PLAID_LINK_TOKEN_STORAGE_KEY,
    value: token,
  });
};

export const getAndClearStoredPlaidToken = async (): Promise<string | undefined> => {
  const storage = await Storage.get({
    key: PLAID_LINK_TOKEN_STORAGE_KEY,
  });

  await Storage.remove({
    key: PLAID_LINK_TOKEN_STORAGE_KEY,
  });

  return storage.value ?? undefined;
};

export type FetchPolicyKeys = "PlaidToken";
const FETCH_POLICY_KEY = "FETCH_POLICY_MAP";
export const getStoredFetchPolicy = async (key: FetchPolicyKeys): Promise<number | null> => {
  const storage = await Storage.get({
    key: FETCH_POLICY_KEY,
  });

  const map = JSON.parse(storage.value ?? "{}");

  return map[key];
};

export const setStoredFetchPolicy = async (key: FetchPolicyKeys, value: number): Promise<void> => {
  const storage = await Storage.get({
    key: FETCH_POLICY_KEY,
  });

  const map = JSON.parse(storage.value ?? "{}");
  map[key] = value;

  await Storage.set({
    key: FETCH_POLICY_KEY,
    value: JSON.stringify(map),
  });
};

export const clearCurrentAccount = async (): Promise<void> => {
  const tempShouldShowOnBoarding = await getShouldShowOnBoarding();
  const tempAcceptedToSVersion = await getAcceptedToSVersion();
  const autoSwipeCompleted = await Storage.get({ key: "autoSwipeCompleted" });
  await Storage.migrate();
  await Storage.clear();
  await client.clearStore();
  await client.cache.reset();
  if (autoSwipeCompleted.value) {
    await Storage.set({ key: "autoSwipeCompleted", value: autoSwipeCompleted.value });
  }
  currentAccount(null);
  currentAccountId(undefined);
  if (tempShouldShowOnBoarding != null) await setShouldShowOnBoarding(JSON.parse(tempShouldShowOnBoarding));
  // TODO: when accepted ToS is moved to db, remove this.
  if (tempAcceptedToSVersion != null) await setAcceptedToSVersion(tempAcceptedToSVersion);
};

export const clearAccountPersistentFlags = async (): Promise<void> => {
  await setShouldShowOnBoarding();
  await setAcceptedToSVersion();
};

export const currentMerchantAccount: ReactiveVar<MerchantProfileType | null> = makeVar<MerchantProfileType | null>(
  null
);

export const useCurrentMerchantAccount = () => useReactiveVar(currentMerchantAccount);

export const setCurrentMerchantAccount = async (merchantProfile: MerchantProfileType): Promise<void> => {
  await Storage.migrate();
  await Storage.set({
    key: "defaultMerchantAccountId",
    value: merchantProfile.id,
  });
  currentMerchantAccount(merchantProfile);
};
export const currentAccountId: ReactiveVar<string | undefined> = makeVar<string | undefined>(undefined);
export const useCurrentAccountId = () => useReactiveVar(currentAccountId);

export const setCurrentAccountId = async (id: string | undefined) => {
  await Storage.migrate();
  await Storage.set({
    key: "defaultAccountId",
    value: `${id}`,
  });
  return currentAccountId(id);
};
export const clearCurrentAccountId = async () => {
  await Storage.migrate();
  await Storage.clear();
  await client.clearStore();
  await client.cache.reset();
  currentAccount(undefined);
};

export const getShouldShowOnBoarding = async () => {
  const { value } = await Storage.get({ key: "shouldShowOnBoarding" });
  if (value == null) {
    return true;
  }
    return JSON.parse(value);
};

export const setShouldShowOnBoarding = async (val = true) => {
  await Storage.migrate();
  await Storage.set({
    key: "shouldShowOnBoarding",
    value: `${val}`,
  });
};
