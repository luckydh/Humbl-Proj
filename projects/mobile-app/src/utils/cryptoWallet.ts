import { AdvertisementItemProps } from "components/Modules/CryptoWallet/Portfolio/AdvertisementList/AdvertisementItem";

interface AssetInterestCryptoItemProps {
  tickerCode?: string;
  coin?: string;
}

export function getAssetInterestRateObject(
  crypto: AssetInterestCryptoItemProps,
  assetInterestRatesData: AdvertisementItemProps[] | undefined
) {
  if (assetInterestRatesData && assetInterestRatesData.length > 0) {
    const tickerCode = crypto.tickerCode ? crypto.tickerCode : crypto.coin ? crypto.coin : null;
    return assetInterestRatesData.find((item) => item.tickerCode === tickerCode);
  }
}
