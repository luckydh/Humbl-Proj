import React, { FC } from "react";
import { ProgressBar } from "components/ProgressBar/ProgressBar";
import { InterestGainIcon } from "assets/icons";
import {
  CryptoCurrencyItem,
  CryptoCurrencyItemProps,
} from "components/Modules/CryptoWallet/CryptoCurrencyList/CryptoCurrencyItem";
import { formatUsingIntl } from "utils/currency";
import { useTranslation } from "react-i18next";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";
import ContentLoader from "react-content-loader";
import skeletonStyles from "utils/SkeletonStyles";

export const InterestColorMap: Record<string, string> = {
  BTC: "#F7931A",
  ETH: "#8A92B2",
  USDC: "#2775CA",
};

export interface InterestGainProps {
  isLoading?: boolean;
  totalInterest?: number;
  cryptoCurrencylist?: CryptoCurrencyItemProps[];
}

const InterestGain: FC<InterestGainProps> = ({ totalInterest = 0, cryptoCurrencylist, isLoading }) => {
  const { t } = useTranslation();
  const currency = useGetCurrentAccountCurrency();

  if (isLoading) {
    return <InterestGainSkeleton />;
  }

  if (!cryptoCurrencylist?.length) {
    return null;
  }

  return (
    <div className="bg-blue-lightest mb-6 p-1.5 mt-10 rounded-xl relative">
      <div className="h-14 w-14 rounded-full bg-white absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2">
          <img src={InterestGainIcon} alt="Interest GainIcon" />
        </div>
      </div>
      <div className="mt-10 text-blue-dark font-semibold text-2xl text-center">{formatUsingIntl(totalInterest, "standard", currency)}</div>
      <div className="mt-2 text-blue-dark text-sm text-center">
        {t("pages.crypto-wallet.portfolio.interest.total-gained")}
      </div>
      <ProgressBar data={cryptoCurrencylist} total={totalInterest} />
      {cryptoCurrencylist?.map((crypto) => (
        <CryptoCurrencyItem
          key={crypto.tickerCode}
          tickerCode={crypto.tickerCode}
          valueInFiat={crypto.valueInFiat}
          liClassName="list-none"
          name={crypto.name}
          color={InterestColorMap[crypto.tickerCode]}
          valueInCrypto={crypto.valueInCrypto}
        />
      ))}
    </div>
  );
};

const InterestGainSkeleton: FC = () => (
  <ContentLoader
    className="rounded-md"
    width="100%"
    viewBox="0 0 327 411"
    uniqueKey="interest-gain-skeleton"
    {...skeletonStyles}>
    <rect x="126" y="20" width="75" height="76" rx="8" fill="#80DAFE" />
    <rect x="52" y="109" width="223" height="16" rx="6" fill="#80DAFE" />
    <rect x="52" y="137" width="223" height="47" rx="6" fill="#80DAFE" />
    <rect x="16" y="227" width="28" height="28" rx="6" fill="#80DAFE" />
    <rect x="55" y="235" width="69" height="12" rx="4" fill="#80DAFE" />
    <rect x="138" y="235" width="69" height="12" rx="4" fill="#80DAFE" />
    <rect x="218" y="235" width="75" height="12" rx="4" fill="#80DAFE" />
    <rect x="302" y="235" width="12" height="12" rx="4" fill="#80DAFE" />
    <rect x="16" y="295" width="28" height="28" rx="6" fill="#80DAFE" />
    <rect x="55" y="303" width="69" height="12" rx="4" fill="#80DAFE" />
    <rect x="138" y="303" width="69" height="12" rx="4" fill="#80DAFE" />
    <rect x="218" y="303" width="75" height="12" rx="4" fill="#80DAFE" />
    <rect x="302" y="303" width="12" height="12" rx="4" fill="#80DAFE" />
    <rect x="16" y="363" width="28" height="28" rx="6" fill="#80DAFE" />
    <rect x="55" y="371" width="69" height="12" rx="4" fill="#80DAFE" />
    <rect x="138" y="371" width="69" height="12" rx="4" fill="#80DAFE" />
    <rect x="218" y="371" width="75" height="12" rx="4" fill="#80DAFE" />
    <rect x="302" y="371" width="12" height="12" rx="4" fill="#80DAFE" />
  </ContentLoader>
);

export default InterestGain;
