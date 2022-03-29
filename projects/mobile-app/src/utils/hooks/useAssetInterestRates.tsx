import { useGetMyAssetInterestRatesQuery, AssetInterestRateType } from "generated/graphql";
import { AdvertisementItemProps } from "components/Modules/CryptoWallet/Portfolio/AdvertisementList/AdvertisementItem";
import { ForwardIcon } from "assets/icons";

export function useAssetInterestRates(): AdvertisementItemProps[] | undefined {
  const { data } = useGetMyAssetInterestRatesQuery({
    fetchPolicy: "cache-and-network",
  });

  const items = mapAssetsToAdvertisementItems(data?.myAssetInterestRates);

  return items;
}

export function mapAssetsToAdvertisementItems(
  assets?: Pick<AssetInterestRateType, "code" | "name" | "logoImage" | "interestRate">[]
) {
  return assets?.map((asset, index) => ({
    key: index!,
    name: asset?.name!,
    tickerCode: asset?.code!,
    valueInPercent: asset?.interestRate ? asset?.interestRate * 100 : 0,
    forwardIcon: ForwardIcon,
    image: asset?.logoImage!,
  }));
}
