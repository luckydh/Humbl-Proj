import { PhoneInputProps as OriginalPhoneInputProps } from "react-phone-number-input";

declare module "react-phone-number-input" {
  export interface PhoneInputProps extends OriginalPhoneInputProps {
    countryCallingCodeEditable?: boolean;
  }
}
