import { CryptoCurrencyItemProps, CryptoCurrencyList } from "components/Modules/CryptoWallet/CryptoCurrencyList";
import { DistributionCurrency, useGetMarketListQuery } from "generated/graphql";
import React from "react";
import { useHistory } from "react-router";
import { formatUsingIntl } from "utils/currency";
import { buildPath } from "utils/routes";

interface AssetsMarketPriceProps {
  distribution: DistributionCurrency[];
}
const AssetsMarketPrice: React.FC<AssetsMarketPriceProps> = ({ distribution }) => {
  const history = useHistory();

  const { data, loading, error } = useGetMarketListQuery({
    fetchPolicy: "cache-and-network",
  });

  /**
   * Define on click handler when a coin is clicked
   * @param cryptoCurrencyItem Return CryptoCurrencyItem data passed back
   */
  const onClickCryptoCurrency = (cryptoCurrencyItem: CryptoCurrencyItemProps) => {
    // handler gets data from item back.
    history.push(buildPath("cryptoWalletCoinInfo_Coin_", { coinId: cryptoCurrencyItem.tickerCode }));
  };
  const blockCryptoData = data?.getMarketList?.assets?.filter((coin) =>
    distribution.some((distributionData) => distributionData.code === coin.code)
  );
  const items: CryptoCurrencyItemProps[] =
    blockCryptoData?.map(
      (coin): CryptoCurrencyItemProps => ({
        name: coin.name!,
        tickerCode: coin.code ?? "",
        valueInFiat: formatUsingIntl(coin.price || 0, "standard", coin.currency),
        change: coin.percentChangeOverPeriod,
        image: coin.logoImage!,
      })
    ) ?? [];

  return (
    <CryptoCurrencyList
      ariaLabel="ETX"
      variant="compact"
      items={items}
      loading={loading}
      error={error}
      onClickItem={onClickCryptoCurrency}
    />
  );
};

export default AssetsMarketPrice;
