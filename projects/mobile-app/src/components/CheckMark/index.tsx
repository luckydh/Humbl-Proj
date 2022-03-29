import CheckIcon from "assets/svgs/CheckIcon";
import React, { FC } from "react";
import cx from "classnames";
import { CheckIconSmall } from "../../assets/svgs/CheckIconSmall";

export interface CheckMarkProps {
  className?: string;
  noBackground?: boolean;
  size?: "sm" | "md";
}

export const CheckMark: FC<CheckMarkProps> = ({ className, noBackground = false, size = "md" }) => {
  const classes = cx("z-50 border-white p-12 rounded-full opacity-95", !noBackground && "bg-blue-dark", className);

  return (
    <>
      {size === "md" && (
        <div
          className={classes}
          data-testid="checkmark"
          style={{
            top: 0,
            width: 219,
            height: 219,
            borderWidth: 7,
          }}>
          <CheckIcon className="w-full h-full" />
        </div>
      )}
      {size === "sm" && <CheckIconSmall />}
    </>
  );
};

export default CheckMark;
