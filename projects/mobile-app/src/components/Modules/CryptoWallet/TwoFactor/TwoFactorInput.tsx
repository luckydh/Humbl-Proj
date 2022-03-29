import { Message } from "components/Message/Message";
import React, { useEffect } from "react";
import cx from "classnames";
import OtpInput from "../../../react-otp-input/react-otp-input";

export interface TwoFactorInputProps {
  numInputs: number;
  separator?: JSX.Element | string;
  value: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  onChange: (otp: string) => void;
}

export const TwoFactorInput: React.FC<TwoFactorInputProps> = ({
  numInputs,
  separator,
  value,
  error,
  className,
  inputClassName,
  onChange,
}) => {
  const separatorUsed = separator || <span>&nbsp;</span>;
  const classes = cx(
    "py-2 w-full flex items-center justify-center select-none",
    error ? "mb-2 border-red" : "",
    className
  );

  const inputClasses = cx(
    "border-t-0 border-r-0 border-l-0 border-b-2 bg-transparent text-white focus:outline-none focus:border-blue-dark focus:ring-0 p-0 custom-otp-selection selection:text-white !w-[2em]",
    error ? "border-red" : "border-white",
    inputClassName
  );

  const handleInputChange = (otp: string) => {
    onChange(otp);
  };

  useEffect(() => {
    // Every time value changes We want to grab all the classed elements (typed to inputs)
    const inputs = document.getElementsByClassName("custom-otp-selection") as HTMLCollectionOf<HTMLInputElement>;
    // convert this group into an array and iterate through each adding a dark blue border to all that have a value and are not errors.
    Array.from(inputs).forEach((input: HTMLInputElement) => {
      input.value && !error ? input.classList.add("border-blue-dark") : input.classList.remove("border-blue-dark");
    });
  }, [value, error]);

  return (
    <>
      <div className={classes}>
        <OtpInput
          value={value}
          onChange={handleInputChange}
          numInputs={numInputs}
          separator={separatorUsed}
          isInputNum
          inputStyle={inputClasses}
        />
      </div>
      {error && (
        <div>
          <Message variant="error">{error}</Message>
        </div>
      )}
    </>
  );
};
