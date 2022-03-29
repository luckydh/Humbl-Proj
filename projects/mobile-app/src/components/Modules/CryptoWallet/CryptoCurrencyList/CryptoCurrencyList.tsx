import { ApolloError } from "@apollo/client";
import { WidgetContainer } from "components/Modules/Widgets/WidgetContainer";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getAssetInterestRateObject } from "utils/cryptoWallet";
import { AdvertisementItemProps } from "../Portfolio/AdvertisementList/AdvertisementItem";
import { CryptoCurrencyItem, CryptoCurrencyItemProps, CryptoCurrencyItemVariant } from "./CryptoCurrencyItem";
import { CryptoCurrencyListSkeleton } from "./CryptoCurrencyListSkeleton";

export interface CryptoCurrencyListProps {
  cta?: {
    text: string;
    onClick: () => void;
  };
  loading?: boolean;
  items: CryptoCurrencyItemProps[];
  error?: ApolloError;
  /** Pass in custom text for empty list. */
  customEmptyListText?: { title: string; description: string };
  variant?: CryptoCurrencyItemVariant;
  onClickItem?: (asset: CryptoCurrencyItemProps, assetInterestRateObject?: AdvertisementItemProps) => void;
  shouldRefresh?: boolean;
  ariaLabel?: string;
  assetInterestRatesData?: AdvertisementItemProps[];
}

export const CryptoCurrencyList: React.FC<CryptoCurrencyListProps> = ({
  cta,
  loading,
  items = [],
  error,
  customEmptyListText,
  variant,
  onClickItem,
  shouldRefresh,
  ariaLabel,
  assetInterestRatesData,
}) => {
  const { t } = useTranslation();
  const initialLoad = loading && items.length === 0;
  const isRefreshing = shouldRefresh && loading;

  const emptyListText = useMemo(() => {
    if (customEmptyListText) {
      return customEmptyListText;
    }

    return {
      title: t("crypto-wallet.currency-list.no-results.title"),
      description: t("crypto-wallet.currency-list.no-results.description"),
    };
  }, [customEmptyListText, t]);

  if (error) {
    return (
      <WidgetContainer ariaLabel="CRYPTO_CURRENCY_LIST_WIDGET_CONTAINER">
        <div className="mx-6 my-10 text-sm text-black">{t("widget.error.generic-loading-error")}</div>
      </WidgetContainer>
    );
  }

  if (isRefreshing || initialLoad) {
    return <CryptoCurrencyListSkeleton variant={variant} rows={variant === "compact" ? 4 : 10} />;
  }

  if (items.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full px-8 pb-16 text-center text-blue-dark bg-blue-lightest"
        data-testid="crypto-currency-list-empty"
      >
        <div aria-label={ariaLabel && `${ariaLabel}_NORESULTSTITLE_LABEL`} className="text-2xl">
          {emptyListText.title}
        </div>
        <div aria-label={ariaLabel && `${ariaLabel}_NORESULTSBODY_LABEL`} className="py-2">
          {emptyListText.description}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-blue-lightest2">
      <ul
        aria-label={ariaLabel && `${ariaLabel}_CRYPTOLIST_SECTION`}
        className="divide-y divide-white"
        id="cryptocurrencylist"
      >
        {items.map((crypto) => {
          const assetInterestRateObject = getAssetInterestRateObject(crypto, assetInterestRatesData);
          return (
            <CryptoCurrencyItem
              {...crypto}
              key={crypto.tickerCode}
              assetInterestRate={assetInterestRateObject?.valueInPercent}
              ariaLabel={ariaLabel}
              variant={variant}
              onClick={() => onClickItem && onClickItem(crypto, assetInterestRateObject)}
            />
          );
        })}
      </ul>
      {cta && (
        <button
          aria-label={ariaLabel && `${ariaLabel}_SEEALL_BUTTON`}
          type="button"
          className="block w-full bg-blue-dark py-4 text-white text-center"
          onClick={cta.onClick}
        >
          {cta.text}
        </button>
      )}
    </div>
  );
};
