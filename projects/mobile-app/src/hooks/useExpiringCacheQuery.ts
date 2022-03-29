import { useState, useEffect, useRef } from "react";
import { FetchPolicy } from "@apollo/client";
import { getStoredFetchPolicy, setStoredFetchPolicy, FetchPolicyKeys } from "state/cache";

const DEFAULT_EXPIRATION_IN_SEC = 600; // 10 minutes

/**
 *
 * @param key {FetchPolicyKeys} A key used to get the stored fetch policy on the OS preferred storage or local storage
 * @param expirationInSec {number} [default = 600 or 10 minutes] Expiration time specified in seconds (e.g 60 = 1 minute)
 * @description This hook determines the fetchPolicy for an Apollo query or mutation based on the specified {expirationInSec}.
 * If the specified {key} is not stored in the OS storage, or the times elapsed since last fetch is greater than {expirationInSec},
 * the hook will store last time since last fetch by {key} and return a fetchPolicy = "network-only".
 * Otherwise the hook will return a fetchPolicy = "cache-first"
 * @default "cache-only"
 */

export function useExpiringCacheFetchPolicy(
  key: FetchPolicyKeys,
  expirationInSec = DEFAULT_EXPIRATION_IN_SEC
): FetchPolicy {
  const [fetchPolicy, setFetchPolicy] = useState<FetchPolicy>("cache-only");

  const expirationRef = useRef(expirationInSec);
  const keyRef = useRef(key);

  useEffect(() => {
    expirationRef.current = expirationInSec;
  }, [expirationInSec]);

  useEffect(() => {
    keyRef.current = key;
  }, [key]);

  useEffect(() => {
    async function updateFetchPolicy() {
      try {
        const fetchPolicyKey = keyRef.current;
        const expirationInMilliSec = expirationRef.current * 1000;

        const lastFetch = (await getStoredFetchPolicy(fetchPolicyKey)) ?? 0;
        const now = Date.now();
        const timeSinceLastFetch = now - lastFetch;
        const isExpired = timeSinceLastFetch > expirationInMilliSec;

        if (!lastFetch || isExpired) {
          setStoredFetchPolicy(fetchPolicyKey, now);
          setFetchPolicy("network-only");
        } else {
          setFetchPolicy("cache-first");
        }
      } catch (error) {
        setFetchPolicy("network-only");
      }
    }

    updateFetchPolicy();
  }, []);

  return fetchPolicy;
}
