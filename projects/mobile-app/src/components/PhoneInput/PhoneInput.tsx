import { LabelContainer } from "components/Input/Input";
import React, { FC } from "react";
import ReactPhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "libphonenumber-js/max";
import Joi from "joi";
import "react-phone-number-input/style.css";
import "./styles.scss";

interface PhoneProps {
  onChange: (value: string) => void;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  onBlur: (event: any) => void;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  onCountryChange: (event: any) => void;
  defaultCountry: string;
  name: string;
  placeholder?: string;
  value: string;
  label?: string;
  ariaLabel?: string;
}

export const PhoneNumberSchema = Joi.string().custom((value, helpers) => {
  if (!isValidPhoneNumber(value)) {
    return helpers.error("phone.invalid");
  }
  return value;
});

export const PhoneInput: FC<PhoneProps> = ({
  label,
  ariaLabel,
  name,
  value,
  placeholder,
  defaultCountry,
  onCountryChange,
  onBlur,
  onChange,
}) => (
  <div className="mb-2">
    {label && <LabelContainer ariaLabel={ariaLabel && `${ariaLabel}_LABEL`} label={label} />}
    <ReactPhoneInput
      aria-label={ariaLabel && `${ariaLabel}_FIELD`}
      name={name}
      value={value}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={onChange}
      defaultCountry={defaultCountry}
      onCountryChange={onCountryChange}
      displayInitialValueAsLocalNumber={false}
      international
      countryCallingCodeEditable={false}
      limitMaxLength
      maxLength={25}
      className="form-input text-white w-full flex items-center rounded-lg select-none bg-blue border-white border-2 outline-none p-2 pl-4 sm:text-xl text-md"
      style={{ height: 52, fontSize: 20 }}
    />
  </div>
);
