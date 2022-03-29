import { buildPath } from "utils/routes";
import { useGetCurrentAccount } from "./useGetCurrentAccount";

export function useCurrentAccountHomePath() {
  const { currentAccount } = useGetCurrentAccount();
  return currentAccount?.isMerchant ? buildPath("home") : buildPath("cryptoWallet");
}
