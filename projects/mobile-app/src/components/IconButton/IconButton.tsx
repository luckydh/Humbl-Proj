import React, { FC } from "react";
import cx from "classnames";

export type IconButtonVariant = "solid" | "outline";

export interface IconButtonProps {
  /** Respond to Iconbutton click */
  onClick?: () => void;
  /**
   * Set the size of the button
   * @default 56
   * */
  size?: number;

  /**
   * Icon button variant.
   * Solid: renders a blue background with blue border.
   * Outline: renders a transparent background with white border.
   * @default "outline"
   */
  variant?: IconButtonVariant;

  /**
   * Additional class for extra customization.
   */
  className?: string;

  /**
   * Disabled state.
   */
  disabled?: boolean;

  ariaLabel?: string;
}

const VARIANTS: Record<IconButtonVariant, string> = {
  solid: "border-blue-dark text-white bg-blue-dark",
  outline: "border-white text-white",
};

export const IconButton: FC<IconButtonProps> = ({
  children,
  size = 56,
  onClick,
  variant = "outline",
  className,
  disabled,
  ariaLabel,
  ...rest
}) => {
  const classes = cx(
    "border-2 border-solid rounded-full select-none outline-none flex items-center justify-center fill-current",
    VARIANTS[variant],
    { "pointer-events-none": disabled },
    className
  );

  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={classes}
      style={{ height: size, width: size }}
      disabled={disabled}
      {...rest}>
      {children}
    </button>
  );
};

IconButton.displayName = "IconButton";
