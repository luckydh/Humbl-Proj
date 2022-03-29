import React from "react";
import { TransactionItemSkeleton } from "../../components/Transaction";

export const TransactionsSkeleton: React.FC = () => (
    <>
      <TransactionItemSkeleton />
      <TransactionItemSkeleton />
      <TransactionItemSkeleton />
      <TransactionItemSkeleton />
    </>
  );
