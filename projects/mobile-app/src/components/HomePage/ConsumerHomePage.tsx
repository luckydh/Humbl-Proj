import { Carousel } from "components/Carousel/Carousel";
import CarouselVideoItem from "components/Carousel/CarouselVideoItem";
import React, { useState } from "react";
import { Trans } from "react-i18next";
import { RouteString, buildPath } from "utils/routes";

import digitalWalletVideo from "assets/videos/carousel/1-digital-wallet.mp4";
import discoverMerchantsVideo from "assets/videos/carousel/2-discover-merchants.mp4";
import becomeDigitalMerchantVideo from "assets/videos/carousel/3-become-digital-merchant.mp4";
import investInDigitalAssetsVideo from "assets/videos/carousel/4-invest-in-digital-assets.mp4";
import applyForCreditCardsVideo from "assets/videos/carousel/5-apply-for-credit-cards.mp4";
import applyForPersonalLoansVideo from "assets/videos/carousel/6-apply-for-personal-loans.mp4";

type CarouselVideo = {
  content: string;
  link: RouteString;
  src: string;
  type?: "image" | "video";
};

const videos: CarouselVideo[] = [
  {
    content: "carousel.item-digital-wallet",
    link: buildPath("cryptoWallet"),
    src: digitalWalletVideo,
  },
  {
    content: "carousel.item.discover-merchants",
    link: buildPath("discoveryMap"),
    src: discoverMerchantsVideo,
  },
  {
    content: "carousel.item.become-digital-merchant",
    link: buildPath("merchantCreate"),
    src: becomeDigitalMerchantVideo,
  },
  {
    content: "carousel.item.offers-blocks",
    link: buildPath("offersBlocks"),
    src: investInDigitalAssetsVideo,
  },
  {
    content: "carousel.item.apply-credit-cards",
    link: buildPath("offersCreditCards"),
    src: applyForCreditCardsVideo,
  },
  {
    content: "carousel.item-apply-personal-loans",
    link: buildPath("offersPersonalLoans"),
    src: applyForPersonalLoansVideo,
  },
];

const ConsumerHome: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const onChange = (number: number) => {
    setCurrentSlide(number);
  };

  return (
    <div className="flex-1 flex">
      <Carousel onChange={onChange}>
        {videos.map((carouselItem, index) => (
          <CarouselVideoItem
            // Ionic doubles up the first and last items, so a key on it's own isn't good enough
            // eslint-disable-next-line react/no-array-index-key
            key={`${carouselItem.src}-${index}`}
            shouldPlay={currentSlide === index}
            src={carouselItem.src}
            type={carouselItem.type}
            link={carouselItem.link}>
            <Trans i18nKey={carouselItem.content} className="whitespace-pre-line" />
          </CarouselVideoItem>
        ))}
      </Carousel>
    </div>
  );
};

export default ConsumerHome;
