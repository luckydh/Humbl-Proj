import { useFeatureFlag } from "utils/Feature";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import { Countries } from "utils/Countries";

const PlaidSupportedCountry = [Countries.US];

export const useCanUsePlaid = () => {
  const isACHEnabled = useFeatureFlag("ach-feature-redux-121521");
  const { currentAccount } = useGetCurrentAccount();

  if (!isACHEnabled) {
    return false;
  }

  const accountCountry = currentAccount?.country?.alpha2?.toUpperCase() as Countries;
  return PlaidSupportedCountry.includes(accountCountry);
};
