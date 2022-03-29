import React, { FC, CSSProperties } from "react";
import cx from "classnames";

export type ButtonVariant = "default" | "square" | "text" | "outline" | "custom";
export type ButtonSize = "default" | "large" | "small" | "xsmall";

export interface ButtonProps {
  /**
   * Disable the button
   * @default false
   * */
  isDisabled?: boolean;
  /** Respond to button click */
  onClick?: () => void;
  /**
   * Change the button styling
   * @default default
   * */
  variant?: ButtonVariant;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  size?: ButtonSize;
  className?: string;
  customClass?: string;
  style?: CSSProperties;
  testId?: string;
  ariaLabel?: string;
}

const VARIANTS: Record<ButtonVariant, string> = {
  default:
    "justify-center font-medium w-full text-white py-2 px-4 bg-blue-dark rounded-md active:bg-blue-light active:shadow-button-active active:text-blue-dark transition-all",
  square:
    "rounded-lg bg-blue-dark active:bg-blue-light active:shadow-button-active border-2 border-solid border-blue-dark",
  text: "justify-center font-medium w-full text-white py-2 px-4 active:shadow-button-active transition-all",
  outline: "rounded-md font-medium w-full text-white py-2 px-4 shadow-button-outline active:bg-white-faded",
  custom: "",
};

const SIZES: Record<ButtonSize, string> = {
  default: "py-3 px-6 text-md sm:leading-none",
  large: "text-xl py-4 px-10",
  small: "py-2 px-4 text-sm",
  xsmall: "text-xs",
};

export const Button: FC<ButtonProps> = ({
  children,
  isDisabled = false,
  onClick,
  variant = "default",
  size = "default",
  type = "button",
  className,
  testId,
  ariaLabel,
  customClass,
  style,
}) => {
  const onClickHandler = () => {
    if (isDisabled) {
      return;
    }

    onClick?.();
  };

  const classes =
    customClass ??
    cx(
      "text-white select-none outline-none flex justify-center items-center",
      VARIANTS[variant],
      SIZES[size],
      isDisabled ? "pointer-events-none opacity-60" : "",
      className
    );

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      data-testid={testId}
      className={classes}
      onClick={onClickHandler}
      style={variant === "default" && size === "default" ? { minWidth: 160 } : style}>
      {children}
    </button>
  );
};

export default Button;

Button.displayName = "Button";
