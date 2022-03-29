import React from "react";
import cx from "classnames";

type ListItemVariant = "compact" | "default";

interface ListItemProps {
  mainText: JSX.Element | string;
  subText: JSX.Element | string;
  detail?: JSX.Element;
  image?: JSX.Element;
  onClick?: () => void;
  variant?: ListItemVariant;

  liClassName?: string;
  color?: string;
  value?: number;
  ariaLabel?: string;
  isCompact?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  mainText,
  subText,
  image,
  onClick,
  variant = "default",
  liClassName,
  color,
  detail,
  ariaLabel,
  isCompact = false,
}) => {
  const listClass = cx(
    {
      "transition-all duration-150 bg-blue-lightest active:bg-white": !isCompact,
      "active:scale-105": variant === "default" && !isCompact,
      "flex flex-row": isCompact,
    },
    liClassName
  );
  return (
    <li className={listClass}>
      <div
        onClick={onClick}
        className={cx("flex flex-row w-full items-center", {
          "py-4 px-6": variant === "default",
          "py-3 px-3": variant === "compact",
        })}>
        <div
          className={cx({
            "h-full mt-2.5": isCompact,
          })}>
          {image ? (
            <div
              aria-label={ariaLabel && `${ariaLabel}_CARDLOGO_IMAGE`}
              className="h-10 w-10 overflow-hidden rounded-full flex items-center">
              {image}
            </div>
          ) : (
            <div className="w-3.5 h-3.5 rounded-full p-1.5" style={{ backgroundColor: color }} />
          )}
        </div>
        <div className="flex flex-col flex-1 text-left ml-2">
          <div
            aria-label={ariaLabel && `${ariaLabel}_CARDNAME_LABEL`}
            className="text-blue-dark font-semibold text-base flex">
            {mainText}
          </div>
          <div
            aria-label={ariaLabel && `${ariaLabel}_CARDABBREVIATION_LABEL`}
            className="text-blue-dark leading-relaxed font-medium text-sm">
            {subText}
          </div>
        </div>

        <div className="flex flex-col">{detail}</div>
      </div>
    </li>
  );
};
