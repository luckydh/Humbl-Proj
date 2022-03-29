import React from "react";
import { WidgetContainer } from "components/Modules/Widgets/WidgetContainer";
import { useMyAssetsQuery } from "generated/graphql";
import { useTranslation } from "react-i18next";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";
import { useHistory } from "react-router";
import { CryptoCurrencyList } from "../CryptoCurrencyList";
import { CryptoCurrencyItemProps } from "../CryptoCurrencyList/CryptoCurrencyItem";
import { formatUsingIntl } from "utils/currency";
import { buildPath } from "utils/routes";

/**
 * Calls market list query and Renders cryptocurrency list. The tab container
 * takes care of apollo calls, and only renders a single thin component. No rendering
 * logic should live inside these 'containers'
 * @returns <CryptoCurrencyList/>
 */
export const MyAssetsVerticalListWidget: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const currency = useGetCurrentAccountCurrency();
  const { data, loading, error } = useMyAssetsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      currency,
    },
  });

  /**
   * Define on click handler when a coin is clicked
   * @param data Return CryptoCurrencyItem data passed back
   */
  const onClickAsset = (clickedAsset: CryptoCurrencyItemProps) => {
    // handler gets data from item back.
    history.push(buildPath("cryptoWalletCoinInfo_Coin_", { coinId: clickedAsset.tickerCode }));
  };

  if (error) {
    return (
      <WidgetContainer ariaLabel="MY_ASSETS_VERTICAL_LIST_WIDGET_CONTAINER">
        <div className="mx-6 my-10 text-sm text-black">{t("widget.error.generic-loading-error")}</div>
      </WidgetContainer>
    );
  }

  if (!data?.myAssets?.length) {
    return null;
  }

  const items: CryptoCurrencyItemProps[] = data.myAssets.map((coin) => ({
    name: coin.name,
    tickerCode: coin.code ?? "",
    valueInCrypto: coin.amount,
    interestGaining: coin.interestGaining,
    valueInFiat: formatUsingIntl(coin.fiatAmount?.major ?? 0, "standard", currency),
    image: coin.logoImage!,
  }));

  // We pass loading state to the list item so it maintains all rendering control.
  return (
    <>
      <div className="mt-4 mx-6">
        <span className="font-semibold text-2xl text-white" aria-label="MYASSETS_VERTICAL_LIST_TITLE_LABEL">
          {t("pages.crypto-wallet.portfolio.assets-you-own")}
        </span>
      </div>
      <WidgetContainer ariaLabel="MY_ASSETS_VERTICAL_LIST_WIDGET_CONTAINER">
        <div className="flex" aria-label="MYASSETS_VERTICAL_LIST_SECTION">
          <CryptoCurrencyList
            items={items}
            loading={loading}
            onClickItem={onClickAsset}
            ariaLabel="MYASSETS_VERTICAL_LIST"
          />
          ;
        </div>
      </WidgetContainer>
    </>
  );
};
