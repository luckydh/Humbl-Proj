import React, { forwardRef } from "react";
import { UseMeasureRef } from "react-use/lib/useMeasure";
import cx from "classnames";

interface ScrollableViewProps {
  children?: React.ReactNode;
  ref?: UseMeasureRef<HTMLDivElement>;
  // TODO: ETX/Blocks update to avoid arbitrary css class
  customClass?: string;
}
/** View that takes up remaining vertical space and is scrollable */
export const ScrollableView = forwardRef<HTMLDivElement, ScrollableViewProps>(({ children, customClass = "" }, ref) => (
  <div
    id="scrollableView"
    ref={ref}
    className={cx("flex flex-col flex-1 overflow-y-auto transition-all duration-200", customClass)}>
    {children}
  </div>
));
