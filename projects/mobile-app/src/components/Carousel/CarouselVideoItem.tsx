import React, { useRef, useEffect } from "react";
import { HumblLogo } from "assets/svgs/HumblLogo";
import { useHistory } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { chevronForwardIcon } from "assets/icons";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { RouteString } from "utils/routes";

interface CarouselVideoItemProps {
  src: string;
  link: RouteString;
  children: React.ReactChild;
  shouldPlay: boolean;
  type?: "image" | "video";
}

const pixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

const CAROUSEL_TRANSITION_TIME = 125;

const CarouselVideoItem: React.FC<CarouselVideoItemProps> = ({ src, link, children, shouldPlay, type }) => {
  const history = useHistory();
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const ItemClick = () => {
    if (link) {
      history.push(link);
    }
    if (link === "/merchantcreate") {
      trackEvent(EVENTS.MERCHANT_CREATION_INITIATED, {
        previousPage: "/home",
      });
    }
  };

  const carouselVideoRef = React.useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    async function updateVideoState() {
      const videoEl = carouselVideoRef.current;
      if (!videoEl) {
        return;
      }

      if (shouldPlay) {
        clearTimeout(timeout.current!);
        videoEl.currentTime = 0;
        await videoEl.play();
        return;
      }

      timeout.current = setTimeout(() => {
        videoEl.pause();
      }, CAROUSEL_TRANSITION_TIME);
    }

    updateVideoState();

    return () => {
      clearTimeout(timeout.current!);
    };
  }, [shouldPlay]);

  return (
    <div className="relative h-full w-full">
      {type === "image" ? (
        <img
          src={src}
          className="bg-transparent object-cover w-screen h-screen absolute top-0 left-0"
          alt="carousel item"
        />
      ) : (
        <video
          poster={pixel}
          className="bg-transparent object-cover w-screen h-screen absolute top-0 left-0"
          src={src}
          ref={carouselVideoRef}
          loop
          playsInline
          muted
          height="100%"
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 mb-6 text-left">
        <div className="mb-12 mx-6">
          <div className="ml-1 mb-3">
            <HumblLogo />
          </div>
          <button
            onClick={link && ItemClick}
            type="button"
            className="flex text-white text-left text-3xl items-center justify-between w-full"
            style={{ marginLeft: 2 }}>
            <div>{children}</div>
            <div className="mx-6">
              <IonIcon className="text-2xl text-white" icon={chevronForwardIcon} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselVideoItem;
