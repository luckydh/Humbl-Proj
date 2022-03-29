import React from "react";
import { IonCheckbox } from "@ionic/react";
import { Controller, ControllerProps } from "react-hook-form";
import cx from "classnames";
import "./styles.scss";

type Size = "small" | "default" | "large";

export type IonCheckboxProps = React.ComponentProps<typeof IonCheckbox> & {
  size?: Size;
  hasError?: boolean;
};

const SIZES: Record<Size, object> = {
  small: {
    "--size": "20px",
    "--border-width": "1px",
  },
  default: {
    "--size": "25px",
    "--border-width": "2px",
  },
  large: {
    "--size": "35px",
    "--border-width": "2px",
  },
};

export const BaseCheckbox: React.FC<IonCheckboxProps> = React.forwardRef(
  ({ size = "default", hasError, ...rest }, ref) => (
    <IonCheckbox {...rest} mode="md" ref={ref} style={SIZES[size]} className={cx({ "ion-checkbox-error": hasError })} />
  )
);

export interface CheckboxProps extends Omit<ControllerProps<"input">, "render" | "size"> {
  size?: Size;
  className?: string;
  hasError?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({ name, control, size, defaultValue, className, hasError }) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ onChange, onBlur, value }) => (
      <BaseCheckbox
        size={size}
        name={name}
        checked={value}
        onBlur={onBlur}
        className={className}
        hasError={hasError}
        onIonChange={(e) => onChange(e.detail.checked)}
      />
    )}
  />
);

export default Checkbox;
