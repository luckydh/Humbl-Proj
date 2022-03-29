import { TypographyColors, TypographySizes, TypographyTypes, TypographyWeights } from "./Typography";

export const colors: Record<TypographyColors, string> = {
  blue: "uikit-text-blue-400",
  white: "uikit-text-white",
  black: "uikit-text-black",
};

export const headingSizes: Record<TypographySizes, string> = {
  xxl: "uikit-text-5xl",
  xl: "uikit-text-3xl",
  lg: "uikit-text-2xl",
  md: "uikit-text-xl",
  sm: "uikit-text-lg",
  xs: "uikit-text-base",
};

export const baseSizes: Record<TypographySizes, string> = {
  xxl: "uikit-text-2xl",
  xl: "uikit-text-xl",
  lg: "uikit-text-lg",
  md: "uikit-text-base",
  sm: "uikit-text-sm",
  xs: "uikit-text-xs",
};

export const sizes: Record<TypographyTypes, Record<TypographySizes, string>> = {
  headline: headingSizes,
  base: baseSizes,
};

export const weights: Record<TypographyWeights, string> = {
  bold: "uikit-font-bold",
  semibold: "uikit-font-semibold",
  medium: "uikit-font-medium",
  normal: "uikit-font-normal",
};
