import { useCallback, useEffect, useState } from "react";
import { CryptoCurrencyItemProps } from "../CryptoCurrencyList";

/**
 * Filters a list of cryptocurrencies based on a search term.
 * Returns the items that match either the name or "ticker" code.
 *
 * @param searchTerm The search term.
 * @param items The list of items to be filtered.
 * @returns {CryptoCurrencyItemProps[]} The filtered list.
 */
function filterCryptoByTerm(
  searchTerm: string,
  items: CryptoCurrencyItemProps[]
): CryptoCurrencyItemProps[] {
  return items?.filter((item) => {
    const lowerCaseTerm = searchTerm.toLowerCase();

    if (item.tickerCode?.toLowerCase().includes(lowerCaseTerm)) {
      return true;
    }

    if (item.name?.toLowerCase().includes(lowerCaseTerm)) {
      return true;
    }

    return false;
  });
}

/**
 * Creating a reference for the empty array here,
 * since [] === [] equals false, which would cause the
 * useEffect hook to run multiple times.
 */
const defaultItems: CryptoCurrencyItemProps[] = [];

interface UseSearchCryptoCurrenciesMethods {
  reset: () => void;
  results: CryptoCurrencyItemProps[];
}

/**
 * React Hook to make a search in a list of cryptocurrencies.
 * It filters the list an returns the results every time the search term changes.
 *
 * @param searchTerm The search term.
 * @param initialItems The initial list of items.
 * @returns {UseSearchCryptoCurrenciesMethods} An object with the results and utility functions.
 */
export function useSearchCryptoCurrencies(
  searchTerm: string,
  initialItems: CryptoCurrencyItemProps[] = defaultItems
): UseSearchCryptoCurrenciesMethods {
  const [results, setResults] = useState(initialItems);

  const reset = useCallback(() => {
    setResults(initialItems);
  }, [initialItems]);

  useEffect(() => {
    setResults(initialItems);
  }, [initialItems]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setResults(initialItems);
      return;
    }

    // should only search with 3 or more characters
    if (searchTerm.length < 3) {
      return;
    }

    setResults(filterCryptoByTerm(searchTerm, initialItems));
  }, [searchTerm, initialItems]);

  return {
    reset,
    results,
  };
}
