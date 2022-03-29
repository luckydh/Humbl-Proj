import React from "react";
import cx from "classnames";

type Color = "default" | "green" | "red" | "blue" | "yellow";

export interface PillProps {
  /**
   * @description applies outline styling
   */
  outline?: boolean;
  /**
   * @description determines the text & background color
   * @default "default"
   */
  color?: Color;
}

/**
 * Given a color and outline, returns the appropriate class names
 * @param color Color
 * @param outline boolean
 * @returns string
 */
const getPillClasses = (color: Color, outline = false) => {
  switch (color) {
    case "blue":
      return outline ? "text-blue border border-blue" : "bg-blue text-white";
    case "green":
      return outline ? "text-green-positive border border-green-positive" : "bg-green-positive text-white";
    case "red":
      return outline ? "text-red border border-red" : "bg-red text-white";
    case "yellow":
      return outline ? "text-yellow border border-yellow" : "bg-yellow text-white";
    default:
      return outline ? "text-gray-800 border border-gray-800" : "bg-gray-400 text-gray-800";
  }
};

export const Pill: React.FC<PillProps> = ({ color = "default", outline = false, children }) => {
  const classes = cx(
    "flex items-center justify-center px-2 pt-1 pb-0.5 rounded-full shadow-sm font-medium text-base transition-colors duration-300 ease-in-out",
    getPillClasses(color, outline)
  );

  return (
    <div data-testid="pill-container" className={classes}>
      <div className="flex items-center">{children}</div>
    </div>
  );
};
