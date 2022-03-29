import React, { MouseEventHandler } from "react";
import cx from "classnames";

export type BannerSize = "fill" | "standard" | "small";

export interface IBannerProps {
  text: string | JSX.Element;
  onClick?: MouseEventHandler;
  size?: BannerSize;
  bgColor?: "dark-blue" | "white";
  fontSize?: "large" | "regular";
  justifyBetween?: boolean;
  isFlex?: boolean;
  padding?: string;
  ariaLabel?: string;
  leftIcon?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  rightIcon?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

const Banner: React.FC<IBannerProps> = ({
  leftIcon,
  rightIcon,
  bgColor = "dark-blue",
  size = "standard",
  fontSize = "large",
  text,
  isFlex = false,
  justifyBetween = true,
  padding = "py-4 px-6",
  ariaLabel,
  onClick = () => {},
}) => {
  const wrapperClasses = cx(
    "bg-cover  flex items-center text-center",
    bgColor === "white" ? "bg-white text-blue-dark" : "bg-banner bg-blue-dark-opaque text-white",
    fontSize === "regular" ? "text-sm font-semibold" : "text-xl font-bold",
    {
      "-mx-6 h-full w-screen": size === "fill",
      "h-20 w-full": size === "standard",
      "h-14": size === "small",
      "justify-between": justifyBetween,
    },
    padding
  );
  const textClass = cx(isFlex ? "flex flex-col flex-1 ml-2 text-left pl-2" : "px-3 text-left");

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={wrapperClasses}
        aria-label={ariaLabel && `${ariaLabel}BANNER_BUTTON`}>
        {leftIcon && (
          <div aria-label={ariaLabel && `${ariaLabel}BANNER_LEFT_ICON`} className="flex justify-center">
            {leftIcon}
          </div>
        )}
        <div aria-label={ariaLabel && `${ariaLabel}BODY_LABEL`} className={textClass}>
          {text}
        </div>
        {rightIcon && (
          <div aria-label={ariaLabel && `${ariaLabel}BANNER_RIGHT_ICON`} className="flex justify-center">
            {rightIcon}
          </div>
        )}
      </button>
    </>
  );
};

export default Banner;
