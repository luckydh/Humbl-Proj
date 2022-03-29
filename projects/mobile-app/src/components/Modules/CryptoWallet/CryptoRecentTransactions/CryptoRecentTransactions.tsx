import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ContentLoader from "react-content-loader";

import skeletonStyles from "utils/SkeletonStyles";
import { CryptoRecentTransactionItem } from "./CryptoRecentTransactionItem";
import { CallToActionListCard } from "../../../CallToActionListCard/CallToActionListCard";
import { AssetTransactionType } from "generated/graphql";
import { NoTransactions } from "components/NoTransactions/NoTransactions";
import { buildPath } from "utils/routes";

export interface CryptoRecentTransactionsProps {
  transactions?: Array<AssetTransactionType>;
  showCTA?: boolean;
  loading?: boolean;
  shouldRefresh?: boolean;
  ariaLabel?: string;
  isEtx?: boolean;
}

export const CryptoRecentTransactions = ({
  transactions = [],
  showCTA,
  loading,
  shouldRefresh = false,
  ariaLabel,
  isEtx = false,
}: CryptoRecentTransactionsProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const isRefreshing = shouldRefresh && loading;

  const onCtaClick = () => {
    if (isEtx) {
      history.push(buildPath("etxTransactionsAll"));
    } else {
      history.push(buildPath("cryptoWalletTransactionsAll"));
    }
  };

  const ctaObject = { onClick: onCtaClick, text: t("button.text.see-all") };

  const noTransactions: boolean = transactions?.length === 0;
  const initialLoad: boolean = !!loading && noTransactions;

  if (isRefreshing || initialLoad) {
    return <CryptoRecentTransactionsListSkeleton rows={4} />;
  }

  if (noTransactions) {
    return <NoTransactions ariaLabel={ariaLabel} isRecentTransactions />;
  }
  return (
    <CallToActionListCard ariaLabel={ariaLabel} cta={showCTA ? ctaObject : undefined}>
      {transactions?.map(
        ({
          category,
          amount,
          asset,
          fiatAmount,
          fiatCurrency,
          date,
          swappedAsset,
          assetName,
          status,
          receiver,
          sender,
          coin,
        }: AssetTransactionType) => (
          <CryptoRecentTransactionItem
            transactionCategory={category}
            amount={amount}
            asset={coin}
            coin={coin?.name}
            fiatAmount={fiatAmount?.display}
            cryptoCurrency={asset}
            fiatCurrency={fiatCurrency}
            date={date}
            swappedAsset={swappedAsset}
            key={date}
            assetName={assetName}
            receiver={receiver}
            sender={sender}
            status={status}
          />
        )
      )}
    </CallToActionListCard>
  );
};

interface CryptoCurrencyListSkeletonProps {
  rows?: number;
}

const CryptoRecentTransactionsListSkeleton: React.FC<CryptoCurrencyListSkeletonProps> = ({ rows = 4 }) => (
  <div className="divide-y divide-white" data-testid="crypto-currency-list-skeleton">
    {Array.from({ length: rows }).map((_, index) => (
      <CryptoRecentTransactionsItemSkeleton key={index} /> // eslint-disable-line react/no-array-index-key
    ))}
  </div>
);

const CryptoRecentTransactionsItemSkeleton = () => (
  <ContentLoader width="100%" height={78} uniqueKey="crypto-currency-item-skeleton" {...skeletonStyles}>
    <rect x="20" y="20" rx="4" ry="4" width="36" height="36" />
    <rect x="65" y="24" rx="4" ry="4" width="112" height="10" />
    <rect x="65" y="42" rx="4" ry="4" width="112" height="10" />
    <rect x="227" y="24" rx="4" ry="4" width="80" height="10" />
    <rect x="227" y="42" rx="4" ry="4" width="80" height="10" />
  </ContentLoader>
);
