import React from "react";
import { CallToActionListCard } from "../../../CallToActionListCard/CallToActionListCard";
import { TransactionSection } from "./TransactionSection";
import { useTransactionsSectioner } from "./useTransactionsSectioner";
import { AssetTransactionType } from "generated/graphql";
import { NoTransactions } from "components/NoTransactions/NoTransactions";

export interface CryptoAllTransactionsProps {
  transactions: Array<AssetTransactionType>;
}

export const CryptoAllTransactions = ({ transactions }: CryptoAllTransactionsProps) => {
  const sections = useTransactionsSectioner(transactions || []);

  if (transactions.length === 0) {
    return <NoTransactions />;
  }

  return (
    <CallToActionListCard>
      {sections.map((category) => (
        <TransactionSection title={category.title} items={category.items} key={category.title} />
      ))}
    </CallToActionListCard>
  );
};
