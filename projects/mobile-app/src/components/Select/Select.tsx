import React from "react";
import cx from "classnames";

type RefReturn =
  | string
  | ((instance: HTMLSelectElement | null) => void)
  | React.RefObject<HTMLSelectElement>
  | null
  | undefined;

interface SelectOption {
  label: string | number;
  value: string | number;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  register?: RefReturn;
  /** Show error styling */
  hasError?: boolean;
  ariaLabel?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  register,
  className,
  placeholder,
  hasError,
  ariaLabel,
  ...rest
}) => (
  <select
    aria-label={ariaLabel && `${ariaLabel}_DROPDOWN`}
    defaultValue=""
    ref={register}
    style={{ height: 52, fontSize: 20 }}
    className={cx(
      "py-2 px-4 w-full rounded-lg bg-blue border-white border-2 outline-none text-white placeholder-white-faded text-xl block focus:ring-indigo-500 focus:border-white focus:outline-none focus:ring-0 focus:placeholder-transparent",
      hasError ? "border-red" : "",
      className
    )}
    {...rest}>
    {placeholder && (
      <option value="" disabled>
        {placeholder}
      </option>
    )}
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
