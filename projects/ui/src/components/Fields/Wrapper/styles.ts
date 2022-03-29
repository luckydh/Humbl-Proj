import { FieldVariant } from "../common";

export const BASE_STYLES = "uikit-relative uikit-border uikit-rounded-md";

export const variants: Record<FieldVariant, string> = {
  error: "uikit-border-red-100",
  success: "uikit-border-green-100",
  default: "uikit-border-grey-300 focus-within:uikit-border-blue-400",
};
