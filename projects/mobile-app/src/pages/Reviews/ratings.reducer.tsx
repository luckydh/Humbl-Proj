import { PageState } from "../../utils/PageState";

export const RatingsPageReducerDefaultState = {
  currentPage: 0,
  reviews: [],
  itemsPerPage: 10,
  pageState: PageState.FIRST_LOAD,
  disableScroll: false,
  showLoader: true,
};
export const updateCurrentPageState = (payload: number) => ({
  type: SET_CURRENT_PAGE,
  payload,
});
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const UPDATE_REVIEWS = "UPDATE_REVIEWS";
const ADD_REVIEWS = "ADD_REVIEWS";
const SET_PAGE_STATE = "SET_PAGE_STATE";
const SET_SCROLL_STATE = "SET_SCROLL_STATE";
const UPDATE_SHOW_LOADER_STATE = "UPDATE_SHOW_LOADER_STATE";
export const updateReviewsState = (payload: any) => ({
    type: UPDATE_REVIEWS,
    payload,
  });
export const addReviewsToState = (payload: any) => ({
  type: ADD_REVIEWS,
  payload,
});
export const updateCurrentPage = (payload: number) => ({
  type: SET_CURRENT_PAGE,
  payload,
});
export const updatePageState = (payload: PageState) => ({
  type: SET_PAGE_STATE,
  payload,
});
export const updateDisableScrollState = (payload: boolean) => ({
  type: SET_SCROLL_STATE,
  payload,
});
export const updateShowLoaderState = (payload: boolean) => ({
  type: UPDATE_SHOW_LOADER_STATE,
  payload,
});

export const RatingsPageReducer = (
  state: Record<string, any>,
  { type, payload }: Record<string, any>
) => {
  switch (type) {
    case UPDATE_SHOW_LOADER_STATE:
      return { ...state, showLoader: payload };
    case SET_SCROLL_STATE:
      return { ...state, disableScroll: payload };
    case SET_PAGE_STATE:
      return { ...state, pageState: payload };
    case UPDATE_REVIEWS:
      return {
        ...state,
        reviews: payload.nodes,
        currentPage: payload.pageInfo.currentPage,
      };
    case ADD_REVIEWS:
      return { ...state, reviews: [...state.reviews, ...payload.nodes] };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: payload };
    default:
      return state;
  }
};
