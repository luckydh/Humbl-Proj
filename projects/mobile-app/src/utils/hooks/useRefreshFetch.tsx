import { useEffect } from "react";

const useRefreshFetch = (isRefreshing: boolean, refetch: () => void) => {
  useEffect(() => {
    if (isRefreshing) {
      refetch();
    }
  }, [refetch, isRefreshing]);
};

export default useRefreshFetch;
