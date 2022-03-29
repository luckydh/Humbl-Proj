import React from "react";

export interface WidgetContainerProps {
  ariaLabel: string;
}

export const WidgetContainer: React.FC<WidgetContainerProps> = ({ children, ariaLabel }) => (
  <div className="m-5 rounded-lg overflow-hidden bg-white transition-height duration-200" aria-label={ariaLabel}>
    {children}
  </div>
);
