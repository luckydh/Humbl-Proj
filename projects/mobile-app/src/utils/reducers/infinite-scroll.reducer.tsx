const SET_DISABLE_SCROLL_STATE = "SET_DISABLE_SCROLL_STATE";
const SET_SHOW_LOADER_STATE = "SET_SHOW_LOADER_STATE";
const SET_SCROLL_ITEMS = "SET_SCROLL_ITEMS";
const ADD_SCROLL_ITEMS = "ADD_SCROLL_ITEMS";
export const InfiniteScrollReducerDefaultState = {
  disableScroll: false,
  showLoader: true,
  scrollItems: [],
};
export const updateDisabledScrollStateAction = (payload: boolean) => ({
  type: SET_DISABLE_SCROLL_STATE,
  payload,
});

export const updateShowLoaderStateAction = (payload: boolean) => ({
  type: SET_SHOW_LOADER_STATE,
  payload,
});

export const updateScrollItemsStateAction = (payload: Array<any>) => ({
  type: SET_SCROLL_ITEMS,
  payload,
});

export const addScrollItemsToStateAction = (payload: Array<any>) => ({
  type: ADD_SCROLL_ITEMS,
  payload,
});

export const InfiniteScrollReducer = (
  state: Record<string, any>,
  action: Record<string, any>
) => {
  switch (action.type) {
    case SET_DISABLE_SCROLL_STATE:
      return { ...state, disableScroll: action.payload };
    case SET_SHOW_LOADER_STATE:
      return { ...state, showLoader: action.payload };
    case SET_SCROLL_ITEMS:
      return { ...state, scrollItems: action.payload };
    case ADD_SCROLL_ITEMS:
      return {
        ...state,
        scrollItems: [...state.scrollItems, ...action.payload],
      };
    default:
      return state;
  }
};
