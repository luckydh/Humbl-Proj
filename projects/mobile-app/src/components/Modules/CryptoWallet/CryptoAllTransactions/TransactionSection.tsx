import React from "react";
import { CategoryHeader as SectionHeader } from "./CategoryHeader";
import { CryptoRecentTransactionItem } from "../CryptoRecentTransactions/CryptoRecentTransactionItem";
import { AssetTransactionCategory, AssetTransactionType } from "generated/graphql";
import { formatUsingIntl } from "utils/currency";

export interface TransactionSectionProps {
  title: string;
  items: AssetTransactionType[];
}

export const TransactionSection = ({ title, items }: TransactionSectionProps) => (
  <>
    <SectionHeader title={title} />
    {items.map((item, index) => (
      <CryptoRecentTransactionItem
        transactionCategory={item.category}
        assetName={item.assetName}
        amount={item.amount}
        asset={item.coin}
        coin={item.category === AssetTransactionCategory.Swap ? item.asset : item.assetName}
        fiatAmount={formatUsingIntl(item.fiatAmount?.major ?? 0, "standard", item.fiatCurrency)}
        cryptoCurrency={item.asset}
        fiatCurrency={item.fiatCurrency}
        swappedAsset={item.swappedAsset}
        sender={item.sender}
        receiver={item.receiver}
        date={item.date}
        isLastIndex={items.length - 1 === index}
        status={item.status}
        key={item.date}
      />
    ))}
  </>
);
