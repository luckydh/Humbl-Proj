import React, { ReactNode } from "react";
import { HumblLogo } from "assets/svgs/HumblLogo";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader

interface CarouselItemProps {
  image?: string;
  cta1?: string;
  cta2?: string;
}
interface CarouselProps {
  children: React.ReactChild[];
  onChange: (index: number, item: React.ReactNode) => void;
}
export const Carousel = (props: CarouselProps) => {
  const carouselRef = React.useRef(null);

  return (
    <ReactCarousel
      ref={carouselRef}
      className="flex-1 bg-blue"
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      showArrows={false}
      autoPlay={true}
      stopOnHover={false}
      interval={5000}
      onChange={props.onChange}>
      {props.children}
    </ReactCarousel>
  );
};
export const CarouselItem = (props: CarouselItemProps) => (
    <div
      className="flex flex-grow h-full bg-pink-400"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${props.image})`,
        backgroundSize: "cover",
      }}>
      <div className="absolute bottom-0 left-0 mb-6 text-left">
        <div className="mb-12 ml-6">
          <div className="ml-1 mb-3">
            <HumblLogo />
          </div>
          <div className="text-white text-3xl" style={{ marginLeft: 2 }}>
            {props.cta1} <br />
            {props.cta2}
          </div>
        </div>
      </div>
    </div>
  );
