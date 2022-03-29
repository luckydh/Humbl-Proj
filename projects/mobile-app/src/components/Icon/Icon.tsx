import React from "react";
import { IconsType, Icons } from "assets/icons2";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

interface BaseIcon {
  size?: IconSize;
}
export interface IconProps extends BaseIcon {
  name: IconsType;
  color?:
    | "blue"
    | "blue-dark"
    | "blue-dark2"
    | "blue-light"
    | "blue-lightest"
    | "green"
    | "light-bright-blue"
    | "red"
    | "red-light"
    | "grey-light"
    | "red-failed"
    | "yellow";
}

interface ImageIconProps extends BaseIcon {
  label: string;
  src: string;
}

export const iconSize: Record<IconSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 60,
};

export const Icon: React.FC<IconProps> = ({ name, size = "sm", color }) => {
  const SVG = Icons[name];
  return <SVG name={name} className={color && `path-${color}`} height={iconSize[size]} width={iconSize[size]} />;
};

export const ImageIcon: React.FC<ImageIconProps> = ({ src, size = "md", label }) => (
  <div
    /* This wrapper forces images to fit into the square, i.e. eth icon is taller than wide which causes issues w/o this. */
    className="rounded-full overflow-hidden flex justify-center object-fill"
    style={{ width: `${iconSize[size]}px`, height: `${iconSize[size]}px` }}>
    <img className="h-full" src={src} alt={label} />
  </div>
);
