import cx from "classnames";

import { sizes, styles, BASE_STYLES, FULL_WIDTH } from "./styles";

export type ButtonTypes = "primary" | "secondary" | "tertiary" | "link";
export type ButtonSizes = "lg" | "md" | "sm";

export interface ButtonProps {
  type?: ButtonTypes;
  size?: ButtonSizes;
  disabled?: boolean;
  block?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  onClick,
  block = false,
  type = "primary",
  size = "sm",
}) => {
  const typeStyles = styles[type];
  const sizeStyles = sizes[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cx(BASE_STYLES, typeStyles, sizeStyles, {
        [FULL_WIDTH]: block,
      })}
    >
      {children}
    </button>
  );
};
