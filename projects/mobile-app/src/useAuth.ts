import { MeQuery, useMeQuery } from "generated/graphql";
import { useEffect, useCallback, useState } from "react";
import { clearCurrentAccount, setCurrentAccountId } from "state/cache";
import firebase, { getEmailVerification } from "./Firebase";

interface UseAuthReturn {
  user: firebase.User | null;
  authAttempted: boolean;
  isVerified: any;
}

export const useAuth: () => UseAuthReturn = () => {
  const [user, setUser] = useState<null | firebase.User>(null);
  const [account, setAccount] = useState<MeQuery | undefined>(undefined);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  /**
   * This is used to track if the firebase SDK has attempted a login.
   * Firebase on load will auto-login if you are still authenticated.
   */
  const [authAttempted, setAuthAttempted] = useState(false);

  const accountData = useMeQuery({
    skip: true,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  const onChange = useCallback(
    async (newUser: firebase.User | null) => {
      // getting login twice for some reason
      if (user && newUser && user.uid === newUser.uid) {
        return;
      }
      //is user doesn't not exist any longer, set our user to false
      if (!newUser) {
        // cleanup - no more user (logged out, expired)
        await clearCurrentAccount();
        setUser(null);
        setAccount(undefined);
        setAuthAttempted(true);
      }
      // we have a valid firebase user. Call to get default accountData
      if (newUser && !account) {
        //Use refetch and skip because useLazy doesn't return a promise, but for some
        //reason, refetch does: https://github.com/apollographql/apollo-client/issues/5268#issuecomment-749501801
        const result = await accountData.refetch();
        // Set current account in local storage so we have it available on next load
        await setCurrentAccountId(result.data.me.id);
        //Set account from useState. Causes onChange to trigger again due to update.
        await setAccount(result.data);
      }
      //We have a valid user now, and an account. Set auth to true and continue loading app
      if (newUser && account) {
        setUser(newUser);
        setIsVerified(getEmailVerification() || false);
        setAuthAttempted(true);
      }
    },
    [user, account, accountData]
  );

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
    return () => unsubscribe();
  }, [onChange]);

  return { user, authAttempted, isVerified };
};
