import { PageStateReducer } from "../../utils/reducers/page-state.reducer";
import { PaginationReducer } from "../../utils/reducers/pagination.reducer";
import { InfiniteScrollReducer } from "../../utils/reducers/infinite-scroll.reducer";

export const TransactionsPageReducer = (
  previousState: Record<string, any>,
  action: { type: string; payload: any }
) => {
  const state = [PageStateReducer, PaginationReducer, InfiniteScrollReducer].reduce(
    (previousValue, currentValue) => currentValue(previousValue, action),
    previousState
  );
  switch (action.payload) {
    default:
      return state;
  }
};
