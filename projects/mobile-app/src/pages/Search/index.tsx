import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchImage from "assets/images/search-default.jpg";
import { useTranslation } from "react-i18next";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { UserItem, UserItemSkeleton } from "../../components/UserItem/UserItem";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { useSearchAccountsLazyQuery } from "../../generated/graphql";
import { useDebouncedSearch } from "utils/hooks/useDebouncedSearch";

const Search: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [search, setSearch] = useState<string>("");
  const [doSearch, { data, loading }] = useSearchAccountsLazyQuery({
    fetchPolicy: "cache-and-network",
  });

  const setSearchTerm = useDebouncedSearch((searchTerm) => {
    searchTerm.length > 0 ? setSearch(searchTerm) : setSearch("");
    return doSearch({ variables: { search: searchTerm, isMerchant: true } });
  });

  const handleOnClick = (id: string) => () => {
    history.push(`/account/${id}`);
  };

  const augmentedData = search && search.length > 0 ? data?.searchAccounts : [];

  return (
    <div
      className="flex flex-col h-full"
      style={
        !search
          ? {
              backgroundRepeat: "no-repeat",
              backgroundPosition: "50% 50%",
              backgroundImage: `url(${SearchImage})`,
              backgroundSize: "cover",
            }
          : {}
      }>
      <div className="mt-3 mx-6 sticky top-0">
        <SearchInput
          placeholder={t("component-search-input.placeholder.search")}
          onClear={() => {
            setSearchTerm("");
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event?.target?.value.trim())}
        />
      </div>
      <div className="px-6 h-full overflow-y-auto">
        {augmentedData !== undefined && augmentedData?.length === 0 && !loading && search === "" && (
          <div className="flex items-center text-center justify-center py-10">
            <div className="flex-1 leading-snug text-white text-3xl">{t("page-search.text.search-by")}</div>
          </div>
        )}
        {loading && search !== "" && (
          <>
            <UserItemSkeleton />
            <UserItemSkeleton />
            <UserItemSkeleton />
          </>
        )}
        {!!search && !loading && data?.searchAccounts?.length === 0 && (
          <div className="flex items-center text-center justify-center py-10">
            <div className="flex-1 leading-snug text-white text-3xl">{t("page-search.text.no-results-found")}</div>
          </div>
        )}
        {!loading && data?.searchAccounts && data.searchAccounts.length > 0 && (
          <>
            {trackEvent(EVENTS.VIEW_ITEM_LIST, { search })}
            {data.searchAccounts.map((account) => (
              <div className="my-4" key={account.userName}>
                <UserItem
                  onClick={handleOnClick(account.id)}
                  name={account.displayName}
                  userName={account.userName}
                  src={account.image}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
