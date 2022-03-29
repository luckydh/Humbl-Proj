const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_ITEMS_PER_PAGE_STATE = "SET_ITEMS_PER_PAGE_STATE";
const UPDATE_TOTAL_PAGES = "UPDATE_TOTAL_PAGES";
export const PaginationReducerDefaultState = {
  currentPage: 0,
  itemsPerPage: 10,
  totalPages: 1000,
};

export const updateCurrentPageStateAction = (payload: number) => ({
  type: SET_CURRENT_PAGE,
  payload,
});

export const updateItemsPerPageStateAction = (payload: number) => ({
  type: SET_ITEMS_PER_PAGE_STATE,
  payload,
});

export const updateTotalPagesStateAction = (payload: number) => ({
  type: UPDATE_TOTAL_PAGES,
  payload,
});

export const PaginationReducer = (
  state: Record<string, any>,
  action: Record<string, any>
) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case SET_ITEMS_PER_PAGE_STATE:
      return { ...state, itemsPerPage: action.payload };
    case UPDATE_TOTAL_PAGES:
      return { ...state, totalPages: action.payload };
    default:
      return state;
  }
};
