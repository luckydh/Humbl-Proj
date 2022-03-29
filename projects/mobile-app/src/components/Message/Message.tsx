import React, { FC, ReactElement } from "react";
import cx from "classnames";

export const ErrorIcon = () => (
    <svg
      className="fill-current h-5 w-5"
      // width="30"
      // height="30"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30">
      <path
        d="M14.976 0C6.705 0 0 6.705 0 14.976s6.705 14.976 14.976 14.976 14.976-6.705 14.976-14.976C29.942 6.709 23.243.009 14.976 0zm0 26.208c-6.2-.007-11.225-5.032-11.232-11.232a11.088 11.088 0 012.079-6.5l15.658 15.652a11.089 11.089 0 01-6.505 2.08zm9.153-4.727L8.471 5.823a11.088 11.088 0 016.5-2.08c6.202.005 11.23 5.03 11.237 11.233.008 2.333-.72 4.61-2.08 6.505h.001z"
        fillRule="nonzero"
      />
    </svg>
  );

export const SuccessIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28.054" height="21.04">
      <path d="M0 11.415l9.607 9.625L28.054 2.612 25.406 0l-15.8 15.78-7-7z" className="fill-current" />
    </svg>
  );

export type MessageVariant = "error" | "success" | "errorWithIcon";

export interface MessageProps {
  /** Set the Message styling */
  variant: MessageVariant;
  children?: React.ReactNode;
  ariaLabel?: string;
}

const VARIANTS: Record<MessageVariant, string> = {
  errorWithIcon: "text-red border-red bg-red-light",
  error: "text-gray-900 border-red bg-red-light",
  success: "bg-green-100 text-green-800 border-green-800",
};

const ICONS: Record<MessageVariant, ReactElement> = {
  errorWithIcon: <ErrorIcon />,
  error: <></>,
  success: <SuccessIcon />,
};

export const Message: FC<MessageProps> = ({ children, variant, ariaLabel }) => {
  const classes = cx("flex items-center text-sm rounded-md p-2 leading-5", VARIANTS[variant]);

  return (
    <div style={variant === "error" ? { color: "#3b5b7b" } : {}} className={classes} aria-label={ariaLabel}>
      {children}
      <div className="pl-2 ml-auto">{ICONS[variant]}</div>
    </div>
  );
};

Message.displayName = "Message";
