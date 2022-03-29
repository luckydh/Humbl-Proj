import { QueryResult } from "@apollo/client";
import { useEffect, useReducer } from "react";
import {
  PageStateReducer,
  PageStateReducerDefaultState,
  updatePageStateAction,
} from "../reducers/page-state.reducer";
import {
  addScrollItemsToStateAction,
  InfiniteScrollReducer,
  InfiniteScrollReducerDefaultState,
  updateDisabledScrollStateAction,
  updateScrollItemsStateAction,
  updateShowLoaderStateAction,
} from "../reducers/infinite-scroll.reducer";
import {
  PaginationReducer,
  PaginationReducerDefaultState,
  updateCurrentPageStateAction,
  updateItemsPerPageStateAction,
  updateTotalPagesStateAction,
} from "../reducers/pagination.reducer";
import { PageState } from "../PageState";

export const useLazyQueryWithInfiniteScroll = (
  queryResult: QueryResult,
  extractData: Function
) => {
  const [{ pageState }, pageStateDispatch] = useReducer(
    PageStateReducer,
    PageStateReducerDefaultState
  );

  const [
    { disableScroll, showLoader, scrollItems },
    infiniteScrollStateDispatch,
  ] = useReducer(InfiniteScrollReducer, InfiniteScrollReducerDefaultState);

  const [{ currentPage, itemsPerPage, totalPages }, paginationStateDispatch] = useReducer(
    PaginationReducer,
    PaginationReducerDefaultState
  );

  const setPageStateToLoading = () =>
    pageStateDispatch(updatePageStateAction(PageState.LOADING));

  const setPageStateToFinished = () =>
    pageStateDispatch(updatePageStateAction(PageState.FINISHED));

  const setPageStateToFetchFirstPage = () =>
    pageStateDispatch(updatePageStateAction(PageState.FETCH_FIRST_PAGE));

  const setPageStateToFetchNextPage = () =>
    pageStateDispatch(updatePageStateAction(PageState.FETCH_NEXT_PAGE));

  const setDisableScrollState = (newState: boolean) =>
    infiniteScrollStateDispatch(updateDisabledScrollStateAction(newState));

  const setShowLoaderState = (newState: boolean) =>
    infiniteScrollStateDispatch(updateShowLoaderStateAction(newState));

  const addScrollItemsToState = (addedItems: Array<any>) =>
    infiniteScrollStateDispatch(addScrollItemsToStateAction(addedItems));

  const setScrollItemsState = (newItems: Array<any>) =>
    infiniteScrollStateDispatch(updateScrollItemsStateAction(newItems));

  const setCurrentPageState = (currentPage: number) =>
    paginationStateDispatch(updateCurrentPageStateAction(currentPage));

  const setItemsPerPageState = (itemsPerPage: number) =>
    paginationStateDispatch(updateItemsPerPageStateAction(itemsPerPage));

  const setTotalPagesState = (totalPages: number) =>
    paginationStateDispatch(updateTotalPagesStateAction(totalPages));

  const handleFirstLoad = () => {
    setPageStateToLoading();
  };
  const handleLoading = () => {
    setShowLoaderState(true);
    if (!queryResult.loading && queryResult.called) {
      const data = extractData(queryResult.data);
      addScrollItemsToState(data.nodes);
      setCurrentPageState(data.pageInfo.currentPage - 1);
      setTotalPagesState(data.pageInfo.totalPages);
      setPageStateToFinished();
    }
  };
  const handleFetchFirstPage = async () => {
    setScrollItemsState([]);
    const fetchFirstPageResult = await queryResult.refetch({ page: 0 });
    const data = extractData(fetchFirstPageResult.data);
    addScrollItemsToState(data.nodes);
    setCurrentPageState(data.pageInfo.currentPage - 1);
    setTotalPagesState(data.pageInfo.totalPages);
    setPageStateToFinished();
  };
  const handleFetchNextPage = async () => {
    const fetchMoreResult = await queryResult.fetchMore({
      variables: { page: currentPage + 1 },
    });
    const data = extractData(fetchMoreResult.data);
    addScrollItemsToState(data.nodes);
    setCurrentPageState(data.pageInfo.currentPage - 1);
    setTotalPagesState(data.pageInfo.totalPages);
    setPageStateToFinished();
  };
  const handleFinished = () => {
    setShowLoaderState(false);
    if (currentPage >= totalPages) {
      setDisableScrollState(true);
    }
  };

  const stateMapping: any = {
    [PageState.FIRST_LOAD]: handleFirstLoad,
    [PageState.LOADING]: handleLoading,
    [PageState.FETCH_FIRST_PAGE]: handleFetchFirstPage,
    [PageState.FETCH_NEXT_PAGE]: handleFetchNextPage,
    [PageState.FINISHED]: handleFinished,
  };

  const fetchNextPage = () => {
    setPageStateToFetchNextPage();
  };
  const fetchFirstPage = () => {
    setPageStateToFetchFirstPage();
  };
  useEffect(() => {
    if (stateMapping && stateMapping[pageState]) {
      stateMapping[pageState]();
    }
    // eslint-disable-next-line
  }, [queryResult.loading, queryResult.called, pageState]);

  return [
    {
      pageState,
      disableScroll,
      showLoader,
      scrollItems,
      currentPage,
      itemsPerPage,
      totalPages,
    },
    {
      setPageStateToLoading,
      setPageStateToFinished,
      setDisableScrollState,
      setShowLoaderState,
      addScrollItemsToState,
      setScrollItemsState,
      setCurrentPageState,
      setItemsPerPageState,
      setTotalPagesState,
      fetchNextPage,
      fetchFirstPage,
    },
  ];
};
