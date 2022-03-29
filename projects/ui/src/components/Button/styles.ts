import { ButtonSizes, ButtonTypes } from "./Button";

export const FULL_WIDTH = "uikit-w-full";

export const BASE_STYLES =
  "uikit-flex uikit-justify-center uikit-items-center uikit-rounded-md uikit-transition-all uikit-duration-300 uikit-border-2 uikit-outline-none uikit-relative uikit-overflow-hidden focus:uikit-outline-none focus:uikit-shadow-none disabled:uikit-opacity-50";

export const styles: Record<ButtonTypes, string> = {
  primary: "uikit-bg-blue-400 uikit-text-white uikit-border-blue-400",
  secondary: "uikit-text-blue-400 uikit-bg-blue-100 uikit-border-blue-100",
  tertiary: "uikit-bg-transparent uikit-text-blue-400 uikit-border-blue-400",
  link: "uikit-text-blue-400 uikit-border-transparent",
};

export const sizes: Record<ButtonSizes, string> = {
  lg: "uikit-px-6 uikit-py-3",
  md: "uikit-px-5 uikit-py-2.5",
  sm: "uikit-px-4 uikit-py-1.5",
};
