import { colors, weights, sizes } from "./styles";

export type TypographyTypes = "headline" | "base";
export type TypographyWeights = "bold" | "semibold" | "medium" | "normal";
export type TypographySizes = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";
export type TypographyColors = "white" | "blue" | "black";

export interface TypographyProps {
  type?: TypographyTypes;
  weight?: TypographyWeights;
  color?: TypographyColors;
  size?: TypographySizes;
  as?: React.ElementType;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  type = "base",
  weight,
  color = "blue",
  size = "sm",
  as: Tag = "span",
}) => {
  const weightStyles = weight ? weights[weight] : type === "base" ? weights.normal : weights.bold;
  const colorStyles = colors[color];
  const sizeStyles = sizes[type][size];

  return <Tag className={`${weightStyles} ${sizeStyles} ${colorStyles}`}>{children}</Tag>;
};
