import cx from "classnames";
import { FieldVariant } from "../common";
import { BASE_STYLES, variants } from "./styles";

export interface HelperTextProps {
  variant?: FieldVariant;
}

export const HelperText: React.FC<HelperTextProps> = ({ children, variant = "default" }) => (
  <div className={cx(BASE_STYLES, variants[variant])}>{children}</div>
);
