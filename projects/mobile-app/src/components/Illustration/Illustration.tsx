import React from "react";
import { IllustrationsType, Illustrations } from "assets/illustrations2";

type IllustrationSize = "sm" | "md" | "lg";
export interface IllustrationProps {
  name: IllustrationsType;
  size?: IllustrationSize;
}

export const illustrationSize: Record<IllustrationSize, { width: number; height: number }> = {
  sm: { width: 44, height: 33 },
  md: { width: 80, height: 60 },
  lg: { width: 144, height: 108 },
};

export const Illustration: React.FC<IllustrationProps> = ({ name, size = "sm" }) => {
  const SVG = Illustrations[name];

  const { width, height } = illustrationSize[size];

  return <SVG name={name} height={height} width={width} />;
};
