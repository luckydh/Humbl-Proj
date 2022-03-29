import React, { useState, useEffect } from "react";
import NewsCard, { News } from "./NewsCard";
import { Button } from "components/Button/Button";
import { times } from "lodash";
import { useGetAllArticlesQuery } from "generated/graphql";
import { NetworkStatus } from "@apollo/client";
import { Browser } from "@capacitor/browser";
import { Loading } from "components/Loading";
import { useTranslation } from "react-i18next";
import useRefreshFetch from "utils/hooks/useRefreshFetch";

interface Props {
  ticker?: string;
  isRefreshing?: boolean;
  ariaLabel?: string;
}

const NewsFeed: React.FC<Props> = ({ ticker, isRefreshing = false, ariaLabel }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(3);
  const [newsData, setNewsData] = useState<News[]>([]);

  async function loadMore() {
    if (newsData.length > currentIndex) {
      const maxIndex = currentIndex + 3;
      let lastIndex = currentIndex;
      for (let i = currentIndex; i < maxIndex; i += 1) {
        if (newsData[i]) {
          lastIndex = i;
        } else {
          break;
        }
      }
      setCurrentIndex(lastIndex + 1);
    }
  }

  async function handleCardClick(url: string) {
    await Browser.open({ url });
  }

  const { data, networkStatus, loading, refetch } = useGetAllArticlesQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      ticker,
    },
  });

  useRefreshFetch(isRefreshing, refetch);

  useEffect(() => {
    function fetchNewsData() {
      if (networkStatus === NetworkStatus.ready && data?.allArticles) {
        setNewsData(data?.allArticles);
      }
    }
    fetchNewsData();
  }, [data?.allArticles, networkStatus]);

  return (
    <div aria-label={ariaLabel && `${ariaLabel}_NEWSLIST_SECTION`}>
      {loading && (
        <div className="flex justify-center pt-24">
          <Loading loading />
        </div>
      )}
      {!loading &&
        times(currentIndex, (idx) => {
          if (newsData?.[idx]) {
            return (
              <NewsCard
                handleCardClick={() => handleCardClick(newsData[idx].url)}
                news={newsData[idx]}
                ariaLabel={ariaLabel}
                key={`${newsData[idx].title}-${idx}`}
              />
            );
          }
        })}
      {newsData.length !== currentIndex && (
        <div className="flex justify-center items-center">
          <Button
            ariaLabel={ariaLabel && `${ariaLabel}_LOADMORE_BUTTON`}
            onClick={loadMore}
            variant="text"
            size="small"
            type="button"
            customClass="text-blue-dark text-base font-medium mt-5 mb-8">
            {t("wallet.widget.aciton.load-more")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
