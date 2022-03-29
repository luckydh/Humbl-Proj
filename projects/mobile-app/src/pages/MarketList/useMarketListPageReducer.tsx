import { useReducer } from "react";
import {
  MarketListPageReducer,
  MarketListPageReducerDefaultState,
  MarketListPageReducerType,
} from "./MarketListPage.reducer";

export const useMarketListPageReducer = () => {
  const [state, dispatch] = useReducer(MarketListPageReducer, MarketListPageReducerDefaultState);

  const setAllAssets = (payload: Array<any>) =>
    dispatch({
      type: MarketListPageReducerType.SET_ALL_ASSETS_DATA,
      payload,
    });

  const setSearchTerm = (payload: string) =>
    dispatch({
      type: MarketListPageReducerType.SET_SEARCH_TERM,
      payload,
    });

  const setPeriod = (payload: boolean) =>
    dispatch({
      type: MarketListPageReducerType.SET_PERIOD,
      payload,
    });

  const setLoadingState = (payload: boolean) =>
    dispatch({
      type: MarketListPageReducerType.SET_LOADING_STATE,
      payload,
    });

  return { state, setLoadingState, setPeriod, setAllAssets, setSearchTerm };
};
