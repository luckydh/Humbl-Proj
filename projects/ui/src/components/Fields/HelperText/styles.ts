import { FieldVariant } from "../common";

export const BASE_STYLES = "uikit-text-xs uikit-py-1 uikit-pl-3";

export const variants: Record<FieldVariant, string> = {
  error: "uikit-text-red-100",
  success: "uikit-text-green-100",
  default: "uikit-text-grey-500",
};
