import React, { useEffect, useReducer } from "react";
import { TransactionType, useGetTransactionsLazyQuery } from "generated/graphql";
import Transaction from "components/Transaction";
import { TransactionsSkeleton } from "./transactions.skeleton";
import { InfiniteScroll } from "../../components/InfiniteScroll/InfiniteScroll";
import { TransactionsPageReducer } from "./transactions.reducer";
import { PageStateReducerDefaultState } from "../../utils/reducers/page-state.reducer";
import {
  PaginationReducerDefaultState,
  updateCurrentPageStateAction,
  updateTotalPagesStateAction,
} from "../../utils/reducers/pagination.reducer";
import {
  addScrollItemsToStateAction,
  InfiniteScrollReducerDefaultState,
  updateShowLoaderStateAction,
} from "../../utils/reducers/infinite-scroll.reducer";
import { PageState } from "../../utils/PageState";
import { updatePageState, updateShowLoaderState } from "../Reviews/ratings.reducer";
import { NoTransactions } from "components/NoTransactions/NoTransactions";

const Transactions: React.FC = () => {
  const [state, dispatch] = useReducer(TransactionsPageReducer, {
    ...PageStateReducerDefaultState,
    ...PaginationReducerDefaultState,
    ...InfiniteScrollReducerDefaultState,
  });

  const [getTransactions, { loading, called, data, refetch }] = useGetTransactionsLazyQuery({
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
  });
  useEffect(() => {
    if (state.pageState === PageState.FIRST_LOAD) {
      getTransactions({
        variables: {
          page: state.currentPage,
          limit: state.itemsPerPage,
        },
      });
      if (called && !loading) {
        dispatch(updateShowLoaderStateAction(true));
        dispatch(updatePageState(PageState.LOADING));
      }
    }
    if (state.pageState === PageState.LOADING) {
      const receivedData: any = data;
      const { nodes, pageInfo } = receivedData.getTransactions;
      if (called && !loading && receivedData) {
        dispatch(updateShowLoaderStateAction(false));
        dispatch(addScrollItemsToStateAction(nodes));
        dispatch(updateTotalPagesStateAction(pageInfo.totalPages));
        dispatch(updateCurrentPageStateAction(pageInfo.currentPage));
        dispatch(updatePageState(PageState.FINISHED));
        if (nodes.length === 0) {
          dispatch(updatePageState(PageState.EMPTY_TRANSACTIONS));
        }
      }
    }
  }, [state.pageState, state.currentPage, loading, called, data, getTransactions, state.itemsPerPage]);

  const handleScroll = async () => {
    if (state.currentPage >= state.totalPages) {
      return;
    }
    dispatch(updateShowLoaderState(true));
    if (refetch) {
      await refetch({
        page: state.currentPage + 1,
        limit: state.itemsPerPage,
      });
      dispatch(updatePageState(PageState.LOADING));
    }
  };

  if (state.pageState === PageState.EMPTY_TRANSACTIONS) {
    return (
      <div className="items-center flex-1 flex justify-center">
        <NoTransactions variant="darkTheme" isRecentTransactions={true} />
      </div>
    );
  }

  return (
    <InfiniteScroll
      disableInfiniteScroll={state.disableScroll}
      showLoader={state.showLoader}
      onScrollDown={() => handleScroll()}>
      {state.scrollItems.map((transaction: TransactionType) => (
        <Transaction
          key={transaction.id}
          amount={transaction.total?.display}
          dateOfTransaction={transaction.dateOfTransaction}
          destination={transaction.destination}
          transactionType={transaction.transactionType}
        />
      ))}
      {state.showLoader && <TransactionsSkeleton />}
    </InfiniteScroll>
  );
};

export default Transactions;
