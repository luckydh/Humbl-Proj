import React, { FC, useCallback, useState } from "react";
import cx from "classnames";

export type RatingSize = "small" | "medium" | "large";
const enum TestLabelTypes {
  OUTLINE = "EMPTY",
  FULL = "FULL",
  HALF = "HALF",
}

export interface RatingProps {
  value: number;
  onChange: (rating: number) => void;
}

export const Rating: FC<RatingProps> = ({ onChange, value }) => {
  const [hovered, setHovered] = useState(-1);

  const onClickHandler = useCallback(
    (rating: number) => {
      onChange(rating);
    },
    [onChange]
  );

  const stars = [1, 2, 3, 4, 5].map(
    (index) => {
      const isActive = index <= hovered || index <= value;

      return (
        <Star index={index} isActive={isActive} key={`star-${index}`} onClick={onClickHandler} onHover={setHovered} />
      );
    },
    [hovered, onClickHandler]
  );

  return (
    <div className="flex space-x-2" onMouseLeave={() => setHovered(-1)}>
      {stars}
    </div>
  );
};

Rating.displayName = "Rating";

type SizeVariant = "small" | "default";
type DimensionProps = { width: number; height: number };

export interface RatingDisplayProps {
  size?: SizeVariant;
  rating: number;
  className?: string;
}

const SIZE_VARIANT: Record<SizeVariant, DimensionProps> = {
  small: { width: 20, height: 18 },
  default: { width: 39, height: 37 },
};

const SPACE_VARIANT: Record<SizeVariant, string> = {
  small: "space-x-1",
  default: "space-x-2",
};

export const RatingDisplay: FC<RatingDisplayProps> = ({ rating, size = "default", className }) => {
  const fullRating = Math.round(rating);
  const formattedRating = Math.round(rating * 2) / 2;

  const sizeProps = SIZE_VARIANT[size];
  const wrapperClasses = cx("flex", SPACE_VARIANT[size], className);

  const stars = [1, 2, 3, 4, 5].map(
    (index) => {
      let icon = <StarOutlineIcon {...sizeProps} />;
      let testLabel = TestLabelTypes.OUTLINE;

      if (index <= fullRating) {
        icon = <StarIcon {...sizeProps} />;
        testLabel = TestLabelTypes.FULL;
      }

      if (index - 0.5 === formattedRating) {
        icon = <StarHalfIcon {...sizeProps} />;
        testLabel = TestLabelTypes.HALF;
      }

      return (
        <span
          key={`star-${index}`}
          aria-label={`star ${index + 1} ${testLabel}`}
          data-testid={`star-${index}-${testLabel}`}>
          {icon}
        </span>
      );
    },
    [formattedRating]
  );

  return <div className={wrapperClasses}>{stars}</div>;
};

RatingDisplay.displayName = "RatingDisplay";

interface StarProps {
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
  onHover: (index: number) => void;
}

const Star: FC<StarProps> = ({ index, isActive, onClick, onHover }) => (
  <button
    type="button"
    onMouseEnter={() => onHover(index)}
    onClick={() => onClick(index)}
    className="transition-transform duration-150 transform hover:scale-125">
    {isActive ? <StarIcon /> : <StarOutlineIcon />}
  </button>
);

const StarIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="39" height="37" viewBox="0 0 39 37" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M24.609 12.486L19.117 0l-5.499 12.486L.005 13.857l10.214 8.923-2.898 13.562L19.11 29.14l11.79 7.202-2.892-13.564 10.214-8.922z"
      fill="#FFF"
      fillRule="nonzero"
    />
  </svg>
);

const StarOutlineIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="39" height="37" viewBox="0 0 39 37" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M24.609 12.486L19.117 0l-5.499 12.486L.005 13.857l10.214 8.923-2.898 13.562L19.11 29.14l11.79 7.202-2.892-13.564 10.214-8.922-13.613-1.371zm-10.31.937l4.817-10.941 4.813 10.941 11.899 1.198-8.92 7.793 2.528 11.863-10.325-6.307-10.327 6.306 2.535-11.862-8.921-7.793 11.9-1.198z"
      fill="#FFF"
      fillRule="nonzero"
    />
  </svg>
);

const StarHalfIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="39" height="37" viewBox="0 0 39 37" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M30.896 36.341l-11.789-7.2-11.791 7.2 2.9-13.562-10.22-8.922 13.618-1.371L19.114 0l5.491 12.486 13.613 1.371-10.214 8.923 2.892 13.561zm-11.789-8.372l10.326 6.308-2.53-11.864 8.921-7.792-11.9-1.2-4.811-10.935-.006 25.483z"
      fill="#FFF"
      fillRule="nonzero"
    />
  </svg>
);
