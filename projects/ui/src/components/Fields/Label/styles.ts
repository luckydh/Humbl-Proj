import { FieldVariant } from "../common";

export const BASE_STYLES =
  "uikit-absolute uikit-top-px uikit-p-3 uikit-text-sm uikit--z-1 uikit-duration-200 uikit-origin-0";

export const INSIDE_STYLES = "uikit-text-grey-300";

export const ONTOP_STYLES =
  "uikit-transform uikit-scale-75 uikit--translate-y-3 uikit-z-0 uikit-ml-3 uikit-px-2 uikit-py-0 uikit-rounded-sm uikit-bg-white";

export const variants: Record<FieldVariant, string> = {
  error: "uikit-text-red-100",
  success: "uikit-text-green-100",
  default: "uikit-text-black",
};
