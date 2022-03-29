import React from "react";
import cx from "classnames";
import TickIcon from "assets/svgs/TickIcon";

export interface RadioButtonProps {
  selected?: boolean;
  ariaLabel?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ selected, ariaLabel }) => (
  <div
    style={{ borderWidth: 1.5 }}
    aria-label={ariaLabel}
    className={cx(
      "flex flex-col justify-center items-center rounded-full border-blue-dark h-6 w-6",
      selected ? "bg-blue-dark" : ""
    )}>
    {selected && <TickIcon width={10} height={8} />}
  </div>
);

export default RadioButton;
