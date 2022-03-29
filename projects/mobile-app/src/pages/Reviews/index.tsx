import React, { useEffect, useReducer } from "react";
import {
  addReviewsToState,
  RatingsPageReducer,
  RatingsPageReducerDefaultState,
  updateCurrentPageState,
  updateDisableScrollState,
  updatePageState,
  updateReviewsState,
  updateShowLoaderState,
} from "./ratings.reducer";
import { useGetReviewsByAccountIdQuery } from "../../generated/graphql";
import { useParams } from "react-router-dom";
import ReviewItem from "../../components/ReviewItem/ReviewItem";
import { PageState } from "../../utils/PageState";
import { InfiniteScroll } from "../../components/InfiniteScroll/InfiniteScroll";

export const ReviewsPage = () => {
  const [
    { currentPage, itemsPerPage, reviews, pageState, disableScroll, showLoader },
    dispatch,
  ] = useReducer(RatingsPageReducer, RatingsPageReducerDefaultState);
  const { id } = useParams<{ id: string }>();
  const queryOptions = useGetReviewsByAccountIdQuery({
    variables: {
      merchantId: id,
      page: currentPage,
      limit: itemsPerPage,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  const refetchData = async () => {
    dispatch(updateShowLoaderState(true));
    const fetchMore = await queryOptions.fetchMore({
      variables: {
        merchantId: id,
        page: currentPage + 1,
        limit: itemsPerPage,
      },
    });
    if (fetchMore?.data) {
      const fetchReviews: any = fetchMore.data;
      if (fetchReviews.reviews.nodes.length > 0) {
        dispatch(updateCurrentPageState(currentPage + 1));
        dispatch(addReviewsToState(fetchReviews.reviews));
      } else {
        dispatch(updateDisableScrollState(true));
      }
      dispatch(updateShowLoaderState(false));
    }
  };

  useEffect(() => {
    const firstLoadStateEffect = () => {
      dispatch(updateShowLoaderState(true));
      dispatch(updatePageState(PageState.LOADING));
    };
    const loadingStateEffect = () => {
      if (queryOptions.called && !queryOptions.loading) {
        dispatch(updateReviewsState(queryOptions.data?.reviews));
        dispatch(updatePageState(PageState.FINISHED));
        dispatch(updateShowLoaderState(false));
      }
    };
    pageState === PageState.FIRST_LOAD && firstLoadStateEffect();
    pageState === PageState.LOADING && loadingStateEffect();
  }, [pageState, queryOptions.called, queryOptions.loading, queryOptions?.data]);

  return (
    <InfiniteScroll
      onScrollDown={() => refetchData()}
      disableInfiniteScroll={disableScroll}
      showLoader={showLoader}
    >
      {reviews.map((review: any) => (
        <ReviewItem review={review} key={review.id} />
      ))}
    </InfiniteScroll>
  );
};
