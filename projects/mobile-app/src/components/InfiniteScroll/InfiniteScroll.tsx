import React, { useRef } from "react";
import { IonSpinner } from "@ionic/react";

type ScrollDirection = "down" | "up" | "none";

export interface InfiniteScrollProps {
  children: any;
  onScrollDown: Function;
  disableInfiniteScroll: boolean;

  showLoader: boolean;
}

export const InfiniteScroll = ({
  children,
  onScrollDown,
  disableInfiniteScroll = false,
  showLoader = false,
}: InfiniteScrollProps) => {
  const scrollDirection = useRef<ScrollDirection>("none");

  const handleOnScrollDown = () => {
    if (scrollDirection.current === "down" && !disableInfiniteScroll && !showLoader) {
      onScrollDown();
    }
  };

  const handleOnScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    event.persist();
    const deltaY: number = event.currentTarget?.scrollTop ?? 0;
    scrollDirection.current = deltaY > 0 ? "down" : "up";
    handleOnScrollDown();
  };

  return (
    <div className="used-to-ion-content overflow-y-scroll" onScroll={handleOnScroll}>
      <div style={{ marginBottom: "20px", marginTop: "10px" }}>
        {children}
        {showLoader && (
          <div style={{ width: "100%", margin: "20px auto", textAlign: "center" }}>
            <IonSpinner />
          </div>
        )}
      </div>
    </div>
  );
};
