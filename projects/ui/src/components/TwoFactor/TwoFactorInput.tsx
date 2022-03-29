import React from "react";
import OtpInput from "react-otp-input";

export interface TwoFactorInputProps {
  numInputs: number;
  value: string;
  error?: boolean;
  onChange: (otp: string) => void;
  errorMessage?: string;
}

export const TwoFactorInput: React.FC<TwoFactorInputProps> = ({ numInputs, value, error, onChange, errorMessage }) => (
  <>
    <div className="uikit-py-2 uikit-w-full uikit-flex uikit-items-center uikit-justify-center uikit-select-none">
      <OtpInput
        value={value}
        onChange={onChange}
        numInputs={numInputs}
        separator={<span>&nbsp;&nbsp;</span>}
        isInputNum
        inputStyle="uikit-border-gray-200 uikit-rounded-md uikit-text-lg !uikit-w-[2em] !uikit-h-[2.2em]"
        hasErrored={error}
        errorStyle="uikit-border-red-100"
      />
    </div>
    {error && <div className="uikit-text-red-100 uikit-text-xs uikit-text-center">{errorMessage}</div>}
  </>
);
