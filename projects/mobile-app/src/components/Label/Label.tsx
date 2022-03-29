/* eslint jsx-a11y/label-has-associated-control: "off" */
import React, { FC } from "react";
import cx from "classnames";

export type LabelVariant = "default" | "secondary" | "secondary-faded";

export interface LabelProps {
  /**
   * Set the label styling
   * @default default
   * */
  variant?: LabelVariant;
  children?: string;
  ariaLabel?: string;
  htmlFor?: string;
}

const VARIANTS: Record<LabelVariant, string> = {
  default: "text-white opacity-80 font-medium mb-1",
  secondary: "text-blue-dark opacity-80 font-bold",
  "secondary-faded": "text-blue-dark opacity-70 font-medium",
};

export const Label: FC<LabelProps> = ({ children, ariaLabel, htmlFor, variant = "default" }) => {
  const classes = cx("block text-xs uppercase", VARIANTS[variant]);
  return (
    <label htmlFor={htmlFor} aria-label={ariaLabel} className={classes}>
      {children}
    </label>
  );
};

export default Label;

Label.displayName = "Label";
