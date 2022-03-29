import cx from "classnames";
import { FieldVariant } from "../common";
import { BASE_STYLES, INSIDE_STYLES, ONTOP_STYLES, variants } from "./styles";

export interface LabelProps {
  onTop?: boolean;
  variant?: FieldVariant;
  htmlFor?: string;
}

export const Label: React.FC<LabelProps> = ({ onTop, htmlFor, children, variant = "default" }) => {
  const styles = cx(BASE_STYLES, {
    [ONTOP_STYLES]: onTop,
    [INSIDE_STYLES]: !onTop,
    [variants[variant]]: onTop,
  });

  return (
    <label htmlFor={htmlFor} className={styles}>
      {children}
    </label>
  );
};
