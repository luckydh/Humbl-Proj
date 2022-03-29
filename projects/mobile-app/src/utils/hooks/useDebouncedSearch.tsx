import useDebounce from "hooks/useDebouncedValue";
import { useEffect, useState } from "react";

const SEARCH_TERM_TIMEOUT = 500;

export const useDebouncedSearch = (searcher: (term: string) => void) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_TERM_TIMEOUT);

  useEffect(() => {
    const search = debouncedSearchTerm ?? "";
    searcher(search);
    // we have to disable as this expects the function to be passed in as searcher
    // searcher will always have a new ref each re-render creating a render loop
    // unless we remove searcher from the dep array and disable the lint rule
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return setSearchTerm;
};
