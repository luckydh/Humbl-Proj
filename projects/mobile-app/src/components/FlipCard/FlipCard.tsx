import React, { useState } from "react";
import cx from "classnames";

import "./flip-card.scss";

type Direction = "x" | "y";

type Speed = keyof typeof speeds;

const speeds = {
  slowest: "duration-1000",
  slow: "duration-700",
  default: "duration-500",
  fast: "duration-300",
  fastest: "duration-200",
};

interface Flippable {
  speed?: Speed;
  isFlipped?: boolean;
}

export interface FlipCardProps extends Flippable {
  onFlip?: React.MouseEventHandler;
  direction?: Direction;
  front?: React.ReactNode;
  back?: React.ReactNode;
  ariaLabel?: string
}

export const FlipCard: React.FC<FlipCardProps> = ({ front, back, speed = "default", direction = "y", onFlip, ariaLabel }) => {
  const [flipped, setFlipped] = useState(false);

  const handleOnClick = (evt: React.MouseEvent) => {
    setFlipped((f) => !f);
    onFlip?.(evt);
  };

  const vertical = direction === "y";
  const horizontal = direction === "x";

  return (
    <div data-testid="flip-card" aria-label={ariaLabel} className="flip-card" onClick={handleOnClick}>
      <div
        data-testid="flipper"
        className={cx("flipper relative h-full w-full", {
          vertical,
          horizontal,
          "flip-y": vertical && flipped,
          "flip-x": horizontal && flipped,
        })}>
        <Front speed={speed} isFlipped={flipped}>
          {front}
        </Front>
        <Back speed={speed} isFlipped={flipped}>
          {back}
        </Back>
      </div>
    </div>
  );
};

export const Front: React.FC<Flippable> = ({ children, isFlipped, speed = "default" }) => (
  <div
    data-testid="front"
    className={cx("face front w-full h-full absolute top-0 left-0 transition-transform origin-center", speeds[speed], {
      relative: isFlipped,
      absolute: !isFlipped,
    })}>
    {children}
  </div>
);
export const Back: React.FC<Flippable> = ({ children, isFlipped, speed = "default" }) => (
  <div
    data-testid="back"
    className={cx("face back w-full h-full absolute top-0 left-0 transition-transform origin-center", speeds[speed], {
      relative: !isFlipped,
      absolute: isFlipped,
    })}>
    {children}
  </div>
);
