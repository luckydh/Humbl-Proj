import React, { useState } from "react";
import { BASE_STYLES } from "./styles";
import { FieldVariant } from "../common";
import { Label } from "../Label/Label";
import { Wrapper } from "../Wrapper/Wrapper";
import { HelperText } from "../HelperText/HelperText";

type NativeInput = React.InputHTMLAttributes<HTMLInputElement>;
type TextOnlyTypes = "email" | "number" | "password" | "search" | "tel" | "text" | "url";

export interface TextFieldProps extends NativeInput {
  label: string;
  type?: TextOnlyTypes;
  variant?: FieldVariant;
  helperText?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  id,
  type,
  label,
  placeholder,
  variant = "default",
  helperText,
  value,
  defaultValue,
  onBlur,
  onFocus,
  onChange,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(Boolean(value || defaultValue));

  const handleBlur: NativeInput["onBlur"] = (...args) => {
    setFocused(false);
    onBlur?.(...args);
  };

  const handleFocus: NativeInput["onFocus"] = (...args) => {
    setFocused(true);
    onFocus?.(...args);
  };

  const handleChange: NativeInput["onChange"] = (event) => {
    setHasValue(!!event.target.value);
    onChange?.(event);
  };

  return (
    <div>
      <Wrapper variant={variant}>
        <input
          {...rest}
          type={type}
          id={id}
          value={value}
          defaultValue={defaultValue}
          className={BASE_STYLES}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          placeholder={focused && placeholder ? placeholder : ""}
        />
        <Label htmlFor={id} onTop={focused || hasValue} variant={variant}>
          {label}
        </Label>
        {/* TODO: Add icon support */}
      </Wrapper>
      {helperText && <HelperText variant={variant}>{helperText}</HelperText>}
    </div>
  );
};
