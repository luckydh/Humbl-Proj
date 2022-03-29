import React, { FC } from "react";
import cx from "classnames";

export type CoinAssetSize = "large" | "small" | "x-large" | "full" | "x-small" | "xx-small";
export type CoinAssetVariant = "default" | "bg-opacity" | "bg-solid";

export interface CoinAssetImageProps {
  // String svg utf 8 encoded
  coinImage?: string;
  coinName?: string;
  size?: CoinAssetSize;
  bgType?: CoinAssetVariant;
  ariaLabel?: string;
  // TODO: ETX/Blocks update to avoid arbitrary css class
  imageClass?: string;
}

/**
 *
 * This is a first pass at extracting current uses found for coin logos in our app.
 * This is NOT EXHAUSTIVE please extend as needed.
 *
 * @param coinImage - utf 8 encoded svg image string defaults to ""
 * @param coinName - String ticket code for coin defaults to ""
 * @param size -  x-large = 43px x 43px, large = 40px x 40px,xx-small = 16px, x-small = 24px Defaults to small 32px x 32px
 * @param bgType - defines the bg style. bg-opacity = Opacity .5 or bg-solid = solid, defaults to no background
 * @param imageClass - custom image class can be passed, based on the requirement.
 * @returns jsx component image with some bg wrapping
 */

const createCoinAssetStyleObj = (sizeVariant: CoinAssetSize): React.CSSProperties => {
  const style = {
    height: "32px",
    width: "32px",
  };

  if (sizeVariant === "x-large") {
    style.height = "43px";
    style.width = style.height;
  } else if (sizeVariant === "large") {
    style.height = "40px";
    style.width = style.height;
  } else if (sizeVariant === "full") {
    style.height = "100%";
    style.width = style.height;
  } else if (sizeVariant === "xx-small") {
    style.height = "16px";
    style.width = style.height;
  } else if (sizeVariant === "x-small") {
    style.height = "24px";
    style.width = style.height;
  }
  return style;
};

export const CoinAssetImage: FC<CoinAssetImageProps> = ({
  coinImage = "",
  coinName = "",
  size = "small",
  bgType = "default",
  ariaLabel,
  imageClass = "p-1",
}) => {
  const classes = cx("flex justify-center items-center rounded-full", {
    "bg-white bg-opacity-50": bgType === "bg-opacity",
    "bg-white": bgType === "bg-solid",
  });

  // defaults to small
  const containerStyle = createCoinAssetStyleObj(size);

  return (
    <span className={classes} style={containerStyle}>
      <img
        aria-label={ariaLabel && `${ariaLabel}_CRYPTOCURRENCY_LOGO`}
        src={coinImage}
        alt={coinName}
        className={cx("h-full w-full", imageClass)}
      />
    </span>
  );
};

export default CoinAssetImage;
