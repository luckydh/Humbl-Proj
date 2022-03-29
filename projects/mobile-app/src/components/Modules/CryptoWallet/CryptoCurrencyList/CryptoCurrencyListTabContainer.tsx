import React from "react";
import { useGetMarketListQuery } from "generated/graphql";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { displaySignificantFigures } from "utils/currency";
import useRefreshFetch from "utils/hooks/useRefreshFetch";
import { buildPath } from "utils/routes";
import { CryptoCurrencyItemProps } from "./CryptoCurrencyItem";
import { CryptoCurrencyList } from "./CryptoCurrencyList";

/**
 * Calls market list query and Renders cryptocurrency list. The tab container
 * takes care of apollo calls, and only renders a single thin component. No rendering
 * logic should live inside these 'containers'
 * @returns <CryptoCurrencyList/>
 */

interface Props {
  isRefreshing?: boolean;
  ariaLabel?: string;
}

export const CryptoCurrencyListTabContainer: React.FC<Props> = ({ isRefreshing = false, ariaLabel }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { data, loading, error, refetch } = useGetMarketListQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      limit: 4,
    },
  });

  useRefreshFetch(isRefreshing, refetch);

  /**
   * Define on click handler when a coin is clicked
   * @param cryptoCurrencyItem Return CryptoCurrencyItem data passed back
   */
  const onClickCryptoCurrency = (cryptoCurrencyItem: CryptoCurrencyItemProps) => {
    // handler gets data from item back.
    history.push(buildPath("cryptoWalletCoinInfo_Coin_", { coinId: cryptoCurrencyItem.tickerCode }));
  };

  const onClickSeeAll = () => {
    history.push(buildPath("coinMarket"));
  };

  // TODO: Slices returned data to a maximum of 4. This should probably be a
  // variable passed to the backend so FE is not doing any slicing.
  const items: CryptoCurrencyItemProps[] =
    data?.getMarketList?.assets?.slice(0, 4).map(
      (coin): CryptoCurrencyItemProps =>
        // We map returned value to the format needed for our CryptoCurrencyItemProps
        ({
          name: coin.name!,
          tickerCode: coin.code ?? "",
          valueInFiat: displaySignificantFigures(coin.price || 0, "standard", coin.currency),
          change: coin.percentChangeOverPeriod,
          image: coin.logoImage!,
        })
    ) ?? [];
  // We pass loading state to the list item so it maintains all rendering control.
  return (
    <CryptoCurrencyList
      variant="compact"
      items={items}
      loading={loading}
      shouldRefresh={isRefreshing}
      error={error}
      cta={{ onClick: onClickSeeAll, text: t("button.text.see-all") }}
      onClickItem={onClickCryptoCurrency}
      ariaLabel={ariaLabel}
    />
  );
};
