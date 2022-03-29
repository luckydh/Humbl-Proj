import cx from "classnames";
import { FieldVariant } from "../common";
import { BASE_STYLES, variants } from "./styles";

export interface WrapperProps {
  variant?: FieldVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({ variant = "default", children }) => (
  <div className={cx(BASE_STYLES, variants[variant])}>{children}</div>
);
