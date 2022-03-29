import React from "react";
import ContentLoader from "react-content-loader";
import skeletonStyles from "utils/SkeletonStyles";
import { CryptoCurrencyItemVariant } from "./CryptoCurrencyItem";

interface CryptoCurrencyItemSkeletonProps {
  variant: CryptoCurrencyItemVariant;
}

const HEIGHT: Record<CryptoCurrencyItemVariant, number> = {
  default: 78,
  compact: 70,
};

const DEFS: Record<CryptoCurrencyItemVariant, JSX.Element> = {
  default: (
    <>
      <rect x="24" y="17" rx="4" ry="4" width="43" height="43" />
      <rect x="76" y="25" rx="4" ry="4" width="112" height="10" />
      <rect x="76" y="43" rx="4" ry="4" width="112" height="10" />
      <rect x="271" y="25" rx="4" ry="4" width="80" height="10" />
      <rect x="271" y="43" rx="4" ry="4" width="80" height="10" />
    </>
  ),
  compact: (
    <>
      <rect x="20" y="20" rx="4" ry="4" width="36" height="36" />
      <rect x="65" y="24" rx="4" ry="4" width="112" height="10" />
      <rect x="65" y="42" rx="4" ry="4" width="112" height="10" />
      <rect x="227" y="24" rx="4" ry="4" width="80" height="10" />
      <rect x="227" y="42" rx="4" ry="4" width="80" height="10" />
    </>
  ),
};

export const CryptoCurrencyItemSkeleton: React.FC<CryptoCurrencyItemSkeletonProps> = ({ variant = "default" }) => (
  <ContentLoader width="100%" height={HEIGHT[variant]} uniqueKey="crypto-currency-item-skeleton" {...skeletonStyles}>
    {DEFS[variant]}
  </ContentLoader>
);

interface CryptoCurrencyListSkeletonProps {
  rows?: number;
  variant?: CryptoCurrencyItemVariant;
}

export const CryptoCurrencyListSkeleton: React.FC<CryptoCurrencyListSkeletonProps> = ({
  rows = 4,
  variant = "default",
}) => (
  <div className="divide-y divide-white" data-testid="crypto-currency-list-skeleton">
    {Array.from({ length: rows }).map((_, index) => (
      <CryptoCurrencyItemSkeleton key={index} variant={variant} /> // eslint-disable-line react/no-array-index-key
    ))}
  </div>
);

export default CryptoCurrencyListSkeleton;
