import { WidgetContainer } from "components/Modules/Widgets/WidgetContainer";
import { useGetMarketTopMoversListQuery } from "generated/graphql";

import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { CryptoCurrencyItemProps } from "./CryptoCurrencyItem";
import { CryptoCurrencyList } from "./CryptoCurrencyList";
import { buildPath } from "utils/routes";
import useRefreshFetch from "utils/hooks/useRefreshFetch";

type CryptoCurrencyTopMoversContainerProps = {
  isRefreshing?: boolean;
  ariaLabel?: string;
};
/**
 * Calls market list query and Renders cryptocurrency list. The tab container
 * takes care of apollo calls, and only renders a single thin component. No rendering
 * logic should live inside these 'containers'
 * @returns <CryptoCurrencyList/>
 */
export const CryptoCurrencyTopMoversWidgetContainer: React.FC<CryptoCurrencyTopMoversContainerProps> = ({
  isRefreshing = false,
  ariaLabel,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const { data, loading, error, refetch } = useGetMarketTopMoversListQuery({
    fetchPolicy: "cache-and-network",
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

  if (error) {
    return (
      <WidgetContainer ariaLabel="CRYPTO_CURRENCY_LIST_WIDGET_CONTAINER">
        <div className="mx-6 my-10 text-sm text-black">{t("widget.error.generic-loading-error")}</div>
      </WidgetContainer>
    );
  }
  // TODO: Slices returned data to a maximum of 4. This should probably be a
  // variable passed to the backend so FE is not doing any slicing.
  const items: CryptoCurrencyItemProps[] =
    data?.getMarketList?.assets?.slice(0, 4).map(
      (coin): CryptoCurrencyItemProps =>
        // We map returned value to the format needed for our CryptoCurrencyItemProps
        ({
          name: coin.name!,
          tickerCode: coin.code ?? "",
          change: coin.percentChangeOverPeriod!,
          image: coin.logoImage!,
        })
    ) ?? [];
  // We pass loading state to the list item so it maintains all rendering control.

  return (
    <CryptoCurrencyList
      variant="compact"
      ariaLabel={ariaLabel}
      items={items}
      loading={loading}
      onClickItem={onClickCryptoCurrency}
      shouldRefresh={isRefreshing}
    />
  );
};
