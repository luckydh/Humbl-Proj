import React, { useState } from "react";
import { IonCard } from "@ionic/react";
import { format } from "timeago.js";
import newsCard1 from "assets/images/news-card-1.png";
import newsCard2 from "assets/images/news-card-2.png";
import newsCard3 from "assets/images/news-card-3.png";
import { DateOfCreation } from "generated/graphql";
import { useTranslation } from "react-i18next";
import i18n from "i18n";

const newsCardStaticImages = [newsCard1, newsCard2, newsCard3];
let currentImageIndex = 0;

export type News = {
  title: string;
  url: string;
  text: string;
  sourceName?: string;
  tickers: Array<string>;
  topics?: Array<string>;
  createdOn?: DateOfCreation;
  imageUrl?: string;
};

export interface Props {
  news: News;
  ariaLabel?: string;
  handleCardClick?: () => void;
}

export const NewsCard: React.FC<Props> = ({ news, handleCardClick, ariaLabel }) => {
  const { t } = useTranslation();
  const [imageSource, setImageSource] = useState(news.imageUrl);
  if (!imageSource) {
    setImageSource(newsCardStaticImages[currentImageIndex]);
    if (currentImageIndex > 2) {
      currentImageIndex = -1;
    }
    currentImageIndex += 1;
  }

  return (
    <IonCard
      button
      className="rounded-lg mx-0 bg-blue-lightest transition-all active:scale-[1.03] active:bg-white"
      onClick={handleCardClick}>
      <div className="flex my-4 ml-4 mr-3">
        <img
          aria-label={ariaLabel && `${ariaLabel}_NEWSTHUMBNAIL_IMAGE`}
          src={imageSource}
          alt={news.title}
          className="img-thumbnail rounded-lg w-20 h-20 object-cover"
        />
        <div className="ml-4">
          {/*
           * first-letter:uppercase here solves the problem that we will see in different languages.
           * 1 day ago” looks fine, but  “hace 1 dia” does not.
           * This makes other languages which have words before number look like this: “Hace 1 dia”
           */}
          <div
            aria-label={ariaLabel && `${ariaLabel}_NEWSPUBLISHED_LABEL`}
            className="font-medium text-xs opacity-70 text-blue-dark first-letter:uppercase">
            {format(news.createdOn?.date, i18n.language)}
          </div>
          <div
            aria-label={ariaLabel && `${ariaLabel}_NEWSTITLE_LABEL`}
            className="text-blue-dark font-bold text-sm mt-1 line-clamp-2">
            {news.title}
          </div>
          <div className="flex mt-2 mr-6 text-left space-x-2 flex-wrap">
            {news.tickers?.slice(0, 3).map((ticker) => (
              <span
                aria-label={ariaLabel && `${ariaLabel}_NEWSTAG_LABEL`}
                key={ticker}
                className="text-blue font-bold text-xs">
                {ticker}
              </span>
            ))}
            {news.tickers.length > 3 && (
              <span className="text-blue font-bold text-xs">+ {t("wallet.widget.news.card.more")}</span>
            )}
          </div>
        </div>
      </div>
    </IonCard>
  );
};

export default NewsCard;
