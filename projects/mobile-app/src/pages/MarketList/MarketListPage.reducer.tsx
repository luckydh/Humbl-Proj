import { MarketPeriodInput } from "../../generated/graphql";

export enum MarketListPageReducerType {
  SET_ALL_ASSETS_DATA,
  SET_PERIOD,
  SET_LOADING_STATE,
  SET_SEARCH_TERM,
}

export interface MarketListPageReducerDefaultStateProps {
  assets: Array<any>;
  loading: boolean;
  period: MarketPeriodInput;
  searchTerm: string;
}

export const MarketListPageReducerDefaultState: MarketListPageReducerDefaultStateProps = {
  assets: [],
  loading: true,
  period: MarketPeriodInput.Hour_24,
  searchTerm: "",
};

export const MarketListPageReducer = (
  state: MarketListPageReducerDefaultStateProps,
  { payload, type }: { payload: any; type: MarketListPageReducerType }
): MarketListPageReducerDefaultStateProps => {
  switch (type) {
    case MarketListPageReducerType.SET_ALL_ASSETS_DATA:
      return { ...state, assets: payload };
    case MarketListPageReducerType.SET_LOADING_STATE:
      return { ...state, loading: payload };
    case MarketListPageReducerType.SET_PERIOD:
      return { ...state, period: payload };
    case MarketListPageReducerType.SET_SEARCH_TERM:
      return { ...state, searchTerm: payload };
    default:
      return state;
  }
};
