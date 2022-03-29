import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { displaySignificantFigures } from "utils/currency";
import { buildPath } from "utils/routes";
import { useHistory } from "react-router";
import { AssetMetricType, MarketPeriodInput, useGetMarketListQuery } from "../../generated/graphql";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { CryptoCurrencyItemProps, CryptoCurrencyList } from "../../components/Modules/CryptoWallet/CryptoCurrencyList";
import { SelectorRow } from "../../components/SelectorRow/SelectorRow";
import { useSearchCryptoCurrencies } from "../../components/Modules/CryptoWallet/ChooseAssetScreen/useSearchCryptoCurrencies";
import { useMarketListPageReducer } from "./useMarketListPageReducer";
import { IonPage, IonIcon } from "@ionic/react";
import { KeyboardAwareView } from "components/common";
import { chevronBackOutline } from "ionicons/icons";
import { useDebouncedSearch } from "utils/hooks/useDebouncedSearch";

type MarketListPageProps = {
  title: string;
};

const transformCryptoAssets = (assets: AssetMetricType[]): CryptoCurrencyItemProps[] =>
  // We map returned value to the format needed for our CryptoCurrencyItemProps
  assets?.map((coin) => ({
    name: coin.name!,
    tickerCode: coin.code ?? "",
    valueInFiat: displaySignificantFigures(coin.price || 0, "standard", coin.currency),
    change: coin.percentChangeOverPeriod,
    image: coin.logoImage!,
  })) ?? [];

const options = [
  { label: "1H", value: MarketPeriodInput.Hour_1, ariaLabel: "MARKET_1H_BUTTON" },
  { label: "24H", value: MarketPeriodInput.Hour_24, ariaLabel: "MARKET_24H_BUTTON" },
  { label: "1W", value: MarketPeriodInput.Week_1, ariaLabel: "MARKET_1W_BUTTON" },
  { label: "1M", value: MarketPeriodInput.Month_1, ariaLabel: "MARKET_1M_BUTTON" },
  { label: "1Y", value: MarketPeriodInput.Year_1, ariaLabel: "MARKET_1Y_BUTTON" },
  { label: "All", value: MarketPeriodInput.All, ariaLabel: "MARKET_ALL_BUTTON" },
];

export const MarketListPage = ({ title }: MarketListPageProps) => {
  const { t } = useTranslation();
  const { state, setAllAssets, setPeriod, setSearchTerm } = useMarketListPageReducer();
  const history = useHistory();
  const { loading } = useGetMarketListQuery({
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
    variables: { period: state.period, limit: 30 },
    onCompleted: (queryResult) => {
      setAllAssets(transformCryptoAssets(queryResult?.getMarketList?.assets as AssetMetricType[]));
    },
  });
  const setSearchTermDebounce = useDebouncedSearch((searchTerm) => setSearchTerm(searchTerm));
  const { results, reset } = useSearchCryptoCurrencies(state.searchTerm, state.assets);

  const handleClickItem = useCallback(
    (data: CryptoCurrencyItemProps) => {
      history.push(buildPath("cryptoWalletCoinInfo_Coin_", { coinId: data.tickerCode }));
    },
    [history]
  );

  const handleOnClick = () => {
    history.push(buildPath("cryptoWallet"));
  };

  return (
    <IonPage className="safe-area-top bg-lines">
      <KeyboardAwareView>
        <div className="flex flex-col h-full">
          <div className="flex flex-wrap items-center w-full px-6 py-5">
            <button
              aria-label="MARKET_BACK_BUTTON"
              className="justify-center text-white inline-flex"
              type="button"
              onClick={handleOnClick}
              title="Go back">
              <IonIcon icon={chevronBackOutline} className="text-3xl" />
            </button>

            <div className="flex-1 mr-7">
              <h1
                className="text-xl capitalize border-white font-medium text-center text-white m-auto"
                aria-label="MARKET_TITLE_LABEL">
                {title}
              </h1>
            </div>
          </div>
          <div className="mb-5 px-6">
            <SearchInput
              ariaLabel="MARKET"
              onChange={(event) => setSearchTermDebounce(event.target.value)}
              onClear={() => reset()}
              placeholder={t("market.component.search")}
            />
          </div>
          <SelectorRow options={options} onOptionsSelected={setPeriod} selectedOption={state.period} />

          <CryptoCurrencyList loading={loading} items={results} onClickItem={handleClickItem} ariaLabel="MARKET" />
        </div>
      </KeyboardAwareView>
    </IonPage>
  );
};
