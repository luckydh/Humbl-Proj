import { TransactionItemSkeleton } from "../../components/Transaction";
import React from "react";

export const SalesSkeleton = () => (
    <ul>
      <li>
        <TransactionItemSkeleton />
      </li>
      <li>
        <TransactionItemSkeleton />
      </li>
    </ul>
  );
