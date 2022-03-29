import { PageState } from "../PageState";

export const PageStateReducerDefaultState = {
  pageState: PageState.FIRST_LOAD,
};
const SET_PAGE_STATE = "SET_PAGE_STATE";

export const updatePageStateAction = (payload: PageState) => ({
  type: SET_PAGE_STATE,
  payload,
});

export const PageStateReducer = (
  state: Record<string, any>,
  action: Record<string, any>
) => {
  switch (action.type) {
    case SET_PAGE_STATE:
      return { ...state, pageState: action.payload };

    default:
      return state;
  }
};
