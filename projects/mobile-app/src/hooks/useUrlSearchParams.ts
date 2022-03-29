import { useLocation } from "react-router";
import { useState, useEffect } from "react";

type SearchParams = Record<string, string | undefined>;

// A custom hook that builds on useLocation to parse
// the query string for you.
export function useURLSearchParams(params: string[]): SearchParams {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  useEffect(
    () => {
      const urlSearchParams = new URLSearchParams(search);

      const newSearchParams = params.reduce((curr, next) => {
        curr[next] = urlSearchParams.get(next) ?? undefined;
        return curr;
      }, {} as SearchParams);

      setSearchParams(newSearchParams);
    },
    // spread params to avoid new object comparison
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search, ...params]
  );

  return searchParams;
}
