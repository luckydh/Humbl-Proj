import React from "react";
import Transaction from "components/Transaction";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { refreshOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { InfiniteScroll } from "../../components/InfiniteScroll/InfiniteScroll";
import { SalesEmptyState } from "./sales.empty-state";
import { useLazyQueryWithInfiniteScroll } from "../../utils/hooks/useLazyQueryWithInfiniteScroll";
import { PageState } from "../../utils/PageState";
import { SalesSkeleton } from "./sales.skeleton";
import { GetTransactionsToMeQuery, useGetTransactionsToMeQuery } from "../../generated/graphql";

const extractData = (data: GetTransactionsToMeQuery) => {
  const pageInfoNodes = data?.transactionsToMe;
  return pageInfoNodes;
};

const Sales: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const meQueryResult = useGetTransactionsToMeQuery({
    fetchPolicy: "network-only",
    variables: {
      page: 0,
      limit: 10,
    },
  });

  const [{ pageState, disableScroll, showLoader, scrollItems }, { fetchNextPage, fetchFirstPage }] =
    useLazyQueryWithInfiniteScroll(meQueryResult, extractData);

  return (
    <LayoutModal
      title={t("sales-page.title.sales")}
      onRightClick={() => fetchFirstPage && fetchFirstPage()}
      rightClickIcon={<IonIcon icon={refreshOutline} className="text-3xl" />}>
      <InfiniteScroll
        onScrollDown={() => fetchNextPage && fetchNextPage()}
        disableInfiniteScroll={disableScroll}
        showLoader={showLoader}>
        {pageState === PageState.FIRST_LOAD && <SalesSkeleton />}
        {pageState === PageState.FINISHED && scrollItems.length === 0 && <SalesEmptyState />}
        {scrollItems.map((transaction: any, index: number) => (
          <Transaction
            key={transaction?.id || index}
            amount={transaction.total?.display}
            dateOfTransaction={transaction.dateOfTransaction}
            destination={transaction.origin} //For sales it needs to display origin instead of destination.
            transactionType={transaction.transactionType}
            onClick={() => history.push(`/sales/${transaction.id}`)}
          />
        ))}
      </InfiniteScroll>
    </LayoutModal>
  );
};

export default Sales;
